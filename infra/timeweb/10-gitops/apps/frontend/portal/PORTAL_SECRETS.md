# Portal Secrets - Полный список используемых секретов

## Общая информация

Portal использует переменные окружения для конфигурации. Переменные с префиксом `NEXT_PUBLIC_` доступны на клиенте (браузер), остальные - только на сервере.

**Основной путь в Vault:** `/v1/kv/data/archpad/demo/frontend/portal`

**Дополнительные пути в Vault:**
- `/v1/kv/data/archpad/demo/hasura/endpoint` - внутренний URL Hasura (`HASURA_INTERNAL_URL`)
- `/v1/kv/data/archpad/demo/ory/kratos/endpoint` - внутренний URL Ory Kratos (`ORY_KRATOS_INTERNAL_URL`)
- `/v1/kv/data/archpad/demo/hasura/secret` - секреты Hasura (`HASURA_GRAPHQL_ADMIN_SECRET`)

### Рекомендация по внутренним адресам Kubernetes

Для внутренних адресов Kubernetes сервисов **рекомендуется использовать FQDN** (полное доменное имя) вместо коротких имен:

- ✅ **FQDN:** `http://hasura.platform.svc:8080` 
- ❌ **Короткое имя:** `http://hasura:8080`

**Преимущества FQDN:**
1. **Явное указание namespace** - сразу видно, в каком namespace находится сервис
2. **Защита от конфликтов** - если в будущем появится сервис с таким же именем в другом namespace, не будет разночтений
3. **Лучшая читаемость** - более явная и понятная конфигурация
4. **Документированность** - проще понять архитектуру и связи между сервисами

**Формат FQDN в Kubernetes:**
```
<service-name>.<namespace>.svc:<port>
```

---

## Список всех используемых секретов

### 1. Portal Configuration

#### `NEXT_PUBLIC_URL`
- **Тип:** Публичная переменная (доступна в браузере)
- **Описание:** Публичный URL Portal
- **Пример:** `https://portal.archpad.pro`
- **Использование в коде:** Используется для генерации абсолютных URL
- **Обязательная:** ✅ Да

---

### 2. Ory Kratos (Аутентификация)

#### `NEXT_PUBLIC_ORY_SDK_URL`
- **Тип:** Публичная переменная (доступна в браузере)
- **Описание:** Публичный URL Kratos SDK для клиентской части
- **Пример:** `https://auth.archpad.pro`
- **Использование в коде:**
  - `packages/portal/src/app/api/ory/self-service/[...path]/route.ts` (fallback)
  - `packages/portal/src/app/api/ory/sessions/[...path]/route.ts` (fallback)
  - `packages/portal/src/app/api/ory/logout/route.ts` (fallback)
- **Обязательная:** ✅ Да

#### `ORY_KRATOS_INTERNAL_URL`
- **Тип:** Серверная переменная (только на сервере)
- **Описание:** Внутренний URL Kratos для серверных API запросов
- **Пример:** `http://kratos.secure.svc:4433`
- **Путь в Vault:** `/v1/kv/data/archpad/demo/ory/kratos/endpoint`
- **Рекомендация:** Для внутренних запросов используйте FQDN (`kratos.secure.svc`) для явного указания namespace
- **Использование в коде:**
  - `packages/portal/src/app/api/ory/self-service/[...path]/route.ts` (приоритет над NEXT_PUBLIC_ORY_SDK_URL)
  - `packages/portal/src/app/api/ory/sessions/[...path]/route.ts` (приоритет над NEXT_PUBLIC_ORY_SDK_URL)
  - `packages/portal/src/app/api/ory/logout/route.ts` (приоритет над NEXT_PUBLIC_ORY_SDK_URL)
- **Обязательная:** ⚠️ Рекомендуется (используется как приоритет для серверных запросов)

---

### 3. Hasura GraphQL

#### `NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT`
- **Тип:** Публичная переменная (доступна в браузере)
- **Описание:** Публичный URL Hasura GraphQL endpoint
- **Пример:** `https://apim.archpad.pro/v1/graphql`
- **Использование в коде:**
  - `packages/portal/src/app/api/public/solutions/[id]/route.ts` (fallback)
  - Используется в GraphQL клиентах на клиенте
- **Обязательная:** ✅ Да

#### `HASURA_INTERNAL_URL`
- **Тип:** Серверная переменная (только на сервере)
- **Описание:** Внутренний URL Hasura для прямых серверных запросов
- **Пример:** `http://hasura.platform.svc:8080/v1/graphql`
- **Путь в Vault:** `/v1/kv/data/archpad/demo/hasura/endpoint`
- **Рекомендация:** Используйте FQDN (`hasura.platform.svc`) вместо короткого имени (`hasura`) для:
  - Явного указания namespace (защита от конфликтов)
  - Избежания разночтений при возможном появлении сервисов с таким же именем в других namespace
  - Лучшей читаемости и документированности
- **Альтернатива:** `http://hasura:8080/v1/graphql` (работает в том же namespace, но менее явно)
- **Использование в коде:**
  - `packages/portal/src/app/api/public/solutions/[id]/route.ts` (приоритет над NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT)
- **Обязательная:** ⚠️ Рекомендуется (для прямого доступа к Hasura с сервера)

#### `HASURA_GRAPHQL_ADMIN_SECRET`
- **Тип:** Серверная переменная (только на сервере) - **СЕКРЕТ**
- **Описание:** Секретный ключ администратора Hasura для серверных запросов
- **Пример:** `your-hasura-admin-secret`
- **Использование в коде:**
  - `packages/portal/src/app/api/public/solutions/[id]/route.ts` (для запросов с правами администратора)
- **Обязательная:** ⚠️ Рекомендуется (для публичных запросов с админ правами)

---

### 4. Tolgee (i18n - Интернационализация)

#### `NEXT_PUBLIC_TOLGEE_API_URL`
- **Тип:** Публичная переменная (доступна в браузере)
- **Описание:** Публичный URL Tolgee API для загрузки переводов
- **Пример:** `https://i18n.archpad.pro`
- **Использование в коде:**
  - `packages/portal/src/tolgee/shared.ts`
  - `packages/portal/src/tolgee/server.tsx`
- **Обязательная:** ✅ Да

#### `NEXT_PUBLIC_TOLGEE_API_KEY`
- **Тип:** Публичная переменная (доступна в браузере)
- **Описание:** API ключ Tolgee (публичный ключ, безопасен для клиента)
- **Пример:** `tgpak_...`
- **Использование в коде:**
  - `packages/portal/src/tolgee/shared.ts`
  - `packages/portal/src/tolgee/server.tsx`
- **Обязательная:** ✅ Да

---

### 5. API Gateway (Oathkeeper)

#### `API_GATEWAY_INTERNAL_URL`
- **Тип:** Серверная переменная (только на сервере)
- **Описание:** Внутренний URL API Gateway (Oathkeeper) для серверных запросов
- **Пример:** `http://oathkeeper.secure.svc:4455`
- **Рекомендация:** Используйте FQDN (`oathkeeper.secure.svc`) для явного указания namespace
- **Использование в коде:**
  - `packages/portal/src/app/api/graphql/route.ts` (fallback для NEXT_PUBLIC_API_GRAPHQL_ENDPOINT)
  - `packages/portal/src/app/api/rest/[...path]/route.ts` (fallback для NEXT_PUBLIC_API_REST_ENDPOINT)
  - `packages/portal/src/app/api/public/solutions/[id]/route.ts` (fallback для NEXT_PUBLIC_API_GRAPHQL_ENDPOINT)
- **Обязательная:** ⚠️ Опционально (используется как fallback)

#### `NEXT_PUBLIC_API_GRAPHQL_ENDPOINT`
- **Тип:** Публичная переменная (доступна в браузере)
- **Описание:** Публичный URL API Gateway для GraphQL запросов
- **Пример:** `https://api.archpad.pro/graphql`
- **Использование в коде:**
  - `packages/portal/src/app/api/graphql/route.ts` (приоритет над API_GATEWAY_INTERNAL_URL)
  - `packages/portal/src/app/api/public/solutions/[id]/route.ts` (приоритет над API_GATEWAY_INTERNAL_URL)
- **Обязательная:** ⚠️ Опционально (используется как приоритет над API_GATEWAY_INTERNAL_URL)

---

## Приоритет переменных (fallback)

### Ory Kratos
1. `ORY_KRATOS_INTERNAL_URL` (приоритет для серверных запросов)
2. `NEXT_PUBLIC_ORY_SDK_URL` (fallback)

### Hasura
1. `HASURA_INTERNAL_URL` (приоритет для серверных запросов)
2. `NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT` (fallback)

### API Gateway
1. `NEXT_PUBLIC_API_GRAPHQL_ENDPOINT` (приоритет)
2. `API_GATEWAY_INTERNAL_URL` (fallback)
3. `http://oathkeeper:4455` (hardcoded fallback)

---

## Переменные, которые НЕ используются в коде

Следующие переменные экспортируются в deployment, но **не найдены в коде**:
- ❌ Нет переменных, которые не используются

**Примечание:** Все переменные, экспортируемые в deployment, используются в коде.

---

## Пример создания/обновления секретов в Vault

```bash
VAULT_ADDR="https://vault.archpad.pro"
VAULT_TOKEN="<your-token>"

curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "NEXT_PUBLIC_URL": "https://portal.archpad.pro",
      "NEXT_PUBLIC_ORY_SDK_URL": "https://auth.archpad.pro",
      "NEXT_PUBLIC_ORY_SDK_URL": "https://auth.archpad.pro",
      "NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT": "https://apim.archpad.pro/v1/graphql",
      "HASURA_GRAPHQL_ADMIN_SECRET": "your-hasura-admin-secret",
      "NEXT_PUBLIC_TOLGEE_API_URL": "https://i18n.archpad.pro",
      "NEXT_PUBLIC_TOLGEE_API_KEY": "tgpak_...",
      "API_GATEWAY_INTERNAL_URL": "http://oathkeeper.secure.svc:4455",
      "NEXT_PUBLIC_API_GRAPHQL_ENDPOINT": "https://api.archpad.pro/graphql"
    }
  }' \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/frontend/portal"

# Внутренние URL хранятся в отдельных секретах:

# Hasura Internal URL
curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "HASURA_INTERNAL_URL": "http://hasura.platform.svc:8080/v1/graphql"
    }
  }' \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/hasura/endpoint"

# Ory Kratos Internal URL
curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "ORY_KRATOS_INTERNAL_URL": "http://kratos.secure.svc:4433"
    }
  }' \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/ory/kratos/endpoint"
```

---

## Логирование секретов

Все секреты логируются при запуске portal с маскированием (первые 3 и последние 3 символа видны, остальное заменено на `*`).

Пример вывода в логах:
```
==========================================
Portal Environment Variables (masked):
==========================================
# Portal Configuration
NEXT_PUBLIC_URL: htt****************pro/

# Ory Kratos (Authentication)
NEXT_PUBLIC_ORY_SDK_URL: htt****************pro/
ORY_KRATOS_INTERNAL_URL: htt****************4433

# Hasura GraphQL
NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT: htt****************ql/
HASURA_INTERNAL_URL: htt****************ql/
HASURA_GRAPHQL_ADMIN_SECRET: sec****************ret

# Tolgee (i18n)
NEXT_PUBLIC_TOLGEE_API_URL: htt****************pro/
NEXT_PUBLIC_TOLGEE_API_KEY: tgp****************ztg

# API Gateway (Oathkeeper)
API_GATEWAY_INTERNAL_URL: htt****************4455
NEXT_PUBLIC_API_GRAPHQL_ENDPOINT: htt****************ql/
==========================================
```
