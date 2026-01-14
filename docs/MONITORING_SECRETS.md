# Секреты для мониторинга

## Обзор

Все секреты для мониторинга хранятся в Vault.

## Секреты

### 1. Grafana Admin Credentials

**Путь в Vault:** `kv/data/archpad/monitoring/grafana/admin` ✅ (создан)

**Структура данных:**
```json
{
  "GRAFANA_ADMIN_USER": "admin",
  "GRAFANA_ADMIN_PASSWORD": "<secure-password>"
}
```

**Описание:**
- `GRAFANA_ADMIN_USER` - имя администратора Grafana (обычно "admin")
- `GRAFANA_ADMIN_PASSWORD` - пароль администратора Grafana (должен быть безопасным)

**Использование:**
- Используется в Grafana Deployment для настройки администратора
- Доступ через Vault Agent Injector с аннотациями

**Статус:** ✅ Секрет создан в Vault

**Структура должна быть:**
```json
{
  "GRAFANA_ADMIN_USER": "admin",
  "GRAFANA_ADMIN_PASSWORD": "<secure-password>"
}
```

**Проверка:**
```bash
VAULT_ADDR="https://vault.archpad.pro"
VAULT_TOKEN="<your-token>"

curl -X GET \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  "${VAULT_ADDR}/v1/kv/data/archpad/monitoring/grafana/admin"
```

### 2. Hasura Metrics Secret (опционально)

**Путь в Vault:** `kv/data/archpad/monitoring/hasura` ✅ (создан)

**Структура данных:**
```json
{
  "HASURA_GRAPHQL_METRICS_SECRET": "<secret-for-metrics-endpoint>"
}
```

**Описание:**
- `HASURA_GRAPHQL_METRICS_SECRET` - секрет для доступа к `/v1/metrics` endpoint Hasura

**Статус:** ✅ Секрет создан в Vault

**Когда нужен:**
- Если Hasura требует аутентификацию для доступа к `/v1/metrics` endpoint
- В текущей конфигурации Hasura (`hasura.deployment.yaml`) **НЕТ** переменной `HASURA_GRAPHQL_METRICS_SECRET` в env
- Нужно проверить, требуется ли аутентификация для метрик

**Как использовать:**

**Вариант 1: Если Hasura НЕ требует аутентификацию**
- Секрет не нужен для Hasura deployment
- Prometheus сможет scrape метрики без аутентификации
- Секрет можно удалить или оставить для будущего использования

**Вариант 2: Если Hasura требует аутентификацию**
- Добавить переменную окружения в `hasura.deployment.yaml`:
  ```yaml
  env:
    - name: HASURA_GRAPHQL_METRICS_SECRET
      valueFrom:
        secretKeyRef:
          name: hasura-metrics-secret
          key: secret
  ```
- Создать Kubernetes Secret из Vault для Prometheus ServiceMonitor (basicAuth)

**Проверка:**
```bash
# Проверить, доступны ли метрики без аутентификации
kubectl port-forward -n platform svc/hasura 8080:8080
curl http://localhost:8080/v1/metrics

# Если возвращает 200 OK - аутентификация не требуется
# Если возвращает 401/403 - нужна аутентификация
```

**Примечание:** По умолчанию Hasura не требует аутентификацию для метрик, если `HASURA_GRAPHQL_METRICS_SECRET` не установлен.

## Проверка секретов

### Проверить существование секретов

```bash
VAULT_ADDR="https://vault.archpad.pro"
VAULT_TOKEN="<your-token>"

# Проверить Grafana секрет
curl -X GET \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/monitoring/grafana"

# Проверить Hasura секрет (если нужен)
curl -X GET \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/hasura"
```

## Резюме

| Секрет | Путь в Vault | Статус | Обязательный | Описание |
|--------|--------------|--------|--------------|----------|
| Grafana Admin | `kv/data/archpad/monitoring/grafana/admin` | ✅ Создан | ✅ Да | Учетные данные администратора Grafana |
| Hasura Metrics | `kv/data/archpad/monitoring/hasura` | ✅ Создан | ⚠️ Опционально | Секрет для доступа к метрикам Hasura (если требуется аутентификация) |

**Примечание:** Пути секретов отличаются от первоначального проектирования. Используются пути, созданные пользователем.

## Следующие шаги

1. ✅ Секреты созданы в Vault
2. ⚠️ Проверить, требуется ли аутентификация для Hasura metrics (`/v1/metrics`)
3. ⚠️ Если аутентификация не требуется - секрет Hasura можно не использовать (оставить для будущего)
4. ✅ Использовать секреты в конфигурации Grafana и Prometheus
