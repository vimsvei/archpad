#!/bin/bash

# Port-forward к сервисам в Kubernetes для локальной разработки
# Запускает port-forward в фоновом режиме для всех необходимых сервисов

set -e

NAMESPACE_PLATFORM="platform"
NAMESPACE_SECURE="secure"

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
  exit 1
fi

# Проверяем подключение к кластеру
if ! kubectl cluster-info &> /dev/null; then
  echo "✗ Cannot connect to Kubernetes cluster"
  echo "  Make sure kubectl is configured correctly"
  exit 1
fi

# Останавливаем существующие port-forward перед запуском новых
stop_port_forward

# Запускаем port-forward для всех сервисов
echo "Setting up port-forwards..."

# Ory Kratos
start_port_forward "kratos" "$NAMESPACE_SECURE" 4433 4433  # Kratos Public
start_port_forward "kratos" "$NAMESPACE_SECURE" 4434 4434  # Kratos Admin

# Ory Hydra
start_port_forward "hydra" "$NAMESPACE_SECURE" 4444 4444    # Hydra Public
start_port_forward "hydra" "$NAMESPACE_SECURE" 4445 4445   # Hydra Admin

# Hasura
start_port_forward "hasura" "$NAMESPACE_PLATFORM" 8080 8080

# Tolgee (используем другой порт, т.к. Hasura уже на 8080)
start_port_forward "tolgee" "$NAMESPACE_PLATFORM" 8081 8080

# Mailpit (опционально)
start_port_forward "mailpit" "$NAMESPACE_PLATFORM" 8025 8025

echo ""
echo "✅ All port-forwards started!"
echo ""
echo "Services available at:"
echo "  Kratos Public:  http://localhost:4433"
echo "  Kratos Admin:   http://localhost:4434"
echo "  Hydra Public:   http://localhost:4444"
echo "  Hydra Admin:    http://localhost:4445"
echo "  Hasura:         http://localhost:8080"
echo "  Tolgee:         http://localhost:8081"
echo "  Mailpit:        http://localhost:8025"
echo ""
echo "Press Ctrl+C to stop all port-forwards"
echo ""

# Ждем завершения
wait
