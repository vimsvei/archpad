# Создание токена Vault для GitLab CI/CD

Этот документ описывает, как создать отдельный токен Vault для использования в GitLab CI/CD, не затрагивая существующие токены для агентов.

## Зачем нужен отдельный токен?

- **Безопасность**: Отдельный токен позволяет отслеживать доступ GitLab CI/CD отдельно от токенов агентов
- **Независимость**: Изменение или отзыв токена GitLab CI/CD не повлияет на работу агентов
- **Аудит**: Легче отслеживать, кто и когда использует токен для сборки образов

## Требования

- Доступ к Vault с root-токеном или токеном с правами на создание токенов
- `vault` CLI установлен и настроен
- Политика `archpad` должна существовать в Vault

## Способ 1: Использование скрипта (рекомендуется)

```bash
# Установите переменные окружения
export VAULT_ADDR="https://vault.archpad.pro"
export VAULT_TOKEN_ROOT="your-root-token"

# Запустите скрипт
cd infra/vault
./create-gitlab-token.sh
```

Скрипт:
1. Проверит наличие политики `archpad`
2. Создаст новый токен с этой политикой
3. Выведет токен для копирования в GitLab CI/CD Variables

## Способ 2: Ручное создание через Vault CLI

```bash
# 1. Установите адрес Vault и root-токен
export VAULT_ADDR="https://vault.archpad.pro"
export VAULT_TOKEN="your-root-token"

# 2. Проверьте, что политика archpad существует
vault policy read archpad

# 3. Создайте токен с политикой archpad
vault token create \
  -policy=archpad \
  -ttl=0 \
  -renewable=true \
  -display-name=gitlab-ci-token \
  -format=json | jq -r '.auth.client_token'
```

## Способ 3: Через Vault UI

1. Откройте Vault UI: `https://vault.archpad.pro`
2. Войдите с root-токеном
3. Перейдите в **Access** → **Tokens** → **Create token**
4. Настройки:
   - **Token type**: Service
   - **Policies**: выберите `archpad`
   - **TTL**: оставьте пустым (unlimited) или установите нужный срок
   - **Display name**: `gitlab-ci-token`
5. Нажмите **Create token**
6. Скопируйте созданный токен

## Добавление токена в GitLab CI/CD

1. Откройте проект в GitLab
2. Перейдите в **Settings** → **CI/CD** → **Variables** → **Expand**
3. Нажмите **Add variable**
4. Заполните форму:
   - **Key**: `VAULT_TOKEN`
   - **Value**: `<вставьте токен из Vault>`
   - **Type**: `Variable`
   - **Flags**: 
     - ✅ **Masked** (рекомендуется) - скрывает значение в логах
     - ✅ **Protect variable** (опционально) - доступен только для protected branches
5. Нажмите **Add variable**

## Проверка работы

После добавления токена в GitLab CI/CD, при следующей сборке `portal` вы должны увидеть в логах:

```
Fetching secrets from Vault: https://vault.archpad.pro/kv/data/archpad/demo/frontend/portal
✅ Successfully fetched secrets from Vault
  NEXT_PUBLIC_TOLGEE_API_KEY: ***SET***
  NEXT_PUBLIC_TOLGEE_API_URL: ***SET***
  ...
```

## Политика доступа

Токен использует политику `archpad`, которая предоставляет доступ на чтение:
- `kv/data/archpad/*` - все секреты в пространстве archpad
- `kv/metadata/archpad/*` - метаданные секретов

Это достаточно для чтения секретов `portal` во время сборки.

## Безопасность

- ✅ Токен имеет только права на **чтение** (read), не может изменять или удалять секреты
- ✅ Токен ограничен только пространством `archpad`, не имеет доступа к другим секретам
- ✅ Токен можно отозвать в любой момент через Vault UI или CLI без влияния на другие токены

## Отзыв токена (если нужно)

```bash
# Через CLI
export VAULT_ADDR="https://vault.archpad.pro"
export VAULT_TOKEN="your-root-token"

# Найти токен по display-name
vault token lookup -format=json | jq '.data[] | select(.display_name=="gitlab-ci-token")'

# Отозвать токен (нужен accessor)
vault token revoke <token-accessor>
```

Или через Vault UI: **Access** → **Tokens** → найти токен → **Revoke**
