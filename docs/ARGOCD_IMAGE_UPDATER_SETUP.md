# Настройка ArgoCD Image Updater

## Обзор

ArgoCD Image Updater автоматически отслеживает новые версии Docker образов в Container Registry и обновляет манифесты Kubernetes при обнаружении новых образов.

## Что было настроено

### 1. Обновлены образы в манифестах

Все Deployment и Job манифесты обновлены для использования образов из Container Registry TimeWeb:

- `arch-repo-service`: `archpad-cr.registry.twcstorage.ru/archpad/arch-repo-service:latest`
- `tenant-service`: `archpad-cr.registry.twcstorage.ru/archpad/tenant-service:latest`
- `hasura-sync-service`: `archpad-cr.registry.twcstorage.ru/archpad/hasura-sync-service:latest`
- `portal`: `archpad-cr.registry.twcstorage.ru/archpad/portal:latest`

### 2. Добавлены аннотации ArgoCD Image Updater

#### В Deployment/Job манифестах (обязательно):

Аннотации должны быть добавлены в ресурс, который содержит образ (Deployment, StatefulSet, Job и т.д.). ArgoCD Image Updater читает аннотации из этих ресурсов.

```yaml
annotations:
  # Список образов для отслеживания
  # Формат: <alias>=<registry>/<image-name>
  argocd-image-updater.argoproj.io/image-list: <service-name>=archpad-cr.registry.twcstorage.ru/archpad/<service-name>
  # Метод записи изменений обратно в Git
  argocd-image-updater.argoproj.io/write-back-method: git
  # Ветка Git для записи изменений
  argocd-image-updater.argoproj.io/git-branch: main
  # Стратегия обновления (latest - использовать latest тег)
  argocd-image-updater.argoproj.io/<service-name>.update-strategy: latest
```

**Примечание:** Аннотации также добавлены в Application манифесты для удобства, но основными являются аннотации в Deployment/Job манифестах.

## Что нужно настроить в кластере

### 1. Установка ArgoCD Image Updater

Если ArgoCD Image Updater еще не установлен, его нужно установить:

```bash
# Проверка, установлен ли Image Updater
kubectl get pods -n argocd | grep image-updater

# Если не установлен, установите его:
# См. официальную документацию: https://argocd-image-updater.readthedocs.io/
```

### 2. Настройка доступа к Container Registry

ArgoCD Image Updater должен иметь доступ к Container Registry TimeWeb для проверки новых образов.

#### Вариант A: Использование ImagePullSecrets (рекомендуется)

1. Создайте Secret с credentials для registry:

```bash
kubectl create secret docker-registry archpad-registry-secret \
  --docker-server=archpad-cr.registry.twcstorage.ru \
  --docker-username=<REGISTRY_USERNAME> \
  --docker-password=<REGISTRY_PASSWORD> \
  --namespace=argocd
```

2. Настройте ArgoCD Image Updater для использования этого Secret:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-image-updater-config
  namespace: argocd
data:
  registries.conf: |
    registries:
    - name: TimeWeb Container Registry
      prefix: archpad-cr.registry.twcstorage.ru
      api_url: https://archpad-cr.registry.twcstorage.ru
      credentials: ext:/scripts/archpad-registry-secret
      default: true
```

#### Вариант B: Использование ServiceAccount с ImagePullSecrets

1. Создайте Secret (как в Варианте A)
2. Добавьте Secret в ServiceAccount ArgoCD Image Updater:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: argocd-image-updater
  namespace: argocd
imagePullSecrets:
  - name: archpad-registry-secret
```

### 3. Настройка доступа к Git репозиторию

ArgoCD Image Updater должен иметь доступ к Git репозиторию для записи обновлений образов.

#### Если используется SSH ключ:

1. Создайте Secret с SSH ключом:

```bash
kubectl create secret generic git-ssh-key \
  --from-file=ssh-privatekey=<path-to-private-key> \
  --namespace=argocd
```

2. Настройте ArgoCD Image Updater:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-image-updater-config
  namespace: argocd
data:
  git.user: git
  git.email: argocd-image-updater@archpad.pro
  git.ssh_secret: git-ssh-key
```

#### Если используется токен доступа:

1. Создайте Secret с токеном:

```bash
kubectl create secret generic git-creds \
  --from-literal=username=<gitlab-username> \
  --from-literal=password=<gitlab-token> \
  --namespace=argocd
```

2. Настройте ArgoCD Image Updater:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-image-updater-config
  namespace: argocd
data:
  git.user: <gitlab-username>
  git.email: argocd-image-updater@archpad.pro
  git.credentials_secret: git-creds
```

### 4. Настройка ConfigMap для ArgoCD Image Updater

Создайте или обновите ConfigMap с полной конфигурацией:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-image-updater-config
  namespace: argocd
data:
  registries.conf: |
    registries:
    - name: TimeWeb Container Registry
      prefix: archpad-cr.registry.twcstorage.ru
      api_url: https://archpad-cr.registry.twcstorage.ru
      credentials: ext:/scripts/archpad-registry-secret
      default: true
  git.user: <gitlab-username>
  git.email: argocd-image-updater@archpad.pro
  git.ssh_secret: git-ssh-key  # или git.credentials_secret: git-creds
  log.level: info
  # Интервал проверки новых образов (по умолчанию 2 минуты)
  check.interval: 2m
```

## Как это работает

1. **GitLab CI/CD** собирает и публикует новые образы в Container Registry с тегом `latest` и тегом с commit SHA
2. **ArgoCD Image Updater** периодически проверяет registry на наличие новых образов
3. При обнаружении нового образа Image Updater:
   - Обновляет манифест в Git репозитории (меняет тег образа)
   - ArgoCD автоматически синхронизирует изменения (благодаря `automated.syncPolicy`)
   - Kubernetes перезапускает поды с новым образом

## Проверка работы

### 1. Проверка логов ArgoCD Image Updater

```bash
kubectl logs -n argocd -l app.kubernetes.io/name=argocd-image-updater --tail=100
```

### 2. Проверка обновлений в Git

После того как Image Updater обнаружит новый образ, он создаст commit в Git репозитории с обновленным тегом образа.

### 3. Проверка синхронизации ArgoCD

В UI ArgoCD вы увидите, что Application автоматически синхронизируется после обновления манифеста.

## Стратегии обновления

Текущая настройка использует стратегию `latest`, которая всегда использует образ с тегом `latest`.

### Альтернативные стратегии:

1. **semver** - использовать семантическое версионирование (например, `v1.2.3`)
2. **digest** - использовать SHA256 digest образа
3. **name** - использовать имя тега как есть

Для перехода на семантическое версионирование:

```yaml
annotations:
  argocd-image-updater.argoproj.io/<service-name>.update-strategy: semver
  argocd-image-updater.argoproj.io/<service-name>.allow-tags: regexp:^v[0-9]+\.[0-9]+\.[0-9]+$
```

## Отключение автоматического обновления

Если нужно временно отключить автоматическое обновление для конкретного сервиса:

```yaml
annotations:
  argocd-image-updater.argoproj.io/<service-name>.update-strategy: none
```

## Troubleshooting

### Image Updater не находит новые образы

1. Проверьте доступ к registry:
```bash
kubectl exec -n argocd -it <image-updater-pod> -- \
  curl -u <username>:<password> https://archpad-cr.registry.twcstorage.ru/v2/_catalog
```

2. Проверьте логи Image Updater на наличие ошибок

### Image Updater не может записать в Git

1. Проверьте права доступа к Git репозиторию
2. Проверьте настройки SSH ключа или токена доступа
3. Проверьте логи Image Updater

### ArgoCD не синхронизирует изменения

1. Убедитесь, что `automated.syncPolicy` включен в Application
2. Проверьте, что изменения действительно попали в Git репозиторий
3. Проверьте логи ArgoCD Application Controller

## Дополнительные ресурсы

- [Официальная документация ArgoCD Image Updater](https://argocd-image-updater.readthedocs.io/)
- [Примеры конфигурации](https://argocd-image-updater.readthedocs.io/en/stable/configuration/)
- [Настройка registry credentials](https://argocd-image-updater.readthedocs.io/en/stable/configuration/registries/)
