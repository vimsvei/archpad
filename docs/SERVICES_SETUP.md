# Настройка Backend и Frontend сервисов

## Вопрос 1: Под каким токеном сервисы получают секреты из Vault?

**Ответ:** Сервисы НЕ используют токены напрямую! Они используют **Kubernetes Auth Method** через ServiceAccount токены.

### Как это работает:

1. **Vault Agent Injector** автоматически создает sidecar контейнер в каждом Pod'е
2. **Vault Agent** получает ServiceAccount токен из Kubernetes
3. **Аутентифицируется в Vault** через Kubernetes Auth Method с ролью `platform`
4. **Получает Vault токен** с правами политики `archpad`
5. **Читает секреты** и записывает их в файлы `/vault/secrets/...`
6. **Приложение читает секреты** из этих файлов

**Подробнее:** См. `docs/VAULT_SETUP.md`

## Вопрос 2: Почему portal.archpad.pro возвращает 404 и сервисы не видны в ArgoCD?

### Проблема 1: Application'ы не видны в ArgoCD

**Причина:** Application'ы (`.app.yaml` файлы) не применяются автоматически через `platform-applications` с `directory.recurse: true`. ArgoCD применяет только обычные Kubernetes ресурсы, но не Application'ы.

**Решение:** Применить Application'ы вручную один раз:

```bash
# Применить все Application'ы для backend и frontend
kubectl apply -f infra/timeweb/10-gitops/apps/backend/arch-repo-service/arch-repo-service.app.yaml
kubectl apply -f infra/timeweb/10-gitops/apps/backend/tenant-service/tenant-service.app.yaml
kubectl apply -f infra/timeweb/10-gitops/apps/backend/hasura-sync-service/hasura-sync-service.app.yaml
kubectl apply -f infra/timeweb/10-gitops/apps/frontend/portal/portal.app.yaml
```

Или применить все сразу:

```bash
find infra/timeweb/10-gitops/apps -path "*/backend/*" -name "*.app.yaml" -exec kubectl apply -f {} \;
find infra/timeweb/10-gitops/apps -path "*/frontend/*" -name "*.app.yaml" -exec kubectl apply -f {} \;
```

### Проблема 2: portal.archpad.pro возвращает 404

**Возможные причины:**

1. **Deployment не запущен:**
```bash
kubectl get deployment portal -n platform
kubectl get pods -n platform -l app=portal
```

2. **Service не существует:**
```bash
kubectl get service portal -n platform
```

3. **IngressRoute не применен:**
```bash
kubectl get ingressroute portal -n platform
```

4. **Traefik не видит IngressRoute:**
```bash
kubectl logs -n traefik -l app.kubernetes.io/name=traefik --tail=100 | grep portal
```

5. **Deployment использует неправильный образ:**
```bash
kubectl get deployment portal -n platform -o jsonpath='{.spec.template.spec.containers[0].image}'
# Должно быть: archpad-cr.registry.twcstorage.ru/archpad/portal:latest
```

## Диагностика

### Проверка Application'ов в ArgoCD

```bash
# Проверить все Application'ы
kubectl get applications -n argocd

# Проверить конкретный Application
kubectl get application portal -n argocd -o yaml

# Проверить статус синхронизации
kubectl get application portal -n argocd -o jsonpath='{.status.sync.status}'
kubectl get application portal -n argocd -o jsonpath='{.status.health.status}'
```

### Проверка Portal

```bash
# Проверить Deployment
kubectl get deployment portal -n platform
kubectl describe deployment portal -n platform

# Проверить Pods
kubectl get pods -n platform -l app=portal
kubectl logs -n platform -l app=portal --tail=100

# Проверить Service
kubectl get service portal -n platform
kubectl describe service portal -n platform

# Проверить IngressRoute
kubectl get ingressroute portal -n platform
kubectl describe ingressroute portal -n platform

# Проверить Traefik routes
kubectl exec -n traefik -l app.kubernetes.io/name=traefik -- \
  wget -qO- http://localhost:8080/api/http/routers | jq '.[] | select(.name | contains("portal"))'
```

## Быстрое исправление

### 1. Применить Application'ы

```bash
# Применить все Application'ы
find infra/timeweb/10-gitops/apps -path "*/backend/*" -o -path "*/frontend/*" | \
  xargs -I {} find {} -name "*.app.yaml" -exec kubectl apply -f {} \;
```

### 2. Синхронизировать Application'ы в ArgoCD

```bash
# Синхронизировать все Application'ы
kubectl patch application portal -n argocd --type merge -p '{"operation":{"initiatedBy":{"username":"admin"},"sync":{"revision":"HEAD"}}}'
kubectl patch application arch-repo-service -n argocd --type merge -p '{"operation":{"initiatedBy":{"username":"admin"},"sync":{"revision":"HEAD"}}}'
kubectl patch application tenant-service -n argocd --type merge -p '{"operation":{"initiatedBy":{"username":"admin"},"sync":{"revision":"HEAD"}}}'
kubectl patch application hasura-sync-service -n argocd --type merge -p '{"operation":{"initiatedBy":{"username":"admin"},"sync":{"revision":"HEAD"}}}'
```

### 3. Проверить, что все работает

```bash
# Проверить статус Application'ов
kubectl get applications -n argocd

# Проверить статус Deployment'ов
kubectl get deployments -n platform

# Проверить статус Pods
kubectl get pods -n platform

# Проверить IngressRoute
kubectl get ingressroute -n platform
```

## Нужен ли отдельный platform-archpad Application?

**Нет, это избыточно.** Текущая структура правильная:

- `platform-applications` - применяет все Kubernetes ресурсы
- Отдельные Application'ы для каждого сервиса - управляют конкретными сервисами

Это стандартный подход "App of Apps" в ArgoCD.

## Дополнительная информация

- [Документация по настройке Vault](VAULT_SETUP.md)
