# ArgoCD Configuration

Эта директория содержит конфигурацию для ArgoCD и ArgoCD Image Updater.

## Структура

- `argocd.ingressroute.yaml` - IngressRoute для доступа к ArgoCD UI
- `argocd.middleware.yaml` - Middleware для ArgoCD
- `argocd-wildcard.certificate.yaml` - TLS сертификат для ArgoCD
- `argocd-image-updater.configmap.yaml` - ConfigMap с конфигурацией Image Updater
- `argocd-image-updater-registry-secret.yaml.example` - Шаблон Secret для Container Registry
- `argocd-image-updater-git-secret.yaml.example` - Шаблон Secret для Git SSH ключа
- `argocd-image-updater.app.yaml` - ArgoCD Application для установки Image Updater (опционально)

## Настройка ArgoCD Image Updater

### Шаг 1: Проверка установки Image Updater

```bash
# Проверьте, установлен ли ArgoCD Image Updater
kubectl get pods -n argocd | grep image-updater

# Если не установлен, см. шаг 2
```

### Шаг 2: Установка ArgoCD Image Updater (если не установлен)

#### Вариант A: Через Helm (рекомендуется)

```bash
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update

helm install argocd-image-updater argo/argocd-image-updater \
  --namespace argocd \
  --create-namespace \
  --set config.registries[0].name="TimeWeb Container Registry" \
  --set config.registries[0].prefix="archpad-cr.registry.twcstorage.ru" \
  --set config.registries[0].api_url="https://archpad-cr.registry.twcstorage.ru"
```

#### Вариант B: Через ArgoCD Application

Примените `argocd-image-updater.app.yaml` (если настроен ArgoCD для управления собой).

### Шаг 3: Настройка доступа к Container Registry

1. Скопируйте шаблон Secret:
```bash
cp argocd-image-updater-registry-secret.yaml.example argocd-image-updater-registry-secret.yaml
```

2. Получите credentials для Container Registry TimeWeb:
   - `REGISTRY_USERNAME` - имя пользователя
   - `REGISTRY_PASSWORD` - пароль или токен доступа

3. Создайте Secret одним из способов:

**Способ 1: Через kubectl (рекомендуется)**
```bash
kubectl create secret docker-registry archpad-registry-secret \
  --docker-server=archpad-cr.registry.twcstorage.ru \
  --docker-username=<REGISTRY_USERNAME> \
  --docker-password=<REGISTRY_PASSWORD> \
  --namespace=argocd
```

**Способ 2: Через манифест**
1. Отредактируйте `argocd-image-updater-registry-secret.yaml`
2. Создайте base64 encoded .dockerconfigjson:
```bash
echo -n '{"auths":{"archpad-cr.registry.twcstorage.ru":{"username":"<USERNAME>","password":"<PASSWORD>","auth":"'$(echo -n '<USERNAME>:<PASSWORD>' | base64)'"}}}' | base64
```
3. Вставьте результат в поле `.dockerconfigjson` в манифесте
4. Примените: `kubectl apply -f argocd-image-updater-registry-secret.yaml`

### Шаг 4: Настройка доступа к Git репозиторию

1. Создайте SSH ключ для ArgoCD Image Updater:
```bash
ssh-keygen -t ed25519 -C "argocd-image-updater@archpad.pro" -f argocd-image-updater-key
```

2. Добавьте публичный ключ в GitLab:
   - Перейдите в GitLab: Settings → SSH Keys
   - Скопируйте содержимое `argocd-image-updater-key.pub`
   - Вставьте и сохраните

3. Создайте Secret с приватным ключом:

**Способ 1: Через kubectl (рекомендуется)**
```bash
kubectl create secret generic argocd-image-updater-git-ssh-key \
  --from-file=ssh-privatekey=argocd-image-updater-key \
  --namespace=argocd
```

**Способ 2: Через манифест**
1. Скопируйте шаблон:
```bash
cp argocd-image-updater-git-secret.yaml.example argocd-image-updater-git-secret.yaml
```

2. Создайте base64 encoded приватный ключ:
```bash
cat argocd-image-updater-key | base64 -w 0
```

3. Вставьте результат в поле `ssh-privatekey` в манифесте
4. Примените: `kubectl apply -f argocd-image-updater-git-secret.yaml`

### Шаг 5: Применение ConfigMap

```bash
kubectl apply -f argocd-image-updater.configmap.yaml
```

### Шаг 6: Перезапуск ArgoCD Image Updater

После создания/обновления ConfigMap и Secrets перезапустите Image Updater:

```bash
kubectl rollout restart deployment/argocd-image-updater -n argocd
```

## Проверка работы

### 1. Проверка логов Image Updater

```bash
kubectl logs -n argocd -l app.kubernetes.io/name=argocd-image-updater --tail=100 -f
```

### 2. Проверка доступа к Container Registry

```bash
kubectl exec -n argocd -it deployment/argocd-image-updater -- \
  curl -u <username>:<password> https://archpad-cr.registry.twcstorage.ru/v2/_catalog
```

### 3. Проверка обновлений

После того как GitLab CI/CD соберет и опубликует новый образ, Image Updater должен:
1. Обнаружить новый образ (в течение 2 минут)
2. Обновить манифест в Git репозитории
3. ArgoCD автоматически синхронизирует изменения

## Troubleshooting

### Image Updater не находит новые образы

1. Проверьте логи Image Updater
2. Проверьте доступ к registry (см. выше)
3. Убедитесь, что ConfigMap применен правильно

### Image Updater не может записать в Git

1. Проверьте SSH ключ в GitLab
2. Проверьте права доступа к репозиторию
3. Проверьте логи Image Updater на наличие ошибок Git

### ArgoCD не синхронизирует изменения

1. Убедитесь, что `automated.syncPolicy` включен в Application манифестах
2. Проверьте, что изменения действительно попали в Git
3. Проверьте логи ArgoCD Application Controller

## Дополнительные ресурсы

- [Официальная документация ArgoCD Image Updater](https://argocd-image-updater.readthedocs.io/)
- [Документация по настройке в проекте](../docs/ARGOCD_IMAGE_UPDATER_SETUP.md)
