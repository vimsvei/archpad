# Отладка регистрации (POST /api/auth/register 500)

## Цепочка запросов

Единая схема REST: `api.archpad.pro/rest/<service>/<route>`.

1. **Браузер** → `POST /api/auth/register` (Portal)
2. **Portal** (Next.js route) → `POST https://api.archpad.pro/rest/auth-service/auth/register` (auth-service через Oathkeeper)
3. **Oathkeeper**: strip `/rest/auth-service` → remainder `/auth/register` → `http://auth-service.platform:3000/auth/register`
4. **auth-service** → Keycloak (создание пользователя) + tenant-service (ensureUserProfile)

## 401 на /api/auth/me — это нормально

При заходе на страницу sign-up AuthProvider вызывает `/api/auth/me`. Пользователь не авторизован → 401 ожидаем.

## kubectl: проверка логов

Используйте `KUBECONFIG` из `infra/timeweb/k8s_config/twc-archpad-k8s-cluster-config.yaml`:

```bash
export KUBECONFIG=$(pwd)/infra/timeweb/k8s_config/twc-archpad-k8s-cluster-config.yaml
```

### 1. Логи auth-service (последние 100 строк)

```bash
kubectl logs -n platform -l app=auth-service --tail=100 -f
```

Повторите регистрацию и смотрите, появляются ли логи. Если логов нет — запрос не доходит до auth-service.

### 2. Логи Oathkeeper (API Gateway)

```bash
kubectl logs -n secure -l app=oathkeeper --tail=100 -f
```

Проверьте, проходят ли запросы к `/auth/register`.

### 3. Логи Portal (если развёрнут в кластере)

```bash
kubectl logs -n platform -l app=portal --tail=100 -f
```

Там будет `[register] authServiceRegister failed:` с текстом ошибки.

### 4. Состояние подов

```bash
kubectl get pods -n platform -l app=auth-service
kubectl get pods -n secure -l app=oathkeeper
```

### 5. Тест auth-service из кластера

```bash
# Порт-форвард auth-service
kubectl port-forward -n platform svc/auth-service 3001:3000 &

# Регистрация напрямую (в обход Oathkeeper)
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","firstName":"Test","lastName":"User"}'

kill %1 2>/dev/null
```

Если так работает, а через api.archpad.pro — нет, проблема в Oathkeeper или маршрутизации.

## 403 Forbidden на /auth/session/access (GraphQL после логина)

При локальной разработке (Portal → api.archpad.pro → auth-service) запросы к `/auth/session/access` могут возвращать 403 Forbidden, из-за чего GraphQL падает и происходит редирект на логин.

**Решение:** обойти Oathkeeper через port-forward auth-service:

1. Запустите port-forward: `./scripts/k8s-port-forward.sh` (auth-service форвардится по умолчанию на порт 3001).
2. Добавьте в `packages/portal/.env.local`:
   ```
   AUTH_SERVICE_INTERNAL_URL=http://localhost:3001
   ```
3. Перезапустите Portal.

Либо запустите `./scripts/dev-local.sh` — он поднимает port-forward; затем добавьте `AUTH_SERVICE_INTERNAL_URL=http://localhost:3001` в `.env.local`.

## Локальная разработка: смотреть логи Next.js

При `pnpm dev` в `packages/portal` смотрите вывод терминала. После добавления `console.error` там будет:

```
[register] authServiceRegister failed: <message> <stack>
```

Типичные сообщения:

- `auth_service_failed (404)` — Oathkeeper или auth-service возвращает 404 (путь)
- `auth_service_failed (500)` — ошибка внутри auth-service (Keycloak, tenant-service)
- `fetch failed`, `ECONNREFUSED` — недоступен api.archpad.pro или auth-service

## Проверка переменных окружения Portal

В `packages/portal/.env.local`:

- `AUTH_SERVICE_PUBLIC_URL=https://api.archpad.pro/rest/auth-service` — для запросов к auth-service через Oathkeeper
- Локальный auth-service: `AUTH_SERVICE_PUBLIC_URL=http://localhost:3001`

## "Invalid user credentials" при логине после регистрации

Типичные причины:

1. **Direct Access Grants отключён** — OIDC-клиент (archpad-portal и/или api) в Keycloak должен иметь включённую опцию "Direct access grants" (Resource Owner Password Credentials Grant). Keycloak Admin → Clients → выбрать клиент → Settings → Capability config.

2. **Required actions блокируют логин** — если после регистрации вызывается `sendExecuteActionsEmail` с `VERIFY_EMAIL`, Keycloak может добавить required action и не пускать по ROPC до верификации. Проверить пользователя в Keycloak Admin → Users → Required actions.

3. **Username = email** — при логине передаётся `email` как username; в Keycloak пользователь создаётся с `username: email`. Убедиться, что в форме логина передаётся тот же email.

## "Account is not fully set up" при логине

После регистрации (при `REGISTER_SEND_VERIFY_EMAIL=true`) auth-service добавляет required action `VERIFY_EMAIL` — пользователь должен перейти по ссылке из письма, иначе логин блокируется.

**Верификация через Portal:** письмо отправляется auth-service (через nodemailer + SMTP из keycloak/smtp). Ссылка ведёт на **https://portal.archpad.pro/verify-email?token=...** — страница портала, а не Keycloak или Kratos.

**Варианты:**

1. **Перейти по ссылке из письма** — если SMTP настроен (keycloak/smtp в Vault), письмо приходит. Ссылка ведёт на `portal/verify-email`; после подтверждения — редирект на sign-in.

2. **Разрешить вход без верификации** — в auth-service задать `REGISTER_SEND_VERIFY_EMAIL=false`. Тогда письмо не отправляется и пользователь может сразу войти. Подходит для dev/demo.

3. **Сбросить required actions в Keycloak** — для уже созданного пользователя: Keycloak Admin → Users → пользователь → вкладка Details → Required user actions → удалить VERIFY_EMAIL.
