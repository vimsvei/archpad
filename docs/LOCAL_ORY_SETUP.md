# Настройка Ory для локальной разработки

## Что было сделано

✅ **Kratos CORS** - добавлен `http://localhost:3000` в `allowed_origins`  
✅ **Kratos allowed_return_urls** - добавлен `http://localhost:3000/`  
✅ **Hydra CORS** - добавлен `http://localhost:3000` в `allowed_origins` (public и admin)  
✅ **Hydra OAuth Redirect URI** - добавлен `http://localhost:3000/oauth/callback` в OAuth клиент  

## Применение изменений

### 1. Синхронизация в ArgoCD

После коммита изменений, ArgoCD автоматически синхронизирует обновления. Или вручную:

```bash
# Синхронизировать Kratos
kubectl patch application kratos -n argocd --type merge -p '{"operation":{"initiatedBy":{"username":"admin"},"sync":{"revision":"HEAD"}}}'

# Синхронизировать Hydra
kubectl patch application hydra -n argocd --type merge -p '{"operation":{"initiatedBy":{"username":"admin"},"sync":{"revision":"HEAD"}}}'
```

### 2. Пересоздание OAuth клиента в Hydra

После обновления конфигурации, OAuth клиент будет автоматически обновлен при следующем запуске `hydra-init-client` Job. Или вручную:

```bash
# Удалить старый Job (если нужно)
kubectl delete job hydra-init-client -n secure

# Job пересоздастся автоматически через ArgoCD
# Или запустить вручную:
kubectl create job --from=cronjob/hydra-init-client hydra-init-client-manual -n secure
```

### 3. Проверка конфигурации

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

## Создание .env.local

Создайте файл `.env.local` в корне проекта:

```bash
# Ory Kratos
NEXT_PUBLIC_ORY_SDK_URL=http://localhost:4433
ORY_KRATOS_PUBLIC_URL=http://localhost:4433

# Ory Hydra
NEXT_PUBLIC_HYDRA_PUBLIC_URL=http://localhost:4444
NEXT_PUBLIC_OAUTH_CLIENT_ID=archpad-portal
NEXT_PUBLIC_OAUTH_REDIRECT_URI=http://localhost:3000/oauth/callback

# Hasura
NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT=http://localhost:8080/v1/graphql
HASURA_ENDPOINT=http://localhost:8080
HASURA_GRAPHQL_ADMIN_SECRET=your-secret

# Tolgee
NEXT_PUBLIC_TOLGEE_API_URL=http://localhost:8081
NEXT_PUBLIC_TOLGEE_API_KEY=your-key

# Portal
NEXT_PUBLIC_URL=http://localhost:3000
```

Подробнее: [LOCAL_ENV_SETUP.md](./LOCAL_ENV_SETUP.md)

## Запуск локальной разработки

1. **Запустите port-forward:**
   ```bash
   ./scripts/k8s-port-forward.sh
   ```

2. **В другом терминале запустите Portal:**
   ```bash
   cd packages/portal
   pnpm dev
   ```

3. **Откройте:** http://localhost:3000

## Решение проблем

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
- В конфигурации Kratos `cookies.domain` не блокирует localhost (для localhost domain должен быть пустым или не установлен)

**Примечание:** В текущей конфигурации `cookies.domain: .archpad.pro` может блокировать cookies для localhost. Для локальной разработки это может быть проблемой, но обычно работает, так как браузеры обрабатывают localhost особым образом.

Если cookies не работают, можно временно изменить конфигурацию Kratos для локальной разработки (но это не рекомендуется для production).
