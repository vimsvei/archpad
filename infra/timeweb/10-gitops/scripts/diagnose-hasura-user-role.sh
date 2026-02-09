#!/usr/bin/env bash
# Диагностика permissions роли user в Hasura.
# Использование:
#   HASURA_URL=https://apim.archpad.pro HASURA_ADMIN_SECRET=<secret> ./diagnose-hasura-user-role.sh
# Секрет можно взять из Hasura Console (Settings) или из кластера:
#   kubectl get secret -n platform hasura-secret -o jsonpath='{.data.HASURA_GRAPHQL_ADMIN_SECRET}' 2>/dev/null | base64 -d
# Если permissions = 0, перезапустите hasura-sync-service (ArgoCD sync или ручной Job).

set -e

HASURA_URL="${HASURA_URL:-https://apim.archpad.pro}"
HASURA_ADMIN_SECRET="${HASURA_ADMIN_SECRET:-}"
ENDPOINT="${HASURA_URL%/}/v1"

if [ -z "$HASURA_ADMIN_SECRET" ]; then
  echo "Usage: HASURA_URL=<url> HASURA_ADMIN_SECRET=<secret> $0"
  echo "Or export HASURA_ADMIN_SECRET from Vault/kubectl."
  echo ""
  echo "To get secret from cluster:"
  echo "  kubectl get secret -n platform hasura-secret -o jsonpath='{.data.HASURA_GRAPHQL_ADMIN_SECRET}' 2>/dev/null | base64 -d"
  exit 1
fi

echo "=== 1. Export metadata and check 'user' role permissions ==="
METADATA=$(curl -fsS -X POST "${ENDPOINT}/metadata" \
  -H "Content-Type: application/json" \
  -H "x-hasura-admin-secret: ${HASURA_ADMIN_SECRET}" \
  -d '{"type": "export_metadata", "args": {}}')

# Support both config v2 (sources) and v3 (databases)
USER_SELECT_COUNT=$(echo "$METADATA" | jq -r '
  ([.metadata.sources[]?.tables[]? | select(.select_permissions[]? | .role == "user")] +
   [.metadata.databases[]?.tables[]? | select(.select_permissions[]? | .role == "user")]) |
  length
' 2>/dev/null || echo "0")

echo "Tables with select permission for role 'user': $USER_SELECT_COUNT"

# Check if introspection is disabled for user role (Hasura Cloud/Enterprise)
INTROSPECTION_DISABLED=$(echo "$METADATA" | jq -r '
  .metadata.metadata_state?.graphql_schema_introspection_options?.disabled_for_roles // [] |
  if index("user") then "yes" else "no" end
' 2>/dev/null || echo "unknown")
echo "Introspection disabled for 'user': $INTROSPECTION_DISABLED"

if [ "$USER_SELECT_COUNT" = "0" ]; then
  echo "WARNING: No select permissions found for role 'user'!"

  echo ""
  echo "Available roles in metadata:"
  echo "$METADATA" | jq -r '
    ([.metadata.sources[]?.tables[]? | .select_permissions[]?.role, .insert_permissions[]?.role, .update_permissions[]?.role, .delete_permissions[]?.role] +
     [.metadata.databases[]?.tables[]? | .select_permissions[]?.role, .insert_permissions[]?.role, .update_permissions[]?.role, .delete_permissions[]?.role]) |
    add | unique | map(select(. != null)) | .[]
  ' 2>/dev/null | sort -u | head -20
fi

echo ""
echo "=== 2. Introspection with role 'user' (no admin secret) ==="
INTROSPECTION=$(curl -sS -X POST "${ENDPOINT}/graphql" \
  -H "Content-Type: application/json" \
  -H "x-hasura-role: user" \
  -H "X-Hasura-Allowed-Roles: user" \
  -d '{"query": "query { __schema { queryType { fields { name } } } }"}' 2>/dev/null || echo '{}')

if echo "$INTROSPECTION" | jq -e '.data.__schema.queryType.fields' >/dev/null 2>&1; then
  QUERY_COUNT=$(echo "$INTROSPECTION" | jq -r '.data.__schema.queryType.fields | length')
  echo "Introspection OK: $QUERY_COUNT root query fields visible for role 'user'"
  echo "$INTROSPECTION" | jq -r '.data.__schema.queryType.fields[].name' 2>/dev/null | head -15
else
  echo "Introspection FAILED or empty schema:"
  echo "$INTROSPECTION" | jq -r '.errors[]?.message // .message // .' 2>/dev/null || echo "$INTROSPECTION"
fi

echo ""
echo "=== 3. Test query (try first root field from introspection) ==="
FIRST_FIELD=$(echo "$INTROSPECTION" | jq -r '.data.__schema.queryType.fields[0].name // empty' 2>/dev/null)
if [ -n "$FIRST_FIELD" ]; then
  TEST_QUERY=$(curl -sS -X POST "${ENDPOINT}/graphql" \
    -H "Content-Type: application/json" \
    -H "x-hasura-role: user" \
    -H "X-Hasura-Allowed-Roles: user" \
    -d "{\"query\": \"query { ${FIRST_FIELD}(limit: 1) { __typename } }\"}" 2>/dev/null || echo '{}')
  if echo "$TEST_QUERY" | jq -e '.data' >/dev/null 2>&1; then
    echo "Query ${FIRST_FIELD} OK"
  else
    echo "Query ${FIRST_FIELD} failed:"
    echo "$TEST_QUERY" | jq -r '.errors[]?.message // .' 2>/dev/null || echo "$TEST_QUERY"
  fi
else
  echo "No root fields to test (introspection was empty)"
fi
