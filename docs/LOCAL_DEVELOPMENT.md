# Локальная разработка с удаленными сервисами в Kubernetes

## Обзор

Этот документ описывает настройку локальной разработки Portal и Backend сервисов с использованием Keycloak, Hasura, Tolgee и других сервисов, развернутых в Kubernetes кластере.

## Преимущества

✅ Используете реальные сервисы из Kubernetes (Keycloak, Hasura, Tolgee)  
✅ Hot reload для Portal и Backend (Next.js и NestJS)  
✅ Не нужно поднимать локальные контейнеры для IDM  
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

- **Keycloak (Portal client)**:
  - `NEXT_PUBLIC_KEYCLOAK_PUBLIC_URL=https://id.archpad.pro`
  - `KEYCLOAK_REALM=archpad`
  - `NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=<OIDC_CLIENT_ID из kv/data/archpad/demo/oidc/portal>`
  - `AUTH_SERVICE_PUBLIC_URL=http://localhost:3001` (если auth-service запускаете локально)

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
- **Keycloak**: https://id.archpad.pro (рекомендуется)
- **Hasura GraphQL**: https://apim.archpad.pro/v1/graphql (рекомендуется)
- **API Gateway**: https://api.archpad.pro
- **Tolgee**: https://i18n.archpad.pro
- **Mailpit**: http://localhost:8025

## Hot Reload

✅ **Portal (Next.js)** - автоматический hot reload  
✅ **Backend (NestJS)** - автоматический hot reload через `--watch`

## Настройка Keycloak для локальной разработки

Мы полностью ушли от Ory (Kratos/Hydra). Теперь Portal использует только Keycloak:
- логин/логаут/refresh — через серверные эндпоинты Portal (`/api/auth/*`)
- токены хранятся в **httpOnly cookies**
- запросы к Hasura/REST идут через ваш API Gateway (Oathkeeper)

### Минимальный набор env для Portal (локально)

В `packages/portal/.env.local` (или через ваш `render-env.sh`) нужны:
- `NEXT_PUBLIC_URL=http://localhost:3000`
- `NEXT_PUBLIC_KEYCLOAK_PUBLIC_URL=https://id.archpad.pro`
- `KEYCLOAK_REALM=archpad`
- `NEXT_PUBLIC_KEYCLOAK_CLIENT_ID=<OIDC_CLIENT_ID>`
- `AUTH_SERVICE_PUBLIC_URL=http://localhost:3001`

Portal больше не ходит в Keycloak Admin API напрямую — self-service операции идут через `auth-service`.

### Если Keycloak Admin API недоступен снаружи

Тогда используйте port-forward на сервис Keycloak и направьте серверные вызовы Portal внутрь кластера:

```bash
kubectl -n secure port-forward svc/keycloak 28080:8080
```

И выставьте:
- `KEYCLOAK_INTERNAL_URL=http://localhost:28080`

Важно: в dev-режиме Portal теперь **предпочитает `KEYCLOAK_INTERNAL_URL`**, если он задан.

## Структура Kubernetes кластера

### Namespaces

- **`platform`** - основные сервисы приложения (Portal, Hasura, Tolgee, Backend сервисы)
- **`secure`** - сервисы безопасности (Keycloak, Oathkeeper)

### Внутренние адреса (in-cluster)

Полезно, если Portal запущен **внутри Kubernetes** (или вы дебажите через `kubectl exec`):

- **Keycloak**: `http://keycloak.secure.svc:8080`
- **Oathkeeper (API Gateway internal)**: `http://oathkeeper.secure.svc:4455`
- **Hasura**: `http://hasura.platform.svc:8080` (GraphQL: `/v1/graphql`)

### Сервисы и порты

| Сервис | Namespace | Локальный порт | Удаленный порт | Публичный URL |
|--------|-----------|----------------|----------------|---------------|
| Keycloak | `secure` | 8080 | 8080 | https://id.archpad.pro |
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
   kubectl get pods -n secure -l app=keycloak
   kubectl get pods -n platform -l app=hasura
   ```

3. Проверьте логи подов:
   ```bash
   kubectl logs -n secure -l app=keycloak --tail=50
   ```

### CORS ошибки

Если видите CORS ошибки в браузере:

1. Проверьте, что изменения применены в Kubernetes:
   ```bash
   kubectl get configmap keycloak -n secure -o yaml | grep localhost
   ```

2. Перезапустите поды:
   ```bash
   kubectl rollout restart deployment/keycloak -n secure
   ```

3. Убедитесь, что используете `http://localhost:3000` (не `127.0.0.1`)

### Keycloak client secret для portal-admin

Если регистрация/восстановление/верификация не работают:

1. Проверьте, что в `packages/portal/.env.local` установлен `KEYCLOAK_SERVICE_CLIENT_SECRET`.
2. Проверьте, что у service-account клиента `portal-admin` есть роли `realm-management: manage-users, view-users`.

### Cookies не работают

Для локальной разработки cookies должны работать, но убедитесь, что:
- Используете `http://localhost:3000` (не `127.0.0.1`)
- Браузер разрешает cookies для localhost

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

### Keycloak, Tolgee и Vault

**Рекомендуется использовать публичные URL:**
- **Keycloak**: `https://id.archpad.pro`
- **Tolgee**: `https://i18n.archpad.pro` (уже настроено по умолчанию)
- **Vault**: `https://vault.archpad.pro` (уже настроено по умолчанию)

**Преимущества:**
- Не нужно запускать port-forward для этих сервисов
- Работает из любой сети
- Упрощает настройку локальной разработки

**Недостатки:**
- Требует доступ к интернету
- Может быть немного медленнее (но обычно незаметно)

### Альтернатива: port-forward для Keycloak (Admin API)

Если публичный `https://id.archpad.pro` недоступен или `/admin` закрыт, можно включить port-forward для Keycloak:

```bash
kubectl -n secure port-forward svc/keycloak 28080:8080
```

И выставить в `.env.local`:
- `KEYCLOAK_INTERNAL_URL=http://localhost:28080`

## Рекомендации

1. **Используйте публичные URL по умолчанию** (Keycloak/Hasura/Tolgee/Vault)
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