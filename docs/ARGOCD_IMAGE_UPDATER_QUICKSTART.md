# ArgoCD Image Updater - Быстрый старт

## Что было сделано

✅ Созданы манифесты для настройки ArgoCD Image Updater:
- `infra/timeweb/10-gitops/apps/argocd/argocd-image-updater.configmap.yaml` - ConfigMap с конфигурацией
- `infra/timeweb/10-gitops/apps/argocd/argocd-image-updater-registry-secret.yaml.example` - Шаблон Secret для registry
- `infra/timeweb/10-gitops/apps/argocd/argocd-image-updater-git-secret.yaml.example` - Шаблон Secret для Git
- `infra/timeweb/10-gitops/apps/argocd/argocd-image-updater.app.yaml` - ArgoCD Application (опционально)

✅ Создан скрипт для автоматической проверки и настройки:
- `scripts/setup-argocd-image-updater.sh`

✅ Обновлены манифесты приложений с аннотациями Image Updater:
- `arch-repo-service`, `tenant-service`, `hasura-sync-service`, `portal`

## Что нужно сделать

### Вариант 1: Автоматическая настройка (рекомендуется)

Запустите скрипт, который проверит и настроит все необходимое:

```bash
./scripts/setup-argocd-image-updater.sh
```

Скрипт:
1. Проверит установлен ли ArgoCD Image Updater
2. Создаст/обновит ConfigMap
3. Предложит создать Secrets для registry и Git
4. Перезапустит Image Updater при необходимости

### Вариант 2: Ручная настройка

#### Шаг 1: Установка ArgoCD Image Updater (если не установлен)

```bash
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update
helm install argocd-image-updater argo/argocd-image-updater --namespace argocd
```

#### Шаг 2: Создание Secret для Container Registry

```bash
kubectl create secret docker-registry archpad-registry-secret \
  --docker-server=archpad-cr.registry.twcstorage.ru \
  --docker-username=<REGISTRY_USERNAME> \
  --docker-password=<REGISTRY_PASSWORD> \
  --namespace=argocd
```

**Где взять credentials:**
- `REGISTRY_USERNAME` и `REGISTRY_PASSWORD` - те же, что используются в GitLab CI/CD Variables

#### Шаг 3: Создание Secret для Git SSH ключа

1. Создайте SSH ключ:
```bash
ssh-keygen -t ed25519 -C "argocd-image-updater@archpad.pro" -f argocd-image-updater-key
```

2. Добавьте публичный ключ в GitLab:
   - Settings → SSH Keys → Add SSH Key
   - Скопируйте содержимое `argocd-image-updater-key.pub`

3. Создайте Secret:
```bash
kubectl create secret generic argocd-image-updater-git-ssh-key \
  --from-file=ssh-privatekey=argocd-image-updater-key \
  --namespace=argocd
```

#### Шаг 4: Применение ConfigMap

```bash
kubectl apply -f infra/timeweb/10-gitops/apps/argocd/argocd-image-updater.configmap.yaml
```

#### Шаг 5: Перезапуск Image Updater

```bash
kubectl rollout restart deployment/argocd-image-updater -n argocd
```

## Проверка работы

### 1. Проверка логов

```bash
kubectl logs -n argocd -l app.kubernetes.io/name=argocd-image-updater --tail=100 -f
```

### 2. Проверка обновлений

После того как GitLab CI/CD соберет и опубликует новый образ:
1. Image Updater обнаружит новый образ (в течение 2 минут)
2. Обновит манифест в Git репозитории
3. ArgoCD автоматически синхронизирует изменения

### 3. Проверка в Git

Проверьте, что Image Updater создает коммиты в Git репозитории с обновленными тегами образов.

## Troubleshooting

### Image Updater не находит новые образы

1. Проверьте логи: `kubectl logs -n argocd -l app.kubernetes.io/name=argocd-image-updater`
2. Проверьте доступ к registry:
```bash
kubectl exec -n argocd -it deployment/argocd-image-updater -- \
  curl -u <username>:<password> https://archpad-cr.registry.twcstorage.ru/v2/_catalog
```

### Image Updater не может записать в Git

1. Проверьте SSH ключ в GitLab (Settings → SSH Keys)
2. Проверьте права доступа к репозиторию
3. Проверьте логи Image Updater

### ArgoCD не синхронизирует изменения

1. Убедитесь, что `automated.syncPolicy` включен в Application манифестах
2. Проверьте, что изменения действительно попали в Git
3. Проверьте логи ArgoCD Application Controller

## Дополнительная документация

- Полная документация: `docs/ARGOCD_IMAGE_UPDATER_SETUP.md`
- README в директории argocd: `infra/timeweb/10-gitops/apps/argocd/README.md`
- [Официальная документация ArgoCD Image Updater](https://argocd-image-updater.readthedocs.io/)
