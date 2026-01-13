# Исправление POSTGRES_HOST для Kubernetes

## Проблема

Сервисы подключаются к PostgreSQL по доменному имени `pg.archpad.pro:5432` вместо IP адреса `192.168.0.4:5432`.

Внутри Kubernetes кластера доменные имена могут не резолвиться, поэтому нужно использовать IP адрес PostgreSQL кластера.

## Решение

Обновите секрет в Vault, добавив значение `POSTGRES_HOST` с IP адресом PostgreSQL кластера.

**Логика использования:**
- **Local development (`NODE_ENV=local`):** используется `POSTGRES_ENDPOINT` (может быть доменное имя)
- **Production/Kubernetes:** используется `POSTGRES_HOST` (должен быть IP адрес)

### Способ 1: Через Vault API

```bash
VAULT_ADDR="https://vault.archpad.pro"
VAULT_TOKEN="<your-token>"

curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "POSTGRES_ENDPOINT": "pg.archpad.pro",
      "POSTGRES_HOST": "192.168.0.4",
      "POSTGRES_PORT": "5432"
    }
  }' \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/postgres"
```

### Способ 2: Через Vault UI

1. Откройте Vault UI: `https://vault.archpad.pro`
2. Перейдите в секреты: `kv/data/archpad/demo/postgres`
3. Добавьте или обновите значение `POSTGRES_HOST` на `192.168.0.4`
4. Убедитесь, что `POSTGRES_ENDPOINT` установлен для local development (например, `pg.archpad.pro`)
5. Сохраните изменения

## Применение изменений

После обновления секрета в Vault, перезапустите поды сервисов:

```bash
export KUBECONFIG=/path/to/twc-archpad-k8s-cluster-config.yaml

# Перезапустить все backend сервисы
kubectl delete pod -n platform -l app=arch-repo-service
kubectl delete pod -n platform -l app=tenant-service
kubectl delete pod -n platform -l app=hasura-sync-service
```

Или перезапустить все поды в namespace:

```bash
kubectl delete pod -n platform --all
```

## Проверка

После перезапуска проверьте логи сервиса:

```bash
kubectl logs -n platform -l app=arch-repo-service -c arch-repo-service --tail=20
```

Должно быть:
```
[MikroORM Config] host: "192.168.0.4"
```

Вместо:
```
[MikroORM Config] host: "pg.archpad.pro"
```

**Примечание:** В production окружении (`NODE_ENV=production`) сервисы используют `POSTGRES_HOST`, а не `POSTGRES_ENDPOINT`.

## Примечание

Этот секрет используется также Hasura и Tolgee. После обновления может потребоваться перезапуск этих сервисов, если они также используют `POSTGRES_ENDPOINT`.
