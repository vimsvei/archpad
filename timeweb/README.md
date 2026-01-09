# Terraform конфигурация для Timeweb Cloud

Эта директория содержит Terraform конфигурацию для управления инфраструктурой в Timeweb Cloud.

> **Важно:** Провайдер использует собственный реестр Timeweb Cloud: `tf.timeweb.cloud/timeweb-cloud/timeweb-cloud`
> 
> Документация: [GitHub](https://github.com/timeweb-cloud/terraform-provider-timeweb-cloud)

## Настройка

1. **Установите Terraform** (если еще не установлен):
   ```bash
   # macOS
   brew install terraform
   
   # или скачайте с https://www.terraform.io/downloads
   ```

2. **Получите API токен Timeweb Cloud**:
   - Войдите в личный кабинет Timeweb Cloud
   - Перейдите в раздел API
   - Создайте новый токен доступа

3. **Настройте переменные окружения**:
   ```bash
   export TWC_TOKEN="your_api_token_here"
   ```
   
   Или создайте файл `terraform.tfvars`:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   # Отредактируйте terraform.tfvars и укажите ваш токен
   ```

## Импорт существующего проекта

Для импорта существующего проекта с ID 1984197:

### Вариант 1: Использование скрипта (рекомендуется)

```bash
chmod +x import.sh
./import.sh
```

### Вариант 2: Ручной импорт

```bash
# Инициализация
terraform init

# Импорт проекта
terraform import twc_project.main 1984197

# Проверка конфигурации
terraform plan
```

## Управление инфраструктурой

После импорта вы можете управлять инфраструктурой через Terraform:

```bash
# Просмотр планируемых изменений
terraform plan

# Применение изменений
terraform apply

# Просмотр текущего состояния
terraform show
```

## Дополнительные ресурсы

После импорта проекта вы можете добавить импорт других ресурсов:
- Серверы (VPS)
- Базы данных
- DNS записи
- Объектное хранилище
- И другие ресурсы Timeweb Cloud

Пример импорта сервера:
```bash
terraform import twc_server.example SERVER_ID
```

## Документация

- [Timeweb Cloud Terraform Provider (GitHub)](https://github.com/timeweb-cloud/terraform-provider-timeweb-cloud)
- [Документация Timeweb Cloud](https://timeweb.cloud/docs/terraform)
