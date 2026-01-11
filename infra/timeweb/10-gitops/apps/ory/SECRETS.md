# Секреты для Ory компонентов

Этот документ описывает, какие секреты необходимы для каждого компонента Ory и как их создать в Vault.

## Секреты для Kratos

**Путь в Vault:** `/kv/data/archpad/demo/ory/kratos`

### Необходимые переменные:

1. **DSN** - строка подключения к PostgreSQL
   - Формат: `postgres://<user>:<password>@<host>:<port>/<database>?sslmode=disable&max_conns=20&max_idle_conns=4`
   - Пример: `postgres://kratos_user:password123@postgres-service:5432/kratos?sslmode=disable&max_conns=20&max_idle_conns=4`
   - **Важно:** В Kubernetes используйте имя сервиса PostgreSQL вместо `localhost`

2. **KRATOS_SECRET** - секретный ключ для подписи cookies и токенов
   - Длина: минимум 32 символа
   - **Важно:** Должен быть стабильным (не меняться между перезапусками)
   - Пример: `ReMUeeq8tyEmmAHFBUiKtzkEmX9aMZr7` (32 символа)
   - Можно сгенерировать: `openssl rand -base64 32`

3. **SMTP_CONNECTION_URI** - URI подключения к SMTP серверу для отправки email
   - Формат: `smtp://<host>:<port>/?disable_starttls=true` (для Mailpit/локального SMTP)
   - Или: `smtps://<user>:<pass>@<host>:<port>` (для внешнего SMTP)
   - Пример для Mailpit: `smtp://mailpit-service:1025/?disable_starttls=true`
   - Пример для внешнего SMTP: `smtps://user:pass@smtp.gmail.com:465`

4. **SMTP_FROM_ADDRESS** - адрес отправителя для email
   - Пример: `no-reply@archpad.pro`
   - Должен соответствовать настройкам SMTP сервера

### Пример JSON для Vault:

```json
{
  "DSN": "postgres://kratos_user:password123@postgres-service:5432/kratos?sslmode=disable&max_conns=20&max_idle_conns=4",
  "KRATOS_SECRET": "ReMUeeq8tyEmmAHFBUiKtzkEmX9aMZr7",
  "SMTP_CONNECTION_URI": "smtp://mailpit-service:1025/?disable_starttls=true",
  "SMTP_FROM_ADDRESS": "no-reply@archpad.pro"
}
```

## Секреты для Hydra

**Путь в Vault:** `/kv/data/archpad/demo/ory/hydra`

### Необходимые переменные:

1. **DSN** - строка подключения к PostgreSQL
   - Формат: `postgres://<user>:<password>@<host>:<port>/<database>?sslmode=disable&max_conns=20&max_idle_conns=4`
   - Пример: `postgres://hydra_user:password123@postgres-service:5432/hydra?sslmode=disable&max_conns=20&max_idle_conns=4`
   - **Важно:** В Kubernetes используйте имя сервиса PostgreSQL вместо `localhost`

2. **SECRETS_SYSTEM** - системный секрет для шифрования данных Hydra
   - Длина: минимум 32 символа
   - **Важно:** Должен быть стабильным (не меняться при использовании персистентной БД)
   - Пример: `nApRkoCIUm7lLYvGCvAmT8jgnqk0LhDAXlBaWVIngEL` (32 символа)
   - Можно сгенерировать: `openssl rand -base64 32`

### Пример JSON для Vault:

```json
{
  "DSN": "postgres://hydra_user:password123@postgres-service:5432/hydra?sslmode=disable&max_conns=20&max_idle_conns=4",
  "SECRETS_SYSTEM": "nApRkoCIUm7lLYvGCvAmT8jgnqk0LhDAXlBaWVIngEL"
}
```

## Секреты для Oathkeeper

**Путь в Vault:** `/kv/data/archpad/demo/ory/oauthkeeper`

**Важно:** Путь содержит `oauthkeeper` (с "oauth"), а не `oathkeeper`. Это как указал пользователь.

### Необходимые переменные:

1. **ORY_CLIENT_ID** - ID OAuth2 клиента для Oathkeeper (используется для introspection токенов)
   - Пример: `archpad-oathkeeper`
   - Этот ID будет использован при создании OAuth2 клиента в Hydra через Job `hydra-init-client`

2. **ORY_CLIENT_SECRET** - секрет OAuth2 клиента для Oathkeeper
   - Длина: рекомендуется минимум 32 символа
   - Пример: `4oG5JkhLBhSL1L41VimM36bc70YNOerv`
   - Этот секрет будет использован при создании OAuth2 клиента в Hydra
   - Можно сгенерировать: `openssl rand -base64 32`

### Пример JSON для Vault:

```json
{
  "ORY_CLIENT_ID": "archpad-oathkeeper",
  "ORY_CLIENT_SECRET": "4oG5JkhLBhSL1L41VimM36bc70YNOerv"
}
```

## Создание секретов через Vault API

Если у вас есть root token от Vault, вы можете создать секреты через API используя curl:

### 1. Kratos

```bash
curl -X POST \
  -H "X-Vault-Token: <root-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "DSN": "postgres://kratos_user:password123@postgres-service:5432/kratos?sslmode=disable&max_conns=20&max_idle_conns=4",
      "KRATOS_SECRET": "ReMUeeq8tyEmmAHFBUiKtzkEmX9aMZr7",
      "SMTP_CONNECTION_URI": "smtp://mailpit-service:1025/?disable_starttls=true",
      "SMTP_FROM_ADDRESS": "no-reply@archpad.pro"
    }
  }' \
  https://vault.archpad.pro/v1/kv/data/archpad/demo/ory/kratos
```

### 2. Hydra

```bash
curl -X POST \
  -H "X-Vault-Token: <root-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "DSN": "postgres://hydra_user:password123@postgres-service:5432/hydra?sslmode=disable&max_conns=20&max_idle_conns=4",
      "SECRETS_SYSTEM": "nApRkoCIUm7lLYvGCvAmT8jgnqk0LhDAXlBaWVIngEL"
    }
  }' \
  https://vault.archpad.pro/v1/kv/data/archpad/demo/ory/hydra
```

### 3. Oathkeeper

```bash
curl -X POST \
  -H "X-Vault-Token: <root-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "ORY_CLIENT_ID": "archpad-oathkeeper",
      "ORY_CLIENT_SECRET": "4oG5JkhLBhSL1L41VimM36bc70YNOerv"
    }
  }' \
  https://vault.archpad.pro/v1/kv/data/archpad/demo/ory/oauthkeeper
```

## Использование скрипта

Также можно использовать интерактивный скрипт `create-ory-secrets.sh`:

```bash
./create-ory-secrets.sh https://vault.archpad.pro <root-token>
```

Скрипт попросит ввести все необходимые значения и создаст секреты в Vault.

## Генерация случайных секретов

Для генерации случайных секретов можно использовать:

```bash
# Генерация 32-символьного секрета (base64)
openssl rand -base64 32

# Генерация 32-символьного секрета (hex)
openssl rand -hex 32

# Генерация случайного секрета через Python
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

## Важные замечания

1. **DSN строки:** В Kubernetes используйте имя сервиса PostgreSQL вместо `localhost` или `postgres`. Например, если PostgreSQL сервис называется `postgres` в namespace `default`, используйте `postgres.default.svc.cluster.local` или просто `postgres` (если в том же namespace).

2. **Стабильность секретов:** `KRATOS_SECRET` и `SECRETS_SYSTEM` должны быть стабильными (не меняться между перезапусками), иначе пользователи потеряют сессии и данные.

3. **Путь Oathkeeper:** Путь в Vault для Oathkeeper - `oauthkeeper` (с "oauth"), а не `oathkeeper`. Это как указал пользователь в требованиях.

4. **PostgreSQL:** Убедитесь, что PostgreSQL доступен в кластере и у вас есть credentials для создания пользователей и баз данных для Kratos и Hydra.
