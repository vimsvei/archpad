# Настройка .env.local для локальной разработки

## Создание файла .env.local

Создайте файл `.env.local` в корне проекта со следующим содержимым:

```bash
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
# Tolgee (через port-forward, другой порт)
# ============================================
NEXT_PUBLIC_TOLGEE_API_URL=http://localhost:8081
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
# Если используете локальный PostgreSQL:
PG_HOST=localhost
PG_PORT=5432
PROJECT_DB=project_db
PROJECT_DB_USER=project_user
PROJECT_DB_PASSWORD=your-password
TENANT_DB=tenant_db

# Если используете PostgreSQL из Kubernetes через port-forward:
# Сначала добавьте port-forward для PostgreSQL:
# kubectl port-forward -n platform svc/postgres 5432:5432
# Затем используйте:
# PG_HOST=localhost
# PG_PORT=5432
```

## Где взять значения

### HASURA_GRAPHQL_ADMIN_SECRET

Получите из Vault:
```bash
VAULT_ADDR="https://vault.archpad.pro"
VAULT_TOKEN="your-vault-token"

curl -H "X-Vault-Token: ${VAULT_TOKEN}" \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/hasura-secret" | \
  jq -r '.data.data.HASURA_GRAPHQL_ADMIN_SECRET'
```

### NEXT_PUBLIC_TOLGEE_API_KEY

1. Запустите port-forward к Tolgee: `kubectl port-forward -n platform svc/tolgee 8081:8080`
2. Откройте http://localhost:8081
3. Войдите в Tolgee (используйте учетные данные из Vault)
4. Перейдите в Settings → API Keys
5. Создайте новый API ключ или используйте существующий

### VAULT_TOKEN

Используйте токен для доступа к Vault. Для локальной разработки можно использовать:
- Root token (только для разработки!)
- Или создайте отдельный токен с правами на чтение секретов

### PostgreSQL credentials

Получите из Vault:
```bash
curl -H "X-Vault-Token: ${VAULT_TOKEN}" \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/backend/common" | \
  jq -r '.data.data | {PROJECT_DB_USER, PROJECT_DB_PASSWORD}'

curl -H "X-Vault-Token: ${VAULT_TOKEN}" \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/backend/arch-repo-service" | \
  jq -r '.data.data.PROJECT_DB'
```

## Важные замечания

1. **`.env.local` в `.gitignore`** - файл уже должен быть в `.gitignore`, не коммитьте его в Git
2. **Секреты** - не делитесь этим файлом, он содержит чувствительные данные
3. **Port-forward** - убедитесь, что скрипт `k8s-port-forward.sh` запущен перед запуском приложения

## Проверка настроек

После создания `.env.local` и запуска port-forward, проверьте доступность сервисов:

```bash
# Kratos
curl http://localhost:4433/health/ready

# Hydra
curl http://localhost:4444/.well-known/openid-configuration

# Hasura
curl -H "x-hasura-admin-secret: ${HASURA_GRAPHQL_ADMIN_SECRET}" \
  http://localhost:8080/v1/graphql

# Tolgee
curl http://localhost:8081/actuator/health
```

## Автоматическая настройка (опционально)

Можно создать скрипт для автоматического создания `.env.local` из Vault:

```bash
#!/bin/bash
# scripts/generate-env-local.sh

VAULT_ADDR="${VAULT_ADDR:-https://vault.archpad.pro}"
VAULT_TOKEN="${VAULT_TOKEN:-}"

if [ -z "$VAULT_TOKEN" ]; then
  echo "ERROR: VAULT_TOKEN is not set"
  exit 1
fi

# Загружаем секреты из Vault и создаем .env.local
# (детали реализации зависят от структуры ваших секретов)
```
