# Отладка регистрации (POST /api/auth/register 500)

## Цепочка запросов

1. **Браузер** → `POST /api/auth/register` (Portal, localhost или portal.archpad.pro)
2. **Portal** (Next.js route) → `POST https://api.archpad.pro/auth/register` (auth-service через Oathkeeper)
3. **Oathkeeper** (api.archpad.pro) → `http://auth-service.platform:3000/auth/register` (полный путь пробрасывается без strip_path)
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

- `AUTH_SERVICE_PUBLIC_URL=https://api.archpad.pro/auth` — для запросов к auth-service

При локальной разработке запрос идёт с сервера Next.js на `api.archpad.pro` по интернету.
