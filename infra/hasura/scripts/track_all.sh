#!/usr/bin/env bash
set -euo pipefail

: "${HASURA_ENDPOINT:?HASURA_ENDPOINT is required}"
: "${HASURA_ADMIN_SECRET:?HASURA_ADMIN_SECRET is required}"

SRC="${HASURA_SOURCE:-project}"
SCHEMA="${HASURA_SCHEMA:-public}"

HDR=(-H "x-hasura-admin-secret: ${HASURA_ADMIN_SECRET}" -H "Content-Type: application/json")

echo "[hasura-sync] metadata reload..."
curl -sS "${HDR[@]}" \
  --data-raw '{"type":"reload_metadata","args":{"reload_remote_schemas":true,"reload_sources":true}}' \
  "${HASURA_ENDPOINT}/v1/metadata" >/dev/null

# ----------------- STEP 1: track all tables -----------------
echo "[hasura-sync] listing tables in schema '${SCHEMA}'..."
TABLES=$(
  curl -sS "${HDR[@]}" \
    -d @- \
    "${HASURA_ENDPOINT}/v2/query" <<EOF | jq -r '.result[1:][][0]'
{
  "type": "run_sql",
  "args": {
    "source": "${SRC}",
    "sql": "SELECT table_name FROM information_schema.tables WHERE table_schema='${SCHEMA}' and table_type='BASE TABLE' ORDER BY table_name"
  }
}
EOF
)
#echo "[hasura-sync] ${TABLES}"

if [ -z "${TABLES}" ]; then
  echo "[hasura-sync] no tables in schema '${SCHEMA}'. Skipping table tracking."
else
  echo "[hasura-sync] tracking tables (per table)..."

  while read -r t; do
    [ -z "$t" ] && continue
    [ "$t" = "table_name" ] && continue  # защита от заголовка на всякий случай

    echo "[hasura-sync] track table ${SCHEMA}.${t}..."

    payload=$(
      cat <<EOF
{
  "type": "pg_track_table",
  "args": {
    "source": "${SRC}",
    "table": {
      "schema": "${SCHEMA}",
      "name": "${t}"
    }
  }
}
EOF
    )

    # ВАЖНО: даже если curl/Hasura вернёт ошибку, мы не прерываем скрипт
    resp=$(curl -sS "${HDR[@]}" --data-raw "${payload}" "${HASURA_ENDPOINT}/v1/metadata" || true)
    echo "${resp}" | jq -C . || true

  done <<< "${TABLES}"
fi

# ----------------- STEP 2: track all foreign keys -----------------
echo "[hasura-sync] listing foreign keys in schema '${SCHEMA}'..."
FKS=$(
  curl -sS "${HDR[@]}" \
    -d @- \
    "${HASURA_ENDPOINT}/v2/query" <<EOF | jq -c '.result[1:][]?.[0] | fromjson'
{
  "type": "run_sql",
  "args": {
    "source": "${SRC}",
    "sql": "SELECT json_build_object('fk_table_schema', kcu.table_schema, 'fk_table_name', kcu.table_name, 'pk_table_schema', rel_tco.table_schema, 'pk_table_name', rel_tco.table_name, 'fk_columns', array_agg(kcu.column_name ORDER BY kcu.ordinal_position), 'constraint_name', kcu.constraint_name) FROM information_schema.table_constraints tco JOIN information_schema.key_column_usage kcu ON tco.constraint_schema = kcu.constraint_schema AND tco.constraint_name = kcu.constraint_name JOIN information_schema.referential_constraints rco ON tco.constraint_schema = rco.constraint_schema AND tco.constraint_name = rco.constraint_name JOIN information_schema.table_constraints rel_tco ON rco.unique_constraint_schema = rel_tco.constraint_schema AND rco.unique_constraint_name = rel_tco.constraint_name WHERE tco.constraint_type = 'FOREIGN KEY' AND kcu.table_schema = '${SCHEMA}' GROUP BY kcu.table_schema, kcu.table_name, rel_tco.table_name, rel_tco.table_schema, kcu.constraint_name ORDER BY kcu.table_schema, kcu.table_name"
  }
}
EOF
)

echo "[hasura-sync] tracking foreign-key relationships..."
while read -r fk; do
  [ -z "$fk" ] && continue

  fk_table_schema=$(jq -r '.fk_table_schema' <<< "${fk}")
  fk_table_name=$(jq -r '.fk_table_name' <<< "${fk}")
  pk_table_schema=$(jq -r '.pk_table_schema' <<< "${fk}")
  pk_table_name=$(jq -r '.pk_table_name' <<< "${fk}")
  constraint_name=$(jq -r '.constraint_name' <<< "${fk}")
  fk_cols_json=$(jq -c '.fk_columns' <<< "${fk}")

  echo "[hasura-sync] FK ${constraint_name}: ${fk_table_schema}.${fk_table_name} -> ${pk_table_schema}.${pk_table_name}"

  # имя relationship'ов делаем детерминированным по constraint
  obj_rel_name="fk_${constraint_name}_obj"
  arr_rel_name="fk_${constraint_name}_arr"

  # 1) object relationship на дочерней таблице (по FK)
  obj_payload=$(cat <<EOF
{
  "type": "pg_create_object_relationship",
  "args": {
    "source": "${SRC}",
    "table": { "schema": "${fk_table_schema}", "name": "${fk_table_name}" },
    "name": "${obj_rel_name}",
    "using": { "foreign_key_constraint_on": ${fk_cols_json} }
  }
}
EOF
)

  curl -sS "${HDR[@]}" \
    --data-raw "${obj_payload}" \
    "${HASURA_ENDPOINT}/v1/metadata" \
    | jq -C . || true

  # 2) array relationship на родительской таблице
  arr_payload=$(cat <<EOF
{
  "type": "pg_create_array_relationship",
  "args": {
    "source": "${SRC}",
    "table": { "schema": "${pk_table_schema}", "name": "${pk_table_name}" },
    "name": "${arr_rel_name}",
    "using": {
      "foreign_key_constraint_on": {
        "table": { "schema": "${fk_table_schema}", "name": "${fk_table_name}" },
        "columns": ${fk_cols_json}
      }
    }
  }
}
EOF
)

  curl -sS "${HDR[@]}" \
    --data-raw "${arr_payload}" \
    "${HASURA_ENDPOINT}/v1/metadata" \
    | jq -C . || true

done <<< "${FKS}"

echo "[hasura-sync] done."
