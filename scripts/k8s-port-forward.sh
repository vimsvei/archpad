#!/bin/bash

# Port-forward к сервисам в Kubernetes для локальной разработки
# Запускает port-forward в фоновом режиме для всех необходимых сервисов

set -e

NAMESPACE_PLATFORM="platform"
NAMESPACE_SECURE="secure"

# Флаги (можно переопределить через env)
# По умолчанию Ory (Kratos/Hydra) НЕ форвардим, т.к. localhost ломает cookies/redirect flow
# из-за настроек домена `.archpad.pro` и базовых URL в Ory.
FORWARD_ORY="${FORWARD_ORY:-false}"
FORWARD_HYDRA_ADMIN="${FORWARD_HYDRA_ADMIN:-false}"
FORWARD_MAILPIT="${FORWARD_MAILPIT:-true}"
FORWARD_HASURA="${FORWARD_HASURA:-true}"

# Порт для Hydra Admin (локально). Часто 4445 занято, поэтому дефолт 24445.
HYDRA_ADMIN_LOCAL_PORT="${HYDRA_ADMIN_LOCAL_PORT:-24445}"

# Функция для запуска port-forward
start_port_forward() {
  local service=$1
  local namespace=$2
  local local_port=$3
  local remote_port=$4
  
  echo "Starting port-forward: $service ($namespace) $local_port -> $remote_port"
  kubectl port-forward -n "$namespace" "svc/$service" "$local_port:$remote_port" > /dev/null 2>&1 &
  local pid=$!
  echo $pid > "/tmp/k8s-port-forward-$service-$local_port.pid"
  echo "✓ Port-forward started for $service:$local_port (PID: $pid)"
  
  # Ждем, пока port-forward установится
  sleep 1
  if ! kill -0 "$pid" 2>/dev/null; then
    echo "✗ Failed to start port-forward for $service:$local_port"
    rm -f "/tmp/k8s-port-forward-$service-$local_port.pid"
    return 1
  fi
}

# Останавливаем существующие port-forward
stop_port_forward() {
  echo ""
  echo "Stopping existing port-forwards..."
  for pidfile in /tmp/k8s-port-forward-*.pid; do
    if [ -f "$pidfile" ]; then
      pid=$(cat "$pidfile")
      if kill -0 "$pid" 2>/dev/null; then
        kill "$pid" 2>/dev/null || true
        echo "✓ Stopped port-forward (PID: $pid)"
      fi
      rm -f "$pidfile"
    fi
  done
}

# Обработка сигналов для корректного завершения
trap stop_port_forward EXIT INT TERM

echo "🚀 Starting Kubernetes port-forwards..."
echo ""

# Проверяем доступность kubectl
if ! command -v kubectl &> /dev/null; then
  echo "✗ kubectl is not installed or not in PATH"
  echo "  Install kubectl: https://kubernetes.io/docs/tasks/tools/"
  exit 1
fi

# Проверяем наличие KUBECONFIG
if [ -z "$KUBECONFIG" ] && [ ! -f "$HOME/.kube/config" ]; then
  echo "⚠️  Warning: KUBECONFIG not set and ~/.kube/config not found"
  echo "  Set KUBECONFIG environment variable or configure kubectl:"
  echo "    export KUBECONFIG=/path/to/k8s-config.yaml"
  echo ""
  echo "  For this project, you might need:"
  echo "    export KUBECONFIG=infra/timeweb/k8s_config/twc-archpad-k8s-cluster-config.yaml"
  echo ""
fi

# Проверяем подключение к кластеру
if ! kubectl cluster-info &> /dev/null; then
  echo "✗ Cannot connect to Kubernetes cluster"
  echo ""
  echo "  Troubleshooting:"
  echo "  1. Check KUBECONFIG is set correctly:"
  echo "     echo \$KUBECONFIG"
  echo ""
  echo "  2. For this project, try:"
  echo "     export KUBECONFIG=\$(pwd)/infra/timeweb/k8s_config/twc-archpad-k8s-cluster-config.yaml"
  echo ""
  echo "  3. Test connection manually:"
  echo "     kubectl cluster-info"
  echo ""
  echo "  4. If you don't have cluster access, you can still use:"
  echo "     - Ory (Kratos/Hydra): https://auth.archpad.pro / https://authz.archpad.pro (public URL; recommended)"
  echo "     - Tolgee: https://i18n.archpad.pro (public URL)"
  echo "     - Vault: https://vault.archpad.pro (public URL)"
  echo "     But Hasura (and optionally Mailpit) require port-forward"
  echo ""
  exit 1
fi

# Останавливаем существующие port-forward перед запуском новых
stop_port_forward

# Запускаем port-forward для всех сервисов
echo "Setting up port-forwards..."

# Ory (опционально, выключено по умолчанию)
if [ "$FORWARD_ORY" = "true" ]; then
  start_port_forward "kratos" "$NAMESPACE_SECURE" 4433 4433  # Kratos Public
  start_port_forward "kratos" "$NAMESPACE_SECURE" 4434 4434  # Kratos Admin

  start_port_forward "hydra" "$NAMESPACE_SECURE" 4444 4444    # Hydra Public
else
  echo "Skipping Ory port-forward (FORWARD_ORY=false)."
  echo "Recommended: use public URLs:"
  echo "  Kratos: https://auth.archpad.pro"
  echo "  Hydra:  https://authz.archpad.pro"
fi

# Hydra Admin (нужен для OAuth login/consent в Portal; можно форвардить отдельно от публичных URL)
if [ "$FORWARD_ORY" = "true" ] || [ "$FORWARD_HYDRA_ADMIN" = "true" ]; then
  start_port_forward "hydra" "$NAMESPACE_SECURE" "$HYDRA_ADMIN_LOCAL_PORT" 4445   # Hydra Admin
else
  echo "Skipping Hydra Admin port-forward (FORWARD_HYDRA_ADMIN=false)."
fi

# Hasura (опционально, если используете публичный API Gateway: https://apim.archpad.pro/v1/graphql)
if [ "$FORWARD_HASURA" = "true" ]; then
  start_port_forward "hasura" "$NAMESPACE_PLATFORM" 8080 8080
else
  echo "Skipping Hasura port-forward (FORWARD_HASURA=false)."
  echo "Using public endpoint:"
  echo "  Hasura GraphQL: https://apim.archpad.pro/v1/graphql"
fi

# Tolgee - используем публичный URL https://i18n.archpad.pro вместо port-forward
# start_port_forward "tolgee" "$NAMESPACE_PLATFORM" 8081 8080

# Vault - используем публичный URL https://vault.archpad.pro вместо port-forward
# (Vault не требует port-forward, так как доступен через Ingress)

# Mailpit (опционально)
if [ "$FORWARD_MAILPIT" = "true" ]; then
  start_port_forward "mailpit" "$NAMESPACE_PLATFORM" 8025 8025
else
  echo "Skipping Mailpit port-forward (FORWARD_MAILPIT=false)."
fi

echo ""
echo "✅ All port-forwards started!"
echo ""
echo "Services available at:"
if [ "$FORWARD_ORY" = "true" ]; then
  echo "  Kratos Public:  http://localhost:4433 (not recommended)"
  echo "  Kratos Admin:   http://localhost:4434 (not recommended)"
  echo "  Hydra Public:   http://localhost:4444 (not recommended)"
else
  echo "  Kratos Public:  https://auth.archpad.pro (recommended)"
  echo "  Hydra Public:   https://authz.archpad.pro (recommended)"
fi
if [ "$FORWARD_ORY" = "true" ] || [ "$FORWARD_HYDRA_ADMIN" = "true" ]; then
  echo "  Hydra Admin:    http://localhost:${HYDRA_ADMIN_LOCAL_PORT}"
fi
if [ "$FORWARD_HASURA" = "true" ]; then
  echo "  Hasura:         http://localhost:8080"
else
  echo "  Hasura GraphQL: https://apim.archpad.pro/v1/graphql"
fi
echo "  Tolgee:         https://i18n.archpad.pro (public URL)"
echo "  Vault:          https://vault.archpad.pro (public URL)"
if [ "$FORWARD_MAILPIT" = "true" ]; then
  echo "  Mailpit:        http://localhost:8025"
fi
echo ""
echo "Press Ctrl+C to stop all port-forwards"
echo ""

# Ждем завершения
wait
