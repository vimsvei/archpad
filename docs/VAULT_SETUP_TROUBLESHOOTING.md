# Troubleshooting Vault Setup Policy

## Проблема: Job не может запуститься - ошибка pull образа

### Диагностика

```bash
# Проверить статус Pod
kubectl get pods -n vault -l job-name=vault-setup-policy

# Проверить детали Pod
kubectl describe pod -n vault -l job-name=vault-setup-policy

# Проверить события
kubectl get events -n vault --sort-by='.lastTimestamp' | grep vault-setup-policy
```

### Решение 1: Использовать образ с curl вместо vault CLI

Если образ `vault:1.15.0` недоступен или не может быть загружен, можно использовать образ с curl:

```bash
# Удалить текущий Job
kubectl delete job vault-setup-policy -n vault

# Применить исправленный манифест (будет создан ниже)
kubectl apply -f infra/timeweb/10-gitops/apps/vault/vault-setup-policy.job.yaml
```

### Решение 2: Проверить доступность образа

```bash
# Проверить, доступен ли образ
docker pull vault:1.15.0

# Или использовать более новую версию
docker pull vault:latest
```

### Решение 3: Использовать альтернативный образ

Можно использовать образ с curl и jq вместо vault CLI:

```yaml
image: curlimages/curl:latest
```

И выполнять все операции через Vault HTTP API вместо CLI.

## Проблема: Job зависает или не завершается

### Диагностика

```bash
# Проверить логи Pod
kubectl logs -n vault -l job-name=vault-setup-policy --tail=100

# Проверить статус Job
kubectl get job vault-setup-policy -n vault -o yaml

# Проверить, не заблокирован ли Vault
kubectl exec -n vault deployment/vault -- vault status
```

### Решение: Проверить доступность Vault

```bash
# Проверить, доступен ли Vault
kubectl get pods -n vault
kubectl get svc -n vault

# Проверить, не заблокирован ли Vault
kubectl exec -n vault deployment/vault -- vault status
```

Если Vault заблокирован, нужно его разблокировать:

```bash
# Получить unseal keys (из инициализации Vault)
kubectl exec -n vault deployment/vault -- vault operator unseal <unseal-key-1>
kubectl exec -n vault deployment/vault -- vault operator unseal <unseal-key-2>
kubectl exec -n vault deployment/vault -- vault operator unseal <unseal-key-3>
```

## Проблема: Application OutOfSync/Missing

### Решение

```bash
# Синхронизировать Application вручную
kubectl patch application platform-applications -n argocd --type merge -p '{"operation":{"initiatedBy":{"username":"admin"},"sync":{"revision":"HEAD"}}}'

# Или через ArgoCD CLI
argocd app sync platform-applications
```

## Быстрое исправление: Использовать curl вместо vault CLI

Если проблема с образом vault, можно временно использовать curl:

```bash
# Удалить текущий Job
kubectl delete job vault-setup-policy -n vault

# Создать Job с curl (см. исправленный манифест ниже)
```
