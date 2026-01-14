# Настройка GitLab CI/CD

## Обзор

GitLab CI/CD автоматически собирает Docker образы для всех сервисов при коммитах в ветки с версиями (`r/X.Y.Z`) или в `main` ветку.

## Структура Pipeline

### Stages

1. **build** - сборка Docker образов
2. **version** - обновление версий в package.json
3. **deploy** - информационный stage (реальный деплой через ArgoCD Image Updater)

### Jobs

#### Для веток с версиями (r/X.Y.Z):
- `build:arch-repo-service` - сборка arch-repo-service
- `build:tenant-service` - сборка tenant-service
- `build:hasura-sync-service` - сборка hasura-sync-service
- `build:portal` - сборка portal
- `update:versions` - обновление версий в package.json и создание git тега
- `deploy:update-images` - информационный job

#### Для main ветки:
- `build:main:arch-repo-service` - сборка arch-repo-service (только при изменениях)
- `build:main:tenant-service` - сборка tenant-service (только при изменениях)
- `build:main:hasura-sync-service` - сборка hasura-sync-service (только при изменениях)
- `build:main:portal` - сборка portal (только при изменениях)

## Настройка переменных в GitLab

### Обязательные переменные

1. Перейдите в **Settings → CI/CD → Variables**
2. Добавьте следующие переменные:

#### `REGISTRY_USERNAME`
- **Key**: `REGISTRY_USERNAME`
- **Value**: Ваш username для Container Registry TimeWeb
- **Type**: Variable
- **Environment scope**: All environments (или оставьте пустым)
- **Flags**: 
  - ❌ **Protect variable** (не обязательно)
  - ❌ **Mask variable** (не маскируем, так как это username)

#### `REGISTRY_PASSWORD`
- **Key**: `REGISTRY_PASSWORD`
- **Value**: Ваш API токен или пароль для Container Registry TimeWeb
- **Type**: Variable
- **Environment scope**: All environments (или оставьте пустым)
- **Flags**: 
  - ✅ **Protect variable** (рекомендуется)
  - ✅ **Mask variable** (обязательно! чтобы скрыть значение в логах)

#### `VAULT_TOKEN` (только для portal)
- **Key**: `VAULT_TOKEN`
- **Value**: Токен для доступа к Vault (для получения NEXT_PUBLIC_* секретов)
- **Type**: Variable
- **Flags**: 
  - ✅ **Mask variable** (обязательно!)
  - ✅ **Protect variable** (рекомендуется)

#### `GIT_PUSH_TOKEN` (для update:versions job)
- **Key**: `GIT_PUSH_TOKEN`
- **Value**: Personal Access Token или Project Access Token с правами `write_repository`
- **Type**: Variable
- **Flags**: 
  - ✅ **Mask variable** (обязательно!)
  - ✅ **Protect variable** (рекомендуется)

**Как создать токен:**
1. **Personal Access Token** (рекомендуется):
   - User Settings → Access Tokens
   - Token name: `git-push-token`
   - Scopes: `write_repository`
   - Создайте и скопируйте токен

2. **Project Access Token**:
   - Settings → Access Tokens
   - Token name: `git-push-token`
   - Role: Maintainer или Owner
   - Scopes: `write_repository`

### Опциональные переменные

- **`REGISTRY_URL`** - по умолчанию `archpad-cr.registry.twcstorage.ru`
- **`REGISTRY_IMAGE_PREFIX`** - по умолчанию `archpad`
- **`VAULT_ADDR`** - по умолчанию `https://vault.archpad.pro`

## Где взять значения?

### TimeWeb Container Registry

1. Войдите в панель управления TimeWeb
2. Перейдите в раздел **Container Registry**
3. Создайте API токен или используйте существующие учетные данные
4. Используйте:
   - **REGISTRY_URL**: `archpad-cr.registry.twcstorage.ru` (уже установлен по умолчанию)
   - **REGISTRY_USERNAME**: Ваш username или email для Container Registry
   - **REGISTRY_PASSWORD**: API токен или пароль для Container Registry

### Vault Token

Для получения секретов во время сборки Portal:
- Используйте root token (только для CI/CD!)
- Или создайте отдельный токен с правами на чтение секретов из `kv/data/archpad/demo/frontend/portal` и `kv/data/archpad/demo/tolgee/api-key`

## Как это работает

### Для веток с версиями (r/X.Y.Z)

1. **Сборка образов** с тегами:
   - `${VERSION}-${COMMIT_SHA}` (например, `1.2.3-abc12345`)
   - `latest`

2. **Обновление версий** в package.json:
   - Обновляет версии в `packages/portal/package.json`
   - Обновляет версии в `packages/contract/package.json`
   - Обновляет версии в `packages/backend/package.json`

3. **Создание git тега** `v${VERSION}`

4. **Публикация образов** в Container Registry

5. **ArgoCD Image Updater** автоматически обнаружит новые образы и обновит манифесты

### Для main ветки

1. **Сборка образов** с тегами:
   - `main-${COMMIT_SHA}` (например, `main-abc12345`)
   - `latest`

2. **Публикация образов** в Container Registry

3. **ArgoCD Image Updater** автоматически обнаружит новые образы и обновит манифесты

## Особенности сборки Portal

Portal требует получения секретов из Vault во время сборки, так как Next.js встраивает `NEXT_PUBLIC_*` переменные в бандл на этапе сборки.

Pipeline автоматически:
1. Получает секреты из Vault (если `VAULT_TOKEN` установлен)
2. Передает их как build-args в Docker build
3. Next.js встраивает их в бандл

**Секреты, получаемые из Vault:**
- `NEXT_PUBLIC_TOLGEE_API_KEY` - из `kv/data/archpad/demo/tolgee/api-key`
- `NEXT_PUBLIC_TOLGEE_API_URL` - из `kv/data/archpad/demo/frontend/portal`
- `NEXT_PUBLIC_URL` - из `kv/data/archpad/demo/frontend/portal`
- `NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT` - из `kv/data/archpad/demo/frontend/portal`
- `NEXT_PUBLIC_ORY_SDK_URL` - из `kv/data/archpad/demo/frontend/portal`
- `NEXT_PUBLIC_API_GRAPHQL_ENDPOINT` - из `kv/data/archpad/demo/frontend/portal`

## Проверка работы Pipeline

### 1. Локальная проверка синтаксиса

```bash
# Проверка YAML синтаксиса (если установлен yamllint)
yamllint .gitlab-ci.yml

# Или через онлайн валидатор GitLab
# https://gitlab.com/help/ci/yaml/index#validate-the-gitlab-ciyml
```

### 2. Запуск pipeline

1. Сделайте коммит в ветку с версией (`r/1.2.3`) или в `main`
2. Pipeline автоматически запустится
3. Проверьте логи в GitLab CI/CD → Pipelines

### 3. Проверка собранных образов

```bash
# Логин в registry
docker login archpad-cr.registry.twcstorage.ru -u $REGISTRY_USERNAME -p $REGISTRY_PASSWORD

# Проверка образов
docker pull archpad-cr.registry.twcstorage.ru/archpad/arch-repo-service:latest
docker pull archpad-cr.registry.twcstorage.ru/archpad/portal:latest
```

## Решение проблем

### Проблема: "REGISTRY_USERNAME and REGISTRY_PASSWORD must be set"

**Решение:** Добавьте переменные в GitLab CI/CD Variables (см. выше)

**Проверка:**
1. Перейдите в **Settings → CI/CD → Variables**
2. Убедитесь, что видны обе переменные:
   - ✅ `REGISTRY_USERNAME`
   - ✅ `REGISTRY_PASSWORD` (значение будет скрыто, если включен Mask)

### Проблема: "VAULT_TOKEN is not set" (для portal)

**Решение:** Добавьте `VAULT_TOKEN` в GitLab CI/CD Variables

**Примечание:** Сборка продолжится, но `NEXT_PUBLIC_*` переменные могут отсутствовать, что приведет к ошибкам в Portal.

### Проблема: "Cannot connect to Docker daemon"

**Решение:** Убедитесь, что GitLab Runner настроен с поддержкой Docker:
- Runner должен иметь tag `docker`
- Runner должен использовать executor `docker` или `docker+machine`

### Проблема: "docker login failed"

**Решение:**
1. Проверьте правильность `REGISTRY_USERNAME` и `REGISTRY_PASSWORD`
2. Убедитесь, что `REGISTRY_URL` правильный
3. Проверьте, что Container Registry доступен из сети GitLab Runner

### Проблема: "docker build failed"

**Решение:**
1. Проверьте, что `DOCKERFILE_PATH` правильный
2. Проверьте, что `BUILD_CONTEXT` содержит все необходимые файлы
3. Проверьте логи сборки для деталей ошибки

### Проблема: "docker push failed"

**Решение:**
1. Проверьте права доступа к Container Registry
2. Убедитесь, что образ успешно собран
3. Проверьте, что тег образа правильный

### Проблема: "GIT_PUSH_TOKEN is not set" (для update:versions)

**Решение:** Создайте Personal Access Token или Project Access Token с правами `write_repository` и добавьте как переменную `GIT_PUSH_TOKEN`

### Проблема: "Failed to fetch secrets from Vault" (для portal)

**Решение:**
1. Проверьте, что `VAULT_TOKEN` установлен и правильный
2. Проверьте, что токен имеет права на чтение:
   - `kv/data/archpad/demo/frontend/portal`
   - `kv/data/archpad/demo/tolgee/api-key`
3. Проверьте, что Vault доступен из сети GitLab Runner

### Проблема: Переменные не применяются

**Решение:**
1. Проверьте, что переменные не имеют **Environment scope**, который не соответствует вашему pipeline
2. Проверьте, что переменные не имеют флага **Protect variable**, если вы запускаете pipeline на незащищенной ветке
3. Проверьте логи - pipeline покажет, какая именно переменная не установлена

## Безопасность

⚠️ **Важно:**

- **Mask variable** для `REGISTRY_PASSWORD` и `VAULT_TOKEN` - обязательно! Это скроет значение в логах
- **Protect variable** - рекомендуется для production branches
- Не коммитьте пароли в код
- Используйте API токены вместо паролей, когда возможно
- Для Vault используйте ограниченный токен с правами только на чтение нужных секретов

## Альтернатива: Использование GitLab Container Registry

Если вы используете GitLab Container Registry вместо TimeWeb:

1. GitLab автоматически предоставляет переменные:
   - `CI_REGISTRY_USER` - автоматически установлен
   - `CI_REGISTRY_PASSWORD` - автоматически установлен
   - `CI_REGISTRY` - URL registry (например, `registry.gitlab.com`)

2. Обновите `.gitlab-ci.yml`:
   ```yaml
   variables:
     REGISTRY_URL: "${CI_REGISTRY}"
     REGISTRY_IMAGE_PREFIX: "${CI_REGISTRY_IMAGE}"
     # GitLab автоматически предоставляет CI_REGISTRY_USER и CI_REGISTRY_PASSWORD
   ```

3. Обновите `before_script`:
   ```yaml
   before_script:
     - docker login -u "$CI_REGISTRY_USER" -p "$CI_REGISTRY_PASSWORD" "$CI_REGISTRY"
   ```

В этом случае не нужно настраивать `REGISTRY_USERNAME` и `REGISTRY_PASSWORD` вручную.

## Следующие шаги

После успешной сборки:

1. **Проверьте образы в Container Registry:**
   ```bash
   docker login archpad-cr.registry.twcstorage.ru -u $REGISTRY_USERNAME -p $REGISTRY_PASSWORD
   docker pull archpad-cr.registry.twcstorage.ru/archpad/arch-repo-service:latest
   ```

2. **ArgoCD Image Updater автоматически обновит манифесты** (см. `docs/ARGOCD_IMAGE_UPDATER.md`)

3. **ArgoCD автоматически синхронизирует изменения** и перезапустит поды с новыми образами

## Пример настройки через GitLab UI

```
Settings → CI/CD → Variables → Add variable

Variable 1:
  Key: REGISTRY_USERNAME
  Value: my-username
  Type: Variable
  Protect variable: ☐
  Mask variable: ☐

Variable 2:
  Key: REGISTRY_PASSWORD
  Value: my-secret-token
  Type: Variable
  Protect variable: ☑
  Mask variable: ☑

Variable 3:
  Key: VAULT_TOKEN
  Value: my-vault-token
  Type: Variable
  Protect variable: ☑
  Mask variable: ☑

Variable 4:
  Key: GIT_PUSH_TOKEN
  Value: my-git-token
  Type: Variable
  Protect variable: ☑
  Mask variable: ☑
```
