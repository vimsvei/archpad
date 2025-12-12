#!/usr/bin/env bash
set -euo pipefail

HOSTS=(
  portal
  auth
  hydra
  api
  apim
  pg
  pgadmin
  proxy
  mail
  tolgee
)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TRAEFIK_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"            # .../infra/traefik
CERT_DIR="${TRAEFIK_DIR}/certs"
CERT_FILE="${CERT_DIR}/local.crt"
KEY_FILE="${CERT_DIR}/local.key"

LAN_IP="${LAN_IP:-$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || true)}"
if [[ -z "${LAN_IP}" ]]; then
  echo "ERROR: cannot detect LAN_IP. Run: LAN_IP=192.168.1.50 $0" >&2
  exit 1
fi

BASE_DNS="${LAN_IP//./-}.sslip.io"

DOMAINS=()
for h in "${HOSTS[@]}"; do
  DOMAINS+=("${h}.${BASE_DNS}")
done

command -v mkcert >/dev/null 2>&1 || {
  echo "ERROR: mkcert not found. Install: brew install mkcert nss && mkcert -install" >&2
  exit 1
}

mkdir -p "${CERT_DIR}"

echo "LAN_IP:   ${LAN_IP}"
echo "BASE_DNS: ${BASE_DNS}"
echo "Domains:"
printf "  - %s\n" "${DOMAINS[@]}"
echo

mkcert -cert-file "${CERT_FILE}" -key-file "${KEY_FILE}" "${DOMAINS[@]}"

echo
echo "Written:"
echo "  ${CERT_FILE}"
echo "  ${KEY_FILE}"
echo
echo "Add to .gitignore:"
echo "  infra/traefik/certs/"
