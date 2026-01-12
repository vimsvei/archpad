# Настройка GitLab CI/CD Variables

## Проблема: Jobs падают с ошибкой "REGISTRY_USERNAME and REGISTRY_PASSWORD must be set"

Если вы видите эту ошибку, значит не настроены переменные окружения в GitLab.

## Решение: Добавить переменные в GitLab

### Шаг 1: Перейдите в настройки проекта

1. Откройте ваш проект в GitLab
2. Перейдите в **Settings → CI/CD**
3. Найдите раздел **Variables** и нажмите **Expand** (или **Add variable**)

### Шаг 2: Добавьте переменную `REGISTRY_USERNAME`

1. Нажмите **Add variable**
2. Заполните:
   - **Key**: `REGISTRY_USERNAME`
   - **Value**: Ваш username для Container Registry TimeWeb
   - **Type**: Variable
   - **Environment scope**: All environments (или оставьте пустым)
   - **Flags**: 
     - ✅ **Protect variable** (если хотите, чтобы переменная была доступна только для protected branches)
     - ❌ **Mask variable** (не маскируем, так как это username, не пароль)
3. Нажмите **Add variable**

### Шаг 3: Добавьте переменную `REGISTRY_PASSWORD`

1. Нажмите **Add variable**
2. Заполните:
   - **Key**: `REGISTRY_PASSWORD`
   - **Value**: Ваш API токен или пароль для Container Registry TimeWeb
   - **Type**: Variable
   - **Environment scope**: All environments (или оставьте пустым)
   - **Flags**: 
     - ✅ **Protect variable** (рекомендуется)
     - ✅ **Mask variable** (обязательно! чтобы скрыть значение в логах)
3. Нажмите **Add variable**

## Где взять значения?

### TimeWeb Container Registry

1. Войдите в панель управления TimeWeb
2. Перейдите в раздел **Container Registry**
3. Создайте API токен или используйте существующие учетные данные
4. Используйте:
   - **REGISTRY_USERNAME**: Ваш username или email
   - **REGISTRY_PASSWORD**: API токен или пароль

### Альтернатива: GitLab Container Registry

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

## Проверка настроек

После добавления переменных:

1. Перейдите в **Settings → CI/CD → Variables**
2. Убедитесь, что видны обе переменные:
   - ✅ `REGISTRY_USERNAME`
   - ✅ `REGISTRY_PASSWORD` (значение будет скрыто, если включен Mask)

3. Запустите pipeline снова:
   - Перейдите в **CI/CD → Pipelines**
   - Нажмите **Retry** на упавшем pipeline
   - Или сделайте новый коммит

## Безопасность

⚠️ **Важно:**

- **Mask variable** для `REGISTRY_PASSWORD` - обязательно! Это скроет значение в логах
- **Protect variable** - рекомендуется для production branches
- Не коммитьте пароли в код
- Используйте API токены вместо паролей, когда возможно

## Отладка

Если переменные установлены, но jobs все еще падают:

1. Проверьте, что переменные не имеют **Environment scope**, который не соответствует вашему pipeline
2. Проверьте, что переменные не имеют флага **Protect variable**, если вы запускаете pipeline на незащищенной ветке
3. Проверьте логи - обновленная версия `.gitlab-ci.yml` покажет, какая именно переменная не установлена

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
```
