# Отладка GitLab CI/CD Pipeline

## Исправленные проблемы

### ✅ Проблема: `before_script config should be a string or a nested array`

**Причина:** Использование якорей (anchors) `<<: *` с `before_script` может вызывать проблемы в GitLab CI, особенно когда там есть многострочные блоки.

**Решение:** Переписал конфигурацию, используя `extends` вместо якорей. Это более надежный и рекомендуемый способ в GitLab CI.

## Текущая структура

### Шаблон `.build_docker_image`

- `before_script` - настройка окружения, логин в registry
- `script` - сборка и публикация Docker образа
- `after_script` - logout из registry

### Jobs

- `build:arch-repo-service` - сборка arch-repo-service
- `build:tenant-service` - сборка tenant-service
- `build:hasura-sync-service` - сборка hasura-sync-service
- `build:portal` - сборка portal
- `deploy:update-images` - опциональный job для обновления образов

## Настройка переменных в GitLab

### Обязательные переменные

1. Перейдите в **Settings → CI/CD → Variables**
2. Добавьте:
   - **`REGISTRY_USERNAME`** (Type: Variable, Protected: false, Masked: false)
   - **`REGISTRY_PASSWORD`** (Type: Variable, Protected: true, Masked: true)

### Опциональные переменные

- **`REGISTRY_URL`** - по умолчанию `registry.timeweb.cloud`
- **`REGISTRY_IMAGE_PREFIX`** - по умолчанию `archpad`

## Проверка работы pipeline

### 1. Локальная проверка синтаксиса

```bash
# Проверка YAML синтаксиса (если установлен yamllint)
yamllint .gitlab-ci.yml

# Или через онлайн валидатор GitLab
# https://gitlab.com/help/ci/yaml/index#validate-the-gitlab-ciyml
```

### 2. Запуск pipeline

1. Сделайте коммит в `main` или `develop` ветку
2. Pipeline автоматически запустится
3. Проверьте логи в GitLab CI/CD → Pipelines

### 3. Отладка проблем

#### Проблема: "REGISTRY_USERNAME and REGISTRY_PASSWORD must be set"

**Решение:** Добавьте переменные в GitLab CI/CD Variables (см. выше)

#### Проблема: "Cannot connect to Docker daemon"

**Решение:** Убедитесь, что GitLab Runner настроен с поддержкой Docker:
- Runner должен иметь tag `docker`
- Runner должен использовать executor `docker` или `docker+machine`

#### Проблема: "docker login failed"

**Решение:**
1. Проверьте правильность `REGISTRY_USERNAME` и `REGISTRY_PASSWORD`
2. Убедитесь, что `REGISTRY_URL` правильный
3. Проверьте, что Container Registry доступен из сети GitLab Runner

#### Проблема: "docker build failed"

**Решение:**
1. Проверьте, что `DOCKERFILE_PATH` правильный
2. Проверьте, что `BUILD_CONTEXT` содержит все необходимые файлы
3. Проверьте логи сборки для деталей ошибки

#### Проблема: "docker push failed"

**Решение:**
1. Проверьте права доступа к Container Registry
2. Убедитесь, что образ успешно собран
3. Проверьте, что тег образа правильный

## Улучшения для отладки

Pipeline теперь выводит:
- Commit SHA
- Registry URL и Image Prefix
- Имя сервиса
- Полные теги образов
- Путь к Dockerfile и build context

Это поможет быстро найти проблему в логах.

## Следующие шаги

После успешной сборки:

1. **Проверьте образы в Container Registry:**
   ```bash
   # Логин в registry
   docker login registry.timeweb.cloud -u $REGISTRY_USERNAME -p $REGISTRY_PASSWORD
   
   # Проверка образов
   docker pull registry.timeweb.cloud/archpad/arch-repo-service:abc12345
   ```

2. **Обновите манифесты Kubernetes** с новыми образами (см. `docs/SETUP_INSTRUCTIONS.md`)

3. **Проверьте деплой** через ArgoCD

## Альтернатива: Использование GitLab Container Registry

Если у вас есть GitLab Container Registry, можно использовать его вместо TimeWeb:

```yaml
variables:
  REGISTRY_URL: "${CI_REGISTRY}"
  REGISTRY_IMAGE_PREFIX: "${CI_REGISTRY_IMAGE}"
  # GitLab автоматически предоставляет CI_REGISTRY_USER и CI_REGISTRY_PASSWORD
```

В этом случае не нужно настраивать `REGISTRY_USERNAME` и `REGISTRY_PASSWORD` вручную.
