#!/bin/bash

# Запуск локальной разработки с автоматическим port-forward

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🚀 Starting local development environment..."
echo ""

# Проверяем наличие необходимых команд
if ! command -v kubectl &> /dev/null; then
  echo "✗ kubectl is not installed"
  exit 1
fi

if ! command -v pnpm &> /dev/null; then
  echo "✗ pnpm is not installed"
  exit 1
fi

# Функция для очистки при завершении
cleanup() {
  echo ""
  echo "🛑 Stopping local development environment..."
  
  # Останавливаем port-forward
  if [ -f "$SCRIPT_DIR/k8s-port-forward.sh" ]; then
    "$SCRIPT_DIR/k8s-port-forward.sh" --stop 2>/dev/null || true
  fi
  
  # Останавливаем все дочерние процессы
  jobs -p | xargs -r kill 2>/dev/null || true
  
  echo "✅ Cleanup complete"
  exit 0
}

trap cleanup EXIT INT TERM

# Запускаем port-forward в фоне
echo "📡 Setting up Kubernetes port-forwards..."
"$SCRIPT_DIR/k8s-port-forward.sh" &
PORT_FORWARD_PID=$!

# Ждем, пока port-forward установится
echo "⏳ Waiting for port-forwards to establish..."
sleep 5

# Проверяем, что port-forward работает
if ! kill -0 "$PORT_FORWARD_PID" 2>/dev/null; then
  echo "✗ Failed to start port-forward"
  exit 1
fi

echo "✅ Port-forwards established"
echo ""

# Запускаем Portal в режиме разработки
echo "📦 Starting Portal..."
cd "$PROJECT_ROOT/packages/portal"

# Проверяем наличие .env.local
if [ ! -f "$PROJECT_ROOT/.env.local" ]; then
  echo "⚠️  Warning: .env.local not found"
  echo "   Create .env.local with necessary environment variables"
  echo "   See docs/LOCAL_DEVELOPMENT.md for details"
fi

pnpm dev &
PORTAL_PID=$!

echo ""
echo "✅ Local development environment started!"
echo ""
echo "Services:"
echo "  Portal:        http://localhost:3000"
echo "  Kratos:        http://localhost:4433"
echo "  Hydra:         http://localhost:4444"
echo "  Hasura:        http://localhost:8080"
echo "  Tolgee:        http://localhost:8081"
echo "  Mailpit:       http://localhost:8025"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Ждем завершения
wait
