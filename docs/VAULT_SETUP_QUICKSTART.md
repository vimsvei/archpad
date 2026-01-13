# Быстрая настройка Vault Setup Policy

## Вариант 1: Применить вручную (для быстрого тестирования)

Если манифесты еще не применены через GitOps, можно применить их вручную:

```bash
# 1. Применить ConfigMap с политикой
kubectl apply -f infra/timeweb/10-gitops/apps/vault/vault-setup-policy.configmap.yaml

# 2. Применить Job для создания политики и токена
kubectl apply -f infra/timeweb/10-gitops/apps/vault/vault-setup-policy.job.yaml

# 3. Дождаться завершения Job
kubectl wait --for=condition=complete job/vault-setup-policy -n vault --timeout=300s

# 4. Получить токен из логов
kubectl logs job/vault-setup-policy -n vault | grep -A 5 "Token:"
```

## Вариант 2: Через GitOps (рекомендуется для production)

1. **Сделать push в Git:**
```bash
git add infra/timeweb/10-gitops/apps/vault/
git commit -m "Add Vault setup policy for secure token management"
git push
```

2. **Дождаться синхронизации ArgoCD:**
   - Проверить в ArgoCD UI или через CLI:
   ```bash
   kubectl get application platform-applications -n argocd
   ```

3. **После синхронизации Job запустится автоматически**

4. **Получить токен из логов:**
```bash
kubectl logs job/vault-setup-policy -n vault | grep -A 5 "Token:"
```

## Создание Secret с ограниченным токеном

После получения токена из Job:

```bash
# Получить токен из логов (скопировать из вывода выше)
SETUP_TOKEN="<token-from-job-logs>"

# Создать Secret в namespace platform
kubectl create secret generic vault-setup-token \
  --from-literal=VAULT_SETUP_TOKEN="$SETUP_TOKEN" \
  --namespace=platform

# Создать Secret в namespace secure
kubectl create secret generic vault-setup-token \
  --from-literal=VAULT_SETUP_TOKEN="$SETUP_TOKEN" \
  --namespace=secure
```

## Проверка

```bash
# Проверить, что Job'ы используют ограниченный токен
kubectl logs job/hasura-vault-role -n platform | grep "Using limited setup token"
kubectl logs job/secure-vault-role -n secure | grep "Using limited setup token"
```
