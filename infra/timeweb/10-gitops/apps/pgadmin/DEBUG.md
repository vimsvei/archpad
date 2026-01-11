# Диагностика проблем с pgAdmin

## Шаг 1: Проверка статуса ArgoCD Application

```bash
kubectl get application platform-root -n argocd
kubectl get application platform-root -n argocd -o jsonpath='{.status.sync.status}'
kubectl get application platform-root -n argocd -o jsonpath='{.status.health.status}'
```

## Шаг 2: Проверка ресурсов pgAdmin в namespace platform

```bash
# Проверка всех ресурсов pgAdmin
kubectl get all -n platform -l app=pgadmin

# Проверка Secret
kubectl get secret pgadmin-credentials -n platform

# Проверка ConfigMap
kubectl get configmap pgadmin-servers -n platform

# Проверка Deployment
kubectl get deployment pgadmin -n platform

# Проверка Service
kubectl get service pgadmin -n platform

# Проверка IngressRoute
kubectl get ingressroute pgadmin -n platform
kubectl get ingressroute pgadmin-http -n platform

# Проверка Middleware
kubectl get middleware redirect-to-https -n platform
```

## Шаг 3: Проверка Pods

```bash
# Проверка статуса подов
kubectl get pods -n platform -l app=pgadmin

# Если под есть, проверка его статуса
kubectl describe pod -n platform -l app=pgadmin

# Проверка логов
kubectl logs -n platform -l app=pgadmin --tail=100
```

## Шаг 4: Проверка синхронизации ArgoCD

```bash
# Проверка статуса синхронизации для pgAdmin ресурсов
kubectl get application platform-root -n argocd -o yaml | grep -A 5 "pgadmin"

# Проверка операций синхронизации
kubectl get application platform-root -n argocd -o jsonpath='{.status.operationState.message}'
```

## Шаг 5: Принудительная синхронизация (если нужно)

```bash
# Синхронизация через kubectl
kubectl patch application platform-root -n argocd --type merge -p '{"operation":{"sync":{"syncStrategy":{"hook":{}}}}}'

# Или через ArgoCD CLI (если установлен)
argocd app sync platform-root
```

## Шаг 6: Проверка ошибок в ArgoCD

```bash
# Детальная информация об Application
kubectl describe application platform-root -n argocd

# Проверка условий
kubectl get application platform-root -n argocd -o jsonpath='{.status.conditions[*].message}'
```

## Типичные проблемы:

1. **Ресурсы в статусе OutOfSync** - нужно синхронизировать ArgoCD
2. **Pod не запускается** - проверьте логи и describe pod
3. **Secret не найден** - проверьте, что secret создан
4. **IngressRoute не работает** - проверьте TLS secret и сервис
5. **Certificate не готов** - ArgoCD может ждать готовности Certificate
