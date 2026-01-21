#!/bin/bash

# Запуск локальной разработки с автоматическим port-forward

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

CMD="${1:-start}"
START_CADDY="${START_CADDY:-false}"
START_PORTAL="${START_PORTAL:-false}"

PORTAL_PID_FILE="/tmp/archpad-portal-dev.pid"
# (legacy) HYDRA_ADMIN_LOCAL_PORT removed: migrated from Hydra to Keycloak.

case "$CMD" in
  start|stop) ;;
  *)
    echo "Usage: $0 {start|stop}"
    echo ""
    echo "Env:"
    echo "  START_CADDY=true   # start/stop Caddy reverse proxy for portal.archpad.pro"
    echo "  START_PORTAL=true  # start/stop Portal dev server (pnpm -C packages/portal dev-k8s)"
    exit 2
    ;;
esac

stop_only() {
  echo "🛑 Stopping local development environment..."

  # Stop port-forwards via PID files
  for pidfile in /tmp/k8s-port-forward-*.pid; do
    if [ -f "$pidfile" ]; then
      pid=$(cat "$pidfile" 2>/dev/null || echo "")
      if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
        kill "$pid" 2>/dev/null || true
      fi
      rm -f "$pidfile" 2>/dev/null || true
    fi
  done

  # Stop portal dev server if we started it
  if [ -f "$PORTAL_PID_FILE" ]; then
    pid=$(cat "$PORTAL_PID_FILE" 2>/dev/null || echo "")
    if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
      kill "$pid" 2>/dev/null || true
      kill -9 "$pid" 2>/dev/null || true
    fi
    rm -f "$PORTAL_PID_FILE" 2>/dev/null || true
  fi

  # Stop caddy if we started it
  if [ "$START_CADDY" = "true" ]; then
    "$SCRIPT_DIR/caddy-local.sh" stop || true
  fi

  echo "✅ Cleanup complete"
}

if [ "$CMD" = "stop" ]; then
  stop_only
  exit 0
fi

echo "🚀 Starting local development environment..."
echo ""

# Чтение значения переменной из .env.local (Portal).
# Возвращает значение без кавычек, если возможно.
get_env_value() {
  local key="$1"
  local env_file="$PROJECT_ROOT/packages/portal/.env.local"
  if [ ! -f "$env_file" ]; then
    return 1
  fi

  # Берём только первую не закомментированную строку KEY=...
  # shellcheck disable=SC2002
  local line
  line="$(grep -E "^[[:space:]]*${key}=" "$env_file" 2>/dev/null | head -n 1 || true)"
  if [ -z "$line" ]; then
    return 1
  fi

  local value="${line#*=}"
  value="${value%$'\r'}"
  # убираем парные кавычки
  value="${value%\"}"
  value="${value#\"}"
  value="${value%\'}"
  value="${value#\'}"
  printf '%s' "$value"
  return 0
}

# Ory/Hydra removed: migrated to Keycloak.

# Определяем, нужен ли Hasura через port-forward
# Рекомендуемый публичный endpoint: https://apim.archpad.pro/v1/graphql
NEEDS_HASURA_PORT_FORWARD=true
HASURA_GRAPHQL_URL="$(get_env_value "NEXT_PUBLIC_HASURA_GRAPHQL_URL" || true)"
if echo "${HASURA_GRAPHQL_URL}" | grep -q "apim.archpad.pro"; then
  NEEDS_HASURA_PORT_FORWARD=false
elif echo "${HASURA_GRAPHQL_URL}" | grep -q "localhost:8080"; then
  NEEDS_HASURA_PORT_FORWARD=true
fi

# Проверяем наличие необходимых команд
if ! command -v kubectl &> /dev/null; then
  echo "✗ kubectl is not installed"
  echo "  Install kubectl: https://kubernetes.io/docs/tasks/tools/"
  echo ""
  echo "  Note: You can still use Portal with public URLs for Keycloak, Tolgee and Vault,"
  echo "        but port-forward may be required for Hasura (if not using apim.archpad.pro) and optionally Mailpit."
  exit 1
fi

if ! command -v pnpm &> /dev/null; then
  echo "✗ pnpm is not installed"
  exit 1
fi

# Проверяем наличие curl для проверки доступности сервисов
if ! command -v curl &> /dev/null; then
  echo "⚠️  Warning: curl is not installed"
  echo "   Service availability checks will be skipped"
  echo "   Install curl for better diagnostics"
  echo ""
fi

# Функция для очистки при завершении
cleanup() {
  exit_code=$?
  echo ""
  stop_only
  exit "$exit_code"
}

trap cleanup EXIT INT TERM

# Проверяем и устанавливаем KUBECONFIG перед запуском port-forward
KUBECONFIG_SET=false
if [ -z "$KUBECONFIG" ] && [ ! -f "$HOME/.kube/config" ]; then
  # Пробуем найти конфиг в стандартном месте проекта
  DEFAULT_KUBECONFIG="$PROJECT_ROOT/infra/timeweb/k8s_config/twc-archpad-k8s-cluster-config.yaml"
  if [ -f "$DEFAULT_KUBECONFIG" ]; then
    echo "📋 Found KUBECONFIG at default location, setting it..."
    export KUBECONFIG="$DEFAULT_KUBECONFIG"
    KUBECONFIG_SET=true
  else
    echo "⚠️  KUBECONFIG not found at: $DEFAULT_KUBECONFIG"
  fi
fi

# Убеждаемся, что KUBECONFIG экспортирован (даже если уже был установлен)
if [ -n "$KUBECONFIG" ]; then
  export KUBECONFIG
fi

# Проверяем подключение к кластеру перед запуском port-forward
PORT_FORWARD_AVAILABLE=false
if [ -n "$KUBECONFIG" ] || [ -f "$HOME/.kube/config" ]; then
  # Пробуем подключиться к кластеру
  set +e
  CLUSTER_ERROR=$(kubectl cluster-info 2>&1)
  CLUSTER_EXIT_CODE=$?
  set -e
  if [ $CLUSTER_EXIT_CODE -eq 0 ]; then
    # Определяем, нужно ли вообще поднимать port-forward
    NEEDS_ANY_PORT_FORWARD=false
    if [ "$NEEDS_HASURA_PORT_FORWARD" = "true" ]; then
      NEEDS_ANY_PORT_FORWARD=true
    fi

    if [ "$NEEDS_ANY_PORT_FORWARD" = "true" ]; then
      PORT_FORWARD_AVAILABLE=true
      echo "📡 Setting up Kubernetes port-forwards..."
      echo ""
      echo "Planned port-forwards:"
      if [ "$NEEDS_HASURA_PORT_FORWARD" = "true" ]; then
        echo "  - platform/hasura: 8080 -> 8080"
      else
        echo "  - platform/hasura: (skip; using https://apim.archpad.pro/v1/graphql)"
      fi
      echo "  - platform/mailpit: 8025 -> 8025 (default on)"
      echo ""
      # Передаем KUBECONFIG в дочерний процесс
      export KUBECONFIG

      # Прокидываем решения по умолчанию в k8s-port-forward.sh:
      # - Ory форвардим только если .env.local указывает на localhost
      # - Hasura форвардим только если endpoint не apim.archpad.pro
      FORWARD_HASURA="$NEEDS_HASURA_PORT_FORWARD" \
      "$SCRIPT_DIR/k8s-port-forward.sh" &
      PORT_FORWARD_PID=$!

      # Ждем, пока port-forward установится
      echo "⏳ Waiting for port-forwards to establish..."
      sleep 5

      # Проверяем, что port-forward работает
      if kill -0 "$PORT_FORWARD_PID" 2>/dev/null; then
        echo "✅ Port-forwards established"
      
      # Ory/Hydra verification removed: migrated to Keycloak.
      else
        echo "❌ Port-forward failed"
        echo ""
        echo "   Port-forward may be required for Hasura (if not using apim.archpad.pro) and optionally Mailpit."
        echo ""
        echo "   Please check:"
        echo "   1. KUBECONFIG is set correctly"
        echo "   2. Kubernetes cluster is accessible"
        echo "   3. kubectl can connect: kubectl cluster-info"
        echo ""
        PORT_FORWARD_AVAILABLE=false
      fi
    else
      echo "ℹ️  Skipping port-forward: .env.local is configured to use public endpoints."
      PORT_FORWARD_AVAILABLE=false
    fi
  else
    echo "❌ Cannot connect to Kubernetes cluster"
    echo ""
    # Показываем детали ошибки, если они есть
    if echo "$CLUSTER_ERROR" | grep -q "operation not permitted\|connect: connection refused\|dial tcp"; then
      echo "   Network connection error detected:"
      echo "   - The cluster may be behind a VPN or firewall"
      echo "   - Check if VPN is connected (if required)"
      echo "   - Verify network connectivity to the cluster"
      echo ""
      # Пытаемся извлечь IP адрес кластера из ошибки
      CLUSTER_IP=$(echo "$CLUSTER_ERROR" | grep -oE '[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+:[0-9]+' | head -1)
      if [ -n "$CLUSTER_IP" ]; then
        echo "   Cluster endpoint: $CLUSTER_IP"
        echo "   Try to ping or check connectivity to this address"
        echo ""
      fi
    fi
    echo "   Port-forward may be required for Hasura (if not using apim.archpad.pro) and optionally Mailpit."
    echo ""
    if [ "$KUBECONFIG_SET" = "false" ]; then
      echo "   To enable port-forward, set KUBECONFIG:"
      echo "     export KUBECONFIG=\$(pwd)/infra/timeweb/k8s_config/twc-archpad-k8s-cluster-config.yaml"
      echo ""
    fi
    echo "   Troubleshooting steps:"
    echo "   1. Check if VPN is connected (if required for cluster access)"
    echo "   2. Verify KUBECONFIG is set: echo \$KUBECONFIG"
    echo "   3. Test connection manually: kubectl cluster-info"
    echo "   4. Check network connectivity to cluster endpoint"
    echo ""
    echo "   Portal can still start, but Hasura-dependent features will fail without port-forward."
    echo ""
    PORT_FORWARD_AVAILABLE=false
  fi
else
  echo "❌ KUBECONFIG not configured"
  echo ""
  echo "   Port-forward may be required for Hasura (if not using apim.archpad.pro) and optionally Mailpit."
  echo "   Keycloak is used via public URL: https://id.archpad.pro"
  echo ""
  echo "   To enable port-forward, set KUBECONFIG:"
  echo "     export KUBECONFIG=\$(pwd)/infra/timeweb/k8s_config/twc-archpad-k8s-cluster-config.yaml"
  echo ""
  echo "   Portal can still start, but Hasura-dependent features will fail without port-forward."
  echo ""
  PORT_FORWARD_AVAILABLE=false
fi

echo ""

# Проверяем .env.local для Portal (без симлинков)
echo "📋 Checking packages/portal/.env.local..."
PORTAL_ENV="$PROJECT_ROOT/packages/portal/.env.local"
if [ -L "$PORTAL_ENV" ]; then
  echo "🔧 Found symlink, replacing with a regular file..."
  tmp="${PORTAL_ENV}.tmp.$$"
  cp -L "$PORTAL_ENV" "$tmp"
  rm -f "$PORTAL_ENV"
  mv "$tmp" "$PORTAL_ENV"
  echo "✅ Replaced symlink with a regular file: packages/portal/.env.local"
fi
if [ ! -f "$PORTAL_ENV" ]; then
  echo "⚠️  packages/portal/.env.local not found"
  echo "   Create it with: ./scripts/update-env-portal.sh"
  echo "   See docs/LOCAL_DEVELOPMENT.md for details"
fi

if [ "$START_CADDY" = "true" ]; then
  echo ""
  echo "🔒 Starting Caddy (portal.archpad.pro -> localhost:3000)..."
  "$SCRIPT_DIR/caddy-local.sh" start
fi

if [ "$START_PORTAL" = "true" ]; then
  echo ""
  echo "🧩 Starting Portal dev server..."
  (cd "$PROJECT_ROOT/packages/portal" && pnpm run dev-k8s) &
  PORTAL_PID=$!
  echo "$PORTAL_PID" > "$PORTAL_PID_FILE"
  echo "✓ Portal PID: $PORTAL_PID"
fi

echo ""
echo "✅ Port-forward setup complete!"
echo ""
echo "Services available:"
if [ "$PORT_FORWARD_AVAILABLE" = "true" ]; then
  echo "  Keycloak:      https://id.archpad.pro (public URL)"
  if [ "$NEEDS_HASURA_PORT_FORWARD" = "true" ]; then
    echo "  Hasura:        http://localhost:8080 (via port-forward)"
  else
    echo "  Hasura GraphQL: https://apim.archpad.pro/v1/graphql (public URL)"
  fi
  echo "  Mailpit:       http://localhost:8025 (via port-forward)"
else
  if [ "$NEEDS_HASURA_PORT_FORWARD" = "true" ]; then
    echo "  Hasura:        ⚠️  Requires port-forward (not available)"
  else
    echo "  Hasura GraphQL: https://apim.archpad.pro/v1/graphql (public URL)"
  fi
  echo "  Mailpit:       ⚠️  Requires port-forward (not available)"
  echo "  Keycloak:      https://id.archpad.pro (public URL)"
fi
echo "  Tolgee:        https://i18n.archpad.pro (public URL, no port-forward needed)"
echo "  Vault:          https://vault.archpad.pro (public URL, no port-forward needed)"
echo ""
if [ "$PORT_FORWARD_AVAILABLE" = "false" ]; then
  if [ "$NEEDS_HASURA_PORT_FORWARD" = "true" ]; then
    echo "⚠️  WARNING: Hasura is not available!"
    echo "   Features depending on Hasura will NOT work."
    echo "   Either enable port-forward, or switch NEXT_PUBLIC_HASURA_GRAPHQL_URL to https://apim.archpad.pro/v1/graphql"
  fi
  echo ""
fi
echo "📦 To start Portal, run in a separate terminal:"
echo "   cd packages/portal"
echo "   pnpm dev"
echo ""
if [ -f "$PORTAL_ENV" ]; then
  echo "✅ packages/portal/.env.local is present"
else
  echo "⚠️  packages/portal/.env.local is missing"
fi
echo ""
echo "Press Ctrl+C to stop"
echo ""

# Ждем завершения (port-forward будет работать до Ctrl+C)
# Если port-forward не запущен, просто ждем сигнала завершения
if [ "$PORT_FORWARD_AVAILABLE" = "true" ] && [ -n "$PORT_FORWARD_PID" ]; then
  # Ждем завершения процесса port-forward
  wait "$PORT_FORWARD_PID" 2>/dev/null || true
else
  # Если port-forward не запущен, просто ждем бесконечно до Ctrl+C
  while true; do
    sleep 1
  done
fi
