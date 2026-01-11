#!/usr/bin/env python3
"""
Скрипт для создания секретов Ory компонентов в Vault через API.

Использование:
    python3 create_secrets.py <vault-url> <vault-root-token>
    
Пример:
    python3 create_secrets.py https://vault.archpad.pro <root-token>
"""

import json
import sys
import requests
from typing import Dict, Any

def create_secret(vault_url: str, vault_token: str, path: str, data: Dict[str, Any]) -> bool:
    """
    Создает секрет в Vault KV v2 через API.
    
    Args:
        vault_url: URL Vault сервера (например: https://vault.archpad.pro)
        vault_token: Root token для Vault
        path: Путь к секрету в KV v2 (например: kv/data/archpad/demo/ory/kratos)
        data: Данные секрета (словарь с ключами-значениями)
    
    Returns:
        True если успешно, False если ошибка
    """
    url = f"{vault_url}/v1/{path}"
    headers = {
        "X-Vault-Token": vault_token,
        "Content-Type": "application/json"
    }
    payload = {
        "data": data
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=10)
        response.raise_for_status()
        print(f"  ✓ Successfully created secret at {path}")
        return True
    except requests.exceptions.RequestException as e:
        print(f"  ✗ Failed to create secret at {path}: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"    Response: {e.response.text}")
        return False


def main():
    if len(sys.argv) < 3:
        print("Error: Vault URL and root token are required")
        print(f"Usage: {sys.argv[0]} <vault-url> <vault-root-token>")
        sys.exit(1)
    
    vault_url = sys.argv[1].rstrip('/')
    vault_token = sys.argv[2]
    
    print(f"Creating Ory secrets in Vault at {vault_url}\n")
    
    # === 1. Kratos секреты ===
    print("=== Kratos секреты ===")
    print("Path: kv/data/archpad/demo/ory/kratos")
    print("\nВведите значения для Kratos (нажмите Enter для значений по умолчанию):")
    
    kratos_dsn = input("DSN (postgres://user:pass@host:5432/dbname?sslmode=disable&max_conns=20&max_idle_conns=4): ").strip()
    if not kratos_dsn:
        print("  Error: DSN is required")
        sys.exit(1)
    
    kratos_secret = input("KRATOS_SECRET (32+ символа, для подписи cookies) [ReMUeeq8tyEmmAHFBUiKtzkEmX9aMZr7]: ").strip()
    if not kratos_secret:
        kratos_secret = "ReMUeeq8tyEmmAHFBUiKtzkEmX9aMZr7"
    
    smtp_uri = input("SMTP_CONNECTION_URI [smtp://mailpit-service:1025/?disable_starttls=true]: ").strip()
    if not smtp_uri:
        smtp_uri = "smtp://mailpit-service:1025/?disable_starttls=true"
    
    smtp_from = input("SMTP_FROM_ADDRESS [no-reply@archpad.pro]: ").strip()
    if not smtp_from:
        smtp_from = "no-reply@archpad.pro"
    
    kratos_data = {
        "DSN": kratos_dsn,
        "KRATOS_SECRET": kratos_secret,
        "SMTP_CONNECTION_URI": smtp_uri,
        "SMTP_FROM_ADDRESS": smtp_from
    }
    
    if not create_secret(vault_url, vault_token, "kv/data/archpad/demo/ory/kratos", kratos_data):
        sys.exit(1)
    
    # === 2. Hydra секреты ===
    print("\n=== Hydra секреты ===")
    print("Path: kv/data/archpad/demo/ory/hydra")
    print("\nВведите значения для Hydra (нажмите Enter для значений по умолчанию):")
    
    hydra_dsn = input("DSN (postgres://user:pass@host:5432/dbname?sslmode=disable&max_conns=20&max_idle_conns=4): ").strip()
    if not hydra_dsn:
        print("  Error: DSN is required")
        sys.exit(1)
    
    hydra_secrets_system = input("SECRETS_SYSTEM (32+ символа, для шифрования) [nApRkoCIUm7lLYvGCvAmT8jgnqk0LhDAXlBaWVIngEL]: ").strip()
    if not hydra_secrets_system:
        hydra_secrets_system = "nApRkoCIUm7lLYvGCvAmT8jgnqk0LhDAXlBaWVIngEL"
    
    hydra_data = {
        "DSN": hydra_dsn,
        "SECRETS_SYSTEM": hydra_secrets_system
    }
    
    if not create_secret(vault_url, vault_token, "kv/data/archpad/demo/ory/hydra", hydra_data):
        sys.exit(1)
    
    # === 3. Oathkeeper секреты ===
    print("\n=== Oathkeeper секреты ===")
    print("Path: kv/data/archpad/demo/ory/oauthkeeper")
    print("\nВведите значения для Oathkeeper (нажмите Enter для значений по умолчанию):")
    
    ory_client_id = input("ORY_CLIENT_ID [archpad-oathkeeper]: ").strip()
    if not ory_client_id:
        ory_client_id = "archpad-oathkeeper"
    
    ory_client_secret = input("ORY_CLIENT_SECRET (для OAuth2 клиента) [4oG5JkhLBhSL1L41VimM36bc70YNOerv]: ").strip()
    if not ory_client_secret:
        ory_client_secret = "4oG5JkhLBhSL1L41VimM36bc70YNOerv"
    
    oathkeeper_data = {
        "ORY_CLIENT_ID": ory_client_id,
        "ORY_CLIENT_SECRET": ory_client_secret
    }
    
    if not create_secret(vault_url, vault_token, "kv/data/archpad/demo/ory/oauthkeeper", oathkeeper_data):
        sys.exit(1)
    
    print("\n✓ Все секреты успешно созданы в Vault!")
    print("\nПроверка секретов:")
    print(f"  curl -H 'X-Vault-Token: {vault_token}' {vault_url}/v1/kv/data/archpad/demo/ory/kratos | jq")
    print(f"  curl -H 'X-Vault-Token: {vault_token}' {vault_url}/v1/kv/data/archpad/demo/ory/hydra | jq")
    print(f"  curl -H 'X-Vault-Token: {vault_token}' {vault_url}/v1/kv/data/archpad/demo/ory/oauthkeeper | jq")


if __name__ == "__main__":
    main()
