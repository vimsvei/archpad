# Deploy - Развертывание сервисов в Kubernetes

Эта папка содержит Terraform конфигурацию для развертывания сервисов в Kubernetes:
- Traefik (Ingress Controller с LoadBalancer)
- Cert-Manager (автоматические TLS сертификаты)
- Hasura (GraphQL Engine)
- Vault (хранение секретов)
- Container Registry (опционально)

## Предварительные требования

**ВАЖНО:** Перед развертыванием сервисов нужно создать базовую инфраструктуру:

1. Перейдите в папку `../init`
2. Выполните `terraform apply` для создания кластера и БД
3. Дождитесь завершения создания (kubeconfig будет сохранен в `../init/kubeconfig.yaml`)

## Использование

1. **Инициализация:**
   ```bash
   terraform init
   ```

2. **Настройка переменных:**
   
   Отредактируйте `terraform.tfvars`:
   - `hasura_database_url` - URL для подключения к БД Hasura
   - `hasura_metadata_database_url` - URL для метаданных Hasura
   - `timeweb_dns01_group_name` - GroupName для cert-manager webhook
   - `timeweb_dns01_solver_name` - SolverName для cert-manager webhook

3. **Проверка плана:**
   ```bash
   terraform plan
   ```

4. **Развертывание:**
   ```bash
   terraform apply
   ```

5. **Получение публичного IP:**
   ```bash
   terraform output traefik_lb_ip
   ```

6. **Настройка DNS:**
   
   Используйте полученный IP для настройки DNS записей:
   - `hasura.archpad.pro` → IP Traefik
   - `vault.archpad.pro` → IP Traefik
   - `*.archpad.pro` → IP Traefik (wildcard)

## Компоненты

- **Traefik** - Ingress Controller с LoadBalancer (публичный доступ)
- **Cert-Manager** - Автоматические TLS сертификаты (Let's Encrypt)
- **Hasura** - GraphQL Engine
- **Vault** - Хранилище секретов
- **Container Registry** - Поддержка приватного реестра образов (опционально)

## Зависимости

Deploy использует remote state из `../init/terraform.tfstate` для получения:
- Kubeconfig файла (`../init/kubeconfig.yaml`)
- Информации о кластере и БД (через remote state)