# Автоматическая синхронизация секрета Container Registry из Vault

## Описание

Секрет `archpad-registry-secret` для доступа к Container Registry автоматически синхронизируется из Vault в Kubernetes через Job `registry-secret-sync`.

## Как это работает

1. **Vault Agent Injector** загружает секреты из Vault по пути `/v1/kv/data/container-register`
2. **Job `registry-secret-sync`** создает или обновляет Kubernetes Secret `archpad-registry-secret`
3. **ServiceAccounts** используют этот секрет через `imagePullSecrets` для загрузки образов

## Требования

### 1. Секрет в Vault

Секрет должен быть создан в Vault по пути: `/v1/kv/data/container-register`

С ключами:
- `REGISTRY_URL` - URL Container Registry (например, `archpad-cr.registry.twcstorage.ru`)
- `REGISTRY_USERNAME` - имя пользователя
- `REGISTRY_PASSWORD` - пароль или токен доступа

**Пример создания через Vault API:**

```bash
VAULT_ADDR="https://vault.archpad.pro"
VAULT_TOKEN="<your-token>"

curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "REGISTRY_URL": "archpad-cr.registry.twcstorage.ru",
      "REGISTRY_USERNAME": "your-username",
      "REGISTRY_PASSWORD": "your-password"
    }
  }' \
  "${VAULT_ADDR}/v1/kv/data/container-register"
```

### 2. Vault Kubernetes Auth Role

ServiceAccount `registry-secret-sync` должен быть добавлен в Vault роль `platform`:

```bash
vault write auth/kubernetes/role/platform \
  bound_service_account_names=hasura,tolgee,arch-repo-service,tenant-service,hasura-sync-service,portal,registry-secret-sync \
  bound_service_account_namespaces=platform \
  policies=platform \
  ttl=1h
```

## Компоненты

### 1. ServiceAccount и RBAC
- **Файл:** `registry-secret-sync.serviceaccount.yaml`
- **ServiceAccount:** `registry-secret-sync`
- **Role:** права на создание и обновление секретов в namespace `platform`

### 2. Job для синхронизации
- **Файл:** `registry-secret-sync.job.yaml`
- **Job:** `registry-secret-sync`
- **Запуск:** автоматически при каждой синхронизации ArgoCD (PreSync hook)

### 3. ArgoCD Application
- **Файл:** `registry-secret-sync.app.yaml`
- **Application:** `registry-secret-sync`
- **Синхронизация:** автоматическая

## Проверка

### Проверить статус Job:

```bash
kubectl get jobs -n platform registry-secret-sync
kubectl logs -n platform job/registry-secret-sync
```

### Проверить созданный Secret:

```bash
kubectl get secret archpad-registry-secret -n platform
kubectl describe secret archpad-registry-secret -n platform
```

### Проверить, что ServiceAccounts используют секрет:

```bash
kubectl get serviceaccount -n platform -o yaml | grep -A 5 imagePullSecrets
```

## Обновление секрета

При изменении секрета в Vault:

1. Обновите секрет в Vault по пути `/v1/kv/data/container-register`
2. ArgoCD автоматически пересоздаст Job при следующей синхронизации
3. Job обновит Kubernetes Secret с новыми значениями

Или вручную пересоздайте Job:

```bash
kubectl delete job registry-secret-sync -n platform
# ArgoCD автоматически создаст новый Job при следующей синхронизации
```

## Troubleshooting

### Job не может получить секреты из Vault

Проверьте:
1. Существует ли секрет в Vault: `/v1/kv/data/container-register`
2. Добавлен ли ServiceAccount `registry-secret-sync` в Vault роль `platform`
3. Логи Vault Agent: `kubectl logs -n platform job/registry-secret-sync -c vault-agent`

### Job не может создать Secret

Проверьте:
1. Права ServiceAccount: `kubectl describe role registry-secret-sync -n platform`
2. Логи Job: `kubectl logs -n platform job/registry-secret-sync`

### Поды все еще не могут загрузить образы

Проверьте:
1. Существует ли Secret: `kubectl get secret archpad-registry-secret -n platform`
2. Используют ли ServiceAccounts секрет: `kubectl get serviceaccount -n platform -o yaml`
3. Перезапустите поды: `kubectl delete pod -n platform <pod-name>`
