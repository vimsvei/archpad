# Управление секретами

## Обзор

Все секреты хранятся в HashiCorp Vault и автоматически загружаются в поды через Vault Agent Injector с использованием Kubernetes Auth Method.

## Структура секретов в Vault

Секреты хранятся в KV v2 по следующей структуре:

```
kv/data/archpad/demo/
├── backend/
│   ├── common/              # Общие секреты для backend сервисов
│   ├── arch-repo-service/   # Секреты для arch-repo-service
│   ├── tenant-service/      # Секреты для tenant-service
│   └── hasura-sync-service/ # Секреты для hasura-sync-service
├── frontend/
│   └── portal/              # Секреты для Portal
├── hasura/
│   ├── hasura/              # Секреты для Hasura
│   └── secret/             # Hasura admin secret
├── ory/
│   ├── kratos/              # Секреты для Kratos
│   ├── hydra/               # Секреты для Hydra
│   └── oathkeeper/         # Секреты для Oathkeeper
├── tolgee/                  # Секреты для Tolgee
├── postgres/                # Секреты для PostgreSQL
└── container-register/      # Секреты для Container Registry
```

## Как это работает

### Vault Agent Injector

Когда Pod запускается с аннотациями Vault:

```yaml
annotations:
  vault.hashicorp.com/agent-inject: "true"
  vault.hashicorp.com/role: "platform"
```

Vault Agent Injector автоматически:
1. Создает sidecar контейнер (Vault Agent) в Pod'е
2. Получает ServiceAccount токен из Kubernetes
3. Аутентифицируется в Vault через Kubernetes Auth Method
4. Получает Vault токен с правами политики "archpad"
5. Читает секреты из Vault
6. Записывает секреты в файлы `/vault/secrets/...`
7. Приложение читает секреты из этих файлов

Подробнее см. [VAULT_SETUP.md](./VAULT_SETUP.md).

## Секреты по компонентам

### PostgreSQL (общие секреты)

**Путь:** `/v1/kv/data/archpad/demo/postgres`

**Ключи:**
- `POSTGRES_HOST` - IP адрес PostgreSQL кластера (например, `192.168.0.4`)
- `POSTGRES_PORT` - Порт PostgreSQL (например, `5432`)
- `POSTGRES_ENDPOINT` - Доменное имя PostgreSQL (для локальной разработки, например, `pg.archpad.pro`)

**Используется:** Hasura, Kratos, Hydra, Tolgee, Backend сервисы

**Важно:** 
- В Kubernetes используется `POSTGRES_HOST` (IP адрес), так как доменные имена могут не резолвиться внутри кластера
- Для локальной разработки (`NODE_ENV=local`) используется `POSTGRES_ENDPOINT` (может быть доменное имя)

**Обновление POSTGRES_HOST:**

Если сервисы подключаются к PostgreSQL по доменному имени вместо IP адреса, обновите секрет в Vault:

```bash
VAULT_ADDR="https://vault.archpad.pro"
VAULT_TOKEN="<your-token>"

curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "POSTGRES_ENDPOINT": "pg.archpad.pro",
      "POSTGRES_HOST": "192.168.0.4",
      "POSTGRES_PORT": "5432"
    }
  }' \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/postgres"
```

После обновления перезапустите поды сервисов:
```bash
kubectl delete pod -n platform -l app=arch-repo-service
kubectl delete pod -n platform -l app=tenant-service
```

### Backend Services

#### arch-repo-service

**Путь:** `/v1/kv/data/archpad/demo/backend/arch-repo-service`

**Дополнительные пути:**
- `/v1/kv/data/archpad/demo/backend/common` - общие секреты
- `/v1/kv/data/archpad/demo/postgres` - PostgreSQL

#### tenant-service

**Путь:** `/v1/kv/data/archpad/demo/backend/tenant-service`

**Дополнительные пути:**
- `/v1/kv/data/archpad/demo/backend/common` - общие секреты
- `/v1/kv/data/archpad/demo/postgres` - PostgreSQL

#### hasura-sync-service

**Путь:** `/v1/kv/data/archpad/demo/backend/hasura-sync-service`

**Дополнительные пути:**
- `/v1/kv/data/archpad/demo/hasura/secret` - Hasura admin secret
- `/v1/kv/data/archpad/demo/backend/common` - общие секреты
- `/v1/kv/data/archpad/demo/postgres` - PostgreSQL

### Frontend (Portal)

**Путь:** `/v1/kv/data/archpad/demo/frontend/portal`

**Ключи:**
- `NEXT_PUBLIC_URL` - публичный URL Portal
- `NEXT_PUBLIC_ORY_SDK_URL` - публичный URL Kratos SDK
- `NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT` - публичный URL Hasura GraphQL
- `NEXT_PUBLIC_TOLGEE_API_URL` - публичный URL Tolgee API
- `NEXT_PUBLIC_TOLGEE_API_KEY` - API ключ Tolgee (хранится отдельно, см. ниже)
- `NEXT_PUBLIC_API_GRAPHQL_ENDPOINT` - опционально, публичный URL API Gateway
- `API_GATEWAY_INTERNAL_URL` - опционально, внутренний URL API Gateway

**Дополнительные пути (используются Vault Agent Injector):**
- `/v1/kv/data/archpad/demo/hasura/endpoint` - `HASURA_INTERNAL_URL`
- `/v1/kv/data/archpad/demo/hasura/secret` - `HASURA_GRAPHQL_ADMIN_SECRET` (берется из Hasura секрета, не из Portal)
- `/v1/kv/data/archpad/demo/ory/kratos/endpoint` - `ORY_KRATOS_INTERNAL_URL`
- `/v1/kv/data/archpad/demo/tolgee/api-key` - `NEXT_PUBLIC_TOLGEE_API_KEY` (хранится отдельно)

**Примечание:** 
- Переменные с префиксом `NEXT_PUBLIC_*` доступны в браузере, остальные - только на сервере.
- `HASURA_GRAPHQL_ADMIN_SECRET` теперь берется из `kv/data/archpad/demo/hasura/secret`, а не из секрета Portal.

### Hasura

**Путь:** `/v1/kv/data/archpad/demo/hasura`

**Ключи:**
- `HASURA_USER` - имя пользователя PostgreSQL
- `HASURA_DB_PASSWORD` - пароль пользователя PostgreSQL
- `HASURA_DB` - имя базы данных для метаданных Hasura
- `PROJECT_DB` - имя базы данных для проектов
- `TENANT_DB` - имя базы данных для tenant'ов

**Дополнительный путь:**
- `/v1/kv/data/archpad/demo/hasura/secret` - `HASURA_GRAPHQL_ADMIN_SECRET`

**Дополнительные пути:**
- `/v1/kv/data/archpad/demo/postgres` - PostgreSQL

### Tolgee

**Путь:** `/v1/kv/data/archpad/demo/tolgee`

**Ключи:**
- `TOLGEE_DB_USER` - имя пользователя PostgreSQL
- `TOLGEE_DB_PASSWORD` - пароль пользователя PostgreSQL
- `TOLGEE_DB` - имя базы данных
- `TOLGEE_ADMIN_USER` - имя начального администратора
- `TOLGEE_ADMIN_PASSWORD` - пароль начального администратора

**Дополнительные пути:**
- `/v1/kv/data/archpad/demo/postgres` - PostgreSQL

**Примечание:** `TOLGEE_API_KEY` создается в интерфейсе Tolgee после первого входа администратора.

### Ory (Kratos, Hydra, Oathkeeper)

#### Kratos

**Путь:** `/v1/kv/data/archpad/demo/ory/kratos`

**Ключи:**
- `KRATOS_DB_USER` - имя пользователя PostgreSQL
- `KRATOS_DB_PASSWORD` - пароль пользователя PostgreSQL
- `KRATOS_DB` - имя базы данных
- `KRATOS_SECRET` - секрет для подписи сессий и токенов
- `SMTP_CONNECTION_URI` - URI подключения к SMTP серверу
- `SMTP_FROM_ADDRESS` - адрес отправителя email

**Дополнительные пути:**
- `/v1/kv/data/archpad/demo/postgres` - PostgreSQL

**DSN формируется автоматически:** `postgres://{KRATOS_DB_USER}:{KRATOS_DB_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{KRATOS_DB}?sslmode=disable&max_conns=20&max_idle_conns=4`

#### Hydra

**Путь:** `/v1/kv/data/archpad/demo/ory/hydra`

**Ключи:**
- `HYDRA_DB_USER` - имя пользователя PostgreSQL
- `HYDRA_DB_PASSWORD` - пароль пользователя PostgreSQL
- `HYDRA_DB` - имя базы данных
- `SECRETS_SYSTEM` - системный секрет для Hydra

**Дополнительные пути:**
- `/v1/kv/data/archpad/demo/postgres` - PostgreSQL

**DSN формируется автоматически:** `postgres://{HYDRA_DB_USER}:{HYDRA_DB_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{HYDRA_DB}?sslmode=disable&max_conns=20&max_idle_conns=4`

#### Oathkeeper

**Путь:** `/v1/kv/data/archpad/demo/ory/oauthkeeper`

**Ключи:**
- `ORY_CLIENT_ID` - ID OAuth2 клиента для introspection
- `ORY_CLIENT_SECRET` - секрет OAuth2 клиента для introspection

**Примечание:** Oathkeeper не использует БД напрямую, только OAuth2 клиент для подключения к Hydra.

### Container Registry

**Путь:** `/v1/kv/data/container-register`

**Ключи:**
- `REGISTRY_URL` - URL Container Registry
- `REGISTRY_USERNAME` - имя пользователя
- `REGISTRY_PASSWORD` - пароль или токен доступа

**Использование:** Секрет автоматически синхронизируется в Kubernetes Secret `archpad-registry-secret` через Job `registry-secret-sync`.

## Создание и обновление секретов

### Через Vault API

```bash
VAULT_ADDR="https://vault.archpad.pro"
VAULT_TOKEN="<your-token>"

# Пример: создание секрета для Portal
curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "NEXT_PUBLIC_URL": "https://portal.archpad.pro",
      "NEXT_PUBLIC_ORY_SDK_URL": "https://auth.archpad.pro",
      "NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT": "https://apim.archpad.pro/v1/graphql",
      "NEXT_PUBLIC_TOLGEE_API_URL": "https://i18n.archpad.pro",
      "NEXT_PUBLIC_TOLGEE_API_KEY": "tgpak_...",
      "NEXT_PUBLIC_API_GRAPHQL_ENDPOINT": "https://api.archpad.pro/graphql"
    }
  }' \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/frontend/portal"
```

### Через Vault UI

1. Откройте Vault UI: `https://vault.archpad.pro`
2. Перейдите в нужный путь секрета
3. Добавьте или обновите значения
4. Сохраните изменения

### Через Vault CLI

```bash
# Установка Vault CLI (если не установлен)
# brew install vault  # macOS
# или скачайте с https://www.vaultproject.io/downloads

# Логин в Vault
export VAULT_ADDR="https://vault.archpad.pro"
export VAULT_TOKEN="<your-token>"

# Создание/обновление секрета
vault kv put kv/archpad/demo/frontend/portal \
  NEXT_PUBLIC_URL="https://portal.archpad.pro" \
  NEXT_PUBLIC_ORY_SDK_URL="https://auth.archpad.pro"

# Просмотр секрета
vault kv get kv/archpad/demo/frontend/portal
```

## Применение изменений

После обновления секрета в Vault:

1. **Автоматически:** Vault Agent перезагрузит секреты при следующем обновлении токена (обычно каждые 1 час)

2. **Вручную:** Перезапустите поды:
```bash
# Перезапустить конкретный сервис
kubectl delete pod -n platform -l app=arch-repo-service

# Перезапустить все поды в namespace
kubectl delete pod -n platform --all
```

## Проверка секретов

### Проверка в Vault

```bash
# Через Vault CLI
vault kv get kv/archpad/demo/frontend/portal

# Через Vault API
curl -H "X-Vault-Token: ${VAULT_TOKEN}" \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/frontend/portal" | jq
```

### Проверка в Pod'е

```bash
# Проверить, что секреты загружены
kubectl exec -n platform -l app=arch-repo-service -c arch-repo-service -- \
  cat /vault/secrets/arch-repo-service

# Проверить логи Vault Agent
kubectl logs -n platform -l app=arch-repo-service -c vault-agent --tail=50
```

## Безопасность

1. **Не коммитьте секреты в Git** - все секреты должны быть в Vault
2. **Используйте ограниченные токены** - для доступа к Vault используйте токены с минимальными правами
3. **Ротация секретов** - регулярно обновляйте пароли и токены
4. **Аудит** - включите аудит в Vault для отслеживания доступа
5. **Принцип наименьших привилегий** - каждый сервис имеет доступ только к нужным секретам

## Troubleshooting

### Секреты не загружаются

1. Проверьте логи Vault Agent:
```bash
kubectl logs -n platform -l app=arch-repo-service -c vault-agent --tail=50
```

2. Проверьте, что ServiceAccount существует:
```bash
kubectl get serviceaccount arch-repo-service -n platform
```

3. Проверьте, что Vault роль настроена:
```bash
kubectl logs job/hasura-vault-role -n platform
```

### Секреты не обновляются

1. Перезапустите поды (см. выше)
2. Проверьте, что секрет обновлен в Vault
3. Проверьте логи Vault Agent на наличие ошибок

## Дополнительная документация

- [Vault Setup](./VAULT_SETUP.md) - полная настройка Vault
- [Deployment](./DEPLOYMENT.md) - развертывание компонентов
