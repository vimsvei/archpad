#!/bin/sh
set -euo pipefail

# Ensure tools are present (container: alpine)
if ! command -v curl >/dev/null 2>&1 || ! command -v jq >/dev/null 2>&1; then
  apk add --no-cache curl jq >/dev/null
fi

: "${KEYCLOAK_URL:=http://keycloak:8080}"
: "${KEYCLOAK_ADMIN:?Set KEYCLOAK_ADMIN}"
: "${KEYCLOAK_ADMIN_PASSWORD:?Set KEYCLOAK_ADMIN_PASSWORD}"
: "${KEYCLOAK_REALM:?Set KEYCLOAK_REALM}"
: "${IMPORT_FILE:=/import/partial-import.json}"

# Wait for KC readiness
until curl -fsS "$KEYCLOAK_URL/health/ready" >/dev/null; do
  sleep 2
done

# Get admin token
ACCESS_TOKEN=$(curl -s -X POST "$KEYCLOAK_URL/realms/master/protocol/openid-connect/token" \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'client_id=admin-cli' \
  -d "username=$KEYCLOAK_ADMIN" \
  -d "password=$KEYCLOAK_ADMIN_PASSWORD" \
  -d 'grant_type=password' | jq -r .access_token)

# Partial import (roles/clients/groups)
RESP=$(curl -s -X POST "$KEYCLOAK_URL/admin/realms/$KEYCLOAK_REALM/partialImport" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H 'Content-Type: application/json' \
  --data-binary @"$IMPORT_FILE")

echo "$RESP" | jq -r '.results // .error // "OK"'

# ---- Defaults for new users ----
# 1) Default group: "USER"
GROUP_ID=$(curl -s -G "$KEYCLOAK_URL/admin/realms/$KEYCLOAK_REALM/groups" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  --data-urlencode "search=USER" | jq -r '.[0].id // empty')
if [ -n "$GROUP_ID" ]; then
  # Add to realm default groups (idempotent; 204 if already added)
  curl -s -o /dev/null -w "%{http_code}" -X POST \
    "$KEYCLOAK_URL/admin/realms/$KEYCLOAK_REALM/default-groups/$GROUP_ID" \
    -H "Authorization: Bearer $ACCESS_TOKEN" >/dev/null || true
fi

# 2) Default role: "Архитектор решений" via composite of default-roles-{realm}
ROLE_NAME="SOLUTION_ARCHITECT"
# fetch role id by search
ROLE_ID=$(curl -s -G "$KEYCLOAK_URL/admin/realms/$KEYCLOAK_REALM/roles" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  --data-urlencode "search=$ROLE_NAME" | jq -r '.[] | select(.name=="'$ROLE_NAME'") | .id' | head -n1)
DEFAULT_ROLE_NAME="default-roles-$KEYCLOAK_REALM"
DEFAULT_ROLE_ID=$(curl -s "$KEYCLOAK_URL/admin/realms/$KEYCLOAK_REALM/roles-by-name/$DEFAULT_ROLE_NAME" \
  -H "Authorization: Bearer $ACCESS_TOKEN" | jq -r '.id')
if [ -n "$ROLE_ID" ] && [ -n "$DEFAULT_ROLE_ID" ]; then
  curl -s -o /dev/null -w "%{http_code}" -X POST \
    "$KEYCLOAK_URL/admin/realms/$KEYCLOAK_REALM/roles-by-id/$DEFAULT_ROLE_ID/composites" \
    -H "Authorization: Bearer $ACCESS_TOKEN" \
    -H 'Content-Type: application/json' \
    --data '[{"id":"'"$ROLE_ID"'","name":"'"$ROLE_NAME"'"}]' >/dev/null || true
fi

echo "Keycloak partial import + defaults applied."
