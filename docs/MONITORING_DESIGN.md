# Проектирование мониторинга для Kubernetes

## Обзор

Проектирование развертывания Prometheus + Grafana для мониторинга Kubernetes кластера Archpad. За основу берется локальная конфигурация из `infra/monitoring/`, адаптированная для Kubernetes.

## Архитектура

### Компоненты

1. **Prometheus** - сбор и хранение метрик
2. **Grafana** - визуализация метрик через дашборды
3. **Blackbox Exporter** (опционально) - проверка доступности сервисов

### Что НЕ включаем (пока)

- **Loki** - агрегация логов (добавим позже)
- **Tempo** - распределенный трейсинг (добавим позже)
- **OpenTelemetry Collector** - сбор трейсов (добавим позже)

## Namespace

Все компоненты мониторинга будут развернуты в namespace `monitoring`:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: monitoring
```

## Компонент 1: Prometheus

### Назначение

Сбор метрик из различных источников:
- Kubernetes API (ноды, поды, сервисы, deployments)
- Traefik (метрики ingress)
- Hasura (метрики GraphQL)
- Node Exporter на БД кластере (192.168.0.4:9100)
- Postgres Exporter на БД кластере (192.168.0.4:9308)
- Blackbox Exporter (проверка доступности)

### Развертывание

**Вариант 1: Prometheus Operator (рекомендуется)**

Использовать `kube-prometheus-stack` Helm chart, который включает:
- Prometheus Operator
- Prometheus
- Alertmanager (опционально, можно отключить)
- Node Exporter (DaemonSet для метрик нод)
- kube-state-metrics (метрики состояния Kubernetes объектов)
- Grafana (можно отключить, если развертываем отдельно)

**Вариант 2: Standalone Prometheus**

Развернуть Prometheus как обычный Deployment с ConfigMap для конфигурации.

**Рекомендация:** Использовать **Вариант 1** (Prometheus Operator), так как он:
- Автоматически настраивает Service Discovery для Kubernetes
- Упрощает управление конфигурацией через CRD
- Включает готовые метрики для Kubernetes объектов

### Конфигурация Prometheus

#### Service Discovery для Kubernetes

Prometheus Operator автоматически настраивает Service Discovery для:
- **Nodes** - метрики нод через kubelet (включает cAdvisor для метрик контейнеров)
- **Pods** - метрики подов с аннотациями `prometheus.io/scrape: "true"`
- **Services** - метрики сервисов
- **Endpoints** - метрики endpoints

#### Статические targets (вне кластера)

Для метрик с БД кластера (192.168.0.4) нужно добавить статические targets:

```yaml
scrape_configs:
  - job_name: 'node-exporter-db'
    static_configs:
      - targets: ['192.168.0.4:9100']
        labels:
          instance: 'db-cluster'
          role: 'database'
  
  - job_name: 'postgres-exporter-db'
    static_configs:
      - targets: ['192.168.0.4:9308']
        labels:
          instance: 'db-cluster'
          role: 'database'
```

#### Метрики Traefik

Traefik уже развернут в namespace `traefik`. Нужно:
1. Убедиться, что Traefik экспортирует метрики на `/metrics` endpoint
2. Добавить ServiceMonitor для Prometheus Operator:

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: traefik
  namespace: traefik
spec:
  selector:
    matchLabels:
      app: traefik
  endpoints:
    - port: metrics
      path: /metrics
```

#### Метрики Hasura

Hasura развернут в namespace `platform`. Нужно:
1. Проверить, включен ли endpoint `/v1/metrics` в Hasura
2. Если требуется аутентификация, использовать секрет из Vault (см. ниже)
3. Добавить ServiceMonitor:

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: hasura
  namespace: platform
spec:
  selector:
    matchLabels:
      app: hasura
  endpoints:
    - port: http
      path: /v1/metrics
      # Если нужна аутентификация:
      # basicAuth:
      #   secret:
      #     name: hasura-metrics-auth
      #     key: password
```

#### Blackbox Exporter (опционально)

Для проверки доступности сервисов можно развернуть Blackbox Exporter:

```yaml
scrape_configs:
  - job_name: 'blackbox-http'
    metrics_path: /probe
    params:
      module: [http_2xx]
    static_configs:
      - targets:
          - https://portal.archpad.pro
          - https://hasura.archpad.pro
          - https://auth.archpad.pro
    relabel_configs:
      - source_labels: [__address__]
        target_label: __param_target
      - source_labels: [__param_target]
        target_label: instance
      - target_label: __address__
        replacement: blackbox-exporter:9115
```

### Ресурсы Prometheus

```yaml
resources:
  requests:
    cpu: 500m
    memory: 2Gi
  limits:
    cpu: 1000m
    memory: 4Gi
```

### Хранение данных

Prometheus будет использовать PersistentVolume для хранения метрик:
- **Storage**: 20Gi (для retention ~15-30 дней)
- **StorageClass**: использовать доступный в кластере

### Доступ

Prometheus будет доступен только внутри кластера:
- **Service**: ClusterIP на порту 9090
- **НЕ публикуем** через Ingress (только Grafana публична)

## Компонент 2: Grafana

### Назначение

Визуализация метрик через веб-интерфейс.

### Развертывание

Развернуть Grafana как отдельный Deployment (не из kube-prometheus-stack), чтобы иметь полный контроль над конфигурацией.

### Конфигурация

#### Datasource для Prometheus

Автоматически настроить через ConfigMap:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: grafana-datasources
  namespace: monitoring
data:
  prometheus.yaml: |
    apiVersion: 1
    datasources:
      - name: Prometheus
        uid: prometheus
        type: prometheus
        access: proxy
        url: http://prometheus:9090
        isDefault: true
        editable: true
```

#### Дашборды

Использовать существующие дашборды из `infra/monitoring/grafana/dashboards/`:
- `archpad-metrics-node.json` - метрики нод
- `archpad-metrics-containers.json` - метрики контейнеров/подов
- `archpad-logs-overview.json` - логи (пока не используется, но можно оставить)

Автоматически загружать через ConfigMap:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: grafana-dashboards
  namespace: monitoring
data:
  dashboards.yaml: |
    apiVersion: 1
    providers:
      - name: "archpad"
        orgId: 1
        folder: "Archpad"
        type: file
        disableDeletion: false
        editable: true
        options:
          path: /var/lib/grafana/dashboards
```

Дашборды монтируются как Volume из ConfigMap.

#### Аутентификация

Grafana будет использовать:
- **Admin пользователь** - из секрета Vault
- **Admin пароль** - из секрета Vault

Настройка через переменные окружения:
```yaml
env:
  - name: GF_SECURITY_ADMIN_USER
    valueFrom:
      secretKeyRef:
        name: grafana-admin
        key: username
  - name: GF_SECURITY_ADMIN_PASSWORD
    valueFrom:
      secretKeyRef:
        name: grafana-admin
        key: password
```

### Ресурсы Grafana

```yaml
resources:
  requests:
    cpu: 100m
    memory: 256Mi
  limits:
    cpu: 500m
    memory: 512Mi
```

### Хранение данных

**Вариант 1: PersistentVolume (по умолчанию)**

Grafana будет использовать PersistentVolume для хранения:
- Настроек пользователей
- Изменений в дашбордах
- Организаций

- **Storage**: 5Gi
- **StorageClass**: использовать доступный в кластере

**Вариант 2: S3 Storage (рекомендуется для демо-стенда)**

Grafana поддерживает S3 для хранения:
- **Dashboards** - дашборды можно хранить в S3
- **Snapshots** - снимки дашбордов
- **Alerting** - настройки алертов

**Преимущества S3:**
- ✅ Не занимает место на PersistentVolume
- ✅ Легко бэкапить и восстанавливать
- ✅ Можно использовать существующий S3 bucket (как у Vault)

**Конфигурация S3 для Grafana:**

```yaml
env:
  - name: GF_EXTERNAL_IMAGE_STORAGE_PROVIDER
    value: "s3"
  - name: GF_EXTERNAL_IMAGE_STORAGE_S3_BUCKET
    value: "9f328daa-archpad-s3-storage"
  - name: GF_EXTERNAL_IMAGE_STORAGE_S3_REGION
    value: "ru-1"
  - name: GF_EXTERNAL_IMAGE_STORAGE_S3_ENDPOINT
    value: "https://s3.twcstorage.ru"
  - name: GF_EXTERNAL_IMAGE_STORAGE_S3_ACCESS_KEY
    valueFrom:
      secretKeyRef:
        name: grafana-s3-credentials
        key: access_key
  - name: GF_EXTERNAL_IMAGE_STORAGE_S3_SECRET_KEY
    valueFrom:
      secretKeyRef:
        name: grafana-s3-credentials
        key: secret_key
```

**Примечание:** Для основных данных (пользователи, организации) все равно нужен PersistentVolume, но можно уменьшить размер до 1-2Gi, так как дашборды будут в S3.

**Рекомендация:** Использовать S3 для дашбордов и snapshots, PersistentVolume (1-2Gi) для пользователей и организаций.

### Публичный доступ

Grafana будет доступна публично через Traefik IngressRoute:

- **URL**: `https://monitoring.archpad.pro`
- **IngressRoute**: Traefik IngressRoute в namespace `monitoring`
- **TLS**: использовать wildcard certificate `*.archpad.pro`

```yaml
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: grafana
  namespace: monitoring
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(`monitoring.archpad.pro`)
      kind: Rule
      services:
        - name: grafana
          port: 3000
  tls:
    secretName: wildcard-archpad-pro-tls
```

## Секреты в Vault

Все секреты хранятся в Vault. Пути секретов:

### 1. Grafana Admin Credentials

**Путь в Vault:** `kv/data/archpad/monitoring/grafana/admin` ✅ (создан)

**Структура:**
```json
{
  "GRAFANA_ADMIN_USER": "admin",
  "GRAFANA_ADMIN_PASSWORD": "<secure-password>"
}
```

**Как получить в Kubernetes:**

Использовать Vault Agent Injector с аннотациями:

```yaml
annotations:
  vault.hashicorp.com/agent-inject: "true"
  vault.hashicorp.com/agent-inject-secret-grafana-admin: "kv/data/archpad/monitoring/grafana/admin"
  vault.hashicorp.com/agent-inject-template-grafana-admin: |
    {{- with secret "kv/data/archpad/monitoring/grafana/admin" }}
    export GRAFANA_ADMIN_USER="{{ .Data.data.GRAFANA_ADMIN_USER }}"
    export GRAFANA_ADMIN_PASSWORD="{{ .Data.data.GRAFANA_ADMIN_PASSWORD }}"
    {{- end }}
  vault.hashicorp.com/role: "platform"
```

Или создать Kubernetes Secret из Vault (для простоты):

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: grafana-admin
  namespace: monitoring
type: Opaque
stringData:
  username: <from-vault>
  password: <from-vault>
```

**Рекомендация:** Использовать Vault Agent Injector для автоматической синхронизации.

### 2. Hasura Metrics Secret (опционально)

**Путь в Vault:** `kv/data/archpad/monitoring/hasura` ✅ (создан)

**Примечание:** Секрет создан, но нужно проверить, требуется ли аутентификация для Hasura metrics. Если не требуется - секрет можно не использовать в Hasura deployment.

**Структура:**
```json
{
  "HASURA_GRAPHQL_METRICS_SECRET": "<secret-for-metrics-endpoint>"
}
```

**Когда нужен:**

Если Hasura требует аутентификацию для доступа к `/v1/metrics` endpoint.

**Как использовать:**

В ServiceMonitor для Hasura добавить basicAuth:

```yaml
endpoints:
  - port: http
    path: /v1/metrics
    basicAuth:
      secret:
        name: hasura-metrics-auth
        key: password
```

И создать Secret из Vault:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: hasura-metrics-auth
  namespace: platform
type: Opaque
stringData:
  password: <HASURA_GRAPHQL_METRICS_SECRET-from-vault>
```

**Примечание:** Проверить, требуется ли аутентификация для Hasura metrics. Если нет - этот секрет не нужен.

## Структура файлов для ArgoCD

```
infra/timeweb/10-gitops/apps/monitoring/
├── monitoring.app.yaml              # ArgoCD Application
├── namespace.yaml                   # Namespace monitoring
├── prometheus/
│   ├── prometheus.app.yaml         # Prometheus Operator (Helm)
│   ├── prometheus-values.yaml      # Helm values для Prometheus
│   ├── servicemonitor-traefik.yaml # ServiceMonitor для Traefik
│   ├── servicemonitor-hasura.yaml  # ServiceMonitor для Hasura
│   └── prometheus-static-targets.yaml # Статические targets (БД кластер)
├── grafana/
│   ├── grafana.deployment.yaml     # Grafana Deployment
│   ├── grafana.service.yaml        # Grafana Service
│   ├── grafana.ingressroute.yaml   # Traefik IngressRoute
│   ├── grafana.configmap-datasources.yaml # Datasource для Prometheus
│   ├── grafana.configmap-dashboards.yaml  # Конфигурация дашбордов
│   ├── grafana.pvc.yaml            # PersistentVolumeClaim
│   └── grafana.serviceaccount.yaml  # ServiceAccount для Vault
└── blackbox/                        # Опционально
    ├── blackbox-exporter.deployment.yaml
    └── blackbox-exporter.service.yaml
```

## Порядок развертывания

1. ✅ **Секреты созданы в Vault:**
   - `kv/data/archpad/monitoring/grafana/admin` (GRAFANA_ADMIN_USER, GRAFANA_ADMIN_PASSWORD)
   - `kv/data/archpad/monitoring/hasura` (HASURA_GRAPHQL_METRICS_SECRET, если нужен)

2. **Развернуть Prometheus:**
   - Создать namespace `monitoring`
   - Развернуть Prometheus Operator через Helm
   - Настроить ServiceMonitor для Traefik и Hasura
   - Добавить статические targets для БД кластера

3. **Развернуть Grafana:**
   - Создать Deployment с Vault Agent Injector
   - Настроить ConfigMap для datasources и дашбордов
   - Создать IngressRoute для публичного доступа
   - Создать PersistentVolumeClaim для хранения данных

4. **Проверить доступность:**
   - Prometheus: `kubectl port-forward -n monitoring svc/prometheus 9090:9090`
   - Grafana: `https://monitoring.archpad.pro`

## Ресурсы кластера

### Prometheus
- CPU: 500m (requests), 1000m (limits)
- Memory: 2Gi (requests), 4Gi (limits)
- Storage: 20Gi

### Grafana
- CPU: 100m (requests), 500m (limits)
- Memory: 256Mi (requests), 512Mi (limits)
- Storage: 5Gi

### Итого
- CPU: ~600m (requests), ~1500m (limits)
- Memory: ~2.25Gi (requests), ~4.5Gi (limits)
- Storage: ~25Gi

**Примечание:** Эти ресурсы нужно учесть при расчете общей нагрузки на кластер (см. `docs/RESOURCE_CALCULATION.md`).

## SSO для административных ресурсов

Для настройки единого входа (SSO) для всех административных ресурсов (Traefik, Vault, Grafana, ArgoCD) создан отдельный документ:

- **[SSO_ADMIN_RESOURCES.md](./SSO_ADMIN_RESOURCES.md)** - полный анализ и план работ по SSO

**Краткая информация:**
- ✅ Все ресурсы поддерживают SSO в бесплатных версиях
- ✅ Используем существующие Kratos + Hydra
- ✅ Отдельный пул административных пользователей в Kratos
- ✅ Fallback на логин/пароль через Kratos API (если SSO недоступно)

**Рекомендация:** Начать с базовой аутентификации (admin/password), затем добавить SSO согласно плану в [SSO_ADMIN_RESOURCES.md](./SSO_ADMIN_RESOURCES.md).

## Хранение данных Prometheus в S3

**Важно:** Prometheus **не поддерживает** прямое хранение в S3. Для long-term storage в S3 нужен **Thanos** или **Cortex**.

### Варианты хранения Prometheus

**Вариант 1: PersistentVolume (рекомендуется для демо-стенда)**
- Простая настройка
- Retention: 15-30 дней
- Storage: 20Gi

**Вариант 2: Thanos + S3 (для production)**
- Long-term storage в S3
- Глобальный запрос метрик
- Более сложная настройка
- Требует дополнительных ресурсов

**Рекомендация для демо-стенда:** Использовать PersistentVolume для Prometheus. S3 использовать только для Grafana (дашборды, snapshots).

## Следующие шаги

1. ✅ Секреты созданы в Vault
2. ⏳ Создать структуру файлов для ArgoCD
3. ⏳ Развернуть Prometheus Operator
4. ⏳ Развернуть Grafana (с S3 для дашбордов)
5. ⏳ Настроить ServiceMonitor для сервисов
6. ⏳ Проверить работу мониторинга
7. ⏳ Настроить SSO через Kratos/Hydra (опционально)
8. ⏳ Добавить Loki для логов (позже)
9. ⏳ Добавить Tempo для трейсинга (позже)

## Ссылки

- [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator)
- [kube-prometheus-stack Helm Chart](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack)
- [Grafana Helm Chart](https://github.com/grafana/helm-charts/tree/main/charts/grafana)
- [Vault Agent Injector](https://www.vaultproject.io/docs/platform/k8s/injector)
