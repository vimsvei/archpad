# Отладка проблемы развертывания Traefik

## Проблема
Traefik Helm release создается со статусом `failed`, Terraform ждет успешного статуса 15+ минут и падает с ошибкой `context deadline exceeded`.

## Почему это происходит?

Terraform Helm provider ждет, пока Helm release получит статус `deployed`. Но если поды Traefik не могут запуститься (не хватает ресурсов, проблемы с образами, проблемы с LoadBalancer), Helm release остается в статусе `failed`, и Terraform не может завершиться успешно.

## Как проверить реальную проблему

После запуска `terraform apply` (даже если он упал), выполните:

```bash
# Проверить статус подов Traefik
kubectl get pods -n traefik --kubeconfig=../../init/kubeconfig.yaml

# Проверить события в namespace
kubectl get events -n traefik --kubeconfig=../../init/kubeconfig.yaml --sort-by='.lastTimestamp'

# Проверить логи подов (если они есть)
kubectl logs -n traefik -l app.kubernetes.io/name=traefik --kubeconfig=../../init/kubeconfig.yaml

# Проверить описание подов для понимания проблемы
kubectl describe pod -n traefik -l app.kubernetes.io/name=traefik --kubeconfig=../../init/kubeconfig.yaml

# Проверить статус Helm release
helm list -n traefik --kubeconfig=../../init/kubeconfig.yaml || echo "Helm не установлен"
helm status traefik -n traefik --kubeconfig=../../init/kubeconfig.yaml || echo "Helm не установлен"
```

## Возможные причины:

1. **Не хватает ресурсов в кластере** - проверьте через `kubectl describe node`
2. **Проблемы с pull образов из registry** - проверьте `kubectl describe pod` на ошибки ImagePullBackOff
3. **LoadBalancer не может получить IP** - проверьте `kubectl get svc -n traefik`
4. **Проблемы с ServiceAccount** - проверьте права доступа

## Временное решение

Я изменил конфигурацию:
1. Увеличил timeout до 30 минут
2. Уменьшил количество реплик до 1 (для экономии ресурсов)
3. Оставил `wait = true`, но теперь есть больше времени

## Если проблема в ресурсах

Проверьте доступные ресурсы в кластере:

```bash
kubectl top nodes --kubeconfig=../../init/kubeconfig.yaml
kubectl describe nodes --kubeconfig=../../init/kubeconfig.yaml | grep -A 5 "Allocated resources"
```

Если ресурсов мало, можно:
- Увеличить размер нод в кластере
- Или временно установить Traefik с минимальными ресурсами