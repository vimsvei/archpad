#!/bin/bash

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$PROJECT_ROOT/packages/backend/.env.local"
FORCE="${FORCE:-false}"

mkdir -p "$(dirname "$ENV_FILE")"

if [ ! -f "$ENV_FILE" ]; then
  touch "$ENV_FILE"
fi

backup="$ENV_FILE.bak.$(date +%Y%m%d-%H%M%S)"
cp "$ENV_FILE" "$backup"

set_kv() {
  local key="$1"
  local value="$2"
  if grep -qE "^[[:space:]]*${key}=" "$ENV_FILE"; then
    if [ "$FORCE" != "true" ]; then
      return 0
    fi
    sed -i '' -E "0,/^[[:space:]]*${key}=.*/s//${key}=${value}/" "$ENV_FILE"
  else
    printf '%s=%s\n' "$key" "$value" >> "$ENV_FILE"
  fi
}

ensure_empty() {
  local key="$1"
  if ! grep -qE "^[[:space:]]*${key}=" "$ENV_FILE"; then
    printf '%s=\n' "$key" >> "$ENV_FILE"
  fi
}

ensure_empty "NODE_ENV"
ensure_empty "PORT"

set_kv "VAULT_ADDR" "https://vault.archpad.pro"
ensure_empty "VAULT_TOKEN"
ensure_empty "VAULT_DEV_ROOT_TOKEN_ID"

set_kv "POSTGRES_HOST" "localhost"
set_kv "POSTGRES_ENDPOINT" "localhost"
set_kv "POSTGRES_PORT" "5432"
set_kv "PG_HOST" "localhost"
set_kv "PG_PORT" "5432"
ensure_empty "PROJECT_DB"
ensure_empty "TENANT_DB"
ensure_empty "PROJECT_DB_USER"
ensure_empty "PROJECT_DB_PASSWORD"

# hasura-sync-service (optional)
ensure_empty "HASURA_HOST"
ensure_empty "HASURA_ENDPOINT"
ensure_empty "HASURA_GRAPHQL_ADMIN_SECRET"
set_kv "HASURA_SOURCE" "default"
ensure_empty "HASURA_SCHEMA"
set_kv "HASURA_DEFAULT_ROLE" "user"
set_kv "HASURA_RENAME_COLUMNS_CAMELCASE" "true"
set_kv "HASURA_APPLY_DEFAULT_PERMISSIONS" "true"

ensure_empty "MEMORY_HEAP_MAX"
ensure_empty "MEMORY_RSS_MAX"
ensure_empty "DISK_PATH"
ensure_empty "DISK_THRESHOLD_PERCENT"
ensure_empty "DISK_THRESHOLD_BYTES"
ensure_empty "LOGGER_COLOR"

echo "✓ Updated $ENV_FILE (backup: $backup)"

