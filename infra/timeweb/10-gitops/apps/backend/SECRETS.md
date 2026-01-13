# Backend Services Secrets

## Общая информация

Все backend сервисы используют библиотеку `@archpad/vault-config` для загрузки секретов из Vault.
Для подключения к Vault используется **Vault Agent Injector** с Kubernetes Auth (как у Hasura/Tolgee).

## Структура секретов

Каждый сервис использует несколько секретов из Vault:

### arch-repo-service
Использует 3 секрета:
1. `/v1/kv/data/archpad/demo/backend/arch-repo-service` - специфичные для сервиса
2. `/v1/kv/data/archpad/demo/backend/common` - общие для всех backend сервисов
3. `/v1/kv/data/archpad/demo/postgres` - общие для всех сервисов (PostgreSQL)

### tenant-service
Использует 3 секрета:
1. `/v1/kv/data/archpad/demo/backend/tenant-service` - специфичные для сервиса
2. `/v1/kv/data/archpad/demo/backend/common` - общие для всех backend сервисов
3. `/v1/kv/data/archpad/demo/postgres` - общие для всех сервисов (PostgreSQL)

### hasura-sync-service
Использует 4 секрета:
1. `/v1/kv/data/archpad/demo/backend/hasura-sync-service` - специфичные для сервиса
2. `/v1/kv/data/archpad/demo/hasura-secret` - секреты Hasura (HASURA_GRAPHQL_ADMIN_SECRET)
3. `/v1/kv/data/archpad/demo/backend/common` - общие для всех backend сервисов
4. `/v1/kv/data/archpad/demo/postgres` - общие для всех сервисов (PostgreSQL)

---

## 1. arch-repo-service

### Секреты в Vault

#### `/v1/kv/data/archpad/demo/backend/arch-repo-service`
- **`PROJECT_DB`** - имя базы данных для проектов (например, `project_db`)

#### `/v1/kv/data/archpad/demo/backend/common`
- **`PROJECT_DB_USER`** - имя пользователя PostgreSQL (например, `project_user`)
- **`PROJECT_DB_PASSWORD`** - пароль пользователя PostgreSQL

#### `/v1/kv/data/archpad/demo/postgres`
- **`POSTGRES_ENDPOINT`** - хост PostgreSQL для local development (может быть доменное имя, например `pg.archpad.pro`)
- **`POSTGRES_HOST`** - хост PostgreSQL для production/Kubernetes (IP адрес PostgreSQL кластера, например `192.168.0.4`)
  - **Важно:** Внутри Kubernetes кластера нужно использовать IP адрес, а не доменное имя
- **`POSTGRES_PORT`** - порт PostgreSQL (по умолчанию `5432`)

**Логика использования:**
- **Local development (`NODE_ENV=local`):** используется `POSTGRES_ENDPOINT`
- **Production/Kubernetes:** используется `POSTGRES_HOST`

### Переменные окружения (не секреты)
- **`NODE_ENV`** - окружение (`production`, `development`, `local`)
- **`PORT`** - порт приложения (по умолчанию `3000`)

---

## 2. tenant-service

### Секреты в Vault

#### `/v1/kv/data/archpad/demo/backend/tenant-service`
- **`TENANT_DB`** - имя базы данных для tenants (например, `tenant_db`, по умолчанию `tenant`)

#### `/v1/kv/data/archpad/demo/backend/common`
- **`PROJECT_DB_USER`** - имя пользователя PostgreSQL (общий с arch-repo-service)
- **`PROJECT_DB_PASSWORD`** - пароль пользователя PostgreSQL (общий с arch-repo-service)

#### `/v1/kv/data/archpad/demo/postgres`
- **`POSTGRES_ENDPOINT`** - хост PostgreSQL (для production)
- **`POSTGRES_PORT`** - порт PostgreSQL (по умолчанию `5432`)

### Переменные окружения (не секреты)
- **`NODE_ENV`** - окружение (`production`, `development`, `local`)
- **`PORT`** - порт приложения (по умолчанию `3000`)

---

## 3. hasura-sync-service

### Секреты в Vault

#### `/v1/kv/data/archpad/demo/backend/hasura-sync-service`
- **`HASURA_ENDPOINT`** - внутренний адрес Hasura (например, `http://hasura.platform.svc:8080`)
- **`HASURA_SOURCE`** - имя источника данных в Hasura (например, `default`)
- **`HASURA_SCHEMA`** - имя схемы PostgreSQL (например, `public`)
- **`HASURA_RENAME_COLUMNS_CAMELCASE`** - переименовывать ли колонки в camelCase (по умолчанию `true`, опционально)
- **`HASURA_APPLY_DEFAULT_PERMISSIONS`** - применять ли дефолтные права доступа (по умолчанию `true`, опционально)
- **`HASURA_DEFAULT_ROLE`** - дефолтная роль для прав доступа (по умолчанию `user`, опционально)

#### `/v1/kv/data/archpad/demo/hasura-secret`
- **`HASURA_GRAPHQL_ADMIN_SECRET`** - секретный ключ администратора Hasura

#### `/v1/kv/data/archpad/demo/backend/common`
- **`PROJECT_DB_USER`** - имя пользователя PostgreSQL
- **`PROJECT_DB_PASSWORD`** - пароль пользователя PostgreSQL

#### `/v1/kv/data/archpad/demo/postgres`
- **`POSTGRES_ENDPOINT`** - хост PostgreSQL
- **`POSTGRES_PORT`** - порт PostgreSQL

### Переменные окружения (не секреты)
- **`NODE_ENV`** - окружение (`production`, `development`, `local`)

**Примечание:** `hasura-sync-service` - это Job, который запускается периодически для синхронизации схемы БД с Hasura. Он не слушает порт.

---

## Container Registry (TimeWeb)

Для сборки и пуша Docker образов нужны:

- **`REGISTRY_URL`** - URL Container Registry TimeWeb (например, `archpad-cr.registry.twcstorage.ru`)
- **`REGISTRY_USERNAME`** - имя пользователя для Registry
- **`REGISTRY_PASSWORD`** - API токен для Registry

**Секрет в Vault:**
- Путь: `/v1/kv/data/container-register`
- Ключи: `REGISTRY_URL`, `REGISTRY_USERNAME`, `REGISTRY_PASSWORD`

**Автоматическая синхронизация:**
Секрет автоматически синхронизируется из Vault в Kubernetes через Job `registry-secret-sync`.
Job запускается автоматически при каждой синхронизации ArgoCD (PreSync hook).

Эти секреты используются:
- В GitLab CI/CD для `docker login` и `docker push`
- В Kubernetes для загрузки образов (через `imagePullSecrets` в ServiceAccounts)

---

---

## Пример создания секретов через Vault API

```bash
VAULT_ADDR="https://vault.archpad.pro"
VAULT_TOKEN="<your-root-token>"

# Общие секреты для всех backend сервисов
curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "PROJECT_DB_USER": "project_user",
      "PROJECT_DB_PASSWORD": "your-secure-password"
    }
  }' \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/backend/common"

# Секреты для arch-repo-service
curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "PROJECT_DB": "project_db"
    }
  }' \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/backend/arch-repo-service"

# Секреты для tenant-service
curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "TENANT_DB": "tenant_db"
    }
  }' \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/backend/tenant-service"

# Секреты для hasura-sync-service
curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "HASURA_ENDPOINT": "http://hasura.platform.svc:8080",
      "HASURA_SOURCE": "default",
      "HASURA_SCHEMA": "public",
      "HASURA_RENAME_COLUMNS_CAMELCASE": "true",
      "HASURA_APPLY_DEFAULT_PERMISSIONS": "true",
      "HASURA_DEFAULT_ROLE": "user"
    }
  }' \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/backend/hasura-sync-service"

# Секреты Hasura (используется также hasura-sync-service)
curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "HASURA_GRAPHQL_ADMIN_SECRET": "your-hasura-admin-secret"
    }
  }' \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/hasura-secret"

# Секреты для Container Registry
curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "REGISTRY_URL": "archpad-cr.registry.twcstorage.ru",
      "REGISTRY_USERNAME": "your-username",
      "REGISTRY_PASSWORD": "your-api-token"
    }
  }' \
  "${VAULT_ADDR}/v1/kv/data/container-register"
```

**Примечание:** Секреты для PostgreSQL (`POSTGRES_ENDPOINT`, `POSTGRES_PORT`) должны быть уже созданы в `/v1/kv/data/archpad/demo/postgres` (используются также Hasura и Tolgee).

**Важно для Kubernetes:** В секрете `/v1/kv/data/archpad/demo/postgres` должны быть оба значения:
- `POSTGRES_ENDPOINT` - для local development (может быть доменное имя, например `pg.archpad.pro`)
- `POSTGRES_HOST` - для production/Kubernetes (IP адрес PostgreSQL кластера, например `192.168.0.4`)

**Обновление секрета PostgreSQL в Vault:**

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

После обновления секрета в Vault, перезапустите поды сервисов для применения изменений:

```bash
kubectl delete pod -n platform -l app=arch-repo-service
kubectl delete pod -n platform -l app=tenant-service
kubectl delete pod -n platform -l app=hasura-sync-service
```

---

## Vault Kubernetes Auth Role

Для backend сервисов нужно добавить ServiceAccount'ы в Vault роль `platform` (которая уже используется для Hasura и Tolgee).

ServiceAccount'ы:
- `arch-repo-service`
- `tenant-service`
- `hasura-sync-service`

Они должны быть добавлены в `bound_service_account_names` для роли `platform` в Vault.
