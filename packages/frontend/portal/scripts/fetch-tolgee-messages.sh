#!/bin/sh
# Fetch Tolgee translations into messages/ (used locally and in Dockerfile).
# API key: from .env.local (if exists) or env vars NEXT_PUBLIC_TOLGEE_API_KEY, NEXT_PUBLIC_TOLGEE_API_URL
# Project ID is auto-detected from API key.

set -e

cd "$(dirname "$0")/.."
[ -f .env.local ] && set -a && . ./.env.local && set +a

if [ -z "$NEXT_PUBLIC_TOLGEE_API_KEY" ] || [ -z "$NEXT_PUBLIC_TOLGEE_API_URL" ]; then
  echo "Set NEXT_PUBLIC_TOLGEE_API_KEY and NEXT_PUBLIC_TOLGEE_API_URL"
  exit 1
fi

mkdir -p messages

BASE="${NEXT_PUBLIC_TOLGEE_API_URL%/}"

# Get project ID from API key (avoids hardcoding)
PROJECT_ID=$(curl -sf -H "X-API-Key: $NEXT_PUBLIC_TOLGEE_API_KEY" "$BASE/v2/api-keys/current" | jq -r '.projectId')
if [ -z "$PROJECT_ID" ] || [ "$PROJECT_ID" = "null" ]; then
  echo "Failed to get Tolgee project ID from API"
  exit 1
fi

URL="$BASE/v2/projects/$PROJECT_ID/export?format=JSON&languages=ru-RU,en,es-ES,sr"

echo "Fetching Tolgee messages (project $PROJECT_ID) from $BASE/..."
curl -sf -H "X-API-Key: $NEXT_PUBLIC_TOLGEE_API_KEY" "$URL" -o /tmp/tolgee-portal.zip
unzip -oq /tmp/tolgee-portal.zip -d messages
rm -f /tmp/tolgee-portal.zip
echo "Done. messages: $(ls messages)"
