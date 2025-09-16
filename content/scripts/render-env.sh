#!/bin/sh
set -eu
# откуда тянуть значения
ROOT_ENV_PATH="${ROOT_ENV_PATH:-../.env}"
# экспортим всё из корневого .env
set -a
[ -f "$ROOT_ENV_PATH" ] && . "$ROOT_ENV_PATH"
set +a
# рендерим шаблон в content/.env
: "${TEMPLATE:=.env.template}"
: "${OUT:=.env}"
# Требуется envsubst (gettext). На macOS: brew install gettext && export PATH="/usr/local/opt/gettext/bin:$PATH"
envsubst < "$TEMPLATE" > "$OUT"
echo "Rendered $OUT from $TEMPLATE using $ROOT_ENV_PATH"
