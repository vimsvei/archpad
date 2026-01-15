# Внутренние URL для сервисов в Kubernetes

Этот документ содержит значения для переменных `*_INTERNAL_URL`, которые используются для внутренней коммуникации между сервисами в Kubernetes кластере.

## Формат внутренних URL в Kubernetes

В Kubernetes внутренние URL имеют формат:
- **Полный формат:** `http://<service-name>.<namespace>.svc.cluster.local:<port>`
- **Короткий формат:** `http://<service-name>.<namespace>.svc:<port>`
- **Самый короткий (в том же namespace):** `http://<service-name>:<port>`

## Переменные и их значения

### 1. HASURA_INTERNAL_URL

**Путь в Vault:** `kv/data/archpad/demo/hasura/endpoint`

**Значение:**
```
http://hasura.platform.svc:8080
```

**Использование:**
- `hasura-sync-service` - для синхронизации схемы БД с Hasura
- `portal` - для server-side запросов к Hasura GraphQL API

**Service:**
- Name: `hasura`
- Namespace: `platform`
- Port: `8080`

**Файлы:**
- `infra/timeweb/10-gitops/apps/hasura/hasura.service.yaml`
- `infra/timeweb/10-gitops/apps/backend/hasura-sync-service/hasura-sync-service.job.yaml`
- `infra/timeweb/10-gitops/apps/frontend/portal/portal.deployment.yaml`

---

### 2. ORY_KRATOS_INTERNAL_URL

**Путь в Vault:** `kv/data/archpad/demo/ory/kratos/endpoint`

**Значение:**
```
http://kratos.secure.svc:4433
```

**Использование:**
- `portal` - для server-side API вызовов к Kratos (self-service API, sessions, logout)

**Service:**
- Name: `kratos`
- Namespace: `secure`
- Port: `4433` (public API, используется для self-service операций)

**Примечание:** 
- Порт `4433` - это public API Kratos, который используется для self-service операций (login, registration, sessions)
- Порт `4434` - это admin API, используется только для административных операций

**Файлы:**
- `infra/timeweb/10-gitops/apps/ory/kratos/kratos.service.yaml`
- `infra/timeweb/10-gitops/apps/frontend/portal/portal.deployment.yaml`
- `packages/portal/src/app/api/ory/self-service/[...path]/route.ts`
- `packages/portal/src/app/api/ory/logout/route.ts`
- `packages/portal/src/app/api/ory/sessions/[...path]/route.ts`

---

### 3. API_GATEWAY_INTERNAL_URL

**Путь в Vault:** `kv/data/archpad/demo/frontend/portal` (опционально)

**Значение:**
```
http://oathkeeper.secure.svc:4455
```

**Использование:**
- `portal` - для server-side запросов к backend API через Oathkeeper (API Gateway)

**Service:**
- Name: `oathkeeper`
- Namespace: `secure`
- Port: `4455` (proxy port)

**Примечание:**
- Эта переменная опциональна и используется только для server-side запросов из Portal
- Если не установлена, Portal будет использовать `NEXT_PUBLIC_API_GRAPHQL_ENDPOINT` для клиентских запросов

**Файлы:**
- `infra/timeweb/10-gitops/apps/ory/oathkeeper/oathkeeper.service.yaml`
- `infra/timeweb/10-gitops/apps/frontend/portal/portal.deployment.yaml`
- `packages/portal/src/app/api/rest/[...path]/route.ts`
- `packages/portal/src/app/api/public/solutions/[id]/route.ts`

---

## Команды для восстановления секретов

### HASURA_INTERNAL_URL

```bash
vault kv put kv/data/archpad/demo/hasura/endpoint \
  HASURA_INTERNAL_URL="http://hasura.platform.svc:8080"
```

Или через API:
```bash
curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"data": {"HASURA_INTERNAL_URL": "http://hasura.platform.svc:8080"}}' \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/hasura/endpoint"
```

### ORY_KRATOS_INTERNAL_URL

```bash
vault kv put kv/data/archpad/demo/ory/kratos/endpoint \
  ORY_KRATOS_INTERNAL_URL="http://kratos.secure.svc:4433"
```

Или через API:
```bash
curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"data": {"ORY_KRATOS_INTERNAL_URL": "http://kratos.secure.svc:4433"}}' \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/ory/kratos/endpoint"
```

### API_GATEWAY_INTERNAL_URL (опционально)

```bash
vault kv patch kv/data/archpad/demo/frontend/portal \
  API_GATEWAY_INTERNAL_URL="http://oathkeeper.secure.svc:4455"
```

Или через API (нужно сначала получить текущие данные, обновить и отправить обратно):
```bash
# Получаем текущие данные
CURRENT_DATA=$(curl -s -H "X-Vault-Token: ${VAULT_TOKEN}" \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/frontend/portal" | jq '.data.data')

# Добавляем API_GATEWAY_INTERNAL_URL
UPDATED_DATA=$(echo "$CURRENT_DATA" | jq '. + {"API_GATEWAY_INTERNAL_URL": "http://oathkeeper.secure.svc:4455"}')

# Отправляем обновленные данные
curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "{\"data\": $UPDATED_DATA}" \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/frontend/portal"
```

---

## Сводная таблица

| Переменная | Путь в Vault | Значение | Namespace | Service | Port |
|------------|--------------|----------|-----------|---------|------|
| `HASURA_INTERNAL_URL` | `kv/data/archpad/demo/hasura/endpoint` | `http://hasura.platform.svc:8080` | `platform` | `hasura` | `8080` |
| `ORY_KRATOS_INTERNAL_URL` | `kv/data/archpad/demo/ory/kratos/endpoint` | `http://kratos.secure.svc:4433` | `secure` | `kratos` | `4433` |
| `API_GATEWAY_INTERNAL_URL` | `kv/data/archpad/demo/frontend/portal` | `http://oathkeeper.secure.svc:4455` | `secure` | `oathkeeper` | `4455` |

---

## Примечания

1. **Порты:**
   - Hasura: `8080` - основной HTTP порт для GraphQL API
   - Kratos: `4433` - public API для self-service операций (login, registration, sessions)
   - Oathkeeper: `4455` - proxy port для маршрутизации запросов

2. **Использование:**
   - `HASURA_INTERNAL_URL` - используется для прямого доступа к Hasura из server-side кода
   - `ORY_KRATOS_INTERNAL_URL` - используется для server-side API вызовов к Kratos
   - `API_GATEWAY_INTERNAL_URL` - используется для server-side запросов к backend API через Oathkeeper

3. **Альтернативные форматы:**
   - Можно использовать короткий формат: `http://hasura:8080` (если вызывающий сервис в том же namespace)
   - Можно использовать полный формат: `http://hasura.platform.svc.cluster.local:8080` (более явный)

4. **Безопасность:**
   - Эти URL используются только внутри кластера и не доступны извне
   - Трафик идет через внутреннюю сеть Kubernetes (ClusterIP)
