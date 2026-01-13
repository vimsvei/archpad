# Vault Configuration

Эта директория содержит конфигурацию для HashiCorp Vault.

## Структура

- `vault.app.yaml` - ArgoCD Application для установки Vault через Helm
- `vault-setup-policy.configmap.yaml` - ConfigMap с политикой для безопасной настройки Vault
- `vault-setup-policy.job.yaml` - Job для применения политики и создания ограниченного токена
- `vault.ingressroute.yaml` - IngressRoute для доступа к Vault UI
- `vault-http.ingressroute.yaml` - HTTP IngressRoute (редирект на HTTPS)
- `vault.middleware.yaml` - Middleware для Vault

## Управление через GitOps

Все манифесты в этой директории управляются через GitOps:

1. **Push в Git** → ArgoCD автоматически обнаруживает изменения
2. **Автоматическая синхронизация** → ArgoCD применяет манифесты в кластер
3. **Job'ы выполняются автоматически** → Настраивают Vault roles и политики

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

# 2. Дождаться завершения Job (ArgoCD запустит его автоматически)
kubectl wait --for=condition=complete job/vault-setup-policy -n vault --timeout=300s

# 3. Получить ограниченный токен из логов
kubectl logs job/vault-setup-policy -n vault | grep -A 5 "Token:"

# 4. Создать Secret с ограниченным токеном
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

# Проверить статус Job
kubectl get job vault-setup-policy -n vault

# Проверить логи Job
kubectl logs job/vault-setup-policy -n vault

# Проверить, что Job'ы используют ограниченный токен
kubectl logs job/hasura-vault-role -n platform | grep "Using limited setup token"
```

## Дополнительная документация

- [Полная документация по настройке](../../../../docs/VAULT_KUBERNETES_AUTH_SETUP.md)
- [Официальная документация Vault](https://www.vaultproject.io/docs)
