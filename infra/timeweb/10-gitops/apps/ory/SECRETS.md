# Ory Secrets Reference

Документация по структуре секретов Ory компонентов в Vault.

**Важно:** Секреты уже должны быть созданы в Vault. Этот документ описывает структуру и использование существующих секретов.

## Структура секретов

### PostgreSQL (общие секреты)

**Путь:** `/v1/kv/data/archpad/demo/postgres`

**Константы:**
- `POSTGRES_HOST` - IP адрес PostgreSQL кластера (например, `192.168.0.4`)
- `POSTGRES_PORT` - Порт PostgreSQL (например, `5432`)

**Примечание:** Эти секреты используются всеми сервисами (Hasura, Kratos, Hydra).

---

### Kratos

**Путь:** `/v1/kv/data/archpad/demo/ory/kratos`

**Константы:**
- `KRATOS_DB_USER` - Имя пользователя PostgreSQL для Kratos (например, `kratos_user`)
- `KRATOS_DB_PASSWORD` - Пароль пользователя PostgreSQL
- `KRATOS_DB` - Имя базы данных Kratos (например, `kratos`)
- `KRATOS_SECRET` - Секрет для подписи сессий и токенов (32+ символов, base64)
- `SMTP_CONNECTION_URI` - URI подключения к SMTP серверу (например, `smtp://mailpit.platform.svc.cluster.local:1025/?disable_starttls=true`)
- `SMTP_FROM_ADDRESS` - Адрес отправителя email (например, `no-reply@archpad.pro`)

**Примечание:** Mailpit развернут в namespace `platform` и доступен по адресу `mailpit.platform.svc.cluster.local:1025` (SMTP) и `https://mail.archpad.pro` (веб-интерфейс).

**DSN формируется автоматически из компонентов:**
`postgres://{KRATOS_DB_USER}:{KRATOS_DB_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{KRATOS_DB}?sslmode=disable&max_conns=20&max_idle_conns=4`

---

### Hydra

**Путь:** `/v1/kv/data/archpad/demo/ory/hydra`

**Константы:**
- `HYDRA_DB_USER` - Имя пользователя PostgreSQL для Hydra (например, `hydra_user`)
- `HYDRA_DB_PASSWORD` - Пароль пользователя PostgreSQL
- `HYDRA_DB` - Имя базы данных Hydra (например, `hydra`)
- `SECRETS_SYSTEM` - Системный секрет для Hydra (32+ символов, base64)

**DSN формируется автоматически из компонентов:**
`postgres://{HYDRA_DB_USER}:{HYDRA_DB_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{HYDRA_DB}?sslmode=disable&max_conns=20&max_idle_conns=4`

---

### Oathkeeper

**Путь:** `/v1/kv/data/archpad/demo/ory/oauthkeeper`

**Константы:**
- `ORY_CLIENT_ID` - ID OAuth2 клиента для introspection (например, `archpad-oathkeeper`)
- `ORY_CLIENT_SECRET` - Секрет OAuth2 клиента для introspection (32+ символов, base64)

**Примечание:** Oathkeeper не использует БД напрямую, только OAuth2 клиент для подключения к Hydra.

---

## Примеры значений

### PostgreSQL
```json
{
  "POSTGRES_HOST": "192.168.0.4",
  "POSTGRES_PORT": "5432"
}
```

### Kratos
```json
{
  "KRATOS_DB_USER": "kratos_user",
  "KRATOS_DB_PASSWORD": "your-secure-password",
  "KRATOS_DB": "kratos",
  "KRATOS_SECRET": "auto-generated-base64-secret",
  "SMTP_CONNECTION_URI": "smtp://mailpit.platform.svc.cluster.local:1025/?disable_starttls=true",
  "SMTP_FROM_ADDRESS": "no-reply@archpad.pro"
}
```

### Hydra
```json
{
  "HYDRA_DB_USER": "hydra_user",
  "HYDRA_DB_PASSWORD": "your-secure-password",
  "HYDRA_DB": "hydra",
  "SECRETS_SYSTEM": "auto-generated-base64-secret"
}
```

### Oathkeeper
```json
{
  "ORY_CLIENT_ID": "archpad-oathkeeper",
  "ORY_CLIENT_SECRET": "auto-generated-base64-secret"
}
```

## Проверка секретов

```bash
# PostgreSQL
vault kv get -format=json kv/archpad/demo/postgres | jq '.data.data'

# Kratos
vault kv get -format=json kv/archpad/demo/ory/kratos | jq '.data.data'

# Hydra
vault kv get -format=json kv/archpad/demo/ory/hydra | jq '.data.data'

# Oathkeeper
vault kv get -format=json kv/archpad/demo/ory/oauthkeeper | jq '.data.data'
```

## Обновление секретов

```bash
# Обновить через Vault CLI
vault kv patch kv/archpad/demo/ory/kratos \
  KRATOS_DB_PASSWORD="new-password"

# Обновить через Vault API
curl -X POST \
  -H "X-Vault-Token: $VAULT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"data": {"KRATOS_DB_PASSWORD": "new-password"}}' \
  https://vault.archpad.pro/v1/kv/data/archpad/demo/ory/kratos
```

## Важные замечания

1. **POSTGRES_HOST и POSTGRES_PORT** хранятся отдельно в `/v1/kv/data/archpad/demo/postgres` и используются всеми сервисами
2. **DSN строки** формируются автоматически из компонентов в шаблонах Vault Agent Injector
3. **Пароли** автоматически URL-кодируются для безопасной передачи в URI
4. **SMTP сервис:** Mailpit развернут в namespace `platform`, доступен по `mailpit.platform.svc.cluster.local:1025` (SMTP) и `https://mail.archpad.pro` (веб-интерфейс)
5. **Стабильность секретов:** `KRATOS_SECRET` и `SECRETS_SYSTEM` должны быть стабильными (не меняться между перезапусками)
