#!/bin/sh
# Add landing.hero.titleLine1 and landing.hero.titleLine2 to Tolgee via API.
# Requires: NEXT_PUBLIC_TOLGEE_API_KEY, NEXT_PUBLIC_TOLGEE_API_URL in .env.local
# Tolgee project ID: 3 (archpad-landing)

set -e

cd "$(dirname "$0")/.."
[ -f .env.local ] && set -a && . ./.env.local && set +a

if [ -z "$NEXT_PUBLIC_TOLGEE_API_KEY" ] || [ -z "$NEXT_PUBLIC_TOLGEE_API_URL" ]; then
  echo "Set NEXT_PUBLIC_TOLGEE_API_KEY and NEXT_PUBLIC_TOLGEE_API_URL (e.g. in .env.local)"
  exit 1
fi

BASE="${NEXT_PUBLIC_TOLGEE_API_URL%/}"
PROJECT_ID=3

# Tolgee API: POST /v2/projects/:projectId/translations
# Body: { "key": "full.key.name", "translations": { "ru-RU": "text", "en": "text", ... } }
set_translation() {
  local key="$1"
  local ru="$2"
  local en="$3"
  local es="$4"
  local sr="$5"
  local body
  body=$(printf '%s' "{
    \"key\": \"$key\",
    \"translations\": {
      \"ru-RU\": \"$(echo "$ru" | sed 's/"/\\"/g')\",
      \"en\": \"$(echo "$en" | sed 's/"/\\"/g')\",
      \"es-ES\": \"$(echo "$es" | sed 's/"/\\"/g')\",
      \"sr\": \"$(echo "$sr" | sed 's/"/\\"/g')\"
    }
  }")
  echo "Setting $key..."
  if curl -sf -X POST \
    -H "X-API-Key: $NEXT_PUBLIC_TOLGEE_API_KEY" \
    -H "Content-Type: application/json" \
    -d "$body" \
    "$BASE/v2/projects/$PROJECT_ID/translations"; then
    echo " OK"
  else
    echo " FAILED (check API response above)"
    return 1
  fi
}

echo "Adding hero title keys to Tolgee (project $PROJECT_ID)..."
set_translation "landing.hero.titleLine1" \
  "Архитектура," \
  "Unified environment" \
  "Entorno unificado" \
  "Jedinstveno okruženje"

set_translation "landing.hero.titleLine2" \
  "с которой принимают решения" \
  "for architecture" \
  "para la arquitectura" \
  "za arhitekturu"

echo "Done."
