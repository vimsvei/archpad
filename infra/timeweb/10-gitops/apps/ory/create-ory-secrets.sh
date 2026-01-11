#!/bin/bash
set -eu

# Скрипт для создания секретов Ory компонентов в Vault через API
# Использование: ./create-ory-secrets.sh <vault-url> <vault-root-token>
#
# Пример:
#   ./create-ory-secrets.sh https://vault.archpad.pro <root-token>

VAULT_ADDR="${1:-https://vault.archpad.pro}"
VAULT_TOKEN="${2:-}"

if [ -z "$VAULT_TOKEN" ]; then
  echo "Error: Vault root token is required"
  echo "Usage: $0 <vault-url> <vault-root-token>"
  exit 1
fi

echo "Creating Ory secrets in Vault at $VAULT_ADDR"

# Функция для создания секрета в Vault KV v2
create_secret() {
  local path="$1"
  local json_data="$2"
  
  local api_url="${VAULT_ADDR}/v1/${path}"
  local payload=$(echo "$json_data" | jq -c '{data: .}')
  
  echo "Creating secret at $path..."
  
  http_code=$(curl -s -o /tmp/vault-response.txt -w "%{http_code}" \
    -X POST \
    -H "X-Vault-Token: ${VAULT_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "$payload" \
    "$api_url")
  
  if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 300 ]; then
    echo "  ✓ Successfully created secret at $path"
  else
    echo "  ✗ Failed to create secret at $path (HTTP $http_code)"
    cat /tmp/vault-response.txt
    rm -f /tmp/vault-response.txt
    return 1
  fi
  rm -f /tmp/vault-response.txt
}

# === 1. Kratos секреты ===
# Путь: /kv/data/archpad/demo/ory/kratos
#
# Необходимые переменные:
# - DSN: строка подключения к PostgreSQL (например: postgres://kratos_user:password@postgres-service:5432/kratos?sslmode=disable&max_conns=20&max_idle_conns=4)
# - KRATOS_SECRET: секретный ключ для подписи cookies и токенов (32+ символа, должен быть стабильным)
# - SMTP_CONNECTION_URI: URI подключения к SMTP серверу (например: smtp://smtp.example.com:587)
# - SMTP_FROM_ADDRESS: адрес отправителя для email (например: no-reply@archpad.pro)

echo ""
echo "=== Kratos секреты ==="
read -p "DSN для Kratos (postgres://user:pass@host:5432/dbname?sslmode=disable&max_conns=20&max_idle_conns=4): " KRATOS_DSN
read -p "KRATOS_SECRET (32+ символа, для подписи cookies): " KRATOS_SECRET
read -p "SMTP_CONNECTION_URI (например: smtp://smtp.example.com:587): " SMTP_CONNECTION_URI
read -p "SMTP_FROM_ADDRESS (например: no-reply@archpad.pro): " SMTP_FROM_ADDRESS

kratos_secrets=$(jq -n \
  --arg dsn "$KRATOS_DSN" \
  --arg secret "$KRATOS_SECRET" \
  --arg smtp_uri "$SMTP_CONNECTION_URI" \
  --arg smtp_from "$SMTP_FROM_ADDRESS" \
  '{
    DSN: $dsn,
    KRATOS_SECRET: $secret,
    SMTP_CONNECTION_URI: $smtp_uri,
    SMTP_FROM_ADDRESS: $smtp_from
  }')

create_secret "kv/data/archpad/demo/ory/kratos" "$kratos_secrets" || exit 1

# === 2. Hydra секреты ===
# Путь: /kv/data/archpad/demo/ory/hydra
#
# Необходимые переменные:
# - DSN: строка подключения к PostgreSQL (например: postgres://hydra_user:password@postgres-service:5432/hydra?sslmode=disable&max_conns=20&max_idle_conns=4)
# - SECRETS_SYSTEM: системный секрет для шифрования (32+ символа, должен быть стабильным при использовании персистентной БД)

echo ""
echo "=== Hydra секреты ==="
read -p "DSN для Hydra (postgres://user:pass@host:5432/dbname?sslmode=disable&max_conns=20&max_idle_conns=4): " HYDRA_DSN
read -p "SECRETS_SYSTEM (32+ символа, для шифрования): " HYDRA_SECRETS_SYSTEM

hydra_secrets=$(jq -n \
  --arg dsn "$HYDRA_DSN" \
  --arg secrets_system "$HYDRA_SECRETS_SYSTEM" \
  '{
    DSN: $dsn,
    SECRETS_SYSTEM: $secrets_system
  }')

create_secret "kv/data/archpad/demo/ory/hydra" "$hydra_secrets" || exit 1

# === 3. Oathkeeper секреты ===
# Путь: /kv/data/archpad/demo/ory/oauthkeeper
#
# Необходимые переменные:
# - ORY_CLIENT_ID: ID OAuth2 клиента для Oathkeeper (используется для introspection)
# - ORY_CLIENT_SECRET: секрет OAuth2 клиента для Oathkeeper
#
# ВАЖНО: Эти же credentials будут использованы при создании OAuth2 клиента в Hydra через Job hydra-init-client

echo ""
echo "=== Oathkeeper секреты ==="
read -p "ORY_CLIENT_ID (например: archpad-oathkeeper): " ORY_CLIENT_ID
read -p "ORY_CLIENT_SECRET (для OAuth2 клиента): " ORY_CLIENT_SECRET

oathkeeper_secrets=$(jq -n \
  --arg client_id "$ORY_CLIENT_ID" \
  --arg client_secret "$ORY_CLIENT_SECRET" \
  '{
    ORY_CLIENT_ID: $client_id,
    ORY_CLIENT_SECRET: $client_secret
  }')

create_secret "kv/data/archpad/demo/ory/oauthkeeper" "$oathkeeper_secrets" || exit 1

echo ""
echo "✓ Все секреты успешно созданы в Vault!"
echo ""
echo "Проверка секретов:"
echo "  vault kv get kv/data/archpad/demo/ory/kratos"
echo "  vault kv get kv/data/archpad/demo/ory/hydra"
echo "  vault kv get kv/data/archpad/demo/ory/oauthkeeper"
