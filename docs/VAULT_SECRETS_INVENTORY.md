# Инвентарь секретов Vault для восстановления

Этот документ содержит полный список всех секретов, используемых в системе Archpad, и их расположение в Vault.

## Структура секретов в Vault

Все секреты хранятся в пути `kv/data/archpad/demo/` (для демо-окружения).

## Секреты по сервисам

### 1. Backend Services

#### 1.1. Arch Repo Service
**Путь в Vault:** `kv/data/archpad/demo/backend/arch-repo-service`

**Используемые ключи:**
- `PROJECT_DB` - имя базы данных для arch-repo-service

**Дополнительные секреты:**
- `kv/data/archpad/demo/backend/common` - общие секреты для backend сервисов
  - `PROJECT_DB_USER` - пользователь базы данных
  - `PROJECT_DB_PASSWORD` - пароль базы данных
- `kv/data/archpad/demo/postgres/connect` - конфигурация подключения PostgreSQL
  - `POSTGRES_HOST` - хост PostgreSQL
  - `POSTGRES_PORT` - порт PostgreSQL
- `kv/data/archpad/demo/postgres/credential` - учетные данные PostgreSQL
  - `POSTGRES_USER` - пользователь PostgreSQL
  - `POSTGRES_PASSWORD` - пароль PostgreSQL

**Используется в:**
- `infra/timeweb/10-gitops/apps/backend/arch-repo-service/arch-repo-service.deployment.yaml`

---

#### 1.2. Tenant Service
**Путь в Vault:** `kv/data/archpad/demo/backend/tenant-service`

**Используемые ключи:**
- `TENANT_DB` - имя базы данных для tenant-service

**Дополнительные секреты:**
- `kv/data/archpad/demo/backend/common` - общие секреты для backend сервисов
  - `PROJECT_DB_USER` - пользователь базы данных
  - `PROJECT_DB_PASSWORD` - пароль базы данных
- `kv/data/archpad/demo/postgres/connect` - конфигурация подключения PostgreSQL
  - `POSTGRES_HOST` - хост PostgreSQL
  - `POSTGRES_PORT` - порт PostgreSQL
- `kv/data/archpad/demo/postgres/credential` - учетные данные PostgreSQL
  - `POSTGRES_USER` - пользователь PostgreSQL
  - `POSTGRES_PASSWORD` - пароль PostgreSQL

**Используется в:**
- `infra/timeweb/10-gitops/apps/backend/tenant-service/tenant-service.deployment.yaml`

---

#### 1.3. Hasura Sync Service
**Путь в Vault:** `kv/data/archpad/demo/backend/hasura-sync-service`

**Используемые ключи:**
- `HASURA_SOURCE` - источник данных для синхронизации
- `HASURA_SCHEMA` - схема для синхронизации
- `HASURA_RENAME_COLUMNS_CAMELCASE` - опционально, переименование колонок в camelCase
- `HASURA_APPLY_DEFAULT_PERMISSIONS` - опционально, применение дефолтных прав
- `HASURA_DEFAULT_ROLE` - опционально, дефолтная роль

**Дополнительные секреты:**
- `kv/data/archpad/demo/hasura/secret` - секреты Hasura
  - `HASURA_GRAPHQL_ADMIN_SECRET` - секретный ключ администратора Hasura
- `kv/data/archpad/demo/hasura/endpoint` - endpoint Hasura
  - `HASURA_INTERNAL_URL` - внутренний URL Hasura (`http://hasura.platform.svc:8080`)
- `kv/data/archpad/demo/backend/common` - общие секреты для backend сервисов
  - `PROJECT_DB_USER` - пользователь базы данных
  - `PROJECT_DB_PASSWORD` - пароль базы данных
- `kv/data/archpad/demo/postgres/connect` - конфигурация подключения PostgreSQL
  - `POSTGRES_HOST` - хост PostgreSQL
  - `POSTGRES_PORT` - порт PostgreSQL
- `kv/data/archpad/demo/postgres/credential` - учетные данные PostgreSQL
  - `POSTGRES_USER` - пользователь PostgreSQL
  - `POSTGRES_PASSWORD` - пароль PostgreSQL

**Используется в:**
- `infra/timeweb/10-gitops/apps/backend/hasura-sync-service/hasura-sync-service.job.yaml`

---

### 2. Frontend Services

#### 2.1. Portal
**Путь в Vault:** `kv/data/archpad/demo/frontend/portal`

**Используемые ключи:**
- `NEXT_PUBLIC_ORY_SDK_URL` - URL Ory SDK для аутентификации
- `NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT` - GraphQL endpoint Hasura
- `NEXT_PUBLIC_TOLGEE_API_URL` - URL API Tolgee для интернационализации
- `NEXT_PUBLIC_TOLGEE_API_KEY` - API ключ Tolgee (хранится отдельно, см. ниже)
- `NEXT_PUBLIC_URL` - публичный URL Portal
- `API_GATEWAY_INTERNAL_URL` - опционально, внутренний URL API Gateway (`http://oathkeeper.secure.svc:4455`)
- `NEXT_PUBLIC_API_GRAPHQL_ENDPOINT` - опционально, GraphQL endpoint API Gateway

**Дополнительные секреты:**
- `kv/data/archpad/demo/hasura/endpoint` - endpoint Hasura
  - `HASURA_INTERNAL_URL` - внутренний URL Hasura (`http://hasura.platform.svc:8080`)
- `kv/data/archpad/demo/hasura/secret` - секреты Hasura
  - `HASURA_GRAPHQL_ADMIN_SECRET` - секретный ключ администратора Hasura (используется Portal)
- `kv/data/archpad/demo/ory/kratos/endpoint` - endpoint Kratos
  - `ORY_KRATOS_INTERNAL_URL` - внутренний URL Kratos (`http://kratos.secure.svc:4433`)

**Отдельный путь для Tolgee API Key:**
- `kv/data/archpad/demo/tolgee/api-key`
  - `NEXT_PUBLIC_TOLGEE_API_KEY` - API ключ Tolgee

**Используется в:**
- `infra/timeweb/10-gitops/apps/frontend/portal/portal.deployment.yaml`
- `.gitlab-ci.yml` (для сборки Portal)

---

### 3. Database Services

#### 3.1. PostgreSQL
**Путь в Vault:** `kv/data/archpad/demo/postgres/connect`

**Используемые ключи:**
- `POSTGRES_HOST` - хост PostgreSQL
- `POSTGRES_PORT` - порт PostgreSQL

**Дополнительный путь:** `kv/data/archpad/demo/postgres/credential`

**Используемые ключи:**
- `POSTGRES_USER` - пользователь PostgreSQL (для pgAdmin)
- `POSTGRES_PASSWORD` - пароль PostgreSQL (для pgAdmin)

**Используется в:**
- Все backend сервисы
- Hasura
- Tolgee
- Kratos
- Hydra
- Grafana
- pgAdmin

---

### 4. Hasura

#### 4.1. Hasura Configuration
**Путь в Vault:** `kv/data/archpad/demo/hasura/db`

**Используемые ключи:**
- `HASURA_DB` - имя базы данных Hasura
- `HASURA_DB_USER` - пользователь базы данных Hasura (ранее HASURA_USER)
- `HASURA_DB_PASSWORD` - пароль базы данных Hasura

**Дополнительные секреты:**
- `kv/data/archpad/demo/hasura/secret` - секреты Hasura
  - `HASURA_GRAPHQL_ADMIN_SECRET` - секретный ключ администратора Hasura
- `kv/data/archpad/demo/hasura/endpoint` - endpoint Hasura
  - `HASURA_INTERNAL_URL` - внутренний URL Hasura
- `kv/data/archpad/demo/postgres/connect` - конфигурация подключения PostgreSQL
  - `POSTGRES_HOST` - хост PostgreSQL
  - `POSTGRES_PORT` - порт PostgreSQL
- `kv/data/archpad/demo/postgres/credential` - учетные данные PostgreSQL
  - `POSTGRES_USER` - пользователь PostgreSQL
  - `POSTGRES_PASSWORD` - пароль PostgreSQL

**Используется в:**
- `infra/timeweb/10-gitops/apps/hasura/hasura.deployment.yaml`

---

### 5. Tolgee (i18n)

#### 5.1. Tolgee Configuration
**Путь в Vault:** `kv/data/archpad/demo/tolgee/db`

**Используемые ключи:**
- `TOLGEE_DB` - имя базы данных Tolgee
- `TOLGEE_DB_USER` - пользователь базы данных Tolgee
- `TOLGEE_DB_PASSWORD` - пароль базы данных Tolgee

**Дополнительный путь:** `kv/data/archpad/demo/tolgee/admin`

**Используемые ключи:**
- `TOLGEE_ADMIN_USER` - имя администратора Tolgee
- `TOLGEE_ADMIN_PASSWORD` - пароль администратора Tolgee

**Дополнительные секреты:**
- `kv/data/archpad/demo/tolgee/api-key` - API ключ Tolgee
  - `NEXT_PUBLIC_TOLGEE_API_KEY` - API ключ для доступа к Tolgee API
- `kv/data/archpad/demo/postgres/connect` - конфигурация подключения PostgreSQL
  - `POSTGRES_HOST` - хост PostgreSQL
  - `POSTGRES_PORT` - порт PostgreSQL
- `kv/data/archpad/demo/postgres/credential` - учетные данные PostgreSQL
  - `POSTGRES_USER` - пользователь PostgreSQL
  - `POSTGRES_PASSWORD` - пароль PostgreSQL

**Используется в:**
- `infra/timeweb/10-gitops/apps/tolgee/tolgee.deployment.yaml`
- `infra/timeweb/10-gitops/apps/frontend/portal/portal.deployment.yaml`
- `.gitlab-ci.yml` (для сборки Portal)

---

### 6. Ory Services

#### 6.1. Kratos (Identity Management)
**Путь в Vault:** `kv/data/archpad/demo/ory/kratos/db`

**Используемые ключи:**
- `KRATOS_DB` - имя базы данных Kratos
- `KRATOS_DB_USER` - пользователь базы данных Kratos
- `KRATOS_DB_PASSWORD` - пароль базы данных Kratos

**Дополнительный путь:** `kv/data/archpad/demo/ory/kratos/secret`

**Используемые ключи:**
- `KRATOS_SECRET` - секретный ключ для подписи cookies и токенов

**Дополнительный путь:** `kv/data/archpad/demo/ory/kratos/other`

**Используемые ключи:**
- `SMTP_CONNECTION_URI` - URI подключения к SMTP серверу для отправки email
- `SMTP_FROM_ADDRESS` - адрес отправителя email

**Дополнительные секреты:**
- `kv/data/archpad/demo/ory/kratos/endpoint` - endpoint Kratos
  - `ORY_KRATOS_INTERNAL_URL` - внутренний URL Kratos
- `kv/data/archpad/demo/postgres/connect` - конфигурация подключения PostgreSQL
  - `POSTGRES_HOST` - хост PostgreSQL
  - `POSTGRES_PORT` - порт PostgreSQL
- `kv/data/archpad/demo/postgres/credential` - учетные данные PostgreSQL
  - `POSTGRES_USER` - пользователь PostgreSQL
  - `POSTGRES_PASSWORD` - пароль PostgreSQL

**Используется в:**
- `infra/timeweb/10-gitops/apps/ory/kratos/kratos.deployment.yaml`

---

#### 6.2. Hydra (OAuth2 & OpenID Connect)
**Путь в Vault:** `kv/data/archpad/demo/ory/hydra/db`

**Используемые ключи:**
- `HYDRA_DB` - имя базы данных Hydra
- `HYDRA_DB_USER` - пользователь базы данных Hydra
- `HYDRA_DB_PASSWORD` - пароль базы данных Hydra

**Дополнительный путь:** `kv/data/archpad/demo/ory/hydra/secret`

**Используемые ключи:**
- `SECRETS_SYSTEM` - системный секрет для шифрования токенов

**Дополнительные секреты:**
- `kv/data/archpad/demo/postgres/connect` - конфигурация подключения PostgreSQL
  - `POSTGRES_HOST` - хост PostgreSQL
  - `POSTGRES_PORT` - порт PostgreSQL
- `kv/data/archpad/demo/postgres/credential` - учетные данные PostgreSQL
  - `POSTGRES_USER` - пользователь PostgreSQL
  - `POSTGRES_PASSWORD` - пароль PostgreSQL

**Используется в:**
- `infra/timeweb/10-gitops/apps/ory/hydra/hydra.deployment.yaml`

---

#### 6.3. Oathkeeper (API Gateway)
**Путь в Vault:** `kv/data/archpad/demo/ory/oauthkeeper`

**Примечание:** Путь указан как `oauthkeeper` (возможно, опечатка, должно быть `oathkeeper`)

**Используемые ключи:**
- Все ключи из этого секрета экспортируются как переменные окружения (динамически)

**Используется в:**
- `infra/timeweb/10-gitops/apps/ory/oathkeeper/oathkeeper.deployment.yaml`

---

### 7. Monitoring Services

#### 7.1. Grafana
**Путь в Vault:** `kv/data/archpad/demo/grafana/admin`

**Используемые ключи:**
- `GRAFANA_ADMIN_USER` - имя администратора Grafana
- `GRAFANA_ADMIN_PASSWORD` - пароль администратора Grafana

**Дополнительные секреты:**
- `kv/data/archpad/demo/grafana/db` - конфигурация базы данных Grafana
  - `GRAFANA_DB` - имя базы данных Grafana (ранее GRAFANA_DB_NAME)
  - `GRAFANA_DB_USER` - пользователь базы данных Grafana
  - `GRAFANA_DB_PASSWORD` - пароль базы данных Grafana
- `kv/data/archpad/demo/postgres/connect` - конфигурация подключения PostgreSQL
  - `POSTGRES_HOST` - хост PostgreSQL
  - `POSTGRES_PORT` - порт PostgreSQL
- `kv/data/archpad/demo/postgres/credential` - учетные данные PostgreSQL
  - `POSTGRES_USER` - пользователь PostgreSQL
  - `POSTGRES_PASSWORD` - пароль PostgreSQL

**Используется в:**
- `infra/timeweb/10-gitops/apps/monitoring/grafana/grafana.deployment.yaml`

---

### 8. Database Management

#### 8.1. pgAdmin
**Путь в Vault:** `kv/data/archpad/demo/pgadmin`

**Используемые ключи:**
- `PGADMIN_ADMIN_USER` - email администратора pgAdmin
- `PGADMIN_DEFAULT_PASSWORD` - пароль администратора pgAdmin

**Дополнительные секреты:**
- `kv/data/archpad/demo/postgres/connect` - конфигурация подключения PostgreSQL
  - `POSTGRES_HOST` - хост PostgreSQL
  - `POSTGRES_PORT` - порт PostgreSQL
- `kv/data/archpad/demo/postgres/credential` - учетные данные PostgreSQL
  - `POSTGRES_USER` - пользователь PostgreSQL
  - `POSTGRES_PASSWORD` - пароль PostgreSQL
  - `POSTGRES_USER` - пользователь PostgreSQL
  - `POSTGRES_PASSWORD` - пароль PostgreSQL

**Используется в:**
- `infra/timeweb/10-gitops/apps/pgadmin/pgadmin.deployment.yaml`

---

### 9. Container Registry

#### 9.1. Container Registry Credentials
**Путь в Vault:** `kv/data/archpad/container-register`

**Используемые ключи:**
- `REGISTRY_URL` - URL контейнерного реестра
- `REGISTRY_USERNAME` - имя пользователя для доступа к реестру
- `REGISTRY_PASSWORD` - пароль для доступа к реестру

**Используется в:**
- `infra/timeweb/10-gitops/apps/backend/registry-secret-sync.job.yaml`
- `.gitlab-ci.yml` (для push образов в реестр)

---

## Сводная таблица всех секретов

| Путь в Vault | Ключи | Используется в |
|--------------|-------|----------------|
| `kv/data/archpad/demo/backend/arch-repo-service` | `PROJECT_DB` | arch-repo-service |
| `kv/data/archpad/demo/backend/tenant-service` | `TENANT_DB` | tenant-service |
| `kv/data/archpad/demo/backend/hasura-sync-service` | `HASURA_SOURCE`, `HASURA_SCHEMA`, `HASURA_RENAME_COLUMNS_CAMELCASE`, `HASURA_APPLY_DEFAULT_PERMISSIONS`, `HASURA_DEFAULT_ROLE` | hasura-sync-service |
| `kv/data/archpad/demo/backend/common` | `PROJECT_DB_USER`, `PROJECT_DB_PASSWORD` | Все backend сервисы |
| `kv/data/archpad/demo/frontend/portal` | `NEXT_PUBLIC_ORY_SDK_URL`, `NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT`, `HASURA_GRAPHQL_ADMIN_SECRET`, `NEXT_PUBLIC_TOLGEE_API_URL`, `NEXT_PUBLIC_URL`, `API_GATEWAY_INTERNAL_URL`, `NEXT_PUBLIC_API_GRAPHQL_ENDPOINT` | portal |
| `kv/data/archpad/demo/tolgee/api-key` | `NEXT_PUBLIC_TOLGEE_API_KEY` | portal, GitLab CI |
| `kv/data/archpad/demo/postgres/connect` | `POSTGRES_HOST`, `POSTGRES_PORT` | Все сервисы, использующие PostgreSQL |
| `kv/data/archpad/demo/postgres/credential` | `POSTGRES_USER`, `POSTGRES_PASSWORD` | pgAdmin |
| `kv/data/archpad/demo/hasura/db` | `HASURA_DB`, `HASURA_DB_USER`, `HASURA_DB_PASSWORD` | hasura |
| `kv/data/archpad/demo/hasura/secret` | `HASURA_GRAPHQL_ADMIN_SECRET` | hasura, portal, hasura-sync-service |
| `kv/data/archpad/demo/hasura/endpoint` | `HASURA_INTERNAL_URL` (значение: `http://hasura.platform.svc:8080`) | hasura, portal, hasura-sync-service |
| `kv/data/archpad/demo/ory/kratos/endpoint` | `ORY_KRATOS_INTERNAL_URL` (значение: `http://kratos.secure.svc:4433`) | portal |
| `kv/data/archpad/demo/tolgee` | `TOLGEE_DB`, `TOLGEE_DB_USER`, `TOLGEE_DB_PASSWORD`, `TOLGEE_ADMIN_USER`, `TOLGEE_ADMIN_PASSWORD` | tolgee |
| `kv/data/archpad/demo/ory/kratos` | `KRATOS_DB`, `KRATOS_DB_USER`, `KRATOS_DB_PASSWORD`, `KRATOS_SECRET`, `SMTP_CONNECTION_URI`, `SMTP_FROM_ADDRESS` | kratos |
| `kv/data/archpad/demo/ory/kratos/endpoint` | `ORY_KRATOS_INTERNAL_URL` | portal |
| `kv/data/archpad/demo/ory/hydra` | `HYDRA_DB`, `HYDRA_DB_USER`, `HYDRA_DB_PASSWORD`, `SECRETS_SYSTEM` | hydra |
| `kv/data/archpad/demo/ory/oauthkeeper` | Все ключи (динамически) | oathkeeper |
| `kv/data/archpad/monitoring/grafana/admin` | `GRAFANA_ADMIN_USER`, `GRAFANA_ADMIN_PASSWORD` | grafana |
| `kv/data/archpad/monitoring/grafana/database` | `GRAFANA_DB_NAME`, `GRAFANA_DB_USER`, `GRAFANA_DB_PASSWORD` | grafana |
| `kv/data/archpad/demo/pgadmin` | `PGADMIN_ADMIN_USER`, `PGADMIN_DEFAULT_PASSWORD` | pgadmin |
| `kv/data/container-register` | `REGISTRY_URL`, `REGISTRY_USERNAME`, `REGISTRY_PASSWORD` | registry-secret-sync, GitLab CI |

---

## Команды для восстановления секретов

### Восстановление всех секретов через Vault CLI

```bash
# Установите Vault CLI и настройте доступ
export VAULT_ADDR="https://vault.archpad.pro"
export VAULT_TOKEN="your-vault-token"

# Пример восстановления секрета для arch-repo-service
vault kv put kv/data/archpad/demo/backend/arch-repo-service \
  PROJECT_DB="your-project-db-name"

# Пример восстановления общих секретов backend
vault kv put kv/data/archpad/demo/backend/common \
  PROJECT_DB_USER="your-db-user" \
  PROJECT_DB_PASSWORD="your-db-password"

# Пример восстановления конфигурации PostgreSQL
vault kv put kv/data/archpad/demo/postgres/connect \
  POSTGRES_HOST="your-postgres-host" \
  POSTGRES_PORT="5432"

vault kv put kv/data/archpad/demo/postgres/credential \
  POSTGRES_USER="your-postgres-user" \
  POSTGRES_PASSWORD="your-postgres-password"
```

### Восстановление через Vault API (curl)

```bash
# Установите переменные окружения
export VAULT_ADDR="https://vault.archpad.pro"
export VAULT_TOKEN="your-vault-token"

# Пример восстановления секрета
curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"data": {"PROJECT_DB": "your-project-db-name"}}' \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/backend/arch-repo-service"

# Пример восстановления PostgreSQL connect
curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"data": {"POSTGRES_HOST": "postgres", "POSTGRES_PORT": "5432"}}' \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/postgres/connect"

# Пример восстановления PostgreSQL credentials
curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"data": {"POSTGRES_USER": "postgres", "POSTGRES_PASSWORD": "password"}}' \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/postgres/credential"
```

---

## Генерация токенов

Для работы системы требуются два токена Vault:

### setup_token
Токен для настройки Vault (Kubernetes auth, roles, policies).
- **Политика:** `vault-setup`
- **Использование:** Job'ы для настройки Vault (vault-setup-policy, hasura-vault-role, secure-vault-role)
- **Генерация:** Используйте скрипт `infra/vault/generate-tokens.sh`

### gitlab_token
Токен для GitLab CI/CD пайплайнов.
- **Политика:** `archpad`
- **Использование:** GitLab CI/CD для получения секретов при сборке Portal
- **Генерация:** Используйте скрипт `infra/vault/generate-tokens.sh`

**Генерация токенов:**
```bash
cd infra/vault
./generate-tokens.sh [VAULT_ADDR] [VAULT_ROOT_TOKEN]
```

Скрипт создаст оба токена и сохранит их в Vault по пути `kv/data/archpad/demo/vault/tokens`.

## Примечания

1. **Путь `kv/data/archpad/demo/ory/oauthkeeper`** - возможно, опечатка, должно быть `oathkeeper`. Проверьте фактический путь в Vault.

2. **Секреты для GitLab CI** - некоторые секреты используются только в GitLab CI/CD пайплайнах:
   - `kv/data/archpad/demo/frontend/portal` - для сборки Portal
   - `kv/data/archpad/demo/tolgee/api-key` - для сборки Portal
   - `kv/data/container-register` - для push образов в реестр

3. **Общие секреты** - некоторые секреты используются несколькими сервисами:
   - `kv/data/archpad/demo/postgres/connect` - используется всеми сервисами, работающими с PostgreSQL
- `kv/data/archpad/demo/postgres/credential` - используется pgAdmin для подключения к PostgreSQL
   - `kv/data/archpad/demo/backend/common` - используется всеми backend сервисами

4. **Структура путей** - все секреты для демо-окружения находятся в `kv/data/archpad/demo/`. Для production окружения путь будет `kv/data/archpad/production/`.

---

## Следующие шаги

1. Разпечатайте Vault (если он запечатан)
2. Восстановите все секреты по списку выше
3. Проверьте доступность секретов через Vault UI или CLI
4. Перезапустите сервисы для применения новых секретов
