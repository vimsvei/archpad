# pgAdmin Module

Этот модуль разворачивает pgAdmin для управления PostgreSQL базами данных в Kubernetes кластере.

## Описание

Модуль создает:
- Kubernetes Namespace для pgAdmin
- Kubernetes Deployment для pgAdmin
- Kubernetes Service для pgAdmin
- Traefik IngressRoute для доступа через домен `pgadmin.archpad.pro`
- ConfigMap с предустановленной конфигурацией серверов (servers.json)
- Secret с credentials для pgAdmin

## Требования

- Traefik должен быть развернут (модуль `01-traefik`)
- Vault должен быть настроен для получения секретов (модуль `02-vault`)
- PostgreSQL сервер должен быть доступен

## Использование

```hcl
module "pgadmin" {
  source = "./06-pg-admin"
  
  pgadmin_host = "pgadmin.archpad.pro"
  postgres_host = "192.168.0.4"
  postgres_port = 5432
  vault_token = var.vault_token
}
```

## Переменные

Основные переменные:
- `pgadmin_host` - домен для доступа к pgAdmin (по умолчанию `pgadmin.archpad.pro`)
- `postgres_host` - IP адрес PostgreSQL сервера (по умолчанию `192.168.0.4`)
- `postgres_port` - порт PostgreSQL сервера (по умолчанию `5432`)
- `vault_token` - токен Vault для получения секретов
- `vault_environment` - окружение Vault (по умолчанию `demo`)

## Секреты в Vault

Модуль ожидает секреты в Vault по пути:
- `kv/data/archpad/{environment}/pgadmin`:
  - `PGADMIN_DEFAULT_EMAIL` - email для входа в pgAdmin
  - `PGADMIN_DEFAULT_PASSWORD` - пароль для входа в pgAdmin

- `kv/data/archpad/{environment}/database-cluster`:
  - `POSTGRES_USERNAME` - имя пользователя PostgreSQL (для подключения к серверу)
  - `POSTGRES_PASSWORD` - пароль PostgreSQL (для подключения к серверу)

## Предустановленная конфигурация

Модуль автоматически настраивает подключение к PostgreSQL серверу `archpad-db-cluster` через файл `servers.json`, который монтируется в контейнер pgAdmin.

Сервер настроен на:
- Host: `192.168.0.4` (или значение `postgres_host`)
- Port: `5432` (или значение `postgres_port`)
- Username: из Vault (`POSTGRES_USERNAME`)
- MaintenanceDB: `default_db` (или значение `postgres_admin_database`)
- SSLMode: `prefer`

Пароль для подключения к PostgreSQL серверу нужно будет ввести вручную при первом подключении или сохранить в pgAdmin.

## Доступ

После развертывания pgAdmin будет доступен по адресу:
- HTTPS: `https://pgadmin.archpad.pro`
- HTTP: автоматически редиректит на HTTPS

Вход в pgAdmin:
- Email: из Vault (`PGADMIN_DEFAULT_EMAIL`)
- Password: из Vault (`PGADMIN_DEFAULT_PASSWORD`)
