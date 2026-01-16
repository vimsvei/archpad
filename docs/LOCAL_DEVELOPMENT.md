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

Мы используем два файла:
- `packages/portal/.env.local`
- `packages/backend/.env.local`

Сгенерируйте/обновите их:

```bash
./scripts/update-env-portal.sh
./scripts/update-env-backend.sh
```

Оба файла должны быть в `.gitignore` и **не коммититься**.

### 2. Получение секретов

Заполните “секретные” переменные в `.env.local` из Vault.

#### Portal

- **OAuth client (Hydra)**:
  - Vault path: `kv/data/archpad/demo/ory/hydra/oauth`
  - keys: `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET`, `OAUTH_SCOPE`
  - локально: положите `OAUTH_CLIENT_SECRET` в `packages/portal/.env.local`

- **Hasura admin secret (опционально, если нужен server-side bypass)**:
  - Vault path: `kv/data/archpad/demo/hasura/secret`
  - key: `HASURA_GRAPHQL_ADMIN_SECRET`

- **Tolgee API key**:
  - генерируется в UI Tolgee, хранить в `NEXT_PUBLIC_TOLGEE_API_KEY`

#### Backend (если запускаете локально)

- Vault: `VAULT_ADDR=https://vault.archpad.pro`, `VAULT_TOKEN=<token>`
- PostgreSQL креды: см. `kv/data/archpad/demo/backend/*`

#### VAULT_TOKEN

Используйте токен для доступа к Vault. Для локальной разработки можно использовать:
- Root token (только для разработки!)
- Или создайте отдельный токен с правами на чтение секретов

### 3. Запуск локальной разработки

#### Вариант A: Автоматический (рекомендуется)

Запустите скрипт, который (если нужно) поднимет port-forward и будет держать его активным:

```bash
./scripts/dev-local.sh
```

Этот скрипт:
- Запустит `./scripts/k8s-port-forward.sh`
- Проверит наличие `packages/portal/.env.local` (симлинки не используются)
- Будет держать port-forward активным до `Ctrl+C`

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
- **Kratos**: https://auth.archpad.pro (рекомендуется)
- **Hydra**: https://authz.archpad.pro (рекомендуется)
- **Hasura GraphQL**: https://apim.archpad.pro/v1/graphql (рекомендуется)
- **API Gateway**: https://api.archpad.pro
- **Tolgee**: https://i18n.archpad.pro
- **Mailpit**: http://localhost:8025

## Hot Reload

✅ **Portal (Next.js)** - автоматический hot reload  
✅ **Backend (NestJS)** - автоматический hot reload через `--watch`

## Настройка Ory для локальной разработки

Ory (Kratos/Hydra) настроен так, чтобы Portal на `http://localhost:3000` мог проходить OAuth flow через публичные URL.

### Важно про OAuth redirect на `portal.archpad.pro`

Hydra в нашем окружении использует **login/consent endpoints Portal** (роуты `/hydra/login` и `/hydra/consent`) и редиректит браузер на домен `portal.archpad.pro`.

Если вы разрабатываете на `http://localhost:3000`, то после логина вы можете увидеть редирект на:
- `https://portal.archpad.pro/hydra/login?...`

Чтобы OAuth flow полностью работал **в локальной dev-версии**, нужно, чтобы ваша локальная Portal была доступна по `https://portal.archpad.pro` (локально).

Минимальный способ (macOS):

- Добавить в `/etc/hosts`:
  - `127.0.0.1 portal.archpad.pro`
- Поднять локальный HTTPS reverse-proxy на `portal.archpad.pro` → `http://localhost:3000`
  - например через Caddy (самый простой вариант на macOS)

После этого выставьте в `packages/portal/.env.local`:
- `NEXT_PUBLIC_URL=https://portal.archpad.pro`
- `NEXT_PUBLIC_OAUTH_REDIRECT_URI=https://portal.archpad.pro/oauth/callback`

#### Caddy (локально, macOS)

1) Установить Caddy:

```bash
brew install caddy
```

2) Один раз добавить локальный CA Caddy в доверенные (для `tls internal`):

```bash
pnpm run caddy:trust
```

3) Запустить Caddy (нужно `sudo`, потому что слушает `:443`):

```bash
pnpm run caddy:start
```

Остановить:

```bash
pnpm run caddy:stop
```

По умолчанию Caddy конфиг лежит в `infra/caddy/Caddyfile` (в репозитории).

#### Важно: Hydra Admin для локального OAuth

Portal обрабатывает `GET /hydra/login` и `GET /hydra/consent` и для этого должен обращаться в **Hydra Admin API**.
Снаружи он обычно недоступен, поэтому в локальной разработке нужен **port-forward**:

- `HYDRA_ADMIN_URL=http://localhost:24445`

Если видишь ошибку вида `getaddrinfo ENOTFOUND hydra.secure.svc` — это как раз означает, что Portal пытается сходить во внутренний адрес кластера вместо `localhost`.

### Проверка конфигурации Ory

#### Проверка Kratos CORS:

```bash
# Проверка публичного Kratos
curl -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -X OPTIONS \
  https://auth.archpad.pro/self-service/login/browser

# Должен вернуть заголовки:
# Access-Control-Allow-Origin: http://localhost:3000
# Access-Control-Allow-Methods: POST
```

#### Проверка Hydra CORS:

```bash
# Проверка публичного Hydra
curl -H "Origin: http://localhost:3000" \
  -H "Access-Control-Request-Method: POST" \
  -X OPTIONS \
  https://authz.archpad.pro/oauth2/auth

# Должен вернуть заголовки:
# Access-Control-Allow-Origin: http://localhost:3000
```

#### Проверка OAuth клиента:

```bash
# Hydra Admin API доступен только из кластера.
# Для проверки включите port-forward (на любой свободный локальный порт):
kubectl -n secure port-forward svc/hydra 24445:4445

# В другом терминале:
curl -fsS http://127.0.0.1:24445/clients/archpad-portal | python3 -c \
  'import json,sys; j=json.load(sys.stdin); print(j["token_endpoint_auth_method"], j.get("scope")); print(j.get("redirect_uris"))'

# Должно быть:
# - token_endpoint_auth_method: client_secret_basic
# - scope: openid offline_access
```

## Структура Kubernetes кластера

### Namespaces

- **`platform`** - основные сервисы приложения (Portal, Hasura, Tolgee, Backend сервисы)
- **`secure`** - сервисы безопасности (Kratos, Hydra, Oathkeeper)

### Внутренние адреса (in-cluster)

Полезно, если Portal запущен **внутри Kubernetes** (или вы дебажите через `kubectl exec`):

- **Kratos Public**: `http://kratos.secure.svc:4433`
- **Hydra Admin**: `http://hydra.secure.svc:4445`
- **Oathkeeper (API Gateway internal)**: `http://oathkeeper.secure.svc:4455`
- **Hasura**: `http://hasura.platform.svc:8080` (GraphQL: `/v1/graphql`)

### Сервисы и порты

| Сервис | Namespace | Локальный порт | Удаленный порт | Публичный URL |
|--------|-----------|----------------|----------------|---------------|
| Kratos Public | `secure` | 4433 | 4433 | - |
| Kratos Admin | `secure` | 4434 | 4434 | - |
| Hydra Public | `secure` | 4444 | 4444 | - |
| Hydra Admin | `secure` | 4445 | 4445 | - |
| Hasura | `platform` | 8080 | 8080 | - |
| Tolgee | `platform` | - | - | https://i18n.archpad.pro |
| Vault | `secure` | - | - | https://vault.archpad.pro |
| Mailpit | `platform` | 8025 | 8025 | - |

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
   curl -fsS https://apim.archpad.pro/v1/graphql -o /dev/null
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
   kubectl -n secure logs job/hydra-init-client --tail=200 || true
   ```

2. Проверьте, что в `packages/portal/.env.local` установлен `OAUTH_CLIENT_SECRET` из Vault (`kv/data/archpad/demo/ory/hydra/oauth`).

### Cookies не работают

Для локальной разработки cookies должны работать, но убедитесь, что:
- Используете `http://localhost:3000` (не `127.0.0.1`)
- Браузер разрешает cookies для localhost
- В конфигурации Kratos `cookies.domain: .archpad.pro` не блокирует localhost (браузеры обрабатывают localhost особым образом)

Если cookies не работают, можно временно изменить конфигурацию Kratos для локальной разработки (но это не рекомендуется для production).

### Проверка доступности сервисов

После создания `.env.local` и запуска port-forward, проверьте доступность сервисов:

```bash
# Hasura
curl -H "x-hasura-admin-secret: ${HASURA_GRAPHQL_ADMIN_SECRET}" \
  https://apim.archpad.pro/v1/graphql

# Tolgee (публичный URL)
curl https://i18n.archpad.pro/actuator/health
```

## Использование публичных URL

Некоторые сервисы доступны через публичные URL и не требуют port-forward:

### Ory, Tolgee и Vault

**Рекомендуется использовать публичные URL:**
- **Kratos**: `https://auth.archpad.pro`
- **Hydra**: `https://authz.archpad.pro`
- **Tolgee**: `https://i18n.archpad.pro` (уже настроено по умолчанию)
- **Vault**: `https://vault.archpad.pro` (уже настроено по умолчанию)

**Преимущества:**
- Не нужно запускать port-forward для этих сервисов
- Работает из любой сети
- Упрощает настройку локальной разработки

**Недостатки:**
- Требует доступ к интернету
- Может быть немного медленнее (но обычно незаметно)

### Альтернатива: port-forward для Ory

Если публичные URL недоступны, можно включить port-forward для Ory (не рекомендуется из-за cookie/redirect проблем, но иногда полезно для отладки):

```bash
# Запуск port-forward c Ory
FORWARD_ORY=true ./scripts/k8s-port-forward.sh
```

И выставить в `.env.local` localhost URL для Ory (см. пример в начале документа).

## Рекомендации

1. **Используйте публичные URL по умолчанию** (Ory/Hasura/Tolgee/Vault)
2. **Настройте автоматический запуск** через скрипт `dev-local.sh`
3. **Держите `.env.local` в `.gitignore`** - не коммитьте секреты
4. **Включайте port-forward только при необходимости** (Mailpit / debug / доступ к admin API)
5. **Проверяйте логи** при возникновении проблем

## Остановка

Нажмите `Ctrl+C` в терминале, где запущен скрипт. Все процессы будут корректно остановлены, включая port-forward.

Для ручного запуска остановите каждый процесс отдельно или используйте:

```bash
# Остановка всех port-forward
pkill -f "kubectl port-forward"
```