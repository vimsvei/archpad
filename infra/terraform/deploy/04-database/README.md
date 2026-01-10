# 04-database Terraform Module

Этот модуль Terraform управляет PostgreSQL базами данных, пользователями, правами и расширениями для проекта Archpad.

## Описание

Модуль создает:
- **Роли (пользователи)**: PROJECT_DB_USER, HASURA_DB_USER, KRATOS_DB_USER, HYDRA_DB_USER, TOLGEE_DB_USER
- **Базы данных**: project (archpad), tenant, hasura, kratos, hydra, tolgee
- **Права доступа**: в зависимости от режима владения (`db_ownership_mode`)
- **Расширения PostgreSQL**: pgcrypto, uuid-ossp, pg_trgm, btree_gin

## Требования

### Провайдеры
- `hashicorp/vault` ~> 4.0
- `cyrilgdn/postgresql` ~> 1.24
- `hashicorp/external` ~> 2.3
- `hashicorp/null` ~> 3.2

### Предварительные условия
1. Модуль `02-vault` должен быть применен (для получения адреса Vault)
2. Модуль `init` должен быть применен (для получения информации о БД кластере)
3. В Vault должны быть настроены секреты по пути: `kv/data/archpad/{environment}/database`

## Секреты в Vault

Модуль ожидает следующие секреты в Vault по пути `/v1/kv/data/archpad/{vault_environment}/database`:

- `PROJECT_DB_PASSWORD` - пароль для пользователя PROJECT_DB_USER
- `HASURA_DB_PASSWORD` - пароль для пользователя HASURA_DB_USER
- `KRATOS_DB_PASSWORD` - пароль для пользователя KRATOS_DB_USER
- `HYDRA_DB_PASSWORD` - пароль для пользователя HYDRA_DB_USER
- `TOLGEE_DB_PASSWORD` - пароль для пользователя TOLGEE_DB_USER

**Важно**: Ключи в Vault должны иметь суффикс `_PASSWORD`, а не `_PASS` (как в старом init.sh).

## Переменные

### Обязательные

- `vault_token` (string, sensitive) - Vault root token для доступа к секретам
- `postgres_host` (string) - Адрес PostgreSQL сервера
- `postgres_admin_password` (string, sensitive) - Пароль администратора PostgreSQL

### Опциональные

- `vault_host` (string) - Публичный хост Vault (по умолчанию: "vault.archpad.pro")
- `vault_address` (string) - Полный адрес Vault API (автоматически формируется из vault_host)
- `kv_secrets_engine_path` (string) - Путь к KV secrets engine (по умолчанию: "kv")
- `vault_environment` (string) - Окружение Vault (по умолчанию: "demo")
- `postgres_port` (number) - Порт PostgreSQL (по умолчанию: 5432)
- `postgres_admin_database` (string) - Административная БД (по умолчанию: "postgres")
- `postgres_admin_user` (string) - Административный пользователь (по умолчанию: "postgres")
- `postgres_ssl_mode` (string) - Режим SSL (по умолчанию: "prefer")
- `postgres_connect_timeout` (number) - Таймаут подключения в секундах (по умолчанию: 5)
- `db_ownership_mode` (string) - Режим владения БД: "app_owner" или "postgres_owner" (по умолчанию: "app_owner")
- Имена БД: `project_db_name`, `tenant_db_name`, `hasura_db_name`, `kratos_db_name`, `hydra_db_name`, `tolgee_db_name` (берутся из init state, если не указаны)

## Режим создания

Базы данных создаются с владельцем = пользователь приложения. Это автоматически дает пользователю все необходимые права для создания и управления объектами (таблицы, последовательности, функции и т.д.) внутри его БД.

## Использование

### Пример terraform.tfvars

```hcl
vault_token              = "hvs.your-token-here"
postgres_host            = "postgres.example.com"
postgres_admin_password  = "your-admin-password"
vault_environment        = "demo"
db_ownership_mode        = "app_owner"
```

### Применение

```bash
cd infra/terraform/deploy/04-database
terraform init
terraform plan
terraform apply
```

## Outputs

- `database_users` - Созданные пользователи (роли)
- `databases` - Созданные базы данных с их владельцами
- `extensions` - Установленные расширения PostgreSQL
- `postgres_admin_password` - Пароль администратора PostgreSQL (sensitive, из Vault или переменной)

### Получение пароля администратора из outputs

После применения модуля пароль администратора можно получить из outputs:

```bash
# Получить пароль администратора (sensitive output)
terraform output -raw postgres_admin_password

# Сохранить пароль в файл для последующего сохранения в Vault
terraform output -raw postgres_admin_password > /tmp/pg-admin-password.txt

# После получения пароля, сохраните его в Vault:
vault kv put kv/data/archpad/demo/database POSTGRES_ADMIN_PASSWORD="$(cat /tmp/pg-admin-password.txt)"
```

## Расширения PostgreSQL

Расширения устанавливаются автоматически:

- **project, tenant, hasura, hydra**: `pgcrypto`, `uuid-ossp`
- **kratos**: `pgcrypto`, `uuid-ossp`, `pg_trgm`, `btree_gin`
- **tolgee**: расширения не устанавливаются

**Примечание**: Для создания расширений требуется superuser права. Если текущий пользователь не имеет этих прав, может потребоваться Python скрипт (см. раздел ниже).

## Подключение к PostgreSQL с приватным IP

Если у PostgreSQL сервера только приватный IP (например, в Kubernetes кластере), есть два способа подключения:

### Вариант 1: Использование kubectl port-forward (рекомендуется)

Модуль поддерживает автоматический port-forward через `null_resource`. Настройте переменные:

```hcl
use_kubectl_port_forward = true
postgres_k8s_namespace   = "default"  # namespace где находится PostgreSQL
postgres_k8s_pod         = "postgres-0"  # имя PostgreSQL pod
postgres_local_port      = 5433  # локальный порт для port-forward
postgres_host            = "postgres.private.network"  # все равно нужен для информации
```

Terraform автоматически запустит `kubectl port-forward` перед применением и остановит после.

**Требования:**
- Доступ к Kubernetes кластеру через kubectl
- Правильно настроенный kubeconfig

### Вариант 2: Использование Python скрипта (для сложных случаев)

Если нужен больший контроль или port-forward не работает, используйте Python скрипт:

```bash
python3 scripts/init-database.py \
    --use-port-forward \
    --kubeconfig /path/to/kubeconfig \
    --namespace default \
    --postgres-pod postgres-0 \
    --local-port 5433 \
    --host localhost \
    --port 5432 \
    --admin-user postgres \
    --admin-password secret \
    --vault-addr https://vault.example.com \
    --vault-token hvs.xxx \
    --vault-path kv/data/archpad/demo/database \
    --mode app_owner
```

Скрипт автоматически:
1. Запустит kubectl port-forward
2. Получит секреты из Vault
3. Создаст пользователей, базы данных, права и расширения
4. Остановит port-forward

## Проблемы и решения

### Проблема: PostgreSQL доступен только по приватному IP

См. раздел выше "Подключение к PostgreSQL с приватным IP".

### Проблема: Нет прав для создания расширений

Если PostgreSQL provider не может создать расширения из-за отсутствия superuser прав, используйте Python скрипт (см. выше).

## Зависимости

Модуль зависит от:
- `../02-vault/terraform.tfstate` - для получения адреса Vault
- `../../init/terraform.tfstate` - для получения информации о БД кластере

## Восстановление пароля администратора PostgreSQL

### ⚠️ Важно: пароль администратора кластера БД

Пароль главного пользователя (admin/superuser) для **managed database кластера** в TimeWeb Cloud:
- **Нельзя восстановить** - если забыли, можно только сбросить на новый
- Задается при создании кластера в TimeWeb Cloud
- **Должен храниться в Vault** сразу после создания кластера

### Где хранить пароль администратора

Пароль должен храниться в Vault по пути:
```
kv/data/archpad/{vault_environment}/database
```
С ключом: `POSTGRES_ADMIN_PASSWORD` или `POSTGRES_PASSWORD`

### Как получить пароль из Vault

```bash
# Через Vault CLI
vault kv get -format=json kv/data/archpad/demo/database | jq -r '.data.data.POSTGRES_ADMIN_PASSWORD'

# Или через Vault API
curl -H "X-Vault-Token: $VAULT_TOKEN" \
  https://vault.archpad.pro/v1/kv/data/archpad/demo/database | \
  jq -r '.data.data.POSTGRES_ADMIN_PASSWORD'
```

### Если забыли пароль - сброс через TimeWeb Cloud

**Вариант 1: Через панель управления TimeWeb Cloud**
1. Зайдите в панель управления TimeWeb Cloud
2. Найдите ваш database cluster
3. Используйте функцию "Сброс пароля" / "Reset Password"
4. Установите новый пароль
5. **Сразу обновите пароль в Vault!**

**Вариант 2: Через TimeWeb Cloud API**

```bash
# Получить ID кластера из terraform state
cd infra/terraform/init
terraform output -json db_cluster | jq -r '.id'

# Сбросить пароль через API (нужна документация TimeWeb Cloud API)
# Пример:
curl -X POST \
  -H "Authorization: Bearer $TWC_TOKEN" \
  -H "Content-Type: application/json" \
  "https://api.timeweb.cloud/v1/database/clusters/{cluster_id}/reset-password" \
  -d '{"password": "новый_пароль"}'
```

### Рекомендации

1. **Сохраняйте пароль сразу** после создания кластера в Vault
2. **Используйте Vault как единый источник истины** для всех паролей
3. **Добавьте пароль в terraform.tfvars** (закомментированный) для справки:
   ```hcl
   # postgres_admin_password = "пароль из Vault"  # Хранится в Vault: kv/data/archpad/demo/database
   ```
4. **Документируйте процесс восстановления** в команде

### Обновление пароля в Vault

После сброса пароля обязательно обновите его в Vault:

```bash
# Через Vault CLI
vault kv put kv/data/archpad/demo/database POSTGRES_ADMIN_PASSWORD="новый_пароль"

# Или добавьте все пароли БД сразу
vault kv put kv/data/archpad/demo/database \
  POSTGRES_ADMIN_PASSWORD="новый_пароль_админа" \
  PROJECT_DB_PASSWORD="пароль_project_user" \
  HASURA_DB_PASSWORD="пароль_hasura_user" \
  KRATOS_DB_PASSWORD="пароль_kratos_user" \
  HYDRA_DB_PASSWORD="пароль_hydra_user" \
  TOLGEE_DB_PASSWORD="пароль_tolgee_user"
```

## Заметки

- Модуль основан на логике из `infra/postgres/init.sh`
- Имена пользователей жестко заданы в коде (PROJECT_DB_USER, HASURA_DB_USER, и т.д.)
- TENANT_DB использует того же пользователя, что и PROJECT_DB (PROJECT_DB_USER)
- Все пароли берутся из Vault с ключами `*_DB_PASSWORD`
- Пароль администратора (`postgres_admin_password`) должен быть либо в Vault, либо в переменной `postgres_admin_password`
