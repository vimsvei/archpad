#!/usr/bin/env sh
set -eu

cd /app

# Dev container uses docker volumes for node_modules.
# Host `pnpm install` does not update those volumes, so we install on container start.
# With PNPM_STORE_PATH mounted, this is fast and deterministic.
echo "[portal] installing dependencies (workspace filtered)..."
CI=true pnpm install --frozen-lockfile --filter @archpad/portal...

echo "[portal] starting next dev server..."
exec pnpm --filter @archpad/portal dev --port "${PORT:-3000}" --hostname "${HOSTNAME:-0.0.0.0}"




