# ArgoCD Image Updater

## Обзор

ArgoCD Image Updater автоматически отслеживает новые версии Docker образов в Container Registry и обновляет манифесты Kubernetes при обнаружении новых образов.

## Как это работает

1. **GitLab CI/CD** собирает и публикует новые образы в Container Registry с тегом `latest` и тегом с версией/commit SHA
2. **ArgoCD Image Updater** периодически проверяет registry на наличие новых образов (каждые 2 минуты)
3. При обнаружении нового образа Image Updater:
   - Обновляет манифест в Git репозитории (меняет тег образа)
   - ArgoCD автоматически синхронизирует изменения (благодаря `automated.syncPolicy`)
   - Kubernetes перезапускает поды с новым образом

## Быстрый старт

### Автоматическая настройка (рекомендуется)

Запустите скрипт, который проверит и настроит все необходимое:

```bash
./scripts/setup-argocd-image-updater.sh
```

Скрипт:
1. Проверит установлен ли ArgoCD Image Updater
2. Создаст/обновит ConfigMap
3. Предложит создать Secrets для registry и Git
4. Перезапустит Image Updater при необходимости

### Ручная настройка

#### Шаг 1: Установка ArgoCD Image Updater

**Вариант A: Автоматическая установка через ArgoCD (рекомендуется)**

Если настроен корневой Application `platform-applications`, Image Updater будет установлен автоматически:

1. Убедитесь, что манифесты в Git: `infra/timeweb/10-gitops/apps/argocd-image-updater/`
2. ArgoCD автоматически обнаружит Application и установит компоненты
3. Проверьте статус: `kubectl get application argocd-image-updater -n argocd`

**Вариант B: Ручная установка через Helm**

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
kubectl apply -f infra/timeweb/10-gitops/apps/argocd-image-updater/argocd-image-updater.configmap.yaml
```

**Или через GitOps:** ConfigMap будет применен автоматически при синхронизации Application.

#### Шаг 5: Перезапуск Image Updater

```bash
kubectl rollout restart deployment/argocd-image-updater -n argocd
```

## Компоненты

Все компоненты управляются через GitOps и находятся в `infra/timeweb/10-gitops/apps/argocd-image-updater/`:

### Управляемые через GitOps:
- `argocd-image-updater.app.yaml` - ArgoCD Application
- `argocd-image-updater.deployment.yaml` - Deployment
- `argocd-image-updater.serviceaccount.yaml` - ServiceAccount
- `argocd-image-updater.service.yaml` - Service
- `argocd-image-updater.rbac.yaml` - RBAC (ClusterRole и ClusterRoleBinding)
- `argocd-image-updater.configmap.yaml` - ConfigMap с конфигурацией

### Создаются вручную:
- `archpad-registry-secret` - Secret для Container Registry
- `argocd-image-updater-git-ssh-key` - Secret для Git SSH ключа

## Конфигурация

### ConfigMap

ConfigMap уже настроен для:
- ✅ TimeWeb Container Registry (`archpad-cr.registry.twcstorage.ru`)
- ✅ Git SSH ключ
- ✅ Интервал проверки: 2 минуты
- ✅ Логирование: info level

### Аннотации в манифестах

Все Deployment и Job манифесты обновлены с аннотациями:

```yaml
annotations:
  # Список образов для отслеживания
  argocd-image-updater.argoproj.io/image-list: <service-name>=archpad-cr.registry.twcstorage.ru/archpad/<service-name>
  # Метод записи изменений обратно в Git
  argocd-image-updater.argoproj.io/write-back-method: git
  # Ветка Git для записи изменений
  argocd-image-updater.argoproj.io/git-branch: main
  # Стратегия обновления (latest - использовать latest тег)
  argocd-image-updater.argoproj.io/<service-name>.update-strategy: latest
```

**Сервисы с аннотациями:**
- `arch-repo-service`
- `tenant-service`
- `hasura-sync-service`
- `portal`

## Проверка работы

### 1. Проверка статуса через GitOps

```bash
# Проверка ArgoCD Application
kubectl get application argocd-image-updater -n argocd

# Детальный статус
kubectl get application argocd-image-updater -n argocd -o yaml
```

### 2. Проверка компонентов

```bash
# Проверка Deployment
kubectl get deployment argocd-image-updater -n argocd

# Проверка подов
kubectl get pods -n argocd -l app.kubernetes.io/name=argocd-image-updater

# Проверка ConfigMap
kubectl get configmap argocd-image-updater-config -n argocd

# Проверка Secrets
kubectl get secret archpad-registry-secret -n argocd
kubectl get secret argocd-image-updater-git-ssh-key -n argocd
```

### 3. Проверка логов

```bash
kubectl logs -n argocd -l app.kubernetes.io/name=argocd-image-updater --tail=100 -f
```

### 4. Проверка обновлений

После того как GitLab CI/CD соберет и опубликует новый образ:
1. Image Updater обнаружит новый образ (в течение 2 минут)
2. Обновит манифест в Git репозитории
3. ArgoCD автоматически синхронизирует изменения

### 5. Проверка в Git

Проверьте, что Image Updater создает коммиты в Git репозитории с обновленными тегами образов.

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

## Решение проблем

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

3. Убедитесь, что образы действительно опубликованы в registry:
```bash
docker pull archpad-cr.registry.twcstorage.ru/archpad/arch-repo-service:latest
```

### Image Updater не может записать в Git

1. Проверьте SSH ключ в GitLab (Settings → SSH Keys)
2. Проверьте права доступа к репозиторию
3. Проверьте логи Image Updater на наличие ошибок Git

### ArgoCD не синхронизирует изменения

1. Убедитесь, что `automated.syncPolicy` включен в Application манифестах
2. Проверьте, что изменения действительно попали в Git репозиторий
3. Проверьте логи ArgoCD Application Controller:
```bash
kubectl logs -n argocd -l app.kubernetes.io/name=argocd-application-controller --tail=100
```

## Дополнительные ресурсы

- [Официальная документация ArgoCD Image Updater](https://argocd-image-updater.readthedocs.io/)
- [Примеры конфигурации](https://argocd-image-updater.readthedocs.io/en/stable/configuration/)
- [Настройка registry credentials](https://argocd-image-updater.readthedocs.io/en/stable/configuration/registries/)
