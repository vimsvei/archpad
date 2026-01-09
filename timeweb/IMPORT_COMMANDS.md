# Команды для импорта проекта из Timeweb Cloud

## Быстрый импорт (одна команда)

```bash
cd timeweb && \
export TWC_TOKEN="your_token_here" && \
terraform init && \
terraform import twc_project.main 1984197
```

## Пошаговый импорт

### 1. Перейдите в директорию с Terraform конфигурацией
```bash
cd timeweb
```

### 2. Установите токен доступа
```bash
export TWC_TOKEN="your_timeweb_cloud_api_token"
```

Или создайте файл `terraform.tfvars`:
```bash
cat > terraform.tfvars << EOF
twc_token = "your_timeweb_cloud_api_token"
project_id = 1984197
EOF
```

### 3. Инициализируйте Terraform
```bash
terraform init
```

### 4. Импортируйте проект
```bash
terraform import twc_project.main 1984197
```

### 5. Проверьте конфигурацию
```bash
terraform plan
```

### 6. Обновите конфигурацию (опционально)
После импорта Terraform покажет, какие параметры нужно добавить в `project.tf`.
Обновите файл `project.tf` с актуальными значениями из вывода `terraform plan`.

### 7. Примените изменения (если нужно)
```bash
terraform apply
```

## Импорт других ресурсов

После импорта проекта вы можете импортировать другие ресурсы:

### Импорт сервера (VPS)
```bash
terraform import twc_server.example SERVER_ID
```

### Импорт базы данных
```bash
terraform import twc_database_cluster.example CLUSTER_ID
```

### Импорт DNS записи
```bash
terraform import twc_dns_rr.example ZONE_ID:RECORD_ID
```

## Получение списка ресурсов через API

Для получения списка всех ресурсов в проекте можно использовать API Timeweb Cloud:

```bash
curl -H "Authorization: Bearer $TWC_TOKEN" \
  https://api.timeweb.cloud/api/v1/projects/1984197
```
