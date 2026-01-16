#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

CADDYFILE="$PROJECT_ROOT/infra/caddy/Caddyfile"
PID_FILE="/tmp/archpad-caddy.pid"
LOG_FILE="/tmp/archpad-caddy.log"

cmd="${1:-status}"

require_caddy() {
  if ! command -v caddy >/dev/null 2>&1; then
    echo "✗ caddy is not installed"
    echo "  Install: brew install caddy"
    exit 1
  fi
}

start_caddy_bg() {
  if [ ! -f "$CADDYFILE" ]; then
    echo "✗ Caddyfile not found: $CADDYFILE"
    exit 1
  fi
  if is_running; then
    return 0
  fi
  echo "Starting caddy (https://portal.archpad.pro -> http://localhost:3000)"
  echo "Log: $LOG_FILE"
  # Requires sudo to bind to :443.
  sudo sh -lc "nohup caddy run --config \"$CADDYFILE\" --adapter caddyfile >>\"$LOG_FILE\" 2>&1 & echo \$! > \"$PID_FILE\""
  sleep 0.3
  if ! is_running; then
    echo "✗ failed to start caddy; see $LOG_FILE"
    exit 1
  fi
}

is_running() {
  if [ -f "$PID_FILE" ]; then
    local pid
    pid="$(cat "$PID_FILE" 2>/dev/null || true)"
    if [ -n "$pid" ] && sudo kill -0 "$pid" 2>/dev/null; then
      return 0
    fi
  fi
  return 1
}

case "$cmd" in
  trust)
    require_caddy
    # `caddy trust` fetches CA info via Caddy admin API (localhost:2019),
    # so ensure Caddy is running first.
    started_by_us=false
    if ! is_running; then
      started_by_us=true
      start_caddy_bg
    fi

    # Adds Caddy's local CA to system trust store.
    sudo caddy trust

    if [ "$started_by_us" = "true" ]; then
      "$SCRIPT_DIR/caddy-local.sh" stop || true
    fi
    ;;

  start)
    require_caddy
    if is_running; then
      echo "✓ caddy already running (pid=$(cat "$PID_FILE"))"
      exit 0
    fi
    start_caddy_bg
    echo "✓ caddy started (pid=$(cat "$PID_FILE"))"
    ;;

  stop)
    if is_running; then
      pid="$(cat "$PID_FILE")"
      echo "Stopping caddy (pid=$pid)"
      sudo kill "$pid" 2>/dev/null || true
      sudo kill -9 "$pid" 2>/dev/null || true
      rm -f "$PID_FILE" 2>/dev/null || true
      echo "✓ caddy stopped"
    else
      rm -f "$PID_FILE" 2>/dev/null || true
      echo "✓ caddy not running"
    fi
    ;;

  status)
    if is_running; then
      echo "running pid=$(cat "$PID_FILE") log=$LOG_FILE"
    else
      echo "stopped"
    fi
    ;;

  *)
    echo "Usage: $0 {start|stop|status|trust}"
    exit 2
    ;;
esac

