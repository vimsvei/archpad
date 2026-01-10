#!/usr/bin/env python3
"""
Скрипт для инициализации PostgreSQL баз данных и пользователей.
Подключается к PostgreSQL через kubectl port-forward, если БД доступна только по приватному IP.

Использование:
    python3 init-database.py \
        --kubeconfig /path/to/kubeconfig \
        --namespace postgres \
        --postgres-pod postgres-0 \
        --host localhost \
        --port 5433 \
        --admin-user postgres \
        --admin-password secret \
        --vault-addr https://vault.example.com \
        --vault-token hvs.xxx \
        --vault-path kv/data/archpad/demo/database \
        --mode app_owner

Или напрямую через psql без port-forward:
    python3 init-database.py \
        --host postgres.private.network \
        --port 5432 \
        --admin-user postgres \
        --admin-password secret \
        ...
"""

import argparse
import subprocess
import sys
import time
import psycopg2
import json
from typing import Dict, Optional, Tuple
import requests

try:
    from psycopg2 import sql
except ImportError:
    sys.exit("psycopg2 library required. Install with: pip install psycopg2-binary requests")


def get_vault_secrets(vault_addr: str, vault_token: str, vault_path: str) -> Dict[str, str]:
    """Получить секреты из Vault."""
    url = f"{vault_addr.rstrip('/')}/v1/{vault_path}"
    headers = {"X-Vault-Token": vault_token}
    
    try:
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        data = response.json()
        return data.get("data", {}).get("data", {})
    except requests.exceptions.RequestException as e:
        print(f"Error fetching secrets from Vault: {e}", file=sys.stderr)
        sys.exit(1)


def start_port_forward(
    kubeconfig: str,
    namespace: str,
    pod: str,
    local_port: int,
    remote_port: int = 5432
) -> Optional[subprocess.Popen]:
    """Запустить kubectl port-forward для доступа к PostgreSQL."""
    cmd = [
        "kubectl",
        "port-forward",
        f"--namespace={namespace}",
        f"--kubeconfig={kubeconfig}",
        f"pod/{pod}",
        f"{local_port}:{remote_port}"
    ]
    
    print(f"Starting port-forward: {' '.join(cmd)}")
    try:
        process = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        # Даем время на установку соединения
        time.sleep(2)
        if process.poll() is None:
            print(f"Port-forward established: localhost:{local_port} -> {pod}:{remote_port}")
            return process
        else:
            stdout, stderr = process.communicate()
            print(f"Port-forward failed: {stderr.decode()}", file=sys.stderr)
            return None
    except FileNotFoundError:
        print("kubectl not found. Please install kubectl.", file=sys.stderr)
        return None
    except Exception as e:
        print(f"Error starting port-forward: {e}", file=sys.stderr)
        return None


def execute_sql(conn, sql_command: str, params: Optional[Tuple] = None):
    """Выполнить SQL команду."""
    with conn.cursor() as cur:
        cur.execute(sql_command, params)
        conn.commit()


def create_role(conn, role_name: str, password: str, can_create_db: bool = False):
    """Создать роль (пользователя) в PostgreSQL."""
    create_db_clause = "CREATEDB" if can_create_db else "NOCREATEDB"
    
    # Проверяем, существует ли роль
    with conn.cursor() as cur:
        cur.execute(
            "SELECT 1 FROM pg_roles WHERE rolname = %s",
            (role_name,)
        )
        if cur.fetchone():
            print(f"Role {role_name} already exists, updating password...")
            execute_sql(
                conn,
                f"ALTER ROLE {role_name} WITH LOGIN PASSWORD %s {create_db_clause}",
                (password,)
            )
        else:
            print(f"Creating role {role_name}...")
            execute_sql(
                conn,
                f"CREATE ROLE {role_name} WITH LOGIN PASSWORD %s {create_db_clause}",
                (password,)
            )


def create_database(conn, db_name: str, owner: Optional[str] = None):
    """Создать базу данных."""
    with conn.cursor() as cur:
        cur.execute("SELECT 1 FROM pg_database WHERE datname = %s", (db_name,))
        if cur.fetchone():
            print(f"Database {db_name} already exists")
            if owner:
                execute_sql(conn, f"ALTER DATABASE {db_name} OWNER TO {owner}")
        else:
            print(f"Creating database {db_name}...")
            if owner:
                execute_sql(conn, f"CREATE DATABASE {db_name} OWNER {owner}")
            else:
                execute_sql(conn, f"CREATE DATABASE {db_name}")


def grant_privileges(conn, db_name: str, role_name: str, admin_user: str):
    """Выдать права пользователю на базу данных."""
    # Подключаемся к конкретной БД для выдачи прав
    db_conn = psycopg2.connect(
        host=conn.info.host,
        port=conn.info.port,
        user=admin_user,
        password=conn.info.password,
        database=db_name
    )
    
    try:
        # REVOKE от PUBLIC
        execute_sql(db_conn, f"REVOKE ALL ON DATABASE {db_name} FROM PUBLIC")
        
        # GRANT CONNECT и CREATE
        execute_sql(db_conn, f"GRANT CONNECT ON DATABASE {db_name} TO {role_name}")
        execute_sql(db_conn, f"GRANT CREATE ON DATABASE {db_name} TO {role_name}")
        
        # GRANT на схему public
        execute_sql(db_conn, f"GRANT USAGE, CREATE ON SCHEMA public TO {role_name}")
        
        # DEFAULT PRIVILEGES
        execute_sql(
            db_conn,
            f"ALTER DEFAULT PRIVILEGES IN SCHEMA public "
            f"GRANT SELECT, INSERT, UPDATE, DELETE, REFERENCES ON TABLES TO {role_name}"
        )
        execute_sql(
            db_conn,
            f"ALTER DEFAULT PRIVILEGES IN SCHEMA public "
            f"GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO {role_name}"
        )
        execute_sql(
            db_conn,
            f"ALTER DEFAULT PRIVILEGES IN SCHEMA public "
            f"GRANT EXECUTE ON FUNCTIONS TO {role_name}"
        )
        
        print(f"Granted privileges to {role_name} on database {db_name}")
    finally:
        db_conn.close()


def create_extension(conn, db_name: str, extension_name: str, admin_user: str):
    """Создать расширение PostgreSQL."""
    db_conn = psycopg2.connect(
        host=conn.info.host,
        port=conn.info.port,
        user=admin_user,
        password=conn.info.password,
        database=db_name
    )
    
    try:
        execute_sql(db_conn, f"CREATE EXTENSION IF NOT EXISTS {extension_name}")
        print(f"Created extension {extension_name} in database {db_name}")
    finally:
        db_conn.close()


def main():
    parser = argparse.ArgumentParser(description="Initialize PostgreSQL databases and users")
    
    # Connection options
    parser.add_argument("--host", required=True, help="PostgreSQL host")
    parser.add_argument("--port", type=int, default=5432, help="PostgreSQL port")
    parser.add_argument("--admin-user", default="postgres", help="PostgreSQL admin user")
    parser.add_argument("--admin-password", required=True, help="PostgreSQL admin password")
    parser.add_argument("--admin-database", default="postgres", help="Admin database name")
    
    # Vault options
    parser.add_argument("--vault-addr", required=True, help="Vault address")
    parser.add_argument("--vault-token", required=True, help="Vault token")
    parser.add_argument("--vault-path", default="kv/data/archpad/demo/database", help="Vault secrets path")
    
    # Kubernetes port-forward options (optional)
    parser.add_argument("--use-port-forward", action="store_true", help="Use kubectl port-forward")
    parser.add_argument("--kubeconfig", help="Path to kubeconfig file")
    parser.add_argument("--namespace", default="default", help="Kubernetes namespace")
    parser.add_argument("--postgres-pod", help="PostgreSQL pod name")
    parser.add_argument("--local-port", type=int, default=5433, help="Local port for port-forward")
    
    # Configuration
    parser.add_argument("--mode", choices=["app_owner", "postgres_owner"], default="app_owner",
                       help="Database ownership mode")
    
    args = parser.parse_args()
    
    # Запускаем port-forward если нужно
    port_forward_process = None
    if args.use_port_forward:
        if not args.kubeconfig or not args.postgres_pod:
            print("Error: --kubeconfig and --postgres-pod required when using --use-port-forward", file=sys.stderr)
            sys.exit(1)
        port_forward_process = start_port_forward(
            args.kubeconfig,
            args.namespace,
            args.postgres_pod,
            args.local_port,
            args.port
        )
        if not port_forward_process:
            sys.exit(1)
        # Используем localhost и local port для подключения
        actual_host = "localhost"
        actual_port = args.local_port
    else:
        actual_host = args.host
        actual_port = args.port
    
    try:
        # Получаем секреты из Vault
        print(f"Fetching secrets from Vault: {args.vault_path}")
        secrets = get_vault_secrets(args.vault_addr, args.vault_token, args.vault_path)
        
        # Извлекаем пароли и имена пользователей
        passwords = {
            "project": secrets.get("PROJECT_DB_PASSWORD"),
            "hasura": secrets.get("HASURA_DB_PASSWORD"),
            "kratos": secrets.get("KRATOS_DB_PASSWORD"),
            "hydra": secrets.get("HYDRA_DB_PASSWORD"),
            "tolgee": secrets.get("TOLGEE_DB_PASSWORD"),
        }
        
        user_names = {
            "project": secrets.get("PROJECT_DB_USER", "project_db_user"),
            "hasura": secrets.get("HASURA_DB_USER", "hasura_db_user"),
            "kratos": secrets.get("KRATOS_DB_USER", "kratos_db_user"),
            "hydra": secrets.get("HYDRA_DB_USER", "hydra_db_user"),
            "tolgee": secrets.get("TOLGEE_DB_USER", "tolgee_db_user"),
        }
        
        db_names = {
            "project": secrets.get("PROJECT_DB", "archpad"),
            "tenant": secrets.get("TENANT_DB", "tenant"),
            "hasura": secrets.get("HASURA_DB", "hasura"),
            "kratos": secrets.get("KRATOS_DB", "kratos"),
            "hydra": secrets.get("HYDRA_DB", "hydra"),
            "tolgee": secrets.get("TOLGEE_DB", "tolgee"),
        }
        
        # Подключаемся к PostgreSQL
        print(f"Connecting to PostgreSQL at {actual_host}:{actual_port}...")
        conn = psycopg2.connect(
            host=actual_host,
            port=actual_port,
            user=args.admin_user,
            password=args.admin_password,
            database=args.admin_database
        )
        
        try:
            # Создаем роли
            create_role(conn, user_names["project"], passwords["project"], can_create_db=True)
            create_role(conn, user_names["hasura"], passwords["hasura"])
            create_role(conn, user_names["kratos"], passwords["kratos"])
            create_role(conn, user_names["hydra"], passwords["hydra"])
            create_role(conn, user_names["tolgee"], passwords["tolgee"])
            
            # Создаем базы данных
            create_database(conn, db_names["project"], 
                          owner=user_names["project"] if args.mode == "app_owner" else None)
            create_database(conn, db_names["tenant"],
                          owner=user_names["project"] if args.mode == "app_owner" else None)
            create_database(conn, db_names["hasura"],
                          owner=user_names["hasura"] if args.mode == "app_owner" else None)
            create_database(conn, db_names["kratos"],
                          owner=user_names["kratos"] if args.mode == "app_owner" else None)
            create_database(conn, db_names["hydra"],
                          owner=user_names["hydra"] if args.mode == "app_owner" else None)
            create_database(conn, db_names["tolgee"],
                          owner=user_names["tolgee"] if args.mode == "app_owner" else None)
            
            # Выдаем права если режим postgres_owner
            if args.mode == "postgres_owner":
                grant_privileges(conn, db_names["project"], user_names["project"], args.admin_user)
                grant_privileges(conn, db_names["tenant"], user_names["project"], args.admin_user)
                grant_privileges(conn, db_names["hasura"], user_names["hasura"], args.admin_user)
                grant_privileges(conn, db_names["kratos"], user_names["kratos"], args.admin_user)
                grant_privileges(conn, db_names["hydra"], user_names["hydra"], args.admin_user)
                grant_privileges(conn, db_names["tolgee"], user_names["tolgee"], args.admin_user)
            
            # Создаем расширения
            extensions_map = {
                "project": ["pgcrypto", "uuid-ossp"],
                "tenant": ["pgcrypto", "uuid-ossp"],
                "hasura": ["pgcrypto", "uuid-ossp"],
                "kratos": ["pgcrypto", "uuid-ossp", "pg_trgm", "btree_gin"],
                "hydra": ["pgcrypto", "uuid-ossp"],
            }
            
            for db_key, extensions in extensions_map.items():
                db_name = db_names[db_key]
                for ext in extensions:
                    create_extension(conn, db_name, ext, args.admin_user)
            
            print("Database initialization completed successfully!")
            
        finally:
            conn.close()
    finally:
        # Останавливаем port-forward
        if port_forward_process:
            print("Stopping port-forward...")
            port_forward_process.terminate()
            port_forward_process.wait()


if __name__ == "__main__":
    main()
