#!/bin/bash
set -eu

# Скрипт для создания секретов Ory компонентов в Vault через API
# Использует root token для создания секретов

VAULT_URL="${VAULT_URL:-https://vault.archpad.pro}"
VAULT_TOKEN="hvs.YX2ShaE5QOS4og5QCKtetvub"

echo "Creating Ory secrets in Vault at $VAULT_URL"
echo ""

# Функция для создания секрета в Vault KV v2
create_secret() {
  local path="$1"
  local json_data="$2"
  
  local api_url="${VAULT_URL}/v1/${path}"
  local payload=$(printf '{"data": %s}' "$json_data")
  
  echo "Creating secret at $path..."
  
  http_code=$(curl -s -o /tmp/vault-response.txt -w "%{http_code}" \
    -X POST \
    -H "X-Vault-Token: ${VAULT_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "$payload" \
    --insecure \
    "$api_url" 2>&1)
  
  if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 300 ]; then
    echo "  ✓ Successfully created secret at $path"
    rm -f /tmp/vault-response.txt
    return 0
  else
    echo "  ✗ Failed to create secret at $path (HTTP $http_code)"
    if [ -f /tmp/vault-response.txt ]; then
      cat /tmp/vault-response.txt
      rm -f /tmp/vault-response.txt
    fi
    return 1
  fi
}

# === 1. Kratos секреты ===
echo "=== Creating Kratos secrets ==="
echo "Path: kv/data/archpad/demo/ory/kratos"
echo "NOTE: DSN uses placeholder values - please update with real PostgreSQL connection details"
echo ""

kratos_secrets=$(cat <<EOF
{
  "DSN": "postgres://kratos_user:CHANGE_ME@postgres-service:5432/kratos?sslmode=disable&max_conns=20&max_idle_conns=4",
  "KRATOS_SECRET": "ReMUeeq8tyEmmAHFBUiKtzkEmX9aMZr7",
  "SMTP_CONNECTION_URI": "smtp://mailpit-service:1025/?disable_starttls=true",
  "SMTP_FROM_ADDRESS": "no-reply@archpad.pro"
}
EOF
)

if ! create_secret "kv/data/archpad/demo/ory/kratos" "$kratos_secrets"; then
  echo "Failed to create Kratos secrets"
  exit 1
fi

# === 2. Hydra секреты ===
echo ""
echo "=== Creating Hydra secrets ==="
echo "Path: kv/data/archpad/demo/ory/hydra"
echo "NOTE: DSN uses placeholder values - please update with real PostgreSQL connection details"
echo ""

hydra_secrets=$(cat <<EOF
{
  "DSN": "postgres://hydra_user:CHANGE_ME@postgres-service:5432/hydra?sslmode=disable&max_conns=20&max_idle_conns=4",
  "SECRETS_SYSTEM": "nApRkoCIUm7lLYvGCvAmT8jgnqk0LhDAXlBaWVIngEL"
}
EOF
)

if ! create_secret "kv/data/archpad/demo/ory/hydra" "$hydra_secrets"; then
  echo "Failed to create Hydra secrets"
  exit 1
fi

# === 3. Oathkeeper секреты ===
echo ""
echo "=== Creating Oathkeeper secrets ==="
echo "Path: kv/data/archpad/demo/ory/oauthkeeper"
echo ""

oathkeeper_secrets=$(cat <<EOF
{
  "ORY_CLIENT_ID": "archpad-oathkeeper",
  "ORY_CLIENT_SECRET": "4oG5JkhLBhSL1L41VimM36bc70YNOerv"
}
EOF
)

if ! create_secret "kv/data/archpad/demo/ory/oauthkeeper" "$oathkeeper_secrets"; then
  echo "Failed to create Oathkeeper secrets"
  exit 1
fi

echo ""
echo "✓ All secrets successfully created in Vault!"
echo ""
echo "IMPORTANT: Please update DSN values with real PostgreSQL connection details:"
echo "  1. Update Kratos DSN in: kv/data/archpad/demo/ory/kratos"
echo "  2. Update Hydra DSN in: kv/data/archpad/demo/ory/hydra"
echo ""
echo "To update, use Vault UI or curl commands (see SECRETS.md)"
