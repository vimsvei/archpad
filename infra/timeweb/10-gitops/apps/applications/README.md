# Platform Applications

Эта директория содержит корневой Application для управления всеми приложениями платформы.

## Структура

- `applications.app.yaml` - Корневой Application, который применяет все Kubernetes ресурсы из `infra/timeweb/10-gitops/apps`

## Как это работает

### 1. Корневой Application (`platform-applications`)

Применяет все Kubernetes ресурсы (Deployment, Service, IngressRoute, ConfigMap и т.д.) из директории `infra/timeweb/10-gitops/apps` с `recurse: true`.

**НО:** Application'ы (`.app.yaml` файлы) НЕ применяются автоматически через directory recurse, так как они не являются обычными Kubernetes ресурсами.

### 2. Отдельные Application'ы

Каждый сервис имеет свой `.app.yaml` файл:
- `backend/arch-repo-service/arch-repo-service.app.yaml`
- `backend/tenant-service/tenant-service.app.yaml`
- `backend/hasura-sync-service/hasura-sync-service.app.yaml`
- `frontend/portal/portal.app.yaml`

Эти Application'ы нужно применить **один раз вручную**, после чего они будут управляться через GitOps.

## Первоначальная настройка

### Применить Application'ы вручную

```bash
# Применить все Application'ы для backend сервисов
kubectl apply -f infra/timeweb/10-gitops/apps/backend/arch-repo-service/arch-repo-service.app.yaml
kubectl apply -f infra/timeweb/10-gitops/apps/backend/tenant-service/tenant-service.app.yaml
kubectl apply -f infra/timeweb/10-gitops/apps/backend/hasura-sync-service/hasura-sync-service.app.yaml

# Применить Application для frontend
kubectl apply -f infra/timeweb/10-gitops/apps/frontend/portal/portal.app.yaml
```

### Или применить все сразу

```bash
# Найти все .app.yaml файлы и применить
find infra/timeweb/10-gitops/apps -name "*.app.yaml" -exec kubectl apply -f {} \;
```

## Проверка

После применения Application'ов они должны появиться в ArgoCD UI:

```bash
# Проверить Application'ы
kubectl get applications -n argocd | grep -E "arch-repo-service|tenant-service|hasura-sync-service|portal"

# Проверить статус синхронизации
kubectl get application arch-repo-service -n argocd
kubectl get application portal -n argocd
```

## Почему Application'ы не применяются автоматически?

ArgoCD `directory` source применяет только обычные Kubernetes ресурсы (Deployment, Service, ConfigMap и т.д.), но не Application'ы. Application'ы - это специальные ресурсы ArgoCD, которые нужно создавать отдельно.

## Альтернативные подходы

### Вариант 1: App of Apps (текущий подход)

- Корневой Application применяет все ресурсы
- Отдельные Application'ы применяются вручную один раз
- После этого все управляется через GitOps

### Вариант 2: ApplicationSet (более продвинутый)

Можно использовать ApplicationSet для автоматического создания Application'ов, но это требует установки ArgoCD ApplicationSet Controller.

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

### portal.archpad.pro возвращает 404

1. Проверьте, что Deployment запущен:
```bash
kubectl get deployment portal -n platform
kubectl get pods -n platform -l app=portal
```

2. Проверьте, что Service существует:
```bash
kubectl get service portal -n platform
```

3. Проверьте, что IngressRoute применен:
```bash
kubectl get ingressroute portal -n platform
```

4. Проверьте логи Traefik:
```bash
kubectl logs -n traefik -l app.kubernetes.io/name=traefik --tail=100 | grep portal
```
