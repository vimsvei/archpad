# Tolgee Secrets

## Секреты в Vault

Все секреты для Tolgee должны быть созданы в Vault по пути:
```
/v1/kv/data/archpad/demo/tolgee
```

## Необходимые секреты

### 1. База данных PostgreSQL

- **`TOLGEE_DB_USER`** - имя пользователя PostgreSQL (например, `tolgee_user`)
- **`TOLGEE_DB_PASSWORD`** - пароль пользователя PostgreSQL
- **`TOLGEE_DB`** - имя базы данных (например, `tolgee_db`)

### 2. Аутентификация (начальный администратор)

- **`TOLGEE_ADMIN_USER`** - имя начального администратора Tolgee
- **`TOLGEE_ADMIN_PASSWORD`** - пароль начального администратора Tolgee

## Дополнительные секреты

### PostgreSQL Host/Port

`POSTGRES_HOST` и `POSTGRES_PORT` берутся из общего секрета:
```
/v1/kv/data/archpad/demo/postgres
```

## API ключ

**`TOLGEE_API_KEY`** создается в интерфейсе Tolgee после первого входа администратора. Его не нужно добавлять в Vault при первоначальной настройке.

## Пример создания секретов через Vault API

```bash
VAULT_ADDR="https://vault.archpad.pro"
VAULT_TOKEN="<your-root-token>"

# Создание секрета для Tolgee
curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "TOLGEE_DB_USER": "tolgee_user",
      "TOLGEE_DB_PASSWORD": "your-secure-password",
      "TOLGEE_DB": "tolgee_db",
      "TOLGEE_ADMIN_USER": "admin",
      "TOLGEE_ADMIN_PASSWORD": "your-admin-password"
    }
  }' \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/tolgee"
```

## Формирование JDBC URL

JDBC URL формируется автоматически из компонентов:
```
jdbc:postgresql://${POSTGRES_HOST}:${POSTGRES_PORT}/${TOLGEE_DB}
```

Где:
- `POSTGRES_HOST` и `POSTGRES_PORT` берутся из `/v1/kv/data/archpad/demo/postgres`
- `TOLGEE_DB` берется из `/v1/kv/data/archpad/demo/tolgee`
