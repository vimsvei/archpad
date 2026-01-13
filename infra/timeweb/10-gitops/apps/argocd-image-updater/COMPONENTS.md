# Компоненты ArgoCD Image Updater

Этот документ описывает все компоненты, необходимые для работы ArgoCD Image Updater.

## Установленные компоненты

Все компоненты управляются через GitOps и находятся в этой директории:

### 1. ArgoCD Application
- **Файл:** `argocd-image-updater.app.yaml`
- **Назначение:** Управляет установкой и синхронизацией всех компонентов через ArgoCD
- **Проверка:** `kubectl get application argocd-image-updater -n argocd`

### 2. Deployment
- **Файл:** `argocd-image-updater.deployment.yaml`
- **Назначение:** Основной компонент - под, который отслеживает новые образы
- **Проверка:** `kubectl get deployment argocd-image-updater -n argocd`
- **Статус:** `kubectl get pods -n argocd -l app.kubernetes.io/name=argocd-image-updater`

### 3. ServiceAccount
- **Файл:** `argocd-image-updater.serviceaccount.yaml`
- **Назначение:** ServiceAccount для подов Image Updater
- **Проверка:** `kubectl get serviceaccount argocd-image-updater -n argocd`

### 4. RBAC (ClusterRole и ClusterRoleBinding)
- **Файл:** `argocd-image-updater.rbac.yaml`
- **Назначение:** Права доступа для работы с ArgoCD Applications API и Secrets
- **Проверка:** `kubectl get clusterrole argocd-image-updater`
- **Проверка:** `kubectl get clusterrolebinding argocd-image-updater`

### 5. Service
- **Файл:** `argocd-image-updater.service.yaml`
- **Назначение:** Service для health checks и метрик
- **Проверка:** `kubectl get service argocd-image-updater -n argocd`

### 6. ConfigMap
- **Файл:** `argocd-image-updater.configmap.yaml`
- **Назначение:** Конфигурация Image Updater (registry, Git, интервалы проверки)
- **Проверка:** `kubectl get configmap argocd-image-updater-config -n argocd`

## Требуемые Secrets (создаются вручную)

### 1. Secret для Container Registry
- **Шаблон:** `argocd-image-updater-registry-secret.yaml.example`
- **Имя:** `archpad-registry-secret`
- **Назначение:** Credentials для доступа к Container Registry TimeWeb
- **Создание:** См. README.md

### 2. Secret для Git SSH ключа
- **Шаблон:** `argocd-image-updater-git-secret.yaml.example`
- **Имя:** `argocd-image-updater-git-ssh-key`
- **Назначение:** SSH ключ для записи обновлений в Git репозиторий
- **Создание:** См. README.md

## Проверка установки

### Быстрая проверка всех компонентов

```bash
# Application
kubectl get application argocd-image-updater -n argocd

# Deployment и Pods
kubectl get deployment,pods -n argocd -l app.kubernetes.io/name=argocd-image-updater

# ServiceAccount
kubectl get serviceaccount argocd-image-updater -n argocd

# RBAC
kubectl get clusterrole,clusterrolebinding argocd-image-updater

# Service
kubectl get service argocd-image-updater -n argocd

# ConfigMap
kubectl get configmap argocd-image-updater-config -n argocd

# Secrets (должны быть созданы вручную)
kubectl get secret archpad-registry-secret -n argocd
kubectl get secret argocd-image-updater-git-ssh-key -n argocd
```

### Использование скрипта

```bash
./scripts/setup-argocd-image-updater.sh
```

Скрипт автоматически проверит все компоненты и покажет, что установлено, а что нет.

## Управление через GitOps

Все компоненты (кроме Secrets) управляются через GitOps:

1. **Изменения в Git** → ArgoCD Application обнаруживает изменения
2. **Автоматическая синхронизация** → ArgoCD применяет изменения в кластер
3. **Проверка статуса** → `kubectl get application argocd-image-updater -n argocd`

## Структура зависимостей

```
ArgoCD Application (argocd-image-updater.app.yaml)
  ├── Deployment (argocd-image-updater.deployment.yaml)
  │   ├── ServiceAccount (argocd-image-updater.serviceaccount.yaml)
  │   ├── ConfigMap (argocd-image-updater.configmap.yaml)
  │   └── Secrets (создаются вручную)
  ├── Service (argocd-image-updater.service.yaml)
  └── RBAC (argocd-image-updater.rbac.yaml)
      └── ClusterRoleBinding → ServiceAccount
```

## Troubleshooting

Если компонент не установлен:

1. Проверьте, что манифесты в Git: `infra/timeweb/10-gitops/apps/argocd-image-updater/`
2. Проверьте статус Application: `kubectl get application argocd-image-updater -n argocd`
3. Проверьте логи ArgoCD: `kubectl logs -n argocd -l app.kubernetes.io/name=argocd-application-controller`
