# Настройка Vault для Hasura

## Проблема

Hasura pod не может аутентифицироваться в Vault через Kubernetes Auth, получая ошибку `permission denied`.

## Решение

Нужно настроить Vault Kubernetes Auth Role для ServiceAccount `hasura` в namespace `platform`.

### Вариант 1: Создать новый role `platform`

Если role `platform` еще не существует:

```bash
# Подключитесь к Vault pod
kubectl exec -n vault vault-0 -- sh

# Внутри pod выполните (используя root token)
vault write auth/kubernetes/role/platform \
  bound_service_account_names=hasura \
  bound_service_account_namespaces=platform \
  policies=archpad \
  ttl=1h
```

### Вариант 2: Обновить существующий role `platform`

Если role `platform` уже существует, обновите его, добавив ServiceAccount `hasura`:

```bash
# Подключитесь к Vault pod
kubectl exec -n vault vault-0 -- sh

# Внутри pod выполните (используя root token)
vault read auth/kubernetes/role/platform

# Обновите role, добавив hasura в bound_service_account_names
vault write auth/kubernetes/role/platform \
  bound_service_account_names=hasura \
  bound_service_account_namespaces=platform \
  policies=archpad \
  ttl=1h
```

### Вариант 3: Использовать существующий role `secure`

Если вы хотите использовать тот же role, что и для Ory компонентов, обновите deployment:

В `hasura.deployment.yaml` измените:
```yaml
vault.hashicorp.com/role: "secure"
```

И обновите role `secure` в Vault:
```bash
kubectl exec -n vault vault-0 -- vault write auth/kubernetes/role/secure \
  bound_service_account_names=kratos,hydra,oathkeeper,hasura \
  bound_service_account_namespaces=secure,platform \
  policies=archpad \
  ttl=1h
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
