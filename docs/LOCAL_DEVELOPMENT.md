# Локальная разработка с удаленными сервисами в Kubernetes

## Обзор

Этот документ описывает настройку локальной разработки Portal и Backend сервисов с использованием Ory (Kratos, Hydra), Hasura, Tolgee и других сервисов, развернутых в Kubernetes кластере.

## Преимущества

✅ Используете реальные сервисы из Kubernetes (Ory, Hasura, Tolgee)  
✅ Hot reload для Portal и Backend (Next.js и NestJS)  
✅ Не нужно поднимать локальные контейнеры для Ory  
✅ Работаете с реальными данными и конфигурацией  
✅ Автоматическая настройка через скрипты

## Требования

- Доступ к Kubernetes кластеру (`kubectl` настроен)
- `kubectl` установлен локально
- `pnpm` установлен (для запуска Portal/Backend)
- Переменные окружения настроены (см. ниже)

## Быстрый старт

### 1. Создание `.env.local`

Создайте файл `.env.local` в корне проекта:

```bash
# ============================================
# Ory Kratos (через port-forward)
# ============================================
NEXT_PUBLIC_ORY_SDK_URL=http://localhost:4433
ORY_KRATOS_PUBLIC_URL=http://localhost:4433
KRATOS_ADMIN_URL=http://localhost:4434

# ============================================
# Ory Hydra (через port-forward)
# ============================================
NEXT_PUBLIC_HYDRA_PUBLIC_URL=http://localhost:4444
HYDRA_ADMIN_URL=http://localhost:4445

# OAuth2 Client (должен быть создан в Hydra)
NEXT_PUBLIC_OAUTH_CLIENT_ID=archpad-portal
NEXT_PUBLIC_OAUTH_REDIRECT_URI=http://localhost:3000/oauth/callback

# ============================================
# Hasura (через port-forward)
# ============================================
NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT=http://localhost:8080/v1/graphql
HASURA_ENDPOINT=http://localhost:8080
HASURA_GRAPHQL_ADMIN_SECRET=your-hasura-admin-secret

# ============================================
# Tolgee (через port-forward, другой порт)
# ============================================
NEXT_PUBLIC_TOLGEE_API_URL=http://localhost:8081
NEXT_PUBLIC_TOLGEE_API_KEY=your-tolgee-api-key

# ============================================
# Portal
# ============================================
NEXT_PUBLIC_URL=http://localhost:3000

# ============================================
# Backend Services (для локальной разработки)
# ============================================
# Vault (для загрузки секретов в local development)
VAULT_ADDR=https://vault.archpad.pro
VAULT_TOKEN=your-vault-token

# PostgreSQL (локальный или через port-forward)
PG_HOST=localhost
PG_PORT=5432
PROJECT_DB=project_db
PROJECT_DB_USER=project_user
PROJECT_DB_PASSWORD=your-password
TENANT_DB=tenant_db
```

**Важно:** Файл `.env.local` должен быть в `.gitignore` и не коммититься в Git.

### 2. Получение секретов

#### HASURA_GRAPHQL_ADMIN_SECRET

Получите из Vault:

```bash
VAULT_ADDR="https://vault.archpad.pro"
VAULT_TOKEN="your-vault-token"

curl -H "X-Vault-Token: ${VAULT_TOKEN}" \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/hasura-secret" | \
  jq -r '.data.data.HASURA_GRAPHQL_ADMIN_SECRET'
```

#### NEXT_PUBLIC_TOLGEE_API_KEY

1. Запустите port-forward к Tolgee: `kubectl port-forward -n platform svc/tolgee 8081:8080`
2. Откройте http://localhost:8081
3. Войдите в Tolgee (используйте учетные данные из Vault)
4. Перейдите в Settings → API Keys
5. Создайте новый API ключ или используйте существующий

#### VAULT_TOKEN

Используйте токен для доступа к Vault. Для локальной разработки можно использовать:
- Root token (только для разработки!)
- Или создайте отдельный токен с правами на чтение секретов

#### PostgreSQL credentials

Получите из Vault:

```bash
curl -H "X-Vault-Token: ${VAULT_TOKEN}" \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/backend/common" | \
  jq -r '.data.data | {PROJECT_DB_USER, PROJECT_DB_PASSWORD}'

curl -H "X-Vault-Token: ${VAULT_TOKEN}" \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/backend/arch-repo-service" | \
  jq -r '.data.data.PROJECT_DB'
```

### 3. Запуск локальной разработки

#### Вариант A: Автоматический (рекомендуется)

Запустите скрипт, который автоматически настроит port-forward и запустит Portal:

```bash
./scripts/dev-local.sh
```

Этот скрипт:
- Запустит port-forward ко всем сервисам
- Запустит Portal в режиме разработки
- Поддержит hot reload

#### Вариант B: Ручной запуск

1. **В первом терминале - port-forward:**
   ```bash
   ./scripts/k8s-port-forward.sh
   ```

2. **Во втором терминале - Portal:**
   ```bash
   cd packages/portal
   pnpm dev
   ```

3. **В третьем терминале - Backend (опционально):**
   ```bash
   cd packages/backend
   pnpm start:dev:arch-repo
   ```

## Доступные сервисы

После запуска будут доступны:

- **Portal**: http://localhost:3000
- **Kratos Public**: http://localhost:4433
- **Kratos Admin**: http://localhost:4434
- **Hydra Public**: http://localhost:4444
- **Hydra Admin**: http://localhost:4445
- **Hasura**: http://localhost:8080
- **Tolgee**: http://localhost:8081
- **Mailpit**: http://localhost:8025

## Hot Reload

✅ **Portal (Next.js)** - автоматический hot reload  
✅ **Backend (NestJS)** - автоматический hot reload через `--watch`

## Настройка Ory для локальной разработки

Ory уже настроен для работы с локальной разработкой:

✅ **Kratos CORS** - `http://localhost:3000` добавлен в `allowed_origins`  
✅ **Kratos allowed_return_urls** - `http://localhost:3000/` добавлен  
✅ **Hydra CORS** - `http://localhost:3000` добавлен в `allowed_origins` (public и admin)  
✅ **Hydra OAuth Redirect URI** - `http://localhost:3000/oauth/callback` автоматически добавляется в OAuth клиент через `hydra-init-client` Job

### Проверка конфигурации Ory

#### Проверка Kratos CORS:

```bash
# Через port-forward
kubectl port-forward -n secure svc/kratos 4433:4433

# В другом терминале
curl -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS \
  http://localhost:4433/self-service/login/browser

# Должен вернуть заголовки:
# Access-Control-Allow-Origin: http://localhost:3000
# Access-Control-Allow-Methods: POST
```

#### Проверка Hydra CORS:

```bash
# Через port-forward
kubectl port-forward -n secure svc/hydra 4444:4444

# В другом терминале
curl -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -X OPTIONS \
  http://localhost:4444/oauth2/auth

# Должен вернуть заголовки:
# Access-Control-Allow-Origin: http://localhost:3000
```

#### Проверка OAuth клиента:

```bash
# Через port-forward к Hydra Admin
kubectl port-forward -n secure svc/hydra 4445:4445

# В другом терминале
curl http://localhost:4445/clients/archpad-portal | jq '.redirect_uris'

# Должен вернуть:
# [
#   "https://portal.archpad.pro/oauth/callback",
#   "http://localhost:3000/oauth/callback"
# ]
```

## Структура Kubernetes кластера

### Namespaces

- **`platform`** - основные сервисы приложения (Portal, Hasura, Tolgee, Backend сервисы)
- **`secure`** - сервисы безопасности (Kratos, Hydra, Oathkeeper)

### Сервисы и порты

| Сервис | Namespace | Локальный порт | Удаленный порт |
|--------|-----------|----------------|----------------|
| Kratos Public | `secure` | 4433 | 4433 |
| Kratos Admin | `secure` | 4434 | 4434 |
| Hydra Public | `secure` | 4444 | 4444 |
| Hydra Admin | `secure` | 4445 | 4445 |
| Hasura | `platform` | 8080 | 8080 |
| Tolgee | `platform` | 8081 | 8080 |
| Mailpit | `platform` | 8025 | 8025 |

## Решение проблем

### Port уже занят

Если порт уже занят:

1. Остановите процесс, использующий порт:
   ```bash
   lsof -ti:8080 | xargs kill -9
   ```

2. Или измените локальный порт в скрипте `k8s-port-forward.sh`

### Сервисы не отвечают

1. Проверьте, что port-forward работает:
   ```bash
   curl http://localhost:4433/health/ready  # Kratos
   curl http://localhost:4444/.well-known/openid-configuration  # Hydra
   ```

2. Проверьте, что сервисы запущены в Kubernetes:
   ```bash
   kubectl get pods -n secure -l app=kratos
   kubectl get pods -n secure -l app=hydra
   kubectl get pods -n platform -l app=hasura
   ```

3. Проверьте логи подов:
   ```bash
   kubectl logs -n secure -l app=kratos --tail=50
   kubectl logs -n secure -l app=hydra --tail=50
   ```

### CORS ошибки

Если видите CORS ошибки в браузере:

1. Проверьте, что изменения применены в Kubernetes:
   ```bash
   kubectl get configmap kratos -n secure -o yaml | grep localhost
   kubectl get configmap hydra -n secure -o yaml | grep localhost
   ```

2. Перезапустите поды:
   ```bash
   kubectl rollout restart deployment/kratos -n secure
   kubectl rollout restart deployment/hydra -n secure
   ```

3. Убедитесь, что используете `http://localhost:3000` (не `127.0.0.1`)

### OAuth redirect не работает

Если OAuth redirect не работает:

1. Проверьте, что OAuth клиент обновлен:
   ```bash
   kubectl logs -n secure -l app=hydra-init-client --tail=50
   ```

2. Вручную обновите клиент через Hydra Admin API:
   ```bash
   kubectl port-forward -n secure svc/hydra 4445:4445
   
   curl -X PUT http://localhost:4445/clients/archpad-portal \
     -H "Content-Type: application/json" \
     -d '{
       "client_id": "archpad-portal",
       "redirect_uris": [
         "https://portal.archpad.pro/oauth/callback",
         "http://localhost:3000/oauth/callback"
       ],
       "grant_types": ["authorization_code", "refresh_token"],
       "response_types": ["code"],
       "token_endpoint_auth_method": "none"
     }'
   ```

### Cookies не работают

Для локальной разработки cookies должны работать, но убедитесь, что:
- Используете `http://localhost:3000` (не `127.0.0.1`)
- Браузер разрешает cookies для localhost
- В конфигурации Kratos `cookies.domain: .archpad.pro` не блокирует localhost (браузеры обрабатывают localhost особым образом)

Если cookies не работают, можно временно изменить конфигурацию Kratos для локальной разработки (но это не рекомендуется для production).

### Проверка доступности сервисов

После создания `.env.local` и запуска port-forward, проверьте доступность сервисов:

```bash
# Kratos
curl http://localhost:4433/health/ready

# Hydra
curl http://localhost:4444/.well-known/openid-configuration

# Hasura
curl -H "x-hasura-admin-secret: ${HASURA_GRAPHQL_ADMIN_SECRET}" \
  http://localhost:8080/v1/graphql

# Tolgee
curl http://localhost:8081/actuator/health
```

## Альтернатива: Использование внешних URL

Если у вас есть внешние URL для сервисов (через Ingress), можно использовать их напрямую:

```bash
# .env.local
NEXT_PUBLIC_ORY_SDK_URL=https://auth.archpad.pro
NEXT_PUBLIC_HYDRA_PUBLIC_URL=https://authz.archpad.pro
NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT=https://apim.archpad.pro/v1/graphql
NEXT_PUBLIC_TOLGEE_API_URL=https://i18n.archpad.pro
```

**Преимущества:**
- Не нужно запускать port-forward
- Работает из любой сети

**Недостатки:**
- Требует доступ к интернету
- Может быть медленнее
- Нужны валидные TLS сертификаты

## Рекомендации

1. **Используйте port-forward для разработки** - быстрее и надежнее
2. **Настройте автоматический запуск** через скрипт `dev-local.sh`
3. **Держите `.env.local` в `.gitignore`** - не коммитьте секреты
4. **Используйте разные порты** для Hasura и Tolgee, если они оба нужны одновременно
5. **Проверяйте логи** при возникновении проблем
6. **Используйте внешние URL** только если port-forward недоступен

## Остановка

Нажмите `Ctrl+C` в терминале, где запущен скрипт. Все процессы будут корректно остановлены, включая port-forward.

Для ручного запуска остановите каждый процесс отдельно или используйте:

```bash
# Остановка всех port-forward
pkill -f "kubectl port-forward"
```