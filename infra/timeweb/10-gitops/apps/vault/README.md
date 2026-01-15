# Vault Configuration

Эта директория содержит конфигурацию для HashiCorp Vault.

## Структура

- `vault.app.yaml` - ArgoCD Application для установки Vault через Helm
- `vault-setup-kubernetes-auth.configmap.yaml` - ConfigMap со скриптом для настройки Kubernetes Auth Method
- `vault-setup-kubernetes-auth.job.yaml` - Job для автоматической настройки Kubernetes Auth Method (sync-wave: 5)
- `vault-setup-policy.configmap.yaml` - ConfigMap с политикой для безопасной настройки Vault
- `vault-setup-policy.job.yaml` - Job для применения политики и создания ограниченного токена (sync-wave: 6)
- `vault.ingressroute.yaml` - IngressRoute для доступа к Vault UI
- `vault-http.ingressroute.yaml` - HTTP IngressRoute (редирект на HTTPS)
- `vault.middleware.yaml` - Middleware для Vault

## Управление через GitOps

Все манифесты в этой директории управляются через GitOps:

1. **Push в Git** → ArgoCD автоматически обнаруживает изменения
2. **Автоматическая синхронизация** → ArgoCD применяет манифесты в кластер
3. **Job'ы выполняются автоматически в правильном порядке:**
   - `vault-setup-kubernetes-auth` (sync-wave: 5) - настраивает Kubernetes Auth Method
   - `vault-setup-policy` (sync-wave: 6) - создает политики и ограниченный токен
   - `secure-vault-role` (sync-wave: 41) - создает роль для namespace `secure`
   - `hasura-vault-role` (sync-wave: 46) - создает роль для namespace `platform`

**Важно:** Job `vault-setup-kubernetes-auth` должен выполниться успешно до того, как другие Job'ы попытаются создать роли. Без настроенного Kubernetes Auth Method все поды с Vault Agent не смогут аутентифицироваться.

## Настройка безопасного доступа

### Проблема

Job'ы для настройки Vault roles используют root токен, что небезопасно.

### Решение

Создана политика `vault-setup` с ограниченными правами:
- ✅ Управление Kubernetes Auth Method
- ✅ Создание и обновление ролей
- ❌ НЕТ доступа к секретам

### Применение

#### 1. Автоматически (через GitOps)

После push в Git:
- ConfigMap с политикой применится автоматически
- Job для создания ограниченного токена запустится автоматически

#### 2. Вручную (только один раз)

**Secret'ы НЕ должны быть в Git** (секретные данные):

```bash
# 1. Создать Secret с root токеном (только для первоначальной настройки)
kubectl create secret generic vault-root-token \
  --from-literal=VAULT_ROOT_TOKEN='<your-vault-root-token>' \
  --namespace=vault

# 2. Настроить Kubernetes Auth Method (ВАЖНО: должно быть первым!)
kubectl apply -f vault-setup-kubernetes-auth.configmap.yaml
kubectl apply -f vault-setup-kubernetes-auth.job.yaml
kubectl wait --for=condition=complete job/vault-setup-kubernetes-auth -n vault --timeout=300s

# 3. Дождаться завершения Job для создания политик (ArgoCD запустит его автоматически)
kubectl wait --for=condition=complete job/vault-setup-policy -n vault --timeout=300s

# 4. Получить ограниченный токен из логов
kubectl logs job/vault-setup-policy -n vault | grep -A 5 "Token:"

# 5. Создать Secret с ограниченным токеном
SETUP_TOKEN="<token-from-logs>"
kubectl create secret generic vault-setup-token \
  --from-literal=VAULT_SETUP_TOKEN="$SETUP_TOKEN" \
  --namespace=platform

kubectl create secret generic vault-setup-token \
  --from-literal=VAULT_SETUP_TOKEN="$SETUP_TOKEN" \
  --namespace=secure
```

После этого все Job'ы будут использовать ограниченный токен автоматически!

## Проверка

```bash
# Проверить статус Vault Application
kubectl get application vault -n argocd

# Проверить статус Job для настройки Kubernetes Auth
kubectl get job vault-setup-kubernetes-auth -n vault
kubectl logs job/vault-setup-kubernetes-auth -n vault

# Проверить статус Job для создания политик
kubectl get job vault-setup-policy -n vault
kubectl logs job/vault-setup-policy -n vault

# Проверить, что Kubernetes Auth настроен
kubectl exec -n vault vault-0 -- sh -c 'export VAULT_TOKEN="<root-token>" && vault read auth/kubernetes/config'

# Проверить, что Job'ы используют ограниченный токен
kubectl logs job/hasura-vault-role -n platform | grep "Using limited setup token"
```

## Дополнительная документация

- [Полная документация по настройке](../../../../docs/VAULT_SETUP.md)
- [Официальная документация Vault](https://www.vaultproject.io/docs)
