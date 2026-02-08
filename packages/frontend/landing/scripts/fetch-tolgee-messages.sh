#!/bin/sh
# Fetch Tolgee translations into messages/ (used locally and in Dockerfile).
# API key: from .env.local (if exists) or env vars NEXT_PUBLIC_TOLGEE_API_KEY, NEXT_PUBLIC_TOLGEE_API_URL
# Tolgee project ID: 3 (archpad-landing)

set -e

cd "$(dirname "$0")/.."
[ -f .env.local ] && set -a && . ./.env.local && set +a

if [ -z "$NEXT_PUBLIC_TOLGEE_API_KEY" ] || [ -z "$NEXT_PUBLIC_TOLGEE_API_URL" ]; then
  echo "Set NEXT_PUBLIC_TOLGEE_API_KEY and NEXT_PUBLIC_TOLGEE_API_URL"
  exit 1
fi

mkdir -p messages

BASE="${NEXT_PUBLIC_TOLGEE_API_URL%/}"
URL="$BASE/v2/projects/3/export?format=JSON&languages=ru-RU,en,es-ES,sr"

echo "Fetching Tolgee messages from $BASE/..."
curl -sf -H "X-API-Key: $NEXT_PUBLIC_TOLGEE_API_KEY" "$URL" -o /tmp/tolgee-landing.zip
unzip -oq /tmp/tolgee-landing.zip -d messages
rm -f /tmp/tolgee-landing.zip
echo "Done. messages: $(ls messages)"
