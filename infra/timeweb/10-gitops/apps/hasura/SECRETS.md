# Hasura Secrets Reference

Документация по структуре секретов Hasura в Vault.

## Структура секретов

### PostgreSQL (общие секреты)

**Путь:** `/v1/kv/data/archpad/demo/postgres`

**Константы:**
- `POSTGRES_HOST` - IP адрес PostgreSQL кластера (например, `192.168.0.4`)
- `POSTGRES_PORT` - Порт PostgreSQL (например, `5432`)

**Примечание:** Эти секреты используются всеми сервисами (Hasura, Kratos, Hydra).

---

### Hasura

**Путь:** `/v1/kv/data/archpad/demo/hasura`

**Константы:**
- `HASURA_USER` - Имя пользователя PostgreSQL для Hasura (например, `hasura_user`)
- `HASURA_DB_PASSWORD` - Пароль пользователя PostgreSQL
- `HASURA_DB` - Имя базы данных для метаданных Hasura (например, `hasura_db`)
- `PROJECT_DB` - Имя базы данных для проектов (например, `archpad`)
- `TENANT_DB` - Имя базы данных для tenant'ов (например, `tenant_db`)

### Hasura Secret (отдельный секрет)

**Путь:** `/v1/kv/data/archpad/demo/hasura-secret`

**Константы:**
- `HASURA_GRAPHQL_ADMIN_SECRET` - Секрет для доступа к Hasura Admin API (32+ символов, base64)

**Примечание:** Этот секрет используется также `hasura-sync-service` для подключения к Hasura.

## Формирование строк подключения

DSN строки формируются автоматически из компонентов в шаблоне Vault:

- `HASURA_GRAPHQL_METADATA_DATABASE_URL`: `postgres://{HASURA_USER}:{HASURA_DB_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{HASURA_DB}?sslmode=disable`
- `HASURA_GRAPHQL_DATABASE_URL`: `postgres://{HASURA_USER}:{HASURA_DB_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{HASURA_DB}?sslmode=disable`

**Примечание:** Пароль автоматически URL-кодируется для безопасной передачи в URI.

## Пример значений

```json
// /v1/kv/data/archpad/demo/hasura
{
  "HASURA_USER": "hasura_user",
  "HASURA_DB_PASSWORD": "your-secure-password",
  "HASURA_DB": "hasura_db",
  "PROJECT_DB": "archpad",
  "TENANT_DB": "tenant_db"
}

// /v1/kv/data/archpad/demo/hasura-secret
{
  "HASURA_GRAPHQL_ADMIN_SECRET": "auto-generated-base64-secret"
}
```

## Проверка секретов

```bash
# Через Vault CLI
vault kv get -format=json kv/archpad/demo/hasura | jq '.data.data'
vault kv get -format=json kv/archpad/demo/hasura-secret | jq '.data.data'

# Через Vault API
curl -H "X-Vault-Token: $VAULT_TOKEN" \
  https://vault.archpad.pro/v1/kv/data/archpad/demo/hasura | \
  jq '.data.data'

curl -H "X-Vault-Token: $VAULT_TOKEN" \
  https://vault.archpad.pro/v1/kv/data/archpad/demo/hasura-secret | \
  jq '.data.data'
```

## Обновление секретов

```bash
# Обновить через Vault CLI
vault kv patch kv/archpad/demo/hasura \
  HASURA_DB_PASSWORD="new-password"

vault kv patch kv/archpad/demo/hasura-secret \
  HASURA_GRAPHQL_ADMIN_SECRET="new-secret"

# Обновить через Vault API
curl -X POST \
  -H "X-Vault-Token: $VAULT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"data": {"HASURA_DB_PASSWORD": "new-password"}}' \
  https://vault.archpad.pro/v1/kv/data/archpad/demo/hasura

curl -X POST \
  -H "X-Vault-Token: $VAULT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"data": {"HASURA_GRAPHQL_ADMIN_SECRET": "new-secret"}}' \
  https://vault.archpad.pro/v1/kv/data/archpad/demo/hasura-secret
```
