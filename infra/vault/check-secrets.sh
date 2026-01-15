#!/bin/bash
set -eo pipefail

# Скрипт для проверки всех секретов в Vault
# Использование: ./check-secrets.sh [VAULT_ADDR] [VAULT_TOKEN]

VAULT_ADDR="${1:-${VAULT_ADDR:-https://vault.archpad.pro}}"
VAULT_TOKEN="${2:-${VAULT_TOKEN:-}}"

if [ -z "$VAULT_TOKEN" ]; then
  echo "ERROR: VAULT_TOKEN is required"
  echo "Usage: $0 [VAULT_ADDR] [VAULT_TOKEN]"
  echo "Or set environment variables: VAULT_ADDR and VAULT_TOKEN"
  exit 1
fi

# Убеждаемся, что VAULT_ADDR начинается с http:// или https://
if [[ ! "$VAULT_ADDR" =~ ^https?:// ]]; then
  VAULT_ADDR="https://${VAULT_ADDR}"
fi

echo "=========================================="
echo "Checking Vault Secrets"
echo "=========================================="
echo "Vault Address: $VAULT_ADDR"
echo ""

# Проверяем доступность Vault
echo "Checking Vault connectivity..."
HEALTH_RESPONSE=$(curl -k -sS -w "\nHTTP_CODE:%{http_code}" -H "X-Vault-Token: ${VAULT_TOKEN}" "${VAULT_ADDR}/v1/sys/health" 2>&1)
HTTP_CODE=$(echo "$HEALTH_RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2 || echo "000")
HEALTH_BODY=$(echo "$HEALTH_RESPONSE" | sed '/HTTP_CODE:/d')

if [ "$HTTP_CODE" != "200" ] && [ "$HTTP_CODE" != "503" ]; then
  echo "ERROR: Cannot connect to Vault at $VAULT_ADDR"
  echo "HTTP Code: $HTTP_CODE"
  echo "Response: $HEALTH_BODY"
  exit 1
fi

# Проверяем, что Vault не запечатан
if echo "$HEALTH_BODY" | grep -q '"sealed":true' 2>/dev/null; then
  echo "ERROR: Vault is sealed"
  echo "Please unseal Vault before checking secrets"
  exit 1
fi

echo "✓ Vault is accessible and unsealed"
echo ""

# Список всех секретов для проверки
declare -a SECRET_PATHS=(
  "kv/data/archpad/demo/backend/arch-repo-service"
  "kv/data/archpad/demo/backend/tenant-service"
  "kv/data/archpad/demo/backend/hasura-sync-service"
  "kv/data/archpad/demo/backend/common"
  "kv/data/archpad/demo/frontend/portal"
  "kv/data/archpad/demo/tolgee/api-key"
  "kv/data/archpad/demo/postgres/connect"
  "kv/data/archpad/demo/postgres/credential"
  "kv/data/archpad/demo/hasura/db"
  "kv/data/archpad/demo/hasura/secret"
  "kv/data/archpad/demo/hasura/endpoint"
  "kv/data/archpad/demo/tolgee/db"
  "kv/data/archpad/demo/tolgee/admin"
  "kv/data/archpad/demo/ory/kratos/db"
  "kv/data/archpad/demo/ory/kratos/secret"
  "kv/data/archpad/demo/ory/kratos/other"
  "kv/data/archpad/demo/ory/kratos/endpoint"
  "kv/data/archpad/demo/ory/hydra/db"
  "kv/data/archpad/demo/ory/hydra/secret"
  "kv/data/archpad/demo/grafana/admin"
  "kv/data/archpad/demo/grafana/db"
  "kv/data/archpad/demo/pgadmin"
  "kv/data/archpad/container-register"
)

# Функция для получения ожидаемых ключей для секрета
get_expected_keys() {
  local path="$1"
  case "$path" in
    "kv/data/archpad/demo/backend/arch-repo-service")
      echo "PROJECT_DB"
      ;;
    "kv/data/archpad/demo/backend/tenant-service")
      echo "TENANT_DB"
      ;;
    "kv/data/archpad/demo/backend/hasura-sync-service")
      echo "HASURA_SOURCE HASURA_SCHEMA"
      ;;
    "kv/data/archpad/demo/backend/common")
      echo "PROJECT_DB_USER PROJECT_DB_PASSWORD"
      ;;
    "kv/data/archpad/demo/frontend/portal")
      echo "NEXT_PUBLIC_ORY_SDK_URL NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT NEXT_PUBLIC_TOLGEE_API_URL NEXT_PUBLIC_URL"
      ;;
    "kv/data/archpad/demo/tolgee/api-key")
      echo "NEXT_PUBLIC_TOLGEE_API_KEY"
      ;;
    "kv/data/archpad/demo/postgres/connect")
      echo "POSTGRES_HOST POSTGRES_PORT"
      ;;
    "kv/data/archpad/demo/postgres/credential")
      echo "POSTGRES_USER POSTGRES_PASSWORD"
      ;;
    "kv/data/archpad/demo/hasura/db")
      echo "HASURA_DB HASURA_DB_USER HASURA_DB_PASSWORD"
      ;;
    "kv/data/archpad/demo/hasura/secret")
      echo "HASURA_GRAPHQL_ADMIN_SECRET"
      ;;
    "kv/data/archpad/demo/hasura/endpoint")
      echo "HASURA_INTERNAL_URL"
      ;;
    "kv/data/archpad/demo/tolgee/db")
      echo "TOLGEE_DB TOLGEE_DB_USER TOLGEE_DB_PASSWORD"
      ;;
    "kv/data/archpad/demo/tolgee/admin")
      echo "TOLGEE_ADMIN_USER TOLGEE_ADMIN_PASSWORD"
      ;;
    "kv/data/archpad/demo/ory/kratos/db")
      echo "KRATOS_DB KRATOS_DB_USER KRATOS_DB_PASSWORD"
      ;;
    "kv/data/archpad/demo/ory/kratos/secret")
      echo "KRATOS_SECRET"
      ;;
    "kv/data/archpad/demo/ory/kratos/other")
      echo "SMTP_CONNECTION_URI SMTP_FROM_ADDRESS"
      ;;
    "kv/data/archpad/demo/ory/kratos/endpoint")
      echo "ORY_KRATOS_INTERNAL_URL"
      ;;
    "kv/data/archpad/demo/ory/hydra/db")
      echo "HYDRA_DB HYDRA_DB_USER HYDRA_DB_PASSWORD"
      ;;
    "kv/data/archpad/demo/ory/hydra/secret")
      echo "SECRETS_SYSTEM"
      ;;
    "kv/data/archpad/demo/grafana/admin")
      echo "GRAFANA_ADMIN_USER GRAFANA_ADMIN_PASSWORD"
      ;;
    "kv/data/archpad/demo/grafana/db")
      echo "GRAFANA_DB GRAFANA_DB_USER GRAFANA_DB_PASSWORD"
      ;;
    "kv/data/archpad/demo/pgadmin")
      echo "PGADMIN_ADMIN_USER PGADMIN_DEFAULT_PASSWORD"
      ;;
    "kv/data/archpad/container-register")
      echo "REGISTRY_URL REGISTRY_USERNAME REGISTRY_PASSWORD"
      ;;
    *)
      echo ""
      ;;
  esac
}

# Счетчики
FOUND_COUNT=0
MISSING_COUNT=0
INCOMPLETE_COUNT=0

echo "Checking secrets..."
echo ""

for SECRET_PATH in "${SECRET_PATHS[@]}"; do
  echo "Checking: $SECRET_PATH"
  
  # Получаем секрет
  RESPONSE=$(curl -k -sS -w "\nHTTP_CODE:%{http_code}" -H "X-Vault-Token: ${VAULT_TOKEN}" \
    "${VAULT_ADDR}/v1/${SECRET_PATH}" 2>&1)
  HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2 2>/dev/null || echo "000")
  RESPONSE_BODY=$(echo "$RESPONSE" | sed '/HTTP_CODE:/d')
  
  # Проверяем HTTP код
  if [ "$HTTP_CODE" != "200" ]; then
    if [ "$HTTP_CODE" = "404" ]; then
      echo "  ❌ NOT FOUND (404)"
    else
      echo "  ❌ ERROR (HTTP $HTTP_CODE)"
      if echo "$RESPONSE_BODY" | grep -q '"errors"' 2>/dev/null; then
        ERROR_MSG=$(echo "$RESPONSE_BODY" | grep -o '"errors":\["[^"]*' 2>/dev/null | cut -d'"' -f4 2>/dev/null || echo "Unknown error")
        echo "    Error: $ERROR_MSG"
      fi
    fi
    MISSING_COUNT=$((MISSING_COUNT + 1))
    echo ""
    continue
  fi
  
  # Проверяем наличие ошибок в теле ответа
  if echo "$RESPONSE_BODY" | grep -q '"errors"' 2>/dev/null; then
    ERROR_MSG=$(echo "$RESPONSE_BODY" | grep -o '"errors":\["[^"]*' 2>/dev/null | cut -d'"' -f4 2>/dev/null || echo "Unknown error")
    echo "  ❌ ERROR: $ERROR_MSG"
    MISSING_COUNT=$((MISSING_COUNT + 1))
    echo ""
    continue
  fi
  
  # Извлекаем данные
  if command -v jq >/dev/null 2>&1; then
    DATA=$(echo "$RESPONSE_BODY" | jq -r '.data.data // {}' 2>/dev/null || echo "{}")
    if [ "$DATA" = "{}" ] || [ -z "$DATA" ]; then
      echo "  ❌ EMPTY (no data)"
      MISSING_COUNT=$((MISSING_COUNT + 1))
      echo ""
      continue
    fi
    
    # Получаем список ключей
    KEYS=$(echo "$DATA" | jq -r 'keys[]' 2>/dev/null | sort)
    
    # Проверяем ожидаемые ключи
    EXPECTED=$(get_expected_keys "$SECRET_PATH")
    if [ -n "$EXPECTED" ]; then
      MISSING_KEYS=""
      for KEY in $EXPECTED; do
        if ! echo "$KEYS" | grep -q "^${KEY}$" 2>/dev/null; then
          MISSING_KEYS="${MISSING_KEYS} ${KEY}"
        fi
      done
      
      if [ -n "$MISSING_KEYS" ]; then
        echo "  ⚠️  INCOMPLETE (missing keys:${MISSING_KEYS})"
        INCOMPLETE_COUNT=$((INCOMPLETE_COUNT + 1))
        echo "  Found keys: $(echo "$KEYS" | tr '\n' ' ')"
      else
        echo "  ✅ FOUND (all expected keys present)"
        FOUND_COUNT=$((FOUND_COUNT + 1))
      fi
    else
      echo "  ✅ FOUND (no expected keys defined)"
      FOUND_COUNT=$((FOUND_COUNT + 1))
    fi
    
    # Показываем ключи (без значений)
    if [ -n "$KEYS" ]; then
      echo "  Keys: $(echo "$KEYS" | tr '\n' ' ')"
    fi
  else
    # Если jq недоступен, просто проверяем наличие данных
    if echo "$RESPONSE" | grep -q '"data"' 2>/dev/null; then
      echo "  ✅ FOUND (jq not available, cannot check keys)"
      FOUND_COUNT=$((FOUND_COUNT + 1))
    else
      echo "  ❌ NOT FOUND"
      MISSING_COUNT=$((MISSING_COUNT + 1))
    fi
  fi
  
  echo ""
done

echo "=========================================="
echo "Summary"
echo "=========================================="
echo "Total secrets checked: ${#SECRET_PATHS[@]}"
echo "✅ Found and complete: $FOUND_COUNT"
echo "⚠️  Found but incomplete: $INCOMPLETE_COUNT"
echo "❌ Missing: $MISSING_COUNT"
echo ""

if [ $MISSING_COUNT -gt 0 ] || [ $INCOMPLETE_COUNT -gt 0 ]; then
  echo "=========================================="
  echo "Missing or Incomplete Secrets"
  echo "=========================================="
  echo ""
  echo "Please restore missing secrets using:"
  echo "  vault kv put <path> <key>=<value> ..."
  echo ""
  echo "Or see docs/VAULT_SECRETS_INVENTORY.md for details"
  echo ""
  exit 1
else
  echo "✅ All secrets are present and complete!"
  exit 0
fi
