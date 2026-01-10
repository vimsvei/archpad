# 01-traefik

Развертывание Traefik Ingress Controller в Kubernetes кластере.

## Описание

Этот модуль развертывает:
- **Traefik** - Cloud-native Edge Router (Ingress Controller)
- **RBAC** - роли и привязки для доступа Traefik к Kubernetes API
- **IngressRoute** - маршрут для доступа к Traefik Dashboard
- **Container Registry** секреты (опционально)

## Использование

```bash
cd 01-traefik
terraform init
terraform plan
terraform apply
```

## Переменные

Скопируйте `terraform.tfvars.example` в `terraform.tfvars` и настройте:

- `registry_url` - адрес Container Registry (опционально)
- `registry_token` - токен для доступа к Registry (опционально)

## Зависимости

- Требуется выполненный `terraform apply` в папке `init/`
- Использует kubeconfig из `init/kubeconfig.yaml`

## Outputs

После развертывания вы получите:
- `traefik_lb_ip` - публичный IP адрес LoadBalancer (нужен для настройки DNS)
- `traefik_crd_ready` - сигнал готовности CRD (для зависимых сервисов)

## Следующий шаг

После успешного развертывания Traefik, можно переходить к развертыванию Vault:
```bash
cd ../02-vault
terraform init
terraform apply
```
