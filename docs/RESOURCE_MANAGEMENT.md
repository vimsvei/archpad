# Управление ресурсами кластера

## Текущая конфигурация

Кластер настроен для работы на **4 нодах воркеров** с ограниченными ресурсами:
- **CPU**: 1 core на ноду
- **RAM**: 2 GB на ноду
- **Storage**: 30 GB NVME на ноду

## Распределение ресурсов

### Системные ресурсы (на каждую ноду)

- Kubernetes system pods (kubelet, kube-proxy): ~100m CPU, ~200Mi RAM
- Vault Agent Injector: ~50m CPU, ~100Mi RAM
- Traefik: ~50m CPU, ~100Mi RAM
- ArgoCD: ~50m CPU, ~100Mi RAM

**Итого системных ресурсов на ноду**: ~250m CPU, ~500Mi RAM  
**Доступно для приложений на ноду**: ~750m CPU, ~1500Mi RAM  
**Всего доступно на 4 нодах**: ~3000m CPU, ~6000Mi RAM

### Ресурсы приложений (requests / limits)

| Сервис | CPU Requests | CPU Limits | Memory Requests | Memory Limits |
|--------|--------------|------------|-----------------|---------------|
| arch-repo-service | 30m | 150m | 64Mi | 128Mi |
| tenant-service | 30m | 150m | 64Mi | 128Mi |
| portal | 50m | 300m | 128Mi | 256Mi |
| hasura | 50m | 300m | 128Mi | 256Mi |
| tolgee | 100m | 500m | 256Mi | 512Mi |
| mailpit | 30m | 150m | 64Mi | 128Mi |
| hasura-sync-service (Job) | 30m | 150m | 64Mi | 128Mi |
| registry-secret-sync (Job) | 50m | 100m | 64Mi | 128Mi |
| kratos | 50m | 300m | 128Mi | 256Mi |
| hydra | 50m | 300m | 128Mi | 256Mi |
| oathkeeper | 50m | 300m | 128Mi | 256Mi |

**Итого requests**: ~520m CPU, ~1152Mi RAM  
**Итого limits**: ~2400m CPU, ~2176Mi RAM

## Мониторинг использования ресурсов

### Проверка использования ресурсов нодами

```bash
kubectl top nodes
```

### Проверка использования ресурсов подами

```bash
kubectl top pods -n platform
kubectl top pods -n secure
```

### Проверка запрошенных ресурсов

```bash
kubectl describe nodes | grep -A 10 "Allocated resources"
```

## Оптимизация ресурсов

### Когда нужно оптимизировать

1. **Нехватка CPU**: Поды в состоянии `Pending` с сообщением `Insufficient cpu`
2. **Нехватка памяти**: Поды в состоянии `Pending` с сообщением `Insufficient memory`
3. **Высокая нагрузка**: Использование ресурсов > 80% на всех нодах

### Как оптимизировать

1. **Уменьшить requests и limits** в deployment файлах:
   ```yaml
   resources:
     requests:
       cpu: 30m      # Уменьшить на 10-20m
       memory: 64Mi  # Уменьшить на 32-64Mi
     limits:
       cpu: 150m    # Уменьшить на 50-100m
       memory: 128Mi # Уменьшить на 64-128Mi
   ```

2. **Уменьшить количество реплик** (если не критично):
   ```yaml
   spec:
     replicas: 1  # Уменьшить с 2 до 1
   ```

3. **Использовать node selectors** для распределения нагрузки:
   ```yaml
   spec:
     template:
       spec:
         nodeSelector:
           workload: app  # Распределить по нодам с этим label
   ```

4. **Удалить неиспользуемые сервисы** или перевести их в другой namespace

## Оптимизация размещения подов

### Проблема

На кластере запущено много подов, которые распределены по всем нодам. Это неэффективно, так как:
- Ресурсы распределены неравномерно
- Сложнее управлять и мониторить
- Неиспользуемые ноды тратят ресурсы

### Решение: Pod Affinity

Использовать `podAffinity` для группировки подов приложений на меньшем количестве нод (3-4 ноды).

**Стратегия:**
1. Группировка основных приложений на 3-4 нодах через `podAffinity`
2. Системные поды (kube-system, argocd, traefik) могут оставаться на всех нодах
3. DaemonSets (если есть) должны быть на всех нодах

**Реализация:**

Добавить `podAffinity` в spec всех основных deployment:

```yaml
spec:
  template:
    spec:
      affinity:
        podAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - weight: 100
              podAffinityTerm:
                labelSelector:
                  matchExpressions:
                    - key: app
                      operator: In
                      values:
                        - arch-repo-service
                        - tenant-service
                        - portal
                        - hasura
                        - tolgee
                        - mailpit
                        - kratos
                        - hydra
                        - oathkeeper
                topologyKey: kubernetes.io/hostname
```

**Преимущества:**
- Группировка: Поды приложений будут предпочитать размещаться на одних и тех же нодах
- Гибкость: `preferredDuringSchedulingIgnoredDuringExecution` не требует жесткого размещения
- Оптимизация: Лучшее использование ресурсов на меньшем количестве нод

## Рекомендации

1. **Мониторинг**: Регулярно проверяйте использование ресурсов
2. **Резерв**: Оставляйте ~20% ресурсов свободными для пиковых нагрузок
3. **Приоритизация**: Критичные сервисы (hasura, portal) должны иметь больше ресурсов
4. **Горизонтальное масштабирование**: При необходимости добавьте больше нод

## Устранение проблем

### Проблема: Поды не запускаются из-за нехватки ресурсов

**Решение:**
1. Проверьте текущее использование: `kubectl top nodes`
2. Уменьшите requests для менее критичных сервисов
3. Удалите неиспользуемые поды: `kubectl delete pod <pod-name> -n platform`

### Проблема: Высокая нагрузка на одну ноду

**Решение:**
1. Добавьте node selectors для распределения нагрузки
2. Используйте pod anti-affinity для распределения реплик по разным нодам

### Проблема: Нехватка места на диске

**Решение:**
1. Очистите неиспользуемые образы: `kubectl delete pod <pod-name> --grace-period=0 --force`
2. Удалите старые логи и временные файлы
3. Проверьте PersistentVolumeClaims: `kubectl get pvc -n platform`

## Дополнительные ресурсы

- [Kubernetes Resource Management](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/)
- [Resource Quotas](https://kubernetes.io/docs/concepts/policy/resource-quotas/)
- [Limit Ranges](https://kubernetes.io/docs/concepts/policy/limit-range/)
