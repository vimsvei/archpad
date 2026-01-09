# Terraform конфигурация для Archpad на TimeWeb Cloud

Конфигурация разделена на два этапа для упрощения развертывания:

## Структура

- **`init/`** - Базовая инфраструктура (кластер, БД)
- **`deploy/`** - Развертывание сервисов в Kubernetes

## Порядок развертывания

### 1. Создание базовой инфраструктуры

Перейдите в папку `init/`:

```bash
cd init
terraform init
terraform plan
terraform apply
```

Это создаст:
- Kubernetes кластер (k0s)
- Node группу для рабочих узлов
- PostgreSQL кластер
- Базы данных

Kubeconfig будет автоматически сохранен в `init/kubeconfig.yaml`.

### 2. Развертывание сервисов

После успешного создания кластера перейдите в папку `deploy/`:

```bash
cd ../deploy
terraform init
```

Настройте переменные в `terraform.tfvars`:
- `hasura_database_url` - URL для подключения к БД Hasura
- `hasura_metadata_database_url` - URL для метаданных Hasura
- `timeweb_dns01_group_name` - GroupName для cert-manager webhook
- `timeweb_dns01_solver_name` - SolverName для cert-manager webhook

Затем выполните:

```bash
terraform plan
terraform apply
```

Это развернет:
- Traefik (Ingress Controller с LoadBalancer)
- Cert-Manager (автоматические TLS сертификаты)
- Hasura (GraphQL Engine)
- Vault (хранение секретов)
- Container Registry (опционально)

### 3. Получение публичного IP и настройка DNS

После развертывания получите публичный IP:

```bash
cd deploy
terraform output traefik_lb_ip
```

Настройте DNS записи для ваших доменов на полученный IP:
- `hasura.archpad.pro` → IP Traefik
- `vault.archpad.pro` → IP Traefik
- `*.archpad.pro` → IP Traefik (wildcard)

## Преимущества разделения

1. **Независимость**: Базовую инфраструктуру можно создавать отдельно
2. **Простота**: Нет проблем с kubeconfig на этапе plan
3. **Гибкость**: Можно обновлять сервисы без пересоздания кластера
4. **Безопасность**: Разделение ответственности между этапами

## Подробности

См. README в каждой папке:
- [`init/README.md`](init/README.md)
- [`deploy/README.md`](deploy/README.md)