#!/bin/sh
set -euo pipefail
: "${HASURA_URL:=http://hasura:8080}"
: "${HASURA_ADMIN_SECRET:?Set HASURA_ADMIN_SECRET}"
# Ensure curl present (for alpine container)
command -v curl >/dev/null 2>&1 || (command -v apk >/dev/null 2>&1 && apk add --no-cache curl >/dev/null)

log() { echo "[hasura-metadata] $*"; }
http() { curl -s -o /dev/null -w '%{http_code}' "$@"; }

log "waiting for Hasura /healthz ..."
until [ "$(http "$HASURA_URL/healthz")" = "200" ]; do sleep 2; done
log "Hasura is up; applying metadata (pg_add_source project)"

CODE=$(curl -s -o /tmp/resp.json -w '%{http_code}' \
  -H "X-Hasura-Admin-Secret: $HASURA_ADMIN_SECRET" \
  -H 'Content-Type: application/json' \
  --data-binary @/metadata/add_project_source.json \
  "$HASURA_URL/v1/metadata")

if [ "$CODE" = "200" ]; then
  log "OK: project source added"
else
  if grep -qi "already exists" /tmp/resp.json 2>/dev/null; then
    log "INFO: project source already exists — skipping"
  else
    log "ERROR($CODE): $(cat /tmp/resp.json)"; exit 1
  fi
fi
