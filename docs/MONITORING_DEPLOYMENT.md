# Развертывание мониторинга в Kubernetes

## Проблема: Application'ы не появляются в ArgoCD

Application'ы для мониторинга нужно применить **вручную один раз**, после чего они будут управляться через GitOps.

## Применение Application'ов

### 1. Применить корневой Application для мониторинга

```bash
kubectl apply -f infra/timeweb/10-gitops/apps/monitoring/monitoring.app.yaml
```

Этот Application применяет все ресурсы из `apps/monitoring/` (namespace, Grafana Deployment, Service, PVC, IngressRoute, ConfigMaps).

### 2. Применить Application для Prometheus

```bash
kubectl apply -f infra/timeweb/10-gitops/apps/monitoring/prometheus/prometheus.app.yaml
```

Этот Application развертывает Prometheus Operator через Helm chart.

## Проверка

После применения Application'ов проверьте их статус:

```bash
# Проверить Application'ы
kubectl get applications -n argocd | grep -E "monitoring|prometheus"

# Проверить детальный статус
kubectl get application monitoring -n argocd
kubectl get application prometheus -n argocd

# Проверить синхронизацию
kubectl describe application monitoring -n argocd
kubectl describe application prometheus -n argocd
```

## Проверка развертывания

### Namespace

```bash
kubectl get namespace monitoring
```

### Prometheus

```bash
# Проверить Prometheus Operator
kubectl get pods -n monitoring | grep prometheus

# Проверить Prometheus StatefulSet
kubectl get statefulset -n monitoring

# Проверить Service
kubectl get service -n monitoring | grep prometheus
```

### Grafana

```bash
# Проверить Grafana Deployment
kubectl get deployment grafana -n monitoring

# Проверить Pods
kubectl get pods -n monitoring | grep grafana

# Проверить Service
kubectl get service grafana -n monitoring

# Проверить IngressRoute
kubectl get ingressroute grafana -n monitoring
```

### Доступ к Grafana

После развертывания Grafana будет доступна по адресу:
- **URL**: `https://monitoring.archpad.pro`
- **Логин**: из секрета Vault `kv/data/archpad/monitoring/grafana/admin`
- **Пароль**: из секрета Vault `kv/data/archpad/monitoring/grafana/admin`

### Доступ к Prometheus (внутри кластера)

```bash
# Port-forward для локального доступа
kubectl port-forward -n monitoring svc/prometheus-kube-prometheus-prometheus 9090:9090
```

Затем откройте в браузере: `http://localhost:9090`

## Troubleshooting

### Application'ы не видны в ArgoCD UI

1. Проверьте, что Application'ы применены:
```bash
kubectl get applications -n argocd
```

2. Если их нет, примените вручную (см. выше)

3. Проверьте логи ArgoCD Application Controller:
```bash
kubectl logs -n argocd -l app.kubernetes.io/name=argocd-application-controller --tail=100 | grep monitoring
```

### Prometheus не запускается

1. Проверьте логи Prometheus Operator:
```bash
kubectl logs -n monitoring -l app.kubernetes.io/name=prometheus-operator --tail=100
```

2. Проверьте логи Prometheus:
```bash
kubectl logs -n monitoring -l app.kubernetes.io/name=prometheus --tail=100
```

3. Проверьте PersistentVolumeClaim:
```bash
kubectl get pvc -n monitoring
kubectl describe pvc -n monitoring
```

### Grafana не запускается

1. Проверьте логи Grafana:
```bash
kubectl logs -n monitoring -l app=grafana --tail=100
```

2. Проверьте, что секреты из Vault загружены:
```bash
kubectl get pods -n monitoring -l app=grafana
kubectl describe pod -n monitoring -l app=grafana | grep -A 10 "vault"
```

3. Проверьте PersistentVolumeClaim:
```bash
kubectl get pvc grafana-storage -n monitoring
kubectl describe pvc grafana-storage -n monitoring
```

### Grafana не доступна по адресу monitoring.archpad.pro

1. Проверьте IngressRoute:
```bash
kubectl get ingressroute grafana -n monitoring
kubectl describe ingressroute grafana -n monitoring
```

2. Проверьте логи Traefik:
```bash
kubectl logs -n traefik -l app.kubernetes.io/name=traefik --tail=100 | grep monitoring
```

3. Проверьте DNS:
```bash
nslookup monitoring.archpad.pro
```

## Почему Application'ы не применяются автоматически?

ArgoCD `directory` source применяет только обычные Kubernetes ресурсы (Deployment, Service, ConfigMap и т.д.), но не Application'ы. Application'ы - это специальные ресурсы ArgoCD, которые нужно создавать отдельно.

После первого применения Application'ы будут управляться через GitOps - любые изменения в манифестах будут автоматически синхронизироваться.
