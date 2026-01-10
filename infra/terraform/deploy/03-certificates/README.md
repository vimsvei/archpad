# 03-certificates - Cert-Manager и Let's Encrypt

Этот модуль устанавливает и настраивает cert-manager для автоматического выпуска и обновления TLS сертификатов через Let's Encrypt.

## Зависимости

- `init` - Kubernetes cluster должен быть создан
- `01-traefik` (опционально) - Traefik Ingress Controller для использования HTTP-01 challenge

## Что делает модуль

1. **Устанавливает cert-manager** через Helm chart
2. **Создает ClusterIssuer для Let's Encrypt:**
   - `letsencrypt-staging` - для тестирования (не влияет на лимиты Let's Encrypt)
   - `letsencrypt-prod` - для production сертификатов
3. **Создает wildcard сертификат** для домена (если `domain_root` указан и Traefik готов)
4. **Настраивает TLSStore для Traefik** - использует wildcard сертификат как default

## Способы валидации ACME

Модуль поддерживает два способа валидации ACME challenge:

### HTTP-01 Challenge (по умолчанию)
Используется, если `timeweb_dns01_group_name` не указан. Требует, чтобы Traefik был доступен из интернета.

### DNS-01 Challenge (TimeWeb Webhook)
Используется, если `timeweb_dns01_group_name` указан. Требует установки cert-manager webhook для TimeWeb DNS.

**Для использования DNS-01:**
1. Установите cert-manager webhook для TimeWeb (отдельно, не входит в этот модуль)
2. Получите `timeweb_dns01_group_name` и `timeweb_dns01_solver_name`
3. Укажите их в `terraform.tfvars`

## Использование

```bash
cd 03-certificates
terraform init
terraform plan
terraform apply
```

## Переменные

См. `variables.tf` и `terraform.tfvars.example` для списка всех переменных.

Обязательные переменные:
- `acme_email` - Email для Let's Encrypt аккаунта

Опциональные:
- `domain_root` - Корневой домен для wildcard сертификата (по умолчанию "archpad.pro")
- `timeweb_dns01_group_name` - Group name для TimeWeb DNS webhook (для DNS-01 challenge)
- `timeweb_dns01_solver_name` - Solver name для TimeWeb DNS webhook (по умолчанию "timeweb-dns01-solver")
- `registry_url` и `registry_token` - Для использования приватного container registry

## Использование сертификатов

### В IngressRoute (Traefik)

```yaml
apiVersion: traefik.io/v1alpha1
kind: IngressRoute
metadata:
  name: my-app
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(`app.example.com`)
      kind: Rule
      services:
        - name: my-service
          port: 80
  tls:
    certResolver: letsencrypt-prod  # Или letsencrypt-staging для тестирования
```

### В Certificate ресурсе

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: my-cert
spec:
  secretName: my-cert-tls
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
  dnsNames:
    - example.com
    - www.example.com
```

### Использование wildcard сертификата

Если создан wildcard сертификат, он автоматически используется как default в Traefik TLSStore. Для использования в IngressRoute:

```yaml
tls:
  secretName: archpad-pro-wildcard-tls  # Или другой, в зависимости от domain_root
```

## Troubleshooting

### Проверка статуса cert-manager

```bash
kubectl get pods -n cert-manager
kubectl logs -n cert-manager deployment/cert-manager
```

### Проверка ClusterIssuer

```bash
kubectl get clusterissuer
kubectl describe clusterissuer letsencrypt-prod
```

### Проверка сертификатов

```bash
kubectl get certificate -A
kubectl describe certificate <cert-name> -n <namespace>
```

### Проверка CertificateRequest

```bash
kubectl get certificaterequest -A
kubectl describe certificaterequest <request-name> -n <namespace>
```

### Просмотр событий

```bash
kubectl get events -n cert-manager --sort-by='.lastTimestamp'
```
