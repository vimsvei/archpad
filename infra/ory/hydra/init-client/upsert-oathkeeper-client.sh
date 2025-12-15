#!/usr/bin/env sh
set -eu

HYDRA_ADMIN_URL="${HYDRA_ADMIN_URL:-http://hydra:4445}"
CLIENT_ID="${ORY_CLIENT_ID:-archpad-oathkeeper}"
CLIENT_SECRET="${ORY_CLIENT_SECRET:-change-me}"
SCOPE="${ORY_INTROSPECT_SCOPE:-introspect}"

payload="$(cat <<JSON
{
  "client_id": "${CLIENT_ID}",
  "client_secret": "${CLIENT_SECRET}",
  "client_name": "Archpad Oathkeeper (introspection)",
  "grant_types": ["client_credentials"],
  "response_types": ["token"],
  "scope": "${SCOPE}",
  "token_endpoint_auth_method": "client_secret_basic"
}
JSON
)"

code="$(curl -sS -o /dev/null -w "%{http_code}" "${HYDRA_ADMIN_URL}/clients/${CLIENT_ID}" || true)"
if [ "${code}" = "200" ]; then
  echo "[hydra-init-client] Updating oathkeeper introspection client: ${CLIENT_ID}"
  curl -sS -X PUT "${HYDRA_ADMIN_URL}/clients/${CLIENT_ID}" \
    -H "Content-Type: application/json" \
    --data "${payload}" >/dev/null
else
  echo "[hydra-init-client] Creating oathkeeper introspection client: ${CLIENT_ID}"
  curl -sS -X POST "${HYDRA_ADMIN_URL}/clients" \
    -H "Content-Type: application/json" \
    --data "${payload}" >/dev/null
fi

echo "[hydra-init-client] OK: export ORY_CLIENT_ID=\"${CLIENT_ID}\""
echo "[hydra-init-client] OK: export ORY_CLIENT_SECRET=\"${CLIENT_SECRET}\""

