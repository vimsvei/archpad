#!/usr/bin/env bash
set -euo pipefail

: "${ARCH_REPO_HEALTH_URL:?missing}"
: "${ARCH_REPO_HEALTH_TIMEOUT_SEC:=300}"

echo "[hasura-sync] waiting for arch-repo: ${ARCH_REPO_HEALTH_URL} (timeout=${ARCH_REPO_HEALTH_TIMEOUT_SEC}s)"
deadline=$(( $(date +%s) + ARCH_REPO_HEALTH_TIMEOUT_SEC ))

until curl -fsS "${ARCH_REPO_HEALTH_URL}" >/dev/null 2>&1; do
  if [ "$(date +%s)" -ge "${deadline}" ]; then
    echo "[hasura-sync] arch-repo not ready within timeout"; exit 1
  fi
  sleep 2
done

echo "[hasura-sync] arch-repo is ready. Tracking…"
bash /work/track_all.sh
