# Deploy - Развертывание сервисов в Kubernetes

Развертывание происходит в строгой последовательности:

1. **1st-step** - Traefik и Vault
2. **2nd-step** - Остальные сервисы (Cert-Manager, Hasura и др.)

## Предварительные требования

Перед началом развертывания нужно создать базовую инфраструктуру:

```bash
cd ../init
terraform init
terraform apply
```

Это создаст:
- Kubernetes кластер
- PostgreSQL кластер
- Базы данных
- Kubeconfig файл

## Порядок развертывания

### Шаг 1: Traefik и Vault

```bash
cd 1st-step
terraform init
terraform plan
terraform apply
```

**ВАЖНО:** После развертывания получите публичный IP:

```bash
terraform output traefik_lb_ip
```

Используйте этот IP для настройки DNS записей:
- `vault.archpad.pro` → IP Traefik
- `hasura.archpad.pro` → IP Traefik
- `*.archpad.pro` → IP Traefik (wildcard)

После развертывания Traefik и Vault будут доступны:
- Vault: `https://vault.archpad.pro` (если настроен DNS)

### Шаг 2: Остальные сервисы

```bash
cd ../2nd-step
terraform init
```

**Настройте переменные в `terraform.tfvars`:**
- `hasura_database_url` - URL для подключения к БД Hasura
- `hasura_metadata_database_url` - URL для метаданных Hasura
- `timeweb_dns01_group_name` - GroupName для cert-manager webhook
- `timeweb_dns01_solver_name` - SolverName для cert-manager webhook

```bash
terraform plan
terraform apply
```

После развертывания все сервисы должны быть доступны:
- `https://hasura.archpad.pro` (Hasura)
- `https://vault.archpad.pro` (Vault)

## Структура

- **`1st-step/`** - Traefik (Ingress Controller) и Vault (хранение секретов)
- **`2nd-step/`** - Cert-Manager, Hasura, TLS и другие сервисы

Каждый шаг использует remote state из предыдущих шагов для получения необходимой информации.

## Дополнительная информация

См. README в каждой папке:
- [`1st-step/README.md`](1st-step/README.md)
- [`2nd-step/README.md`](2nd-step/README.md)