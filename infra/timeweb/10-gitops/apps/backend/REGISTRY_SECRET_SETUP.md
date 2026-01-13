# Настройка секрета для Container Registry

## Проблема

Сервисы не могут загрузить Docker образы из Container Registry из-за отсутствия секрета для аутентификации.

## Решение

Создайте секрет `archpad-registry-secret` в namespace `platform` с credentials для доступа к Container Registry.

## Способ 1: Через kubectl (рекомендуется)

```bash
export KUBECONFIG=/path/to/twc-archpad-k8s-cluster-config.yaml

# Получите credentials из GitLab CI/CD Variables:
# - REGISTRY_USERNAME
# - REGISTRY_PASSWORD
# - REGISTRY_URL (обычно: archpad-cr.registry.twcstorage.ru)

kubectl create secret docker-registry archpad-registry-secret \
  --docker-server=archpad-cr.registry.twcstorage.ru \
  --docker-username=<REGISTRY_USERNAME> \
  --docker-password=<REGISTRY_PASSWORD> \
  --namespace=platform
```

## Способ 2: Через манифест

1. Отредактируйте файл `registry-secret.yaml`
2. Создайте base64 encoded .dockerconfigjson:

```bash
REGISTRY_USERNAME="your-username"
REGISTRY_PASSWORD="your-password"
REGISTRY_URL="archpad-cr.registry.twcstorage.ru"

# Создайте .dockerconfigjson
DOCKERCONFIGJSON=$(echo -n "{\"auths\":{\"${REGISTRY_URL}\":{\"username\":\"${REGISTRY_USERNAME}\",\"password\":\"${REGISTRY_PASSWORD}\",\"auth\":\"$(echo -n "${REGISTRY_USERNAME}:${REGISTRY_PASSWORD}" | base64)\"}}}" | base64)

# Замените <BASE64_ENCODED_DOCKERCONFIGJSON> в registry-secret.yaml на полученное значение
```

3. Примените манифест:

```bash
kubectl apply -f registry-secret.yaml
```

## Проверка

После создания секрета проверьте, что он доступен:

```bash
kubectl get secret archpad-registry-secret -n platform
```

## Примечание

ServiceAccounts уже настроены для использования этого секрета через `imagePullSecrets`. После создания секрета поды должны автоматически начать загружать образы.
