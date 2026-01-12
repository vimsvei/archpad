# Настройка Vault для Hasura

## Проблема

Hasura pod не может аутентифицироваться в Vault через Kubernetes Auth, получая ошибку `permission denied`.

## Решение

Vault Kubernetes Auth Role для ServiceAccount `hasura` создается автоматически через Kubernetes Job `hasura-vault-role`.

### Автоматический способ (GitOps)

1. **Создайте Secret с root token Vault** (один раз, вручную):

```bash
kubectl create secret generic vault-root-token -n platform \
  --from-literal=VAULT_ROOT_TOKEN='hvs.YX2ShaE5QOS4og5QCKtetvub'
```

2. **Job автоматически создаст role** при синхронизации ArgoCD Application `hasura`.

Job выполняется как PreSync hook перед развертыванием Hasura и:
- Проверяет/включает Kubernetes Auth в Vault
- Настраивает Kubernetes Auth config
- Создает или обновляет role `platform` для ServiceAccount `hasura`

### Ручной способ (если нужно выполнить вручную)

### Вариант 1: Создать новый role `platform`

Если role `platform` еще не существует:

```bash
# Способ 1: Передать root token через переменную окружения
kubectl exec -n vault vault-0 -- sh -c 'VAULT_TOKEN="hvs.YX2ShaE5QOS4og5QCKtetvub" vault write auth/kubernetes/role/platform \
  bound_service_account_names=hasura \
  bound_service_account_namespaces=platform \
  policies=archpad \
  ttl=1h'

# Или способ 2: Войти в pod и аутентифицироваться
kubectl exec -n vault vault-0 -- sh
# Внутри pod:
export VAULT_TOKEN="hvs.YX2ShaE5QOS4og5QCKtetvub"
vault write auth/kubernetes/role/platform \
  bound_service_account_names=hasura \
  bound_service_account_namespaces=platform \
  policies=archpad \
  ttl=1h
```

### Вариант 2: Обновить существующий role `platform`

Если role `platform` уже существует, обновите его, добавив ServiceAccount `hasura`:

```bash
# Проверить существующий role
kubectl exec -n vault vault-0 -- sh -c 'VAULT_TOKEN="hvs.YX2ShaE5QOS4og5QCKtetvub" vault read auth/kubernetes/role/platform'

# Обновить role, добавив hasura в bound_service_account_names
kubectl exec -n vault vault-0 -- sh -c 'VAULT_TOKEN="hvs.YX2ShaE5QOS4og5QCKtetvub" vault write auth/kubernetes/role/platform \
  bound_service_account_names=hasura \
  bound_service_account_namespaces=platform \
  policies=archpad \
  ttl=1h'
```

### Вариант 3: Использовать существующий role `secure`

Если вы хотите использовать тот же role, что и для Ory компонентов, обновите deployment:

В `hasura.deployment.yaml` измените:
```yaml
vault.hashicorp.com/role: "secure"
```

И обновите role `secure` в Vault:
```bash
kubectl exec -n vault vault-0 -- sh -c 'VAULT_TOKEN="hvs.YX2ShaE5QOS4og5QCKtetvub" vault write auth/kubernetes/role/secure \
  bound_service_account_names=kratos,hydra,oathkeeper,hasura \
  bound_service_account_namespaces=secure,platform \
  policies=archpad \
  ttl=1h'
```

## Проверка

После настройки role, перезапустите pod Hasura:

```bash
kubectl delete pod -n platform -l app=hasura
```

Pod должен успешно аутентифицироваться в Vault и запуститься.

## Важно

Убедитесь, что политика `archpad` в Vault позволяет читать секреты:
- `kv/data/archpad/demo/hasura`
