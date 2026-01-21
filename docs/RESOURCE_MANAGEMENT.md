# Управление ресурсами кластера

## Текущая конфигурация

Кластер настроен для работы на **2-6 нодах воркеров** с ограниченными ресурсами:
- **CPU**: 1-2 cores на ноду
- **RAM**: 2 GB на ноду
- **Storage**: 30 GB NVME на ноду

**Примечание:** 
- Ресурсы оптимизированы для демо-стенда (2 ноды по 2 CPU, 2GB RAM достаточно)
- Для расчета ресурсов при изменении конфигурации нод см. [RESOURCE_CALCULATION.md](./RESOURCE_CALCULATION.md)

## Распределение ресурсов

### Системные ресурсы (на каждую ноду)

- Kubernetes system pods (kubelet, kube-proxy): ~100m CPU, ~200Mi RAM
- Vault Agent Injector: ~50m CPU, ~100Mi RAM
- Traefik: ~50m CPU, ~100Mi RAM
- ArgoCD: ~50m CPU, ~100Mi RAM

**Итого системных ресурсов на ноду**: ~250m CPU, ~500Mi RAM  
**Доступно для приложений на ноду**: ~750m CPU, ~1500Mi RAM  
**Всего доступно на 4 нодах**: ~3000m CPU, ~6000Mi RAM

### Ресурсы приложений (requests / limits) - ОПТИМИЗИРОВАНО ДЛЯ ДЕМО-СТЕНДА

| Сервис | CPU Requests | CPU Limits | Memory Requests | Memory Limits |
|--------|--------------|------------|-----------------|---------------|
| arch-repo-service | 30m | 100m | 64Mi | 128Mi |
| tenant-service | 30m | 100m | 64Mi | 128Mi |
| portal | 50m | 150m | 128Mi | 256Mi |
| hasura | 50m | 150m | 128Mi | 256Mi |
| tolgee | 100m | 200m | 256Mi | 384Mi |
| mailpit | 30m | 100m | 64Mi | 128Mi |
| hasura-sync-service (Job) | 30m | 100m | 64Mi | 128Mi |
| registry-secret-sync (Job) | 30m | 100m | 64Mi | 128Mi |
| keycloak | 100m | 300m | 256Mi | 512Mi |
| oathkeeper | 30m | 100m | 64Mi | 128Mi |
| argocd-image-updater | 50m | 200m | 64Mi | 256Mi |
| pgadmin | 50m | 200m | 128Mi | 256Mi |

**Итого requests**: ~500m CPU, ~1152Mi RAM  
**Итого limits**: ~1450m CPU, ~2112Mi RAM

**Примечание:** Ресурсы оптимизированы для демо-стенда. Для продакшена может потребоваться увеличение limits.

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
                        - keycloak
                        - oathkeeper
                topologyKey: kubernetes.io/hostname
```

**Преимущества:**
- Группировка: Поды приложений будут предпочитать размещаться на одних и тех же нодах
- Гибкость: `preferredDuringSchedulingIgnoredDuringExecution` не требует жесткого размещения
- Оптимизация: Лучшее использование ресурсов на меньшем количестве нод

**Применение:**

1. Добавить affinity ко всем основным deployment:
   - `arch-repo-service`
   - `tenant-service`
   - `portal`
   - `hasura`
   - `tolgee`
   - `mailpit`
   - `keycloak`
   - `oathkeeper`

2. После применения изменений через ArgoCD, поды будут перераспределены

3. Проверить размещение:
   ```bash
   kubectl get pods -o wide -A | grep -E "arch-repo|tenant|portal|hasura|tolgee|mailpit|keycloak|oathkeeper"
   ```

**Альтернативный подход: nodeSelector**

Если нужно жестко закрепить поды на конкретных нодах:

```yaml
spec:
  template:
    spec:
      nodeSelector:
        workload: application  # Ноды с этим label
```

Но это менее гибко и требует предварительной настройки labels на нодах.

**Мониторинг:**

После применения изменений проверьте:

1. **Распределение подов по нодам:**
   ```bash
   kubectl get pods -o wide -A | awk '{print $7}' | sort | uniq -c
   ```

2. **Использование ресурсов нодами:**
   ```bash
   kubectl top nodes
   ```

3. **Запрошенные ресурсы:**
   ```bash
   kubectl describe nodes | grep -A 10 "Allocated resources"
   ```

**Ожидаемый результат:**

После применения изменений:
- Основные поды приложений будут сгруппированы на 3-4 нодах
- Остальные 2-3 ноды будут использоваться для системных подов и резерва
- Лучшее использование ресурсов и более эффективное управление

**Удаление высвободившихся нод:**

⚠️ **Важно: Ноды НЕ удаляются автоматически**

Kubernetes не удаляет ноды автоматически. Высвободившиеся ноды останутся в кластере, но на них не будут размещаться поды приложений (благодаря `podAffinity`).

**Как удалить ноды вручную:**

1. Проверьте, что на нодах нет подов приложений:
   ```bash
   kubectl get pods -o wide -A | grep -E "node-5|node-6" | grep -v "kube-system"
   ```

2. Убедитесь, что на нодах только системные поды:
   - Системные поды (kube-system, traefik, argocd) могут оставаться на всех нодах
   - Это нормально, они не занимают много ресурсов

3. Удалите ноды через панель управления TimeWeb:
   - Зайдите в панель управления TimeWeb
   - Найдите ваш Kubernetes кластер
   - Выберите ноды 5 и 6
   - Удалите их через интерфейс

**Рекомендации перед удалением:**

1. Подождите 1-2 дня после применения изменений, чтобы убедиться, что все работает стабильно
2. Проверьте метрики использования ресурсов на оставшихся нодах
3. Убедитесь, что есть резерв ресурсов на случай пиковых нагрузок

**Альтернатива: Оставить ноды как резерв**

Если хотите оставить ноды как резерв для масштабирования:
- Ноды останутся в кластере, но не будут использоваться для приложений
- При необходимости можно будет быстро разместить на них поды
- Это увеличит стоимость, но даст гибкость

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
