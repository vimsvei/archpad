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

### 2. KEYCLOAK_INTERNAL_URL

**Значение (in-cluster):**
```
http://keycloak.secure.svc:8080
```

**Использование:**
- `portal` - для server-side вызовов к Keycloak (token endpoint, Admin API — если требуется)

**Service:**
- Name: `keycloak`
- Namespace: `secure`
- Port: `8080`

**Файлы:**
- `infra/timeweb/10-gitops/apps/keycloak/keycloak.service.yaml`
- `infra/timeweb/10-gitops/apps/frontend/portal/portal.deployment.yaml`

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

### KEYCLOAK_INTERNAL_URL

В production (внутри кластера) `KEYCLOAK_INTERNAL_URL` выставляется прямо в манифестах деплоя Portal как `http://keycloak.secure.svc:8080`.

Для локальной разработки (port-forward) см. `LOCAL_DEVELOPMENT.md`.

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
| `KEYCLOAK_INTERNAL_URL` | (manifest) | `http://keycloak.secure.svc:8080` | `secure` | `keycloak` | `8080` |
| `API_GATEWAY_INTERNAL_URL` | `kv/data/archpad/demo/frontend/portal` | `http://oathkeeper.secure.svc:4455` | `secure` | `oathkeeper` | `4455` |

---

## Примечания

1. **Порты:**
   - Hasura: `8080` - основной HTTP порт для GraphQL API
   - Keycloak: `8080` - основной HTTP порт (внутри кластера)
   - Oathkeeper: `4455` - proxy port для маршрутизации запросов

2. **Использование:**
   - `HASURA_INTERNAL_URL` - используется для прямого доступа к Hasura из server-side кода
   - `KEYCLOAK_INTERNAL_URL` - используется для server-side API вызовов к Keycloak (если нужно)
   - `API_GATEWAY_INTERNAL_URL` - используется для server-side запросов к backend API через Oathkeeper

3. **Альтернативные форматы:**
   - Можно использовать короткий формат: `http://hasura:8080` (если вызывающий сервис в том же namespace)
   - Можно использовать полный формат: `http://hasura.platform.svc.cluster.local:8080` (более явный)

4. **Безопасность:**
   - Эти URL используются только внутри кластера и не доступны извне
   - Трафик идет через внутреннюю сеть Kubernetes (ClusterIP)
