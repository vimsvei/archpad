# Vault Integration

Этот проект использует HashiCorp Vault для хранения секретов и переменных окружения.

## Миграция на Vault

**Важно**: Проект полностью перешел на использование Vault для хранения секретов.

### Структура .env файлов

- **`.env`** - файл со всеми секретами (используется для первоначальной загрузки в Vault)
- После загрузки секретов в Vault, в `.env` можно оставить только переменные `*_HOST` и `*_ENDPOINT` (не секреты)

### Первоначальная настройка

1. Убедитесь, что `.env` файл содержит все необходимые секреты

2. Загрузите секреты из `.env` в Vault (автоматически при запуске `vault-init` или вручную):
   ```bash
   cd infra/vault
   ./seed.sh ../../.env
   ```

3. Разделите секреты по путям для каждого сервиса:
   ```bash
   ./split-secrets.sh
   ```

4. Настройте конфигурацию сервисов в Vault UI (см. раздел "Конфигурация сервисов")

5. После загрузки секретов в Vault, можно удалить секреты из `.env`, оставив только `*_HOST` и `*_ENDPOINT` переменные

## Структура файлов

- `config.hcl` - конфигурация Vault сервера
- `policy-archpad.hcl` - политика доступа для приложений
- `init.sh` - скрипт инициализации Vault (создание secrets engine, политик, токенов)
- `seed.sh` - скрипт для загрузки секретов из `.env` в Vault
- `split-secrets.sh` - скрипт для разделения секретов по путям для каждого сервиса
- `generate-env.sh` - скрипт для генерации env файла из Vault для конкретного сервиса
- `generate-all-env.sh` - скрипт для генерации env файлов для всех сервисов
- `docker-compose.*.env` - автоматически генерируемые файлы с секретами для каждого сервиса (не коммитятся в git)

**Важно**: Файлы `docker-compose.*.env` создаются автоматически сервисом `vault-env-generator` при запуске профиля `infra`. Пустые файлы уже существуют в репозитории для того, чтобы docker-compose мог их найти при парсинге конфигурации.

## Настройка

### 1. Запуск Vault

Vault и Traefik запускаются через профиль `infra` (базовая инфраструктура):

```bash
cd infra
docker compose --profile infra up -d
```

Это запустит:
- `reverse-proxy` (Traefik)
- `vault` (Vault сервер)
- `vault-init` (инициализация Vault)
- `vault-env-generator` (генерация env файлов для docker-compose сервисов)

**Важно**: Профиль `infra` должен запускаться первым, так как остальные сервисы зависят от Vault и Traefik.

**Если получаете ошибку "address already in use" на порту 8200:**
1. Остановите все контейнеры: `docker compose --profile infra down`
2. Проверьте, не запущен ли Vault вручную: `docker ps | grep vault`
3. Остановите старые контейнеры: `docker stop $(docker ps -q --filter "name=vault") 2>/dev/null || true`
4. Запустите снова: `docker compose --profile infra up -d`

### 1.1. Веб-интерфейс Vault

Vault имеет встроенный веб-интерфейс для управления секретами. Он доступен через Traefik по адресу, указанному в переменной `VAULT_HOST` в `.env` файле.

**Для доступа к UI:**
1. Убедитесь, что в `.env` файле установлена переменная `VAULT_HOST` (например, `vault.localhost` или `vault.yourdomain.com`)
2. Откройте браузер и перейдите по адресу: `https://${VAULT_HOST}`
3. Войдите используя root токен: `root` (для dev режима)

**Веб-интерфейс позволяет:**
- Просматривать и редактировать секреты
- Управлять политиками доступа
- Создавать и управлять токенами
- Просматривать метрики и логи
- Управлять secrets engines
- **Настраивать конфигурацию сервисов** (см. раздел "Конфигурация сервисов")

> ⚠️ **Внимание**: В dev режиме используется root токен `root`. В production используйте более безопасную конфигурацию!

### 2. Загрузка секретов из .env в Vault

Для первоначальной загрузки секретов из `.env` файла в Vault используйте скрипт `seed.sh`:

```bash
cd infra/vault
./seed.sh [path-to-.env-file]
```

По умолчанию скрипт ищет `.env` файл в корне проекта (`../../.env`).

Пример:
```bash
./seed.sh ../../.env
```

**Примечание**: Секреты автоматически загружаются при первом запуске `vault-init`, если `.env` файл доступен.

### 3. Разделение секретов по путям

После загрузки всех секретов в `kv/data/archpad`, их нужно разделить по путям для каждого сервиса.

**Вариант 1: Запуск в контейнере Vault (рекомендуется)**

```bash
docker compose --profile infra exec vault sh /vault-config/split-secrets.sh
```

**Вариант 2: Запуск на хосте (требует vault CLI или curl)**

```bash
cd infra/vault
export VAULT_ADDR=http://localhost:8200
export VAULT_TOKEN=root
./split-secrets.sh
```

Этот скрипт:
- Читает все секреты из `kv/data/archpad`
- Разделяет их по путям `kv/data/archpad/{service-name}` согласно маппингу
- Создает отдельные пути для каждого сервиса

**Примечание**: Скрипт поддерживает как `vault` CLI, так и `curl` для работы с Vault API.

**Структура путей после разделения:**
- `kv/data/archpad/postgres` - секреты для Postgres
- `kv/data/archpad/kratos` - секреты для Kratos
- `kv/data/archpad/hydra` - секреты для Hydra
- `kv/data/archpad/hasura` - секреты для Hasura
- `kv/data/archpad/oathkeeper` - секреты для Oathkeeper
- `kv/data/archpad/pgadmin` - секреты для PgAdmin
- `kv/data/archpad/tolgee` - секреты для Tolgee
- `kv/data/archpad/portal` - секреты для Portal
- `kv/data/archpad/grafana` - секреты для Grafana
- `kv/data/archpad/postgres-exporter` - секреты для Postgres Exporter

### 4. Конфигурация сервисов

Вы можете настроить, какие секреты должны выгружаться для каждого сервиса через веб-интерфейс Vault.

**Создание конфигурации в Vault UI:**

1. Откройте Vault UI: `https://${VAULT_HOST}`
2. Перейдите в `kv/data/archpad/service-config`
3. Создайте новый secret со следующей структурой:

```json
{
  "services": {
    "postgres": {
      "path": "kv/data/archpad/postgres",
      "keys": ["POSTGRES_USER", "POSTGRES_PASSWORD", "PG_PORT"]
    },
    "kratos": {
      "path": "kv/data/archpad/kratos",
      "keys": ["KRATOS_DB_USER", "KRATOS_DB_PASS", "KRATOS_DB", "KRATOS_SYSTEM_SECRET"]
    },
    "hasura": {
      "path": "kv/data/archpad/hasura",
      "keys": ["HASURA_DB_USER", "HASURA_DB_PASS", "HASURA_DB", "HASURA_ADMIN_SECRET", "POSTGRES_USER", "POSTGRES_PASSWORD", "PROJECT_DB"]
    }
    // ... другие сервисы
  }
}
```

**Формат конфигурации:**
- `services` - объект с конфигурацией для каждого сервиса
- `{service-name}.path` - путь в Vault, откуда читать секреты (по умолчанию `kv/data/archpad/{service-name}`)
- `{service-name}.keys` - массив ключей, которые нужно включить в env файл (если пустой, включаются все ключи из пути)

**Если конфигурация не найдена:**
Скрипт `generate-all-env.sh` автоматически использует путь `kv/data/archpad/{service-name}` и включает все ключи из этого пути.

### 5. Переменные окружения для Vault

Для работы с Vault приложениям нужны следующие переменные:

- `VAULT_ADDR` - адрес Vault сервера (по умолчанию: `http://localhost:8200`)
- `VAULT_TOKEN` - токен для аутентификации

**Важно о токенах:**
- **Dev режим** (по умолчанию): Используется фиксированный токен `archpad-token` для удобства разработки
- **Production режим**: Генерируется случайный безопасный токен при каждой инициализации

Для переключения в production режим установите в `.env`:
```bash
VAULT_DEV_MODE=false
```

После инициализации в production режиме токен будет выведен в лог `vault-init` сервиса. **Сохраните его в безопасном месте** и установите в переменную окружения:
```bash
VAULT_TOKEN=<случайный-токен-из-лога>
```

В docker-compose эти переменные автоматически передаются в сервисы:
- `arch-repo`
- `hasura-repo-sync`
- `tenant-service`

### 6. Структура секретов в Vault

Секреты хранятся в KV v2 secrets engine по путям:
- `kv/data/archpad/{service-name}` - секреты для конкретного сервиса
- `kv/data/archpad/service-config` - конфигурация сервисов (опционально)

Каждый сервис получает только те секреты, которые указаны в его конфигурации или все секреты из его пути, если конфигурация не указана.

## Использование в приложениях

### NestJS приложения

Все NestJS приложения автоматически загружают секреты из Vault при старте через `VaultConfigModule` и `loadVaultSecrets()`:

```typescript
import { loadVaultSecrets } from '@archpad/vault-config';

async function bootstrap() {
  // Загружает секреты из Vault перед созданием приложения
  await loadVaultSecrets();
  
  const app = await NestFactory.create(AppModule);
  // ...
}
```

Секреты из Vault загружаются в `process.env` и доступны через `ConfigService` или напрямую через `process.env`. Vault-loader перезаписывает существующие переменные, обеспечивая приоритет Vault.

### Docker Compose сервисы

Каждый Docker Compose сервис использует свой env файл, сгенерированный `vault-env-generator`:

```yaml
service-name:
  # ...
  depends_on:
    vault-env-generator:
      condition: service_completed_successfully
  env_file:
    - ./vault/docker-compose.{service-name}.env
  # ...
```

### Приоритет переменных окружения

1. Переменные из Vault (через `vault-loader` для NestJS или `docker-compose.{service}.env` для других сервисов)
2. Переменные, установленные в `environment` в `docker-compose.yml` (для несекретных настроек)
3. Переменные из `.env` (только `*_HOST` и `*_ENDPOINT`)
4. Значения по умолчанию в коде

## Политики доступа

Политика доступа для приложений находится в `policy-archpad.hcl`:

```hcl
path "kv/data/archpad/*" {
  capabilities = ["read"]
}
```

Эта политика позволяет приложениям только читать секреты из `kv/data/archpad/*`.

## Обновление секретов

Для обновления секретов в Vault:

1. Обновите секреты через Vault UI или CLI:
   ```bash
   vault kv put kv/data/archpad/postgres POSTGRES_PASSWORD=newpassword
   ```

2. Перезапустите `vault-env-generator` для обновления env файлов:
   ```bash
   docker compose --profile infra up -d vault-env-generator
   ```

Или используйте Vault CLI напрямую для обновления секретов в UI.

## Отключение Vault

Если нужно временно отключить интеграцию с Vault, установите:

```bash
export VAULT_ADDR=""
```

Или в docker-compose:

```yaml
environment:
  VAULT_ADDR: ""
```

Приложения продолжат работать, используя только переменные окружения из docker-compose или `.env` файла.

## Бэкап секретов

Для создания бэкапа всех секретов из Vault используется скрипт `backup-secrets.sh`:

### Использование

**Вариант 1: Через kubectl (рекомендуется для Kubernetes)**
```bash
cd infra/vault
./backup-secrets.sh http://vault.vault.svc:8200 hvs.xxxxxxxxxxxx ./backups/vault-$(date +%Y%m%d-%H%M%S)
```

**Вариант 2: Через Vault CLI (локально)**
```bash
export VAULT_ADDR=http://localhost:8200
export VAULT_TOKEN=hvs.xxxxxxxxxxxx
./backup-secrets.sh
```

### Параметры

- `vault_addr` (опционально) - адрес Vault сервера (по умолчанию: `http://vault.vault.svc:8200` или `http://localhost:8200`)
- `vault_token` - токен для доступа к Vault (можно указать через переменную окружения `VAULT_TOKEN`)
- `output_dir` (опционально) - директория для сохранения бэкапа (по умолчанию: `./backups/vault-YYYYMMDD-HHMMSS`)

### Результат

Скрипт создает:
- `metadata.json` - метаинформация о бэкапе (дата, адрес Vault, тип бэкапа)
- `secrets-index.txt` - список всех зарезервированных секретов
- `{path}/secret.json` - JSON файлы с содержимым каждого секрета, сохраняя структуру путей Vault
- `failed-paths.txt` - список путей, которые не удалось зарезервировать (если есть)
- `vault-YYYYMMDD-HHMMSS.tar.gz` - сжатый архив всего бэкапа (опционально)

### Восстановление секретов

Для восстановления секретов из бэкапа можно использовать Vault CLI:

```bash
# Распаковываем архив (если использовался)
tar -xzf vault-20250115-123456.tar.gz

# Восстанавливаем каждый секрет
cd backups/vault-20250115-123456

# Пример восстановления одного секрета
vault kv put kv/data/archpad/demo/grafana/admin @grafana/admin.json

# Или через скрипт (можно создать отдельный скрипт restore-secrets.sh)
```

### Автоматизация бэкапа

Рекомендуется настроить автоматический бэкап секретов:

1. **Cron job в Kubernetes:**
```yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: vault-backup
  namespace: vault
spec:
  schedule: "0 2 * * *"  # Каждый день в 2:00
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup
            image: vault:1.20.4
            command: ["/bin/sh", "-c"]
            args:
              - |
                export VAULT_TOKEN="${VAULT_TOKEN}"
                export VAULT_ADDR="http://localhost:8200"
                # Скопировать скрипт в контейнер или использовать ConfigMap
                /backup-secrets.sh
          restartPolicy: OnFailure
```

2. **Архивирование в объектное хранилище:**
После создания бэкапа можно автоматически загружать архив в S3, MinIO или другое хранилище.

## Устранение неполадок

### `Error parsing listener configuration` или `address already in use`

Эта ошибка означает, что порт 8200, который Vault пытается использовать, уже занят.

**Решение:**

1. Остановите все Docker контейнеры, особенно те, которые могут использовать порт 8200:
   ```bash
   docker compose --profile infra down
   ```
2. Убедитесь, что нет других процессов, использующих порт 8200 на вашей машине:
   ```bash
   sudo lsof -i :8200
   ```
   Если есть, завершите их.
3. Запустите Docker Compose снова:
   ```bash
   docker compose --profile infra up -d
   ```
