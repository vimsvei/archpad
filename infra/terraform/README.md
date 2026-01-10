# Terraform Infrastructure для ArchPad

Этот каталог содержит Terraform конфигурации для развертывания инфраструктуры ArchPad в TimeWeb Cloud.

## Быстрый старт

1. **Скопируйте файл переменных:**
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

2. **Заполните переменные в `terraform.tfvars`**

3. **Следуйте инструкциям по порядку развертывания (см. ниже)**

## Структура

```
terraform/
├── terraform.tfvars          # Общий файл переменных (создайте из terraform.tfvars.example)
├── terraform.tfvars.example  # Пример файла переменных
├── doc/                      # Вся документация (см. doc/README.md)
├── init/                     # Инициализация инфраструктуры (K8s, DB, S3)
└── deploy/                   # Пошаговое развертывание сервисов
    ├── 01-traefik/           # Traefik Ingress Controller
    ├── 02-vault/             # HashiCorp Vault
    └── ...
```

## Порядок развертывания

```bash
# 1. Инициализация инфраструктуры
cd init
terraform init
terraform apply

# 2. Развертывание Traefik
cd ../deploy/01-traefik
terraform init
terraform apply

# 3. Развертывание Vault
cd ../02-vault
terraform init
terraform apply

# ... и т.д.
```

## Использование общего terraform.tfvars

Все модули используют один общий файл `terraform.tfvars` из корня `terraform/`.

Файлы `terraform.tfvars` в подпапках являются символическими ссылками на общий файл.

### Создание файла переменных

1. Скопируйте пример файла:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```

2. Заполните переменные в `terraform.tfvars`

3. Файл автоматически будет использоваться всеми модулями через симлинки

### Если нужно переопределить переменные для конкретного модуля

Вы можете создать локальный файл `terraform.tfvars.local` в папке модуля или использовать флаг:
```bash
terraform apply -var-file=terraform.tfvars.local
```

## Документация

Вся подробная документация находится в папке `doc/`:
- `doc/README.md` - обзор документации
- `doc/DNS_SETUP.md` - настройка DNS
- `doc/TLS_CERTIFICATES.md` - настройка TLS
- `doc/DEBUG.md` - отладка Traefik
- `doc/RECOVERY.md` - восстановление после ошибок
- `doc/VAULT_DEBUG.md` - отладка Vault

Каждый модуль также имеет свой `README.md` с инструкциями по использованию.

## Безопасность

⚠️ **ВАЖНО:** Файл `terraform.tfvars` содержит чувствительные данные (токены, ключи) и **не должен** попадать в git.

Файл уже добавлен в `.gitignore`, но убедитесь, что он не отслеживается:
```bash
git status
```

Если файл уже был закоммичен ранее, удалите его из истории:
```bash
git rm --cached terraform.tfvars
```

## Зависимости между модулями

- `init/` - основа, создает K8s кластер, DB, S3
- `deploy/01-traefik/` зависит от `init/` (kubeconfig, S3 bucket)
- `deploy/02-vault/` зависит от `init/` (kubeconfig, S3 bucket) и `01-traefik/` (Traefik CRD)
