# Структура секретов Vault

Этот документ описывает полную структуру всех секретов, хранящихся в HashiCorp Vault для системы Archpad.

**Важно:** Этот документ содержит только структуру и названия переменных, **без реальных значений**.

## Базовый путь

Все секреты хранятся в KV v2 по базовому пути:
```
kv/data/archpad/demo/
```

Для production окружения путь будет: `kv/data/archpad/production/`

---

## 1. PostgreSQL

### 1.1. Подключение к PostgreSQL
**Путь:** `kv/data/archpad/demo/postgres/connect`

**Переменные:**
- `POSTGRES_HOST` - IP адрес или hostname PostgreSQL сервера
- `POSTGRES_PORT` - Порт PostgreSQL (обычно `5432`)
- `POSTGRES_ENDPOINT` - Доменное имя PostgreSQL (для локальной разработки)

**Используется в:** Все сервисы, работающие с PostgreSQL

---

### 1.2. Учетные данные PostgreSQL
**Путь:** `kv/data/archpad/demo/postgres/credential`

**Переменные:**
- `POSTGRES_USER` - Пользователь PostgreSQL
- `POSTGRES_PASSWORD` - Пароль PostgreSQL

**Используется в:** pgAdmin, для подключения к PostgreSQL

---

## 2. Backend Services

### 2.1. Общие секреты Backend
**Путь:** `kv/data/archpad/demo/backend/common`

**Переменные:**
- `PROJECT_DB_USER` - Пользователь базы данных для backend сервисов
- `PROJECT_DB_PASSWORD` - Пароль базы данных для backend сервисов

**Используется в:** Все backend сервисы (arch-repo-service, tenant-service, hasura-sync-service)

---

### 2.2. Arch Repo Service
**Путь:** `kv/data/archpad/demo/backend/arch-repo-service`

**Переменные:**
- `PROJECT_DB` - Имя базы данных для arch-repo-service

**Дополнительные секреты:**
- `kv/data/archpad/demo/backend/common` - общие секреты backend
- `kv/data/archpad/demo/postgres/connect` - подключение к PostgreSQL

**Используется в:** `infra/timeweb/10-gitops/apps/backend/arch-repo-service/arch-repo-service.deployment.yaml`

---

### 2.3. Tenant Service
**Путь:** `kv/data/archpad/demo/backend/tenant-service`

**Переменные:**
- `TENANT_DB` - Имя базы данных для tenant-service

**Дополнительные секреты:**
- `kv/data/archpad/demo/backend/common` - общие секреты backend
- `kv/data/archpad/demo/postgres/connect` - подключение к PostgreSQL

**Используется в:** `infra/timeweb/10-gitops/apps/backend/tenant-service/tenant-service.deployment.yaml`

---

### 2.4. Hasura Sync Service
**Путь:** `kv/data/archpad/demo/backend/hasura-sync-service`

**Переменные:**
- `HASURA_SOURCE` - Источник данных для синхронизации
- `HASURA_SCHEMA` - Схема для синхронизации
- `HASURA_RENAME_COLUMNS_CAMELCASE` - (опционально) Переименование колонок в camelCase
- `HASURA_APPLY_DEFAULT_PERMISSIONS` - (опционально) Применение дефолтных прав
- `HASURA_DEFAULT_ROLE` - (опционально) Дефолтная роль

**Дополнительные секреты:**
- `kv/data/archpad/demo/hasura/secret` - `HASURA_GRAPHQL_ADMIN_SECRET`
- `kv/data/archpad/demo/hasura/endpoint` - `HASURA_INTERNAL_URL`
- `kv/data/archpad/demo/backend/common` - общие секреты backend
- `kv/data/archpad/demo/postgres/connect` - подключение к PostgreSQL

**Используется в:** `infra/timeweb/10-gitops/apps/backend/hasura-sync-service/hasura-sync-service.job.yaml`

---

## 3. Frontend (Portal)

### 3.1. Portal Configuration
**Путь:** `kv/data/archpad/demo/frontend/portal`

**Переменные:**
- `NEXT_PUBLIC_URL` - Публичный URL Portal
- `NEXT_PUBLIC_ORY_SDK_URL` - Публичный URL Ory Kratos SDK
- `NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT` - Публичный URL Hasura GraphQL endpoint
- `NEXT_PUBLIC_TOLGEE_API_URL` - Публичный URL Tolgee API
- `NEXT_PUBLIC_API_GRAPHQL_ENDPOINT` - (опционально) Публичный URL API Gateway GraphQL endpoint
- `NEXT_PUBLIC_API_REST_ENDPOINT` - (опционально) Публичный URL API Gateway REST endpoint
- `NEXT_PUBLIC_HYDRA_PUBLIC_URL` - (опционально) Публичный URL Hydra
- `NEXT_PUBLIC_OAUTH_CLIENT_ID` - (опционально) OAuth2 Client ID
- `NEXT_PUBLIC_OAUTH_REDIRECT_URI` - (опционально) OAuth2 Redirect URI
- `API_GATEWAY_INTERNAL_URL` - (опционально) Внутренний URL API Gateway

**Дополнительные секреты:**
- `kv/data/archpad/demo/hasura/endpoint` - `HASURA_INTERNAL_URL`
- `kv/data/archpad/demo/hasura/secret` - `HASURA_GRAPHQL_ADMIN_SECRET`
- `kv/data/archpad/demo/ory/kratos/endpoint` - `ORY_KRATOS_INTERNAL_URL`
- `kv/data/archpad/demo/tolgee/api-key` - `NEXT_PUBLIC_TOLGEE_API_KEY`

**Примечание:** 
- Переменные с префиксом `NEXT_PUBLIC_*` доступны в браузере
- `HASURA_GRAPHQL_ADMIN_SECRET` берется из `kv/data/archpad/demo/hasura/secret`, не из секрета Portal

**Используется в:** 
- `infra/timeweb/10-gitops/apps/frontend/portal/portal.deployment.yaml`
- `.gitlab-ci.yml` (для сборки Portal)

---

### 3.2. Tolgee API Key
**Путь:** `kv/data/archpad/demo/tolgee/api-key`

**Переменные:**
- `NEXT_PUBLIC_TOLGEE_API_KEY` - API ключ для доступа к Tolgee API

**Используется в:** Portal, GitLab CI

---

## 4. Hasura

### 4.1. Hasura Database
**Путь:** `kv/data/archpad/demo/hasura/db`

**Переменные:**
- `HASURA_DB` - Имя базы данных для метаданных Hasura
- `HASURA_DB_USER` - Пользователь базы данных Hasura
- `HASURA_DB_PASSWORD` - Пароль базы данных Hasura

**Дополнительные секреты:**
- `kv/data/archpad/demo/hasura/secret` - `HASURA_GRAPHQL_ADMIN_SECRET`
- `kv/data/archpad/demo/hasura/endpoint` - `HASURA_INTERNAL_URL`
- `kv/data/archpad/demo/postgres/connect` - подключение к PostgreSQL

**Используется в:** `infra/timeweb/10-gitops/apps/hasura/hasura.deployment.yaml`

---

### 4.2. Hasura Admin Secret
**Путь:** `kv/data/archpad/demo/hasura/secret`

**Переменные:**
- `HASURA_GRAPHQL_ADMIN_SECRET` - Секретный ключ администратора Hasura

**Используется в:** Hasura, Portal, Hasura Sync Service

---

### 4.3. Hasura Endpoint
**Путь:** `kv/data/archpad/demo/hasura/endpoint`

**Переменные:**
- `HASURA_INTERNAL_URL` - Внутренний URL Hasura (например, `http://hasura.platform.svc:8080`)

**Используется в:** Hasura, Portal, Hasura Sync Service

---

## 5. Tolgee (i18n)

### 5.1. Tolgee Database
**Путь:** `kv/data/archpad/demo/tolgee/db`

**Переменные:**
- `TOLGEE_DB` - Имя базы данных Tolgee
- `TOLGEE_DB_USER` - Пользователь базы данных Tolgee
- `TOLGEE_DB_PASSWORD` - Пароль базы данных Tolgee

**Дополнительные секреты:**
- `kv/data/archpad/demo/tolgee/admin` - учетные данные администратора
- `kv/data/archpad/demo/postgres/connect` - подключение к PostgreSQL

**Используется в:** `infra/timeweb/10-gitops/apps/tolgee/tolgee.deployment.yaml`

---

### 5.2. Tolgee Admin
**Путь:** `kv/data/archpad/demo/tolgee/admin`

**Переменные:**
- `TOLGEE_ADMIN_USER` - Имя администратора Tolgee
- `TOLGEE_ADMIN_PASSWORD` - Пароль администратора Tolgee

**Используется в:** `infra/timeweb/10-gitops/apps/tolgee/tolgee.deployment.yaml`

---

## 6. Ory Services

### 6.1. Kratos - Database
**Путь:** `kv/data/archpad/demo/ory/kratos/db`

**Переменные:**
- `KRATOS_DB` - Имя базы данных Kratos
- `KRATOS_DB_USER` - Пользователь базы данных Kratos
- `KRATOS_DB_PASSWORD` - Пароль базы данных Kratos

**Дополнительные секреты:**
- `kv/data/archpad/demo/ory/kratos/secret` - `KRATOS_SECRET`
- `kv/data/archpad/demo/ory/kratos/other` - `SMTP_CONNECTION_URI`, `SMTP_FROM_ADDRESS`
- `kv/data/archpad/demo/ory/kratos/endpoint` - `ORY_KRATOS_INTERNAL_URL`
- `kv/data/archpad/demo/postgres/connect` - подключение к PostgreSQL

**DSN формируется автоматически:** `postgres://{KRATOS_DB_USER}:{KRATOS_DB_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{KRATOS_DB}?sslmode=disable&max_conns=20&max_idle_conns=4`

**Используется в:** `infra/timeweb/10-gitops/apps/ory/kratos/kratos.deployment.yaml`

---

### 6.2. Kratos - Secret
**Путь:** `kv/data/archpad/demo/ory/kratos/secret`

**Переменные:**
- `KRATOS_SECRET` - Секретный ключ для подписи cookies и токенов

**Используется в:** Kratos

---

### 6.3. Kratos - Other Settings
**Путь:** `kv/data/archpad/demo/ory/kratos/other`

**Переменные:**
- `SMTP_CONNECTION_URI` - URI подключения к SMTP серверу для отправки email
- `SMTP_FROM_ADDRESS` - Адрес отправителя email

**Примечание:** Если не указаны, используются значения по умолчанию:
- `SMTP_CONNECTION_URI`: `smtp://mailpit.platform.svc.cluster.local:1025/?disable_starttls=true`
- `SMTP_FROM_ADDRESS`: `no-reply@archpad.pro`

**Используется в:** Kratos

---

### 6.4. Kratos - Endpoint
**Путь:** `kv/data/archpad/demo/ory/kratos/endpoint`

**Переменные:**
- `ORY_KRATOS_INTERNAL_URL` - Внутренний URL Kratos (например, `http://kratos.secure.svc:4433`)

**Используется в:** Portal, Kratos

---

### 6.5. Hydra - Database
**Путь:** `kv/data/archpad/demo/ory/hydra/db`

**Переменные:**
- `HYDRA_DB` - Имя базы данных Hydra
- `HYDRA_DB_USER` - Пользователь базы данных Hydra
- `HYDRA_DB_PASSWORD` - Пароль базы данных Hydra

**Дополнительные секреты:**
- `kv/data/archpad/demo/ory/hydra/secret` - `SECRETS_SYSTEM`
- `kv/data/archpad/demo/postgres/connect` - подключение к PostgreSQL

**DSN формируется автоматически:** `postgres://{HYDRA_DB_USER}:{HYDRA_DB_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{HYDRA_DB}?sslmode=disable&max_conns=20&max_idle_conns=4`

**Используется в:** 
- `infra/timeweb/10-gitops/apps/ory/hydra/hydra.deployment.yaml`
- `infra/timeweb/10-gitops/apps/ory/hydra/hydra-migrate.job.yaml`

---

### 6.6. Hydra - Secret
**Путь:** `kv/data/archpad/demo/ory/hydra/secret`

**Переменные:**
- `SECRETS_SYSTEM` - Системный секрет для шифрования токенов

**Используется в:** Hydra

---

### 6.7. Oathkeeper
**Путь:** `kv/data/archpad/demo/ory/oathkeeper`

**Переменные:**
- Все ключи из этого секрета экспортируются как переменные окружения динамически

**Примечание:** Обычно содержит:
- `ORY_CLIENT_ID` - ID OAuth2 клиента для introspection
- `ORY_CLIENT_SECRET` - Секрет OAuth2 клиента для introspection

**Используется в:** `infra/timeweb/10-gitops/apps/ory/oathkeeper/oathkeeper.deployment.yaml`

---

## 7. Monitoring

### 7.1. Grafana - Admin
**Путь:** `kv/data/archpad/demo/grafana/admin`

**Переменные:**
- `GRAFANA_ADMIN_USER` - Имя администратора Grafana
- `GRAFANA_ADMIN_PASSWORD` - Пароль администратора Grafana

**Дополнительные секреты:**
- `kv/data/archpad/demo/grafana/db` - конфигурация базы данных
- `kv/data/archpad/demo/postgres/connect` - подключение к PostgreSQL

**Используется в:** `infra/timeweb/10-gitops/apps/monitoring/grafana/grafana.deployment.yaml`

---

### 7.2. Grafana - Database
**Путь:** `kv/data/archpad/demo/grafana/db`

**Переменные:**
- `GRAFANA_DB` - Имя базы данных Grafana
- `GRAFANA_DB_USER` - Пользователь базы данных Grafana
- `GRAFANA_DB_PASSWORD` - Пароль базы данных Grafana

**Дополнительные секреты:**
- `kv/data/archpad/demo/postgres/connect` - подключение к PostgreSQL

**Используется в:** Grafana

---

## 8. Database Management

### 8.1. pgAdmin
**Путь:** `kv/data/archpad/demo/pgadmin`

**Переменные:**
- `PGADMIN_ADMIN_USER` - Email администратора pgAdmin
- `PGADMIN_DEFAULT_PASSWORD` - Пароль администратора pgAdmin

**Дополнительные секреты:**
- `kv/data/archpad/demo/postgres/connect` - подключение к PostgreSQL
- `kv/data/archpad/demo/postgres/credential` - учетные данные PostgreSQL

**Используется в:** `infra/timeweb/10-gitops/apps/pgadmin/pgadmin.deployment.yaml`

---

## 9. Container Registry

### 9.1. Container Registry Credentials
**Путь:** `kv/data/archpad/container-register`

**Переменные:**
- `REGISTRY_URL` - URL контейнерного реестра
- `REGISTRY_USERNAME` - Имя пользователя для доступа к реестру
- `REGISTRY_PASSWORD` - Пароль или токен доступа к реестру

**Используется в:**
- `infra/timeweb/10-gitops/apps/backend/registry-secret-sync.job.yaml`
- `.gitlab-ci.yml` (для push образов в реестр)

**Примечание:** Секрет автоматически синхронизируется в Kubernetes Secret `archpad-registry-secret` через Job `registry-secret-sync`

---

## 10. Vault Tokens (для настройки)

### 10.1. Vault Setup Token
**Путь:** `kv/data/archpad/demo/vault/tokens`

**Переменные:**
- `VAULT_SETUP_TOKEN` - Токен для настройки Vault (Kubernetes auth, roles, policies)
- `GITLAB_TOKEN` - Токен для GitLab CI/CD

**Примечание:** Эти токены используются только для настройки Vault и CI/CD, не используются приложениями

---

## Сводная таблица

| Путь в Vault | Основные переменные | Используется в |
|--------------|---------------------|----------------|
| `kv/data/archpad/demo/postgres/connect` | `POSTGRES_HOST`, `POSTGRES_PORT` | Все сервисы |
| `kv/data/archpad/demo/postgres/credential` | `POSTGRES_USER`, `POSTGRES_PASSWORD` | pgAdmin |
| `kv/data/archpad/demo/backend/common` | `PROJECT_DB_USER`, `PROJECT_DB_PASSWORD` | Backend сервисы |
| `kv/data/archpad/demo/backend/arch-repo-service` | `PROJECT_DB` | arch-repo-service |
| `kv/data/archpad/demo/backend/tenant-service` | `TENANT_DB` | tenant-service |
| `kv/data/archpad/demo/backend/hasura-sync-service` | `HASURA_SOURCE`, `HASURA_SCHEMA` | hasura-sync-service |
| `kv/data/archpad/demo/frontend/portal` | `NEXT_PUBLIC_*` переменные | Portal, GitLab CI |
| `kv/data/archpad/demo/tolgee/api-key` | `NEXT_PUBLIC_TOLGEE_API_KEY` | Portal, GitLab CI |
| `kv/data/archpad/demo/hasura/db` | `HASURA_DB`, `HASURA_DB_USER`, `HASURA_DB_PASSWORD` | Hasura |
| `kv/data/archpad/demo/hasura/secret` | `HASURA_GRAPHQL_ADMIN_SECRET` | Hasura, Portal |
| `kv/data/archpad/demo/hasura/endpoint` | `HASURA_INTERNAL_URL` | Hasura, Portal |
| `kv/data/archpad/demo/tolgee/db` | `TOLGEE_DB`, `TOLGEE_DB_USER`, `TOLGEE_DB_PASSWORD` | Tolgee |
| `kv/data/archpad/demo/tolgee/admin` | `TOLGEE_ADMIN_USER`, `TOLGEE_ADMIN_PASSWORD` | Tolgee |
| `kv/data/archpad/demo/ory/kratos/db` | `KRATOS_DB`, `KRATOS_DB_USER`, `KRATOS_DB_PASSWORD` | Kratos |
| `kv/data/archpad/demo/ory/kratos/secret` | `KRATOS_SECRET` | Kratos |
| `kv/data/archpad/demo/ory/kratos/other` | `SMTP_CONNECTION_URI`, `SMTP_FROM_ADDRESS` | Kratos |
| `kv/data/archpad/demo/ory/kratos/endpoint` | `ORY_KRATOS_INTERNAL_URL` | Portal, Kratos |
| `kv/data/archpad/demo/ory/hydra/db` | `HYDRA_DB`, `HYDRA_DB_USER`, `HYDRA_DB_PASSWORD` | Hydra |
| `kv/data/archpad/demo/ory/hydra/secret` | `SECRETS_SYSTEM` | Hydra |
| `kv/data/archpad/demo/ory/oathkeeper` | Все ключи (динамически) | Oathkeeper |
| `kv/data/archpad/demo/grafana/admin` | `GRAFANA_ADMIN_USER`, `GRAFANA_ADMIN_PASSWORD` | Grafana |
| `kv/data/archpad/demo/grafana/db` | `GRAFANA_DB`, `GRAFANA_DB_USER`, `GRAFANA_DB_PASSWORD` | Grafana |
| `kv/data/archpad/demo/pgadmin` | `PGADMIN_ADMIN_USER`, `PGADMIN_DEFAULT_PASSWORD` | pgAdmin |
| `kv/data/archpad/container-register` | `REGISTRY_URL`, `REGISTRY_USERNAME`, `REGISTRY_PASSWORD` | GitLab CI, registry-secret-sync |

---

## Связанные документы

- [SECRETS.md](./SECRETS.md) - Общее руководство по управлению секретами
- [VAULT_SETUP.md](./VAULT_SETUP.md) - Настройка Vault и Kubernetes Auth Method
- [VAULT_SECRETS_INVENTORY.md](./VAULT_SECRETS_INVENTORY.md) - Подробный инвентарь (может быть удален после консолидации)
