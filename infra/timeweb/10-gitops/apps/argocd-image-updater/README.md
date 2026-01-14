# ArgoCD Image Updater

ArgoCD Image Updater автоматически отслеживает новые версии Docker образов в Container Registry и обновляет манифесты Kubernetes при обнаружении новых образов.

## Структура

- `argocd-image-updater.app.yaml` - ArgoCD Application для управления Image Updater
- `argocd-image-updater.deployment.yaml` - Deployment для Image Updater
- `argocd-image-updater.serviceaccount.yaml` - ServiceAccount для Image Updater
- `argocd-image-updater.configmap.yaml` - ConfigMap с конфигурацией
- `argocd-image-updater-registry-secret.yaml.example` - Шаблон Secret для Container Registry
- `argocd-image-updater-git-secret.yaml.example` - Шаблон Secret для Git SSH ключа

## Установка

### Автоматическая установка через ArgoCD

Если настроен корневой Application `platform-applications`, Image Updater будет установлен автоматически при синхронизации ArgoCD.

### Ручная установка

1. Убедитесь, что созданы необходимые Secrets (см. ниже)
2. Примените манифесты:

```bash
kubectl apply -f infra/timeweb/10-gitops/apps/argocd-image-updater/
```

## Настройка Secrets

### 1. Secret для Container Registry

Создайте Secret с credentials для Container Registry TimeWeb:

```bash
kubectl create secret docker-registry archpad-registry-secret \
  --docker-server=archpad-cr.registry.twcstorage.ru \
  --docker-username=<REGISTRY_USERNAME> \
  --docker-password=<REGISTRY_PASSWORD> \
  --namespace=argocd
```

**Или используйте шаблон:**
- Скопируйте `argocd-image-updater-registry-secret.yaml.example` в `argocd-image-updater-registry-secret.yaml`
- Заполните credentials и примените

### 2. Secret для Git SSH ключа

1. Создайте SSH ключ:
```bash
ssh-keygen -t ed25519 -C "argocd-image-updater@archpad.pro" -f argocd-image-updater-key
```

2. Добавьте публичный ключ в GitLab (Settings → SSH Keys)

3. Создайте Secret:
```bash
kubectl create secret generic argocd-image-updater-git-ssh-key \
  --from-file=ssh-privatekey=argocd-image-updater-key \
  --namespace=argocd
```

**Или используйте шаблон:**
- Скопируйте `argocd-image-updater-git-secret.yaml.example` в `argocd-image-updater-git-secret.yaml`
- Заполните SSH ключ и примените

## Проверка установки

### Проверка статуса

```bash
# Проверка Deployment
kubectl get deployment argocd-image-updater -n argocd

# Проверка подов
kubectl get pods -n argocd -l app.kubernetes.io/name=argocd-image-updater

# Проверка логов
kubectl logs -n argocd -l app.kubernetes.io/name=argocd-image-updater --tail=100 -f
```

### Проверка конфигурации

```bash
# Проверка ConfigMap
kubectl get configmap argocd-image-updater-config -n argocd -o yaml

# Проверка Secrets
kubectl get secret archpad-registry-secret -n argocd
kubectl get secret argocd-image-updater-git-ssh-key -n argocd
```

## Как это работает

1. **GitLab CI/CD** собирает и публикует новые образы в Container Registry с тегом `latest` и тегом с commit SHA
2. **ArgoCD Image Updater** периодически проверяет registry на наличие новых образов (каждые 2 минуты)
3. При обнаружении нового образа Image Updater:
   - Обновляет манифест в Git репозитории (меняет тег образа)
   - ArgoCD автоматически синхронизирует изменения (благодаря `automated.syncPolicy`)
   - Kubernetes перезапускает поды с новым образом

## Troubleshooting

### Image Updater не запускается

1. Проверьте логи:
```bash
kubectl logs -n argocd -l app.kubernetes.io/name=argocd-image-updater
```

2. Проверьте, что ConfigMap и Secrets созданы:
```bash
kubectl get configmap argocd-image-updater-config -n argocd
kubectl get secret archpad-registry-secret -n argocd
kubectl get secret argocd-image-updater-git-ssh-key -n argocd
```

### Image Updater не находит новые образы

1. Проверьте доступ к registry:
```bash
kubectl exec -n argocd -it deployment/argocd-image-updater -- \
  curl -u <username>:<password> https://archpad-cr.registry.twcstorage.ru/v2/_catalog
```

2. Проверьте логи Image Updater на наличие ошибок

### Image Updater не может записать в Git

1. Проверьте SSH ключ в GitLab (Settings → SSH Keys)
2. Проверьте права доступа к репозиторию
3. Проверьте логи Image Updater

## Дополнительные ресурсы

- [Официальная документация ArgoCD Image Updater](https://argocd-image-updater.readthedocs.io/)
- [Документация по настройке в проекте](../../../../docs/ARGOCD_IMAGE_UPDATER.md)
