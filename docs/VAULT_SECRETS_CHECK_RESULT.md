# Результат проверки секретов Vault

**Дата проверки:** 2026-01-15  
**Использованный токен:** `root_token` (***REDACTED***)

> **⚠️ Исторический документ**
>
> Проверка выполнялась до миграции на Keycloak. Часть путей/ключей ниже (Kratos/Hydra, OAuth-ключи Portal) больше не актуальна.
> Актуальную структуру секретов см. в **[VAULT_SECRETS_STRUCTURE.md](./VAULT_SECRETS_STRUCTURE.md)**.

## Результаты проверки

### Статистика

- **Всего секретов проверено:** 23
- **✅ Найдено и полных:** 22
- **⚠️ Найдено, но неполных:** 0
- **❌ Отсутствует:** 1

## Детали по секретам

### ✅ Найденные и полные секреты (22)

1. `kv/data/archpad/demo/backend/arch-repo-service` - ✅ FOUND
   - Keys: `PROJECT_DB`

2. `kv/data/archpad/demo/backend/tenant-service` - ✅ FOUND
   - Keys: `TENANT_DB`

3. `kv/data/archpad/demo/backend/common` - ✅ FOUND
   - Keys: `PROJECT_DB_PASSWORD`, `PROJECT_DB_USER`

4. `kv/data/archpad/demo/frontend/portal` - ✅ FOUND
   - Keys (актуально после миграции): `API_GATEWAY_INTERNAL_URL`, `NEXT_PUBLIC_API_GRAPHQL_ENDPOINT`, `NEXT_PUBLIC_API_REST_ENDPOINT`, `NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT`, `NEXT_PUBLIC_KEYCLOAK_PUBLIC_URL`, `NEXT_PUBLIC_KEYCLOAK_CLIENT_ID`, `KEYCLOAK_REALM`, `KEYCLOAK_SERVICE_CLIENT_ID`, `KEYCLOAK_SERVICE_CLIENT_SECRET`, `NEXT_PUBLIC_TOLGEE_API_URL`, `NEXT_PUBLIC_URL`
   - **Примечание:** `HASURA_GRAPHQL_ADMIN_SECRET` теперь берется из `kv/data/archpad/demo/hasura/secret` (см. обновленный `portal.deployment.yaml`)

5. `kv/data/archpad/demo/tolgee/api-key` - ✅ FOUND
   - Keys: `NEXT_PUBLIC_TOLGEE_API_KEY`

6. `kv/data/archpad/demo/postgres/connect` - ✅ FOUND
   - Keys: `POSTGRES_ENDPOINT`, `POSTGRES_HOST`, `POSTGRES_PORT`

7. `kv/data/archpad/demo/postgres/credential` - ✅ FOUND
   - Keys: `POSTGRES_PASSWORD`, `POSTGRES_USER`

8. `kv/data/archpad/demo/hasura/db` - ✅ FOUND
   - Keys: `HASURA_DB`, `HASURA_DB_PASSWORD`, `HASURA_DB_USER`

9. `kv/data/archpad/demo/hasura/secret` - ✅ FOUND
   - Keys: `HASURA_GRAPHQL_ADMIN_SECRET`

10. `kv/data/archpad/demo/hasura/endpoint` - ✅ FOUND
    - Keys: `HASURA_INTERNAL_URL`

11. `kv/data/archpad/demo/tolgee/db` - ✅ FOUND
    - Keys: `TOLGEE_DB`, `TOLGEE_DB_PASSWORD`, `TOLGEE_DB_USER`

12. `kv/data/archpad/demo/tolgee/admin` - ✅ FOUND
    - Keys: `TOLGEE_ADMIN_PASSWORD`, `TOLGEE_ADMIN_USER`

13. `kv/data/archpad/demo/keycloak/admin` - ✅ FOUND
   - Keys: `KEYCLOAK_ADMIN_USER`, `KEYCLOAK_ADMIN_PASSWORD`

14. `kv/data/archpad/demo/keycloak/db` - ✅ FOUND
   - Keys: `KEYCLOAK_DB`, `KEYCLOAK_DB_PASSWORD`, `KEYCLOAK_DB_USER`

15. `kv/data/archpad/demo/keycloak/connect` - ✅ FOUND
   - Keys: `KEYCLOAK_HOST`

16. `kv/data/archpad/demo/keycloak/smtp` - ✅ FOUND (optional)
   - Keys: `SMTP_INTERNAL_URL`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM_ADDRESS`

19. `kv/data/archpad/demo/grafana/admin` - ✅ FOUND
    - Keys: `GRAFANA_ADMIN_PASSWORD`, `GRAFANA_ADMIN_USER`

20. `kv/data/archpad/demo/grafana/db` - ✅ FOUND
    - Keys: `GRAFANA_DB`, `GRAFANA_DB_PASSWORD`, `GRAFANA_DB_USER`

21. `kv/data/archpad/demo/pgadmin` - ✅ FOUND
    - Keys: `PGADMIN_ADMIN_USER`, `PGADMIN_DEFAULT_PASSWORD`

22. `kv/data/archpad/container-register` - ✅ FOUND
    - Keys: `REGISTRY_PASSWORD`, `REGISTRY_URL`, `REGISTRY_USERNAME`

### ❌ Отсутствующие секреты (1)

1. `kv/data/archpad/demo/backend/hasura-sync-service` - ❌ NOT FOUND (404)
   - Ожидаемые ключи: `HASURA_SOURCE`, `HASURA_SCHEMA`
   - **Действие:** Необходимо создать этот секрет

## Рекомендации

### 1. Создать отсутствующий секрет `kv/data/archpad/demo/backend/hasura-sync-service`

```bash
export VAULT_ADDR="https://vault.archpad.pro"
export VAULT_TOKEN="<root-token>"

vault kv put kv/data/archpad/demo/backend/hasura-sync-service \
  HASURA_SOURCE="<hasura-source-value>" \
  HASURA_SCHEMA="<hasura-schema-value>"
```

## Команды для проверки

Повторная проверка всех секретов:

```bash
export VAULT_ADDR="https://vault.archpad.pro"
export VAULT_TOKEN="<root-token>"
./infra/vault/check-secrets.sh
```

## Примечания

- Большинство секретов (22 из 23) присутствуют и полны
- Только 1 секрет требует внимания:
  1. Создание `hasura-sync-service` секрета
- `HASURA_GRAPHQL_ADMIN_SECRET` теперь берется из `kv/data/archpad/demo/hasura/secret` вместо `kv/data/archpad/demo/frontend/portal` (обновлено в `portal.deployment.yaml`)
- Все остальные секреты находятся в хорошем состоянии
