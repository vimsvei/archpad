#!/usr/bin/env python3
"""
Скрипт для создания секретов Ory компонентов в Vault через API.
Использует root token для создания секретов.
"""

import json
import sys
import requests
from typing import Dict, Any

VAULT_URL = "https://vault.archpad.pro"
VAULT_TOKEN = "hvs.YX2ShaE5QOS4og5QCKtetvub"

def create_secret(path: str, data: Dict[str, Any]) -> bool:
    """
    Создает секрет в Vault KV v2 через API.
    
    Args:
        path: Путь к секрету в KV v2 (например: kv/data/archpad/demo/ory/kratos)
        data: Данные секрета (словарь с ключами-значениями)
    
    Returns:
        True если успешно, False если ошибка
    """
    url = f"{VAULT_URL}/v1/{path}"
    headers = {
        "X-Vault-Token": VAULT_TOKEN,
        "Content-Type": "application/json"
    }
    payload = {
        "data": data
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=10, verify=True)
        response.raise_for_status()
        print(f"  ✓ Successfully created secret at {path}")
        return True
    except requests.exceptions.SSLError as e:
        print(f"  ✗ SSL Error: {e}")
        print("  Trying with verify=False...")
        try:
            response = requests.post(url, headers=headers, json=payload, timeout=10, verify=False)
            response.raise_for_status()
            print(f"  ✓ Successfully created secret at {path} (SSL verification disabled)")
            return True
        except requests.exceptions.RequestException as e2:
            print(f"  ✗ Failed to create secret at {path}: {e2}")
            if hasattr(e2, 'response') and e2.response is not None:
                print(f"    Response: {e2.response.text}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"  ✗ Failed to create secret at {path}: {e}")
        if hasattr(e, 'response') and e.response is not None:
            print(f"    Response: {e.response.text}")
        return False


def main():
    print(f"Creating Ory secrets in Vault at {VAULT_URL}\n")
    
    # === 1. Kratos секреты ===
    # ВАЖНО: Эти значения нужно будет обновить реальными данными PostgreSQL
    print("=== Creating Kratos secrets ===")
    print("Path: kv/data/archpad/demo/ory/kratos")
    print("NOTE: DSN uses placeholder values - please update with real PostgreSQL connection details")
    
    # TODO: Замените эти значения на реальные данные PostgreSQL
    kratos_data = {
        "DSN": "postgres://kratos_user:CHANGE_ME@postgres-service:5432/kratos?sslmode=disable&max_conns=20&max_idle_conns=4",
        "KRATOS_SECRET": "ReMUeeq8tyEmmAHFBUiKtzkEmX9aMZr7",  # Стабильный секрет из примера
        "SMTP_CONNECTION_URI": "smtp://mailpit-service:1025/?disable_starttls=true",  # Placeholder для SMTP
        "SMTP_FROM_ADDRESS": "no-reply@archpad.pro"
    }
    
    if not create_secret("kv/data/archpad/demo/ory/kratos", kratos_data):
        sys.exit(1)
    
    # === 2. Hydra секреты ===
    print("\n=== Creating Hydra secrets ===")
    print("Path: kv/data/archpad/demo/ory/hydra")
    print("NOTE: DSN uses placeholder values - please update with real PostgreSQL connection details")
    
    # TODO: Замените эти значения на реальные данные PostgreSQL
    hydra_data = {
        "DSN": "postgres://hydra_user:CHANGE_ME@postgres-service:5432/hydra?sslmode=disable&max_conns=20&max_idle_conns=4",
        "SECRETS_SYSTEM": "nApRkoCIUm7lLYvGCvAmT8jgnqk0LhDAXlBaWVIngEL"  # Стабильный секрет из примера
    }
    
    if not create_secret("kv/data/archpad/demo/ory/hydra", hydra_data):
        sys.exit(1)
    
    # === 3. Oathkeeper секреты ===
    print("\n=== Creating Oathkeeper secrets ===")
    print("Path: kv/data/archpad/demo/ory/oauthkeeper")
    
    oathkeeper_data = {
        "ORY_CLIENT_ID": "archpad-oathkeeper",
        "ORY_CLIENT_SECRET": "4oG5JkhLBhSL1L41VimM36bc70YNOerv"  # Значение из примера
    }
    
    if not create_secret("kv/data/archpad/demo/ory/oauthkeeper", oathkeeper_data):
        sys.exit(1)
    
    print("\n✓ All secrets successfully created in Vault!")
    print("\nIMPORTANT: Please update DSN values with real PostgreSQL connection details:")
    print("  1. Update Kratos DSN in: kv/data/archpad/demo/ory/kratos")
    print("  2. Update Hydra DSN in: kv/data/archpad/demo/ory/hydra")
    print("\nTo update, use Vault UI or:")
    print(f"  curl -X POST -H 'X-Vault-Token: {VAULT_TOKEN}' -H 'Content-Type: application/json' \\")
    print(f"    -d '{{\"data\": {{\"DSN\": \"postgres://user:pass@host:5432/dbname?sslmode=disable&max_conns=20&max_idle_conns=4\"}}}}' \\")
    print(f"    {VAULT_URL}/v1/kv/data/archpad/demo/ory/kratos")


if __name__ == "__main__":
    main()
