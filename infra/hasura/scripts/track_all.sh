#!/usr/bin/env bash
set -euo pipefail

: "${HASURA_ENDPOINT:?missing}"
: "${HASURA_ADMIN_SECRET:?missing}"
SRC="${HASURA_SOURCE:-default}"
SCHEMA="${HASURA_SCHEMA:-public}"

HDR=(-H "x-hasura-admin-secret: ${HASURA_ADMIN_SECRET}" -H "Content-Type: application/json")

echo "[hasura-sync] metadata reload..."
curl -sS "${HDR[@]}" -d '{"type":"reload_metadata","args":{"reload_remote_schemas":true,"reload_sources":true}}' \
  "${HASURA_ENDPOINT}/v1/metadata" >/dev/null

echo "[hasura-sync] listing tables in schema '${SCHEMA}'..."
TABLES=$(
curl -sS "${HDR[@]}" -d @- "${HASURA_ENDPOINT}/v2/query" <<EOF | jq -r '.result[]? | .[0]'
{"type":"run_sql","args":{"source":"${SRC}","sql":"select table_name from information_schema.tables where table_schema='${SCHEMA}' and table_type='BASE TABLE' order by table_name;"}}
EOF
)

if [ -z "${TABLES}" ]; then
  echo "[hasura-sync] no tables in schema '${SCHEMA}'."
  exit 0
fi

echo "[hasura-sync] tracking tables..."
bulk='{"type":"bulk","args":['
comma=""
while read -r t; do
  [ -z "$t" ] && continue
  bulk="${bulk}${comma}{\"type\":\"pg_track_table\",\"args\":{\"source\":\"${SRC}\",\"table\":{\"schema\":\"${SCHEMA}\",\"name\":\"${t}\"}}}"
  comma=","
done <<<"${TABLES}"
bulk="${bulk}]}"

resp=$(curl -sS "${HDR[@]}" -d "${bulk}" "${HASURA_ENDPOINT}/v1/metadata")

# если ответы массивом — ок; если объект с errors — печатаем и всё равно 0 (идемпотентность)
echo "${resp}" | jq -C . || true
echo "[hasura-sync] done."
exit 0
