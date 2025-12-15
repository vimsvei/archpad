#!/usr/bin/env sh
set -eu

HYDRA_ADMIN_URL="${HYDRA_ADMIN_URL:-http://hydra:4445}"
CLIENT_ID="${NEXT_PUBLIC_OAUTH_CLIENT_ID:-archpad-portal}"
PORTAL_PUBLIC_URL="${PORTAL_PUBLIC_URL:-https://portal.192-168-1-119.sslip.io}"
REDIRECT_URI="${NEXT_PUBLIC_OAUTH_REDIRECT_URI:-${PORTAL_PUBLIC_URL}/oauth/callback}"
SCOPE="${NEXT_PUBLIC_OAUTH_SCOPE:-openid offline_access}"

payload="$(cat <<JSON
{
  "client_id": "${CLIENT_ID}",
  "client_name": "Archpad Portal (PKCE)",
  "redirect_uris": ["${REDIRECT_URI}"],
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"],
  "scope": "${SCOPE}",
  "token_endpoint_auth_method": "none"
}
JSON
)"

code="$(curl -sS -o /dev/null -w "%{http_code}" "${HYDRA_ADMIN_URL}/clients/${CLIENT_ID}" || true)"
if [ "${code}" = "200" ]; then
  echo "[hydra-init-client] Updating portal OAuth client: ${CLIENT_ID}"
  curl -sS -X PUT "${HYDRA_ADMIN_URL}/clients/${CLIENT_ID}" \
    -H "Content-Type: application/json" \
    --data "${payload}" >/dev/null
else
  echo "[hydra-init-client] Creating portal OAuth client: ${CLIENT_ID}"
  curl -sS -X POST "${HYDRA_ADMIN_URL}/clients" \
    -H "Content-Type: application/json" \
    --data "${payload}" >/dev/null
fi

echo "[hydra-init-client] OK: export NEXT_PUBLIC_OAUTH_CLIENT_ID=\"${CLIENT_ID}\""
echo "[hydra-init-client] OK: export NEXT_PUBLIC_OAUTH_REDIRECT_URI=\"${REDIRECT_URI}\""

