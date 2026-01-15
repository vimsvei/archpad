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
  echo "  Install kubectl: https://kubernetes.io/docs/tasks/tools/"
  echo ""
  echo "  Note: You can still use Portal with public URLs for Tolgee and Vault,"
  echo "        but port-forward is required for other services (Kratos, Hydra, Hasura)"
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
  
  # Также убиваем все процессы kubectl port-forward
  pkill -f "kubectl port-forward" 2>/dev/null || true
  
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
    PORT_FORWARD_AVAILABLE=true
    echo "📡 Setting up Kubernetes port-forwards..."
    # Передаем KUBECONFIG в дочерний процесс
    export KUBECONFIG
    "$SCRIPT_DIR/k8s-port-forward.sh" &
    PORT_FORWARD_PID=$!
    
    # Ждем, пока port-forward установится
    echo "⏳ Waiting for port-forwards to establish..."
    sleep 5
    
    # Проверяем, что port-forward работает
    if kill -0 "$PORT_FORWARD_PID" 2>/dev/null; then
      echo "✅ Port-forwards established"
      
      # Проверяем доступность критически важных сервисов (Kratos и Hydra)
      echo "🔍 Verifying critical services (Kratos, Hydra)..."
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
      
      # Если Kratos или Hydra недоступны, это критическая проблема
      if [ "$KRATOS_AVAILABLE" = "false" ] || [ "$HYDRA_AVAILABLE" = "false" ]; then
        echo ""
        echo "❌ CRITICAL: Kratos and Hydra are required for authentication!"
        echo "   Portal will not work correctly without them (redirects will fail)"
        echo ""
        echo "   Please check:"
        echo "   1. Kubernetes cluster is accessible"
        echo "   2. Kratos and Hydra pods are running:"
        echo "      kubectl get pods -n secure -l app=kratos"
        echo "      kubectl get pods -n secure -l app=hydra"
        echo "   3. Port-forward is working:"
        echo "      curl http://localhost:4433/health/ready  # Kratos"
        echo "      curl http://localhost:4444/.well-known/openid-configuration  # Hydra"
        echo ""
        echo "   Portal will start, but authentication will not work!"
        echo ""
        PORT_FORWARD_AVAILABLE=true  # Port-forward работает, но сервисы недоступны
      else
        PORT_FORWARD_AVAILABLE=true
      fi
    else
      echo "❌ Port-forward failed"
      echo ""
      echo "   Kratos and Hydra are REQUIRED for local development!"
      echo "   Without them, authentication and redirects will not work."
      echo ""
      echo "   Please check:"
      echo "   1. KUBECONFIG is set correctly"
      echo "   2. Kubernetes cluster is accessible"
      echo "   3. kubectl can connect: kubectl cluster-info"
      echo ""
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
    echo "   Kratos and Hydra are REQUIRED for local development!"
    echo "   Without them, authentication and redirects will not work."
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
    echo "   Portal will start, but authentication will not work!"
    echo ""
    PORT_FORWARD_AVAILABLE=false
  fi
else
  echo "❌ KUBECONFIG not configured"
  echo ""
  echo "   Kratos and Hydra are REQUIRED for local development!"
  echo "   Without them, authentication and redirects will not work."
  echo ""
  echo "   To enable port-forward, set KUBECONFIG:"
  echo "     export KUBECONFIG=\$(pwd)/infra/timeweb/k8s_config/twc-archpad-k8s-cluster-config.yaml"
  echo ""
  echo "   Portal will start, but authentication will not work!"
  echo ""
  PORT_FORWARD_AVAILABLE=false
fi

echo ""

# Настраиваем .env.local для Portal
echo "📋 Setting up .env.local for Portal..."
if [ ! -f "$PROJECT_ROOT/.env.local" ]; then
  echo "⚠️  Warning: .env.local not found in project root"
  echo "   Create .env.local in project root with necessary environment variables"
  echo "   See docs/LOCAL_DEVELOPMENT.md for details"
else
  # Next.js ищет .env.local в директории, где находится next.config.ts
  # Создаем симлинк из корневого .env.local в packages/portal/.env.local
  if [ ! -f "$PROJECT_ROOT/packages/portal/.env.local" ]; then
    echo "🔗 Creating symlink: packages/portal/.env.local -> ../../.env.local"
    ln -s ../../.env.local "$PROJECT_ROOT/packages/portal/.env.local"
  elif [ -L "$PROJECT_ROOT/packages/portal/.env.local" ]; then
    # Проверяем, что симлинк указывает на правильный файл
    LINK_TARGET=$(readlink "$PROJECT_ROOT/packages/portal/.env.local")
    if [ "$LINK_TARGET" != "../../.env.local" ]; then
      echo "🔗 Updating symlink: packages/portal/.env.local -> ../../.env.local"
      rm "$PROJECT_ROOT/packages/portal/.env.local"
      ln -s ../../.env.local "$PROJECT_ROOT/packages/portal/.env.local"
    else
      echo "✅ Symlink already exists: packages/portal/.env.local -> ../../.env.local"
    fi
  else
    echo "⚠️  Warning: packages/portal/.env.local exists but is not a symlink"
    echo "   Next.js will use this file instead of root .env.local"
  fi
fi

echo ""
echo "✅ Port-forward setup complete!"
echo ""
echo "Services available:"
if [ "$PORT_FORWARD_AVAILABLE" = "true" ]; then
  echo "  Kratos:        http://localhost:4433 ✅ (via port-forward)"
  echo "  Hydra:         http://localhost:4444 ✅ (via port-forward)"
  echo "  Hasura:        http://localhost:8080 (via port-forward)"
  echo "  Mailpit:       http://localhost:8025 (via port-forward)"
else
  echo "  Kratos:        ❌ NOT AVAILABLE - Authentication will fail!"
  echo "  Hydra:         ❌ NOT AVAILABLE - Authentication will fail!"
  echo "  Hasura:        ⚠️  Requires port-forward (not available)"
  echo "  Mailpit:       ⚠️  Requires port-forward (not available)"
fi
echo "  Tolgee:        https://i18n.archpad.pro (public URL, no port-forward needed)"
echo "  Vault:          https://vault.archpad.pro (public URL, no port-forward needed)"
echo ""
if [ "$PORT_FORWARD_AVAILABLE" = "false" ]; then
  echo "❌ WARNING: Kratos and Hydra are not available!"
  echo "   Authentication and OAuth redirects will NOT work."
  echo "   Set KUBECONFIG and ensure cluster access to enable them."
  echo ""
fi
echo "📦 To start Portal, run in a separate terminal:"
echo "   cd packages/portal"
echo "   pnpm dev"
echo ""
if [ -f "$PROJECT_ROOT/.env.local" ]; then
  if [ -L "$PROJECT_ROOT/packages/portal/.env.local" ] || [ -f "$PROJECT_ROOT/packages/portal/.env.local" ]; then
    echo "✅ .env.local is configured (symlink created)"
  else
    echo "⚠️  Note: .env.local symlink was not created"
    echo "   Create it manually: ln -s ../../.env.local packages/portal/.env.local"
  fi
else
  echo "⚠️  Warning: .env.local not found in project root"
  echo "   Create it before starting Portal"
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
