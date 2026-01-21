# Развертывание в Kubernetes

## Обзор

Проект развертывается в Kubernetes кластере через GitOps (ArgoCD) с использованием манифестов из `infra/timeweb/10-gitops/`.

## Архитектура

### Namespaces

- **`platform`** - основные сервисы приложения (Portal, Hasura, Tolgee, Backend сервисы)
- **`secure`** - сервисы безопасности (Keycloak, Oathkeeper)
- **`vault`** - HashiCorp Vault для управления секретами
- **`argocd`** - ArgoCD для GitOps
- **`traefik`** - Traefik Ingress Controller

### Компоненты

#### Frontend
- **Portal** (Next.js) - веб-интерфейс приложения

#### Backend Services
- **arch-repo-service** - основной сервис для работы с проектами
- **tenant-service** - сервис для работы с tenant'ами
- **hasura-sync-service** - Job для синхронизации схемы БД с Hasura

#### Инфраструктура
- **Hasura** - GraphQL API и управление БД
- **Tolgee** - сервис интернационализации (i18n)
- **Mailpit** - SMTP сервер для разработки (email testing)

#### Безопасность
- **Keycloak** - Identity & Access Management (IdM/IAM)
- **Oathkeeper** - API Gateway / Authorization Proxy

#### Управление секретами
- **Vault** - HashiCorp Vault для хранения секретов

## GitOps через ArgoCD

### Корневой Application

`platform-applications` применяет все Kubernetes ресурсы из `infra/timeweb/10-gitops/apps` с `recurse: true`.

**Примечание:** Application'ы (`.app.yaml` файлы) НЕ применяются автоматически через directory recurse, так как они не являются обычными Kubernetes ресурсами.

### Отдельные Application'ы

Каждый сервис имеет свой `.app.yaml` файл, который нужно применить **один раз вручную**:

```bash
# Применить все Application'ы
find infra/timeweb/10-gitops/apps -name "*.app.yaml" -exec kubectl apply -f {} \;
```

После применения Application'ы управляются через GitOps.

## Первоначальная настройка

### 1. Применение Application'ов

```bash
# Backend сервисы
kubectl apply -f infra/timeweb/10-gitops/apps/backend/arch-repo-service/arch-repo-service.app.yaml
kubectl apply -f infra/timeweb/10-gitops/apps/backend/tenant-service/tenant-service.app.yaml
kubectl apply -f infra/timeweb/10-gitops/apps/backend/hasura-sync-service/hasura-sync-service.app.yaml

# Frontend
kubectl apply -f infra/timeweb/10-gitops/apps/frontend/portal/portal.app.yaml

# Инфраструктура
kubectl apply -f infra/timeweb/10-gitops/apps/hasura/hasura.app.yaml
kubectl apply -f infra/timeweb/10-gitops/apps/tolgee/tolgee.app.yaml

# Безопасность
kubectl apply -f infra/timeweb/10-gitops/apps/keycloak/keycloak.app.yaml
kubectl apply -f infra/timeweb/10-gitops/apps/ory/oathkeeper/oathkeeper.app.yaml

# Vault
kubectl apply -f infra/timeweb/10-gitops/apps/vault/vault.app.yaml
```

### 2. Проверка статуса

```bash
# Проверить Application'ы
kubectl get applications -n argocd

# Проверить статус синхронизации
kubectl get application arch-repo-service -n argocd
kubectl get application portal -n argocd
```

## Управление секретами

Все секреты управляются через Vault. Подробнее см. [VAULT_SETUP.md](./VAULT_SETUP.md).

## Доступ к сервисам

### Внешний доступ (через Ingress)

- **Portal**: `https://portal.archpad.pro`
- **Hasura GraphQL**: `https://apim.archpad.pro/v1/graphql`
- **API Gateway**: `https://api.archpad.pro`
- **Keycloak**: `https://id.archpad.pro`
- **Tolgee**: `https://i18n.archpad.pro`
- **Vault**: `https://vault.archpad.pro`
- **Mailpit**: `https://mail.archpad.pro`

### Внутренний доступ (через Service)

Все сервисы доступны внутри кластера через FQDN:
- `portal.platform.svc:3000`
- `hasura.platform.svc:8080`
- `keycloak.secure.svc:8080`
- `oathkeeper.secure.svc:4455`

## Обновление образов

Образы обновляются автоматически через ArgoCD Image Updater. Подробнее см. [ARGOCD_IMAGE_UPDATER.md](./ARGOCD_IMAGE_UPDATER.md).

## Мониторинг и логи

### Проверка статуса подов

```bash
# Все поды в namespace platform
kubectl get pods -n platform

# Все поды в namespace secure
kubectl get pods -n secure

# Конкретный сервис
kubectl get pods -n platform -l app=arch-repo-service
```

### Просмотр логов

```bash
# Логи конкретного пода
kubectl logs -n platform -l app=arch-repo-service --tail=100

# Логи с follow
kubectl logs -n platform -l app=arch-repo-service -f
```

### Использование ресурсов

```bash
# Использование ресурсов нодами
kubectl top nodes

# Использование ресурсов подами
kubectl top pods -n platform
```

## Troubleshooting

### Application'ы не видны в ArgoCD UI

1. Проверьте, что Application'ы применены:
```bash
kubectl get applications -n argocd
```

2. Если их нет, примените вручную (см. выше)

3. Проверьте логи ArgoCD Application Controller:
```bash
kubectl logs -n argocd -l app.kubernetes.io/name=argocd-application-controller --tail=100
```

### Поды не запускаются

1. Проверьте статус подов:
```bash
kubectl get pods -n platform
kubectl describe pod <pod-name> -n platform
```

2. Проверьте логи:
```bash
kubectl logs <pod-name> -n platform
```

3. Проверьте события:
```bash
kubectl get events -n platform --sort-by='.lastTimestamp'
```

### Сервисы недоступны

1. Проверьте, что Service существует:
```bash
kubectl get service portal -n platform
```

2. Проверьте, что IngressRoute применен:
```bash
kubectl get ingressroute portal -n platform
```

3. Проверьте логи Traefik:
```bash
kubectl logs -n traefik -l app.kubernetes.io/name=traefik --tail=100 | grep portal
```

## Дополнительная документация

- [Vault Setup](./VAULT_SETUP.md) - настройка Vault
- [Local Development](./LOCAL_DEVELOPMENT.md) - локальная разработка
- [GitLab CI](./GITLAB_CI.md) - настройка CI/CD
- [ArgoCD Image Updater](./ARGOCD_IMAGE_UPDATER.md) - автоматическое обновление образов
- [Resource Management](./RESOURCE_MANAGEMENT.md) - управление ресурсами кластера
