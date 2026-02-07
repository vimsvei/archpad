# Дашборды Grafana

## Обзор

Дашборды Grafana хранятся в проекте и разворачиваются через Kubernetes ConfigMaps. Исходные JSON-файлы лежат в `infra/timeweb/10-gitops/dashboards/`, ConfigMaps — в `apps/monitoring/grafana/`.

## Текущие дашборды

| Файл | ConfigMap | Описание |
|------|-----------|----------|
| `nodes.json` | grafana-dashboard-nodes | Node Metrics (CPU, Memory, Disk) |
| — | grafana-dashboard-kubernetes-cluster | Kubernetes Cluster |
| — | grafana-dashboard-resources-summary | Resources Summary |
| — | grafana-dashboard-resources | Resources by Application |
| — | grafana-dashboard-applications | Applications |
| — | grafana-dashboard-keycloak | Keycloak |
| — | grafana-dashboard-logs-errors | Logs & Errors |
| — | grafana-dashboard-containers | Containers |
| — | grafana-dashboard-node | Archpad Node Metrics (альтернативный) |

## Как добавить новый дашборд

### 1. Получить JSON дашборда

Экспортируйте дашборд из Grafana UI:

- Откройте нужный дашборд → **Dashboard settings** (⚙️) → **JSON Model**
- Скопируйте JSON или сохраните в файл

### 2. Создать JSON-файл в `dashboards/`

Положите JSON в каталог:

```
infra/timeweb/10-gitops/dashboards/
├── nodes.json          # существующий
└── my-new-dashboard.json   # новый
```

Рекомендации:

- Имя файла — `slug.json` (латиница, дефисы)
- Убедитесь, что в JSON есть поля `uid`, `title` (обязательны для provisioning)

### 3. Создать ConfigMap

Добавьте файл `infra/timeweb/10-gitops/apps/monitoring/grafana/grafana.configmap-dashboard-<name>.yaml`:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: grafana-dashboard-<name>   # например: grafana-dashboard-my-app
  namespace: monitoring
data:
  <filename>.json: |               # например: my-app.json: |
    {
      "uid": "my-app",
      "title": "My Application",
      ...
    }
```

Вариант с использованием `kubectl` для генерации ConfigMap из файла:

```bash
kubectl create configmap grafana-dashboard-my-app \
  --from-file=my-app.json=infra/timeweb/10-gitops/dashboards/my-app.json \
  --namespace=monitoring \
  --dry-run=client -o yaml > infra/timeweb/10-gitops/apps/monitoring/grafana/grafana.configmap-dashboard-my-app.yaml
```

### 4. Добавить volume в Grafana Deployment

В `infra/timeweb/10-gitops/apps/monitoring/grafana/grafana.deployment.yaml` добавьте:

**В `volumeMounts` (секция `containers`):**

```yaml
- name: grafana-dashboards-my-app
  mountPath: /var/lib/grafana/dashboards/my-app.json
  subPath: my-app.json
  readOnly: true
```

**В `volumes`:**

```yaml
- name: grafana-dashboards-my-app
  configMap:
    name: grafana-dashboard-my-app
```

### 5. Проверить provisioning

Grafana использует `grafana-dashboards` ConfigMap с `path: /var/lib/grafana/dashboards`. Все `.json` в этой директории подхватываются автоматически, дополнительной настройки provisioning не нужно.

### 6. Закоммитить и синхронизировать

После коммита ArgoCD обновит Grafana, новый дашборд появится в папке **Archpad**.

## Структура каталогов

```
infra/timeweb/10-gitops/
├── dashboards/                    # Исходные JSON (удобно редактировать)
│   ├── nodes.json
│   └── my-dashboard.json
└── apps/monitoring/grafana/
    ├── grafana.configmap-dashboard-nodes.yaml
    ├── grafana.configmap-dashboard-my-dashboard.yaml
    ├── grafana.configmap-dashboards.yaml   # provisioning config
    └── grafana.deployment.yaml             # volumeMounts
```

## Datasources

Дашборды используют Datasources с uid:

- **Prometheus** — `uid: prometheus`
- **Loki** — `uid: loki`

В JSON дашборда указывайте:

```json
"datasource": {
  "type": "prometheus",
  "uid": "prometheus"
}
```

## Ссылки

- [COMPONENTS.md](./COMPONENTS.md#мониторинг) — описание мониторинга
- [Grafana Provisioning](https://grafana.com/docs/grafana/latest/administration/provisioning/#dashboards)
