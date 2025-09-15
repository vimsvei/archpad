#!/bin/sh
set -euo pipefail

# Ensure tools are present (alpine)
command -v curl >/dev/null 2>&1 || apk add --no-cache curl >/dev/null
command -v jq   >/dev/null 2>&1 || apk add --no-cache jq   >/dev/null

: "${KEYCLOAK_URL:=http://keycloak:8080}"
: "${KEYCLOAK_REALM:?Set KEYCLOAK_REALM}"
: "${IMPORT_FILE:=/import/partial-import.json}"

# Support both KC_BOOTSTRAP_* and legacy KEYCLOAK_ADMIN*
: "${KC_BOOTSTRAP_ADMIN_USERNAME:=}"
: "${KC_BOOTSTRAP_ADMIN_PASSWORD:=}"
: "${KEYCLOAK_ADMIN:=${KC_BOOTSTRAP_ADMIN_USERNAME}}"
: "${KEYCLOAK_ADMIN_PASSWORD:=${KC_BOOTSTRAP_ADMIN_PASSWORD}}"
: "${KEYCLOAK_ADMIN:?Set KEYCLOAK_ADMIN or KC_BOOTSTRAP_ADMIN_USERNAME}"
: "${KEYCLOAK_ADMIN_PASSWORD:?Set KEYCLOAK_ADMIN_PASSWORD or KC_BOOTSTRAP_ADMIN_PASSWORD}"

log() { echo "[keycloak-sync] $*"; }
http_code() { curl -s -o /dev/null -w '%{http_code}' "$@"; }

# 1) Wait until KC reachable (prefer well-known; fallback health)
log "waiting for Keycloak (well-known/health)..."
until [ "$(http_code "$KEYCLOAK_URL/realms/master/.well-known/openid-configuration")" = "200" ] \
   || [ "$(http_code "$KEYCLOAK_URL/health/ready")" = "200" ]; do sleep 2; done
log "keycloak is reachable"

# 2) Get admin token
ACCESS_TOKEN=$(curl -s -X POST "$KEYCLOAK_URL/realms/master/protocol/openid-connect/token" \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'client_id=admin-cli' \
  -d "username=$KEYCLOAK_ADMIN" \
  -d "password=$KEYCLOAK_ADMIN_PASSWORD" \
  -d 'grant_type=password' | jq -r .access_token)
[ -n "$ACCESS_TOKEN" ] && [ "$ACCESS_TOKEN" != "null" ] || { log "ERROR: failed to get admin token"; exit 1; }
AUTH_HEADER="Authorization: Bearer $ACCESS_TOKEN"

# 3) Ensure realm exists
CODE=$(curl -s -o /dev/null -w '%{http_code}' -H "$AUTH_HEADER" "$KEYCLOAK_URL/admin/realms/$KEYCLOAK_REALM")
if [ "$CODE" = "404" ]; then
  log "realm '$KEYCLOAK_REALM' not found → creating"
  curl -s -X POST "$KEYCLOAK_URL/admin/realms" -H 'Content-Type: application/json' -H "$AUTH_HEADER" \
    --data '{"realm":"'"$KEYCLOAK_REALM"'","enabled":true}' >/dev/null
  until [ "$(curl -s -o /dev/null -w '%{http_code}' -H "$AUTH_HEADER" "$KEYCLOAK_URL/admin/realms/$KEYCLOAK_REALM")" = "200" ]; do sleep 1; done
  log "realm created"
else
  log "realm exists (HTTP $CODE)"
fi

# 4) Partial import (clients/roles only; groups исключены)
if [ -f "$IMPORT_FILE" ]; then
  log "partialImport from $IMPORT_FILE (clients/roles only)"
  RESP=$(curl -s -X POST "$KEYCLOAK_URL/admin/realms/$KEYCLOAK_REALM/partialImport" \
    -H 'Content-Type: application/json' -H "$AUTH_HEADER" \
    --data-binary @"$IMPORT_FILE")
  echo "$RESP" | jq -r '.results // .error // "OK"'
fi

# 5) Ensure groups (idempotent)
ensure_group() {
  NAME="$1"
  GID=$(curl -s -G "$KEYCLOAK_URL/admin/realms/$KEYCLOAK_REALM/groups" -H "$AUTH_HEADER" --data-urlencode "search=$NAME" | jq -r '.[] | select(.name=="'$NAME'") | .id' | head -n1)
  if [ -z "$GID" ]; then
    curl -s -X POST "$KEYCLOAK_URL/admin/realms/$KEYCLOAK_REALM/groups" -H 'Content-Type: application/json' -H "$AUTH_HEADER" \
      --data '{"name":"'"$NAME"'"}' >/dev/null
    log "group $NAME created"
  else
    log "group $NAME exists"
  fi
}
ensure_group ADMIN
ensure_group USER

# 6) Ensure roles (idempotent)
ensure_role() {
  RNAME="$1"
  RID=$(curl -s -G "$KEYCLOAK_URL/admin/realms/$KEYCLOAK_REALM/roles" -H "$AUTH_HEADER" --data-urlencode "search=$RNAME" | jq -r '.[] | select(.name=="'$RNAME'") | .id' | head -n1)
  if [ -z "$RID" ]; then
    curl -s -X POST "$KEYCLOAK_URL/admin/realms/$KEYCLOAK_REALM/roles" -H 'Content-Type: application/json' -H "$AUTH_HEADER" \
      --data '{"name":"'"$RNAME"'"}' >/dev/null
    log "role $RNAME created"
  else
    log "role $RNAME exists"
  fi
}
for R in CHIEF_ARCHITECT ENTERPRISE_ARCHITECT SOLUTION_ARCHITECT SECURITY_ARCHITECT INFRASTRUCTURE_ARCHITECT; do
  ensure_role "$R"
done

# 7) Set defaults: group USER + role SOLUTION_ARCHITECT
USER_GID=$(curl -s -G "$KEYCLOAK_URL/admin/realms/$KEYCLOAK_REALM/groups" -H "$AUTH_HEADER" --data-urlencode "search=USER" | jq -r '.[] | select(.name=="USER") | .id' | head -n1)
[ -n "$USER_GID" ] && curl -s -o /dev/null -X POST "$KEYCLOAK_URL/admin/realms/$KEYCLOAK_REALM/default-groups/$USER_GID" -H "$AUTH_HEADER" || log "WARN: group USER not found for default"

ROLE_ID=$(curl -s -G "$KEYCLOAK_URL/admin/realms/$KEYCLOAK_REALM/roles" -H "$AUTH_HEADER" --data-urlencode "search=SOLUTION_ARCHITECT" | jq -r '.[] | select(.name=="SOLUTION_ARCHITECT") | .id' | head -n1)
DEFAULT_ROLE_NAME="default-roles-$KEYCLOAK_REALM"
DEFAULT_ROLE_ID=$(curl -s "$KEYCLOAK_URL/admin/realms/$KEYCLOAK_REALM/roles-by-name/$DEFAULT_ROLE_NAME" -H "$AUTH_HEADER" | jq -r '.id // empty')
if [ -n "$ROLE_ID" ] && [ -n "$DEFAULT_ROLE_ID" ]; then
  curl -s -o /dev/null -X POST "$KEYCLOAK_URL/admin/realms/$KEYCLOAK_REALM/roles-by-id/$DEFAULT_ROLE_ID/composites" \
    -H 'Content-Type: application/json' -H "$AUTH_HEADER" \
    --data '[{"id":"'"$ROLE_ID"'","name":"SOLUTION_ARCHITECT"}]' || true
  log "default role SOLUTION_ARCHITECT ensured"
else
  log "WARN: cannot ensure default role (ROLE_ID='$ROLE_ID', DEFAULT_ROLE_ID='$DEFAULT_ROLE_ID')"
fi

log "keycloak-sync done"
