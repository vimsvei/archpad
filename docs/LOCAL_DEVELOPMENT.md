# Локальная разработка с удаленными сервисами в Kubernetes

## Обзор

Этот документ описывает, как настроить локальную разработку Portal и Backend сервисов с использованием Ory (Kratos, Hydra), Hasura, Tolgee и других сервисов, развернутых в Kubernetes.

## Преимущества

✅ Используете реальные сервисы из Kubernetes (Ory, Hasura, Tolgee)  
✅ Hot reload для Portal и Backend (Next.js и NestJS)  
✅ Не нужно поднимать локальные контейнеры для Ory  
✅ Работаете с реальными данными и конфигурацией  

## Требования

- Доступ к Kubernetes кластеру (`kubectl` настроен)
- `kubectl` установлен локально
- Переменные окружения настроены (см. ниже)

## Настройка

### 1. Port-forward к сервисам в Kubernetes

Создайте скрипт для автоматического запуска port-forward:

```bash
# scripts/k8s-port-forward.sh
#!/bin/bash

# Port-forward к сервисам в Kubernetes
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
  echo $! > "/tmp/k8s-port-forward-$service.pid"
  echo "✓ Port-forward started for $service (PID: $(cat /tmp/k8s-port-forward-$service.pid))"
}

# Останавливаем существующие port-forward
stop_port_forward() {
  echo "Stopping existing port-forwards..."
  for pidfile in /tmp/k8s-port-forward-*.pid; do
    if [ -f "$pidfile" ]; then
      pid=$(cat "$pidfile")
      if kill -0 "$pid" 2>/dev/null; then
        kill "$pid"
        echo "✓ Stopped port-forward (PID: $pid)"
      fi
      rm "$pidfile"
    fi
  done
}

# Обработка сигналов для корректного завершения
trap stop_port_forward EXIT INT TERM

# Запускаем port-forward для всех сервисов
start_port_forward "kratos" "$NAMESPACE_SECURE" 4433 4433  # Kratos Public
start_port_forward "kratos" "$NAMESPACE_SECURE" 4434 4434  # Kratos Admin
start_port_forward "hydra" "$NAMESPACE_SECURE" 4444 4444    # Hydra Public
start_port_forward "hydra" "$NAMESPACE_SECURE" 4445 4445   # Hydra Admin
start_port_forward "hasura" "$NAMESPACE_PLATFORM" 8080 8080
start_port_forward "tolgee" "$NAMESPACE_PLATFORM" 8080 8080
start_port_forward "mailpit" "$NAMESPACE_PLATFORM" 8025 8025

echo ""
echo "All port-forwards started!"
echo "Press Ctrl+C to stop all port-forwards"
echo ""

# Ждем завершения
wait
```

Сделайте скрипт исполняемым:
```bash
chmod +x scripts/k8s-port-forward.sh
```

### 2. Переменные окружения для локальной разработки

Создайте файл `.env.local` в корне проекта:

```bash
# .env.local

# ============================================
# Ory Kratos (через port-forward)
# ============================================
NEXT_PUBLIC_ORY_SDK_URL=http://localhost:4433
ORY_KRATOS_PUBLIC_URL=http://localhost:4433
KRATOS_ADMIN_URL=http://localhost:4434

# ============================================
# Ory Hydra (через port-forward)
# ============================================
NEXT_PUBLIC_HYDRA_PUBLIC_URL=http://localhost:4444
HYDRA_ADMIN_URL=http://localhost:4445

# OAuth2 Client (должен быть создан в Hydra)
NEXT_PUBLIC_OAUTH_CLIENT_ID=archpad-portal
NEXT_PUBLIC_OAUTH_REDIRECT_URI=http://localhost:3000/oauth/callback

# ============================================
# Hasura (через port-forward)
# ============================================
NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT=http://localhost:8080/v1/graphql
HASURA_ENDPOINT=http://localhost:8080
HASURA_GRAPHQL_ADMIN_SECRET=your-hasura-admin-secret

# ============================================
# Tolgee (через port-forward)
# ============================================
NEXT_PUBLIC_TOLGEE_API_URL=http://localhost:8080
NEXT_PUBLIC_TOLGEE_API_KEY=your-tolgee-api-key

# ============================================
# Portal
# ============================================
NEXT_PUBLIC_URL=http://localhost:3000

# ============================================
# Backend Services (для локальной разработки)
# ============================================
# Vault (для загрузки секретов в local development)
VAULT_ADDR=https://vault.archpad.pro
VAULT_TOKEN=your-vault-token

# PostgreSQL (локальный или через port-forward)
PG_HOST=localhost
PG_PORT=5432
PROJECT_DB=project_db
PROJECT_DB_USER=project_user
PROJECT_DB_PASSWORD=your-password
TENANT_DB=tenant_db
```

**Примечание:** Для Tolgee и Hasura используется один и тот же порт 8080. Нужно использовать разные локальные порты:

```bash
# В скрипте port-forward используйте разные порты:
start_port_forward "hasura" "$NAMESPACE_PLATFORM" 8080 8080
start_port_forward "tolgee" "$NAMESPACE_PLATFORM" 8081 8080  # Tolgee на 8081
```

И обновите `.env.local`:
```bash
NEXT_PUBLIC_TOLGEE_API_URL=http://localhost:8081
```

### 3. Запуск локальной разработки

#### Вариант 1: Автоматический (рекомендуется)

Создайте скрипт `scripts/dev-local.sh`:

```bash
#!/bin/bash

# Запуск локальной разработки с автоматическим port-forward

set -e

echo "🚀 Starting local development environment..."

# Запускаем port-forward в фоне
./scripts/k8s-port-forward.sh &
PORT_FORWARD_PID=$!

# Ждем, пока port-forward установится
sleep 3

# Запускаем Portal в режиме разработки
echo "📦 Starting Portal..."
cd packages/portal
pnpm dev &
PORTAL_PID=$!

# Запускаем Backend сервисы (если нужно)
# cd ../backend
# pnpm start:dev:arch-repo &
# ARCH_REPO_PID=$!

echo ""
echo "✅ Local development environment started!"
echo "   Portal: http://localhost:3000"
echo "   Kratos: http://localhost:4433"
echo "   Hydra: http://localhost:4444"
echo "   Hasura: http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop all services"

# Ожидаем завершения
trap "kill $PORT_FORWARD_PID $PORTAL_PID 2>/dev/null; exit" INT TERM
wait
```

#### Вариант 2: Ручной запуск

1. **Запустите port-forward:**
   ```bash
   ./scripts/k8s-port-forward.sh
   ```

2. **В отдельном терминале запустите Portal:**
   ```bash
   cd packages/portal
   pnpm dev
   ```

3. **В отдельном терминале запустите Backend (если нужно):**
   ```bash
   cd packages/backend
   pnpm start:dev:arch-repo
   ```

## Hot Reload

### Portal (Next.js)

Next.js автоматически поддерживает hot reload. Просто запустите:
```bash
cd packages/portal
pnpm dev
```

Изменения в коде автоматически подхватываются без перезапуска.

### Backend (NestJS)

NestJS также поддерживает hot reload через `--watch`:
```bash
cd packages/backend
pnpm start:dev:arch-repo  # Уже настроено с --watch
```

## Решение проблем

### Port уже занят

Если порт уже занят, либо:
1. Остановите процесс, использующий порт
2. Измените локальный порт в скрипте port-forward

### Ory не отвечает

1. Проверьте, что port-forward работает:
   ```bash
   curl http://localhost:4433/health/ready
   ```

2. Проверьте, что сервисы запущены в Kubernetes:
   ```bash
   kubectl get pods -n secure -l app=kratos
   kubectl get pods -n secure -l app=hydra
   ```

### CORS ошибки

Убедитесь, что в конфигурации Ory разрешены запросы с `http://localhost:3000`:

- Kratos: `allowed_return_urls` должен включать `http://localhost:3000/**`
- Hydra: `redirect_uris` должен включать `http://localhost:3000/oauth/callback`

## Альтернатива: Использование внешних URL

Если у вас есть внешние URL для сервисов (через Ingress), можно использовать их напрямую:

```bash
# .env.local
NEXT_PUBLIC_ORY_SDK_URL=https://auth.archpad.pro
NEXT_PUBLIC_HYDRA_PUBLIC_URL=https://authz.archpad.pro
NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT=https://apim.archpad.pro/v1/graphql
NEXT_PUBLIC_TOLGEE_API_URL=https://i18n.archpad.pro
```

**Преимущества:**
- Не нужно запускать port-forward
- Работает из любой сети

**Недостатки:**
- Требует доступ к интернету
- Может быть медленнее
- Нужны валидные TLS сертификаты

## Рекомендации

1. **Используйте port-forward для разработки** - быстрее и надежнее
2. **Настройте автоматический запуск** через скрипт `dev-local.sh`
3. **Держите `.env.local` в `.gitignore`** - не коммитьте секреты
4. **Используйте разные порты** для Hasura и Tolgee, если они оба нужны одновременно
