# Быстрый старт локальной разработки

## Шаг 1: Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```bash
# Ory Kratos
NEXT_PUBLIC_ORY_SDK_URL=http://localhost:4433
ORY_KRATOS_PUBLIC_URL=http://localhost:4433

# Ory Hydra
NEXT_PUBLIC_HYDRA_PUBLIC_URL=http://localhost:4444
NEXT_PUBLIC_OAUTH_CLIENT_ID=archpad-portal
NEXT_PUBLIC_OAUTH_REDIRECT_URI=http://localhost:3000/oauth/callback

# Hasura
NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT=http://localhost:8080/v1/graphql
HASURA_ENDPOINT=http://localhost:8080
HASURA_GRAPHQL_ADMIN_SECRET=your-secret

# Tolgee
NEXT_PUBLIC_TOLGEE_API_URL=http://localhost:8081
NEXT_PUBLIC_TOLGEE_API_KEY=your-key

# Portal
NEXT_PUBLIC_URL=http://localhost:3000

# Vault (для backend)
VAULT_ADDR=https://vault.archpad.pro
VAULT_TOKEN=your-token
```

## Шаг 2: Запуск

### Вариант A: Автоматический (рекомендуется)

```bash
./scripts/dev-local.sh
```

Этот скрипт:
- Запустит port-forward ко всем сервисам
- Запустит Portal в режиме разработки
- Поддержит hot reload

### Вариант B: Ручной

1. **В первом терминале - port-forward:**
   ```bash
   ./scripts/k8s-port-forward.sh
   ```

2. **Во втором терминале - Portal:**
   ```bash
   cd packages/portal
   pnpm dev
   ```

3. **В третьем терминале - Backend (опционально):**
   ```bash
   cd packages/backend
   pnpm start:dev:arch-repo
   ```

## Доступные сервисы

После запуска будут доступны:

- **Portal**: http://localhost:3000
- **Kratos**: http://localhost:4433
- **Hydra**: http://localhost:4444
- **Hasura**: http://localhost:8080
- **Tolgee**: http://localhost:8081
- **Mailpit**: http://localhost:8025

## Hot Reload

✅ **Portal (Next.js)** - автоматический hot reload  
✅ **Backend (NestJS)** - автоматический hot reload через `--watch`

## Остановка

Нажмите `Ctrl+C` в терминале, где запущен скрипт. Все процессы будут корректно остановлены.

## Решение проблем

### Port уже занят

Измените порт в скрипте `k8s-port-forward.sh` или остановите процесс, использующий порт.

### Сервисы не отвечают

Проверьте, что сервисы запущены в Kubernetes:
```bash
kubectl get pods -n secure -l app=kratos
kubectl get pods -n platform -l app=hasura
```

Подробнее см. [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md)
