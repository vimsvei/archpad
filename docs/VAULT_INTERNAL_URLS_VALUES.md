# Значения для переменных *_INTERNAL_URL в Vault

Этот документ содержит готовые значения для всех переменных `*_INTERNAL_URL`, которые нужно установить в Vault.

## Значения для восстановления

### 1. HASURA_INTERNAL_URL

**Путь в Vault:** `kv/data/archpad/demo/hasura/endpoint`

**Значение:**
```
http://hasura.platform.svc:8080
```

**Команда для восстановления:**
```bash
vault kv put kv/data/archpad/demo/hasura/endpoint \
  HASURA_INTERNAL_URL="http://hasura.platform.svc:8080"
```

**Или через API:**
```bash
curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{"data": {"HASURA_INTERNAL_URL": "http://hasura.platform.svc:8080"}}' \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/hasura/endpoint"
```

---

### 2. KEYCLOAK_INTERNAL_URL

**Значение (in-cluster):**
```
http://keycloak.secure.svc:8080
```

**Примечание:** В production `KEYCLOAK_INTERNAL_URL` выставляется в манифестах деплоя Portal (а не через Vault).

---

### 3. API_GATEWAY_INTERNAL_URL (опционально)

**Путь в Vault:** `kv/data/archpad/demo/frontend/portal`

**Значение:**
```
http://oathkeeper.secure.svc:4455
```

**Примечание:** Эта переменная опциональна. Если она не установлена, Portal будет использовать `NEXT_PUBLIC_API_GRAPHQL_ENDPOINT` для клиентских запросов.

**Команда для восстановления (если нужно добавить к существующим данным):**
```bash
# Получаем текущие данные
CURRENT_DATA=$(vault kv get -format=json kv/data/archpad/demo/frontend/portal | jq -r '.data.data')

# Добавляем API_GATEWAY_INTERNAL_URL
vault kv patch kv/data/archpad/demo/frontend/portal \
  API_GATEWAY_INTERNAL_URL="http://oathkeeper.secure.svc:4455"
```

**Или через API:**
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

| Переменная | Путь в Vault | Значение | Обязательно |
|------------|--------------|----------|-------------|
| `HASURA_INTERNAL_URL` | `kv/data/archpad/demo/hasura/endpoint` | `http://hasura.platform.svc:8080` | ✅ Да |
| `KEYCLOAK_INTERNAL_URL` | (manifest) | `http://keycloak.secure.svc:8080` | ✅ Да |
| `API_GATEWAY_INTERNAL_URL` | `kv/data/archpad/demo/frontend/portal` | `http://oathkeeper.secure.svc:4455` | ⚠️ Опционально |

---

## Объяснение значений

### HASURA_INTERNAL_URL
- **Service:** `hasura` в namespace `platform`
- **Port:** `8080` (GraphQL API)
- **Использование:** Прямой доступ к Hasura из server-side кода (hasura-sync-service, portal)

### KEYCLOAK_INTERNAL_URL
- **Service:** `keycloak` в namespace `secure`
- **Port:** `8080`
- **Использование:** Server-side вызовы к Keycloak из Portal (token endpoint / Admin API при необходимости)

### API_GATEWAY_INTERNAL_URL
- **Service:** `oathkeeper` в namespace `secure`
- **Port:** `4455` (proxy port)
- **Использование:** Server-side запросы к backend API через Oathkeeper из Portal

---

## Формат внутренних URL в Kubernetes

В Kubernetes внутренние URL имеют формат:
- **Полный формат:** `http://<service-name>.<namespace>.svc.cluster.local:<port>`
- **Короткий формат:** `http://<service-name>.<namespace>.svc:<port>`
- **Самый короткий (в том же namespace):** `http://<service-name>:<port>`

Мы используем короткий формат (`http://<service-name>.<namespace>.svc:<port>`) для явности и совместимости между namespace'ами.

---

## Проверка после восстановления

После восстановления секретов можно проверить их значения:

```bash
# Проверка HASURA_INTERNAL_URL
vault kv get kv/data/archpad/demo/hasura/endpoint

# KEYCLOAK_INTERNAL_URL не хранится в Vault (смотрите манифесты Portal / LOCAL_DEVELOPMENT.md)

# Проверка API_GATEWAY_INTERNAL_URL (если установлен)
vault kv get kv/data/archpad/demo/frontend/portal | grep API_GATEWAY_INTERNAL_URL
```
