#!/bin/bash

# Запуск локальной разработки с автоматическим port-forward

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

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

# Определяем, нужен ли Ory через port-forward (только если в .env.local указан localhost)
NEEDS_ORY_PORT_FORWARD=false
ORY_SDK_URL="$(get_env_value "NEXT_PUBLIC_ORY_SDK_URL" || true)"
HYDRA_PUBLIC_URL="$(get_env_value "NEXT_PUBLIC_HYDRA_PUBLIC_URL" || true)"
if echo "${ORY_SDK_URL}" | grep -q "localhost:4433"; then
  NEEDS_ORY_PORT_FORWARD=true
fi
if echo "${HYDRA_PUBLIC_URL}" | grep -q "localhost:4444"; then
  NEEDS_ORY_PORT_FORWARD=true
fi

# Определяем, нужен ли Hasura через port-forward
# Рекомендуемый публичный endpoint: https://apim.archpad.pro/v1/graphql
NEEDS_HASURA_PORT_FORWARD=true
HASURA_GRAPHQL_ENDPOINT="$(get_env_value "NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT" || true)"
if echo "${HASURA_GRAPHQL_ENDPOINT}" | grep -q "apim.archpad.pro"; then
  NEEDS_HASURA_PORT_FORWARD=false
elif echo "${HASURA_GRAPHQL_ENDPOINT}" | grep -q "localhost:8080"; then
  NEEDS_HASURA_PORT_FORWARD=true
fi

# Проверяем наличие необходимых команд
if ! command -v kubectl &> /dev/null; then
  echo "✗ kubectl is not installed"
  echo "  Install kubectl: https://kubernetes.io/docs/tasks/tools/"
  echo ""
  echo "  Note: You can still use Portal with public URLs for Ory (Kratos/Hydra), Tolgee and Vault,"
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
  echo ""
  echo "🛑 Stopping local development environment..."
  
  # Останавливаем port-forward напрямую через PID файлы
  for pidfile in /tmp/k8s-port-forward-*.pid; do
    if [ -f "$pidfile" ]; then
      pid=$(cat "$pidfile" 2>/dev/null || echo "")
      if [ -n "$pid" ] && kill -0 "$pid" 2>/dev/null; then
        kill "$pid" 2>/dev/null || true
      fi
      rm -f "$pidfile" 2>/dev/null || true
    fi
  done
  
  # Останавливаем все дочерние процессы (включая фоновый k8s-port-forward.sh)
  jobs -p | xargs -r kill 2>/dev/null || true
  
  echo "✅ Cleanup complete"
  exit 0
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
  CLUSTER_ERROR=$(kubectl cluster-info 2>&1)
  CLUSTER_EXIT_CODE=$?
  if [ $CLUSTER_EXIT_CODE -eq 0 ]; then
    # Определяем, нужно ли вообще поднимать port-forward
    NEEDS_ANY_PORT_FORWARD=false
    if [ "$NEEDS_HASURA_PORT_FORWARD" = "true" ] || [ "$NEEDS_ORY_PORT_FORWARD" = "true" ]; then
      NEEDS_ANY_PORT_FORWARD=true
    fi

    if [ "$NEEDS_ANY_PORT_FORWARD" = "true" ]; then
      PORT_FORWARD_AVAILABLE=true
      echo "📡 Setting up Kubernetes port-forwards..."
      # Передаем KUBECONFIG в дочерний процесс
      export KUBECONFIG

      # Прокидываем решения по умолчанию в k8s-port-forward.sh:
      # - Ory форвардим только если .env.local указывает на localhost
      # - Hasura форвардим только если endpoint не apim.archpad.pro
      FORWARD_ORY="$NEEDS_ORY_PORT_FORWARD" \
      FORWARD_HASURA="$NEEDS_HASURA_PORT_FORWARD" \
      "$SCRIPT_DIR/k8s-port-forward.sh" &
      PORT_FORWARD_PID=$!

      # Ждем, пока port-forward установится
      echo "⏳ Waiting for port-forwards to establish..."
      sleep 5

      # Проверяем, что port-forward работает
      if kill -0 "$PORT_FORWARD_PID" 2>/dev/null; then
        echo "✅ Port-forwards established"
      
      if [ "$NEEDS_ORY_PORT_FORWARD" = "true" ]; then
        # Проверяем доступность Kratos/Hydra только если в .env.local они настроены на localhost.
        echo "🔍 Verifying Ory services (Kratos, Hydra) because .env.local points to localhost..."
        sleep 3

        KRATOS_AVAILABLE=false
        HYDRA_AVAILABLE=false

        # Проверяем Kratos Public (если curl доступен)
        if command -v curl &> /dev/null; then
          if curl -s -f -o /dev/null --max-time 3 http://localhost:4433/health/ready 2>/dev/null; then
            KRATOS_AVAILABLE=true
            echo "  ✅ Kratos is accessible"
          else
            echo "  ⚠️  Kratos is not accessible on port 4433"
          fi

          # Проверяем Hydra Public
          if curl -s -f -o /dev/null --max-time 3 http://localhost:4444/.well-known/openid-configuration 2>/dev/null; then
            HYDRA_AVAILABLE=true
            echo "  ✅ Hydra is accessible"
          else
            echo "  ⚠️  Hydra is not accessible on port 4444"
          fi
        else
          # Если curl недоступен, просто проверяем, что порты слушаются
          if nc -z localhost 4433 2>/dev/null || lsof -i :4433 &>/dev/null; then
            KRATOS_AVAILABLE=true
            echo "  ✅ Kratos port 4433 is listening"
          else
            echo "  ⚠️  Kratos port 4433 is not listening"
          fi

          if nc -z localhost 4444 2>/dev/null || lsof -i :4444 &>/dev/null; then
            HYDRA_AVAILABLE=true
            echo "  ✅ Hydra port 4444 is listening"
          else
            echo "  ⚠️  Hydra port 4444 is not listening"
          fi
        fi

        if [ "$KRATOS_AVAILABLE" = "false" ] || [ "$HYDRA_AVAILABLE" = "false" ]; then
          echo ""
          echo "⚠️  Ory via localhost is not accessible."
          echo "   Recommended fix: use public URLs in .env.local instead of localhost:"
          echo "     NEXT_PUBLIC_ORY_SDK_URL=https://auth.archpad.pro"
          echo "     NEXT_PUBLIC_HYDRA_PUBLIC_URL=https://authz.archpad.pro"
          echo ""
        fi
      fi
      else
        echo "❌ Port-forward failed"
        echo ""
        echo "   Port-forward may be required for Hasura (if not using apim.archpad.pro) and optionally Mailpit."
        echo "   Kratos/Hydra are recommended via public URLs to avoid cookie/redirect issues."
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
    echo "   Kratos/Hydra are recommended via public URLs to avoid cookie/redirect issues."
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
  echo "   Kratos/Hydra are recommended via public URLs to avoid cookie/redirect issues."
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

echo ""
echo "✅ Port-forward setup complete!"
echo ""
echo "Services available:"
if [ "$PORT_FORWARD_AVAILABLE" = "true" ]; then
  if [ "$NEEDS_ORY_PORT_FORWARD" = "true" ]; then
    echo "  Kratos:        http://localhost:4433 ✅ (via port-forward; not recommended)"
    echo "  Hydra:         http://localhost:4444 ✅ (via port-forward; not recommended)"
  else
    echo "  Kratos:        https://auth.archpad.pro (public URL; recommended)"
    echo "  Hydra:         https://authz.archpad.pro (public URL; recommended)"
  fi
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
  echo "  Kratos:        https://auth.archpad.pro (public URL; recommended)"
  echo "  Hydra:         https://authz.archpad.pro (public URL; recommended)"
fi
echo "  Tolgee:        https://i18n.archpad.pro (public URL, no port-forward needed)"
echo "  Vault:          https://vault.archpad.pro (public URL, no port-forward needed)"
echo ""
if [ "$PORT_FORWARD_AVAILABLE" = "false" ]; then
  if [ "$NEEDS_HASURA_PORT_FORWARD" = "true" ]; then
    echo "⚠️  WARNING: Hasura is not available!"
    echo "   Features depending on Hasura will NOT work."
    echo "   Either enable port-forward, or switch NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT to https://apim.archpad.pro/v1/graphql"
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
echo "Press Ctrl+C to stop port-forward"
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
