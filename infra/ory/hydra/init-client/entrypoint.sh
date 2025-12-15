#!/usr/bin/env sh
set -eu

HYDRA_ADMIN_URL="${HYDRA_ADMIN_URL:-http://hydra:4445}"

echo "[hydra-init-client] Waiting for Hydra admin at ${HYDRA_ADMIN_URL} ..."
tries=0
until curl -fsS "${HYDRA_ADMIN_URL}/clients?limit=1" >/dev/null 2>&1; do
  tries=$((tries+1))
  if [ "$tries" -ge 60 ]; then
    echo "[hydra-init-client] Hydra admin not ready after ${tries} tries"
    exit 1
  fi
  sleep 2
done
echo "[hydra-init-client] Hydra admin is ready"

sh "/init-client/upsert-portal-client.sh"
sh "/init-client/upsert-oathkeeper-client.sh"

echo "[hydra-init-client] Done"

