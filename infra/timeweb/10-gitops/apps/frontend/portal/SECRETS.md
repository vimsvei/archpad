# Portal (Frontend) Secrets

## Общая информация

Portal - это Next.js приложение, которое использует переменные окружения для конфигурации.
Переменные с префиксом `NEXT_PUBLIC_` доступны на клиенте (браузер), остальные - только на сервере.

Секреты загружаются через **Vault Agent Injector** с Kubernetes Auth.

## Секреты в Vault

Путь: `/v1/kv/data/archpad/demo/frontend/portal`

### Ory Kratos (Аутентификация)
- **`NEXT_PUBLIC_ORY_SDK_URL`** - публичный URL Kratos SDK (например, `https://auth.archpad.pro`)
- **`ORY_KRATOS_INTERNAL_URL`** - внутренний URL Kratos для серверных запросов (например, `http://kratos.secure.svc:4433`)
  - **Путь в Vault:** `/v1/kv/data/archpad/demo/ory/kratos/endpoint`

### Hasura GraphQL
- **`NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT`** - публичный URL Hasura GraphQL endpoint (например, `https://apim.archpad.pro/v1/graphql`)
- **`HASURA_INTERNAL_URL`** - внутренний URL Hasura для серверных запросов (рекомендуется FQDN: `http://hasura.platform.svc:8080/v1/graphql`)
  - **Путь в Vault:** `/v1/kv/data/archpad/demo/hasura/endpoint`
- **`HASURA_GRAPHQL_ADMIN_SECRET`** - секретный ключ администратора Hasura (для серверных запросов)

### Tolgee (i18n)
- **`NEXT_PUBLIC_TOLGEE_API_URL`** - публичный URL Tolgee API (например, `https://i18n.archpad.pro`)
- **`NEXT_PUBLIC_TOLGEE_API_KEY`** - API ключ Tolgee (создается в интерфейсе Tolgee после первого входа администратора)

### Portal URL
- **`NEXT_PUBLIC_URL`** - публичный URL Portal (например, `https://portal.archpad.pro`)

### API Gateway (Oathkeeper)
- **`API_GATEWAY_INTERNAL_URL`** - внутренний URL API Gateway (например, `http://oathkeeper.secure.svc:4455`)
- **`NEXT_PUBLIC_API_GRAPHQL_ENDPOINT`** - публичный URL API Gateway для GraphQL (например, `https://api.archpad.pro/graphql`)

**Примечание:** Если используется Oathkeeper как API Gateway, то `NEXT_PUBLIC_API_GRAPHQL_ENDPOINT` может указывать на `https://api.archpad.pro/graphql`, который проксирует запросы к backend сервисам.

### Vault подключение (через Vault Agent Injector)
- **`VAULT_ADDR`** - адрес Vault (например, `http://vault.vault.svc:8200`)
- **`VAULT_TOKEN`** - токен для подключения к Vault (не нужен, если используется Kubernetes Auth)

## Переменные окружения (не секреты)

- **`NODE_ENV`** - окружение (`production`, `development`, `local`)
- **`PORT`** - порт приложения (по умолчанию `3000`)

## Примечания

1. **`NEXT_PUBLIC_*` переменные** доступны в браузере, поэтому не должны содержать чувствительных данных (токены, пароли).
2. **`HASURA_GRAPHQL_ADMIN_SECRET`** используется только на сервере (в API routes), не должен быть в `NEXT_PUBLIC_*`.
3. **`NEXT_PUBLIC_TOLGEE_API_KEY`** - это публичный ключ для доступа к Tolgee API, он безопасен для использования на клиенте.

## Пример создания секретов через Vault API

```bash
VAULT_ADDR="https://vault.archpad.pro"
VAULT_TOKEN="<your-root-token>"

# Секреты для Portal
curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "NEXT_PUBLIC_ORY_SDK_URL": "https://auth.archpad.pro",
      "NEXT_PUBLIC_ORY_SDK_URL": "https://auth.archpad.pro",
      "NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT": "https://apim.archpad.pro/v1/graphql",
      "HASURA_GRAPHQL_ADMIN_SECRET": "your-hasura-admin-secret",
      "NEXT_PUBLIC_TOLGEE_API_URL": "https://i18n.archpad.pro",
      "NEXT_PUBLIC_TOLGEE_API_KEY": "your-tolgee-api-key",
      "NEXT_PUBLIC_URL": "https://portal.archpad.pro",
      "API_GATEWAY_INTERNAL_URL": "http://oathkeeper.secure.svc:4455",
      "NEXT_PUBLIC_API_GRAPHQL_ENDPOINT": "https://api.archpad.pro/graphql"
    }
  }' \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/frontend/portal"
```

## Vault Kubernetes Auth Role

Для Portal нужно добавить ServiceAccount `portal` в Vault роль `platform` (которая уже используется для Hasura и Tolgee).

ServiceAccount: `portal`

Он должен быть добавлен в `bound_service_account_names` для роли `platform` в Vault.
