# 02-vault

Развертывание HashiCorp Vault в Kubernetes кластере.

## Описание

Этот модуль развертывает:
- **Vault** - система управления секретами
- **S3 Storage** - backend storage для Vault (опционально, вместо Raft)
- **IngressRoute** - маршрут для доступа к Vault UI через Traefik
- **KV Secrets Engine** - автоматическое включение KV secrets engine (опционально)

## Зависимости

- Требуется выполненный `terraform apply` в папке `init/`
- Требуется выполненный `terraform apply` в папке `01-traefik/` (для IngressRoute)
- Использует kubeconfig из `init/kubeconfig.yaml`
- Использует S3 bucket из `init/terraform.tfstate`
- Использует Traefik CRD из `01-traefik/terraform.tfstate`

## Использование

```bash
cd 02-vault
terraform init
terraform plan
terraform apply
```

## Переменные

Скопируйте `terraform.tfvars.example` в `terraform.tfvars` и настройте:

### Обязательные (если используется S3):
- `s3_access_key` - TimeWeb S3 access key
- `s3_secret_key` - TimeWeb S3 secret key
- `use_s3_storage = true` - включить использование S3

### Опциональные:
- `vault_token` - Root token для автоматической настройки KV secrets engine
- `registry_url` и `registry_token` - для использования Container Registry

## Структура файлов

```
02-vault/
├── provider.tf              # Terraform providers и remote states
├── variables.tf             # Переменные
├── vault.tf                 # Основная конфигурация Vault (Helm)
├── vault-ingress.tf         # IngressRoute для доступа через Traefik
├── vault-kv-secrets.tf      # Автоматическое включение KV secrets engine
├── storageclass.tf          # Local-path-provisioner (если не используется S3)
├── registry.tf              # Container Registry секреты
├── outputs.tf               # Outputs модуля
├── scripts/                 # Bash скрипты для настройки Vault
│   ├── check-unsealed.sh
│   ├── enable-kv-secrets-engine.sh
│   └── helm-repo-update.sh
└── ingressroute.yaml.tpl    # Шаблон для IngressRoute
```

## Следующие шаги

После развертывания:
1. Инициализируйте Vault через UI (или CLI)
2. Разблокируйте Vault используя unseal keys
3. При необходимости добавьте `vault_token` в `terraform.tfvars` для автоматической настройки KV secrets engine
