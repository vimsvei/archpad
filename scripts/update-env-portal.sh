#!/bin/bash

set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$PROJECT_ROOT/packages/portal/.env.local"
FORCE="${FORCE:-false}"

mkdir -p "$(dirname "$ENV_FILE")"

if [ -L "$ENV_FILE" ]; then
  tmp="${ENV_FILE}.tmp.$$"
  cp -L "$ENV_FILE" "$tmp"
  rm -f "$ENV_FILE"
  mv "$tmp" "$ENV_FILE"
fi

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

set_kv "NEXT_PUBLIC_URL" "http://localhost:3000"
set_kv "AUTH_SERVICE_PUBLIC_URL" "http://localhost:3001"

set_kv "NEXT_PUBLIC_HASURA_GRAPHQL_URL" "https://apim.archpad.pro/v1/graphql"
ensure_empty "HASURA_INTERNAL_URL"
ensure_empty "HASURA_GRAPHQL_ADMIN_SECRET"

set_kv "NEXT_PUBLIC_API_GRAPHQL_URI" "https://api.archpad.pro/graphql"
set_kv "NEXT_PUBLIC_API_REST_URI" "https://api.archpad.pro"
ensure_empty "API_GATEWAY_INTERNAL_URL"

set_kv "NEXT_PUBLIC_TOLGEE_API_URL" "https://i18n.archpad.pro"
ensure_empty "NEXT_PUBLIC_TOLGEE_API_KEY"

ensure_empty "BUILD_COMMIT_SHA"
ensure_empty "BUILD_VERSION"
ensure_empty "BUILD_BRANCH"

echo "✓ Updated $ENV_FILE (backup: $backup)"

