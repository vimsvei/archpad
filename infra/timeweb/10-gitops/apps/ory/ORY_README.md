# Развертывание Ory компонентов (Kratos, Hydra, Oathkeeper)

Этот документ описывает развертывание Ory компонентов в Kubernetes через ArgoCD с использованием секретов из Vault.

## Компоненты

- **Kratos** (`kratos.archpad.pro`) - Identity Management
- **Hydra** (`hydra.archpad.pro`) - OAuth2/OIDC Provider
- **Oathkeeper** (`api.archpad.pro`) - API Gateway / Authorization Proxy

## Требования

1. Vault развернут и доступен через `vault.archpad.pro`
2. Vault Agent Injector установлен в кластере
3. PostgreSQL доступен (для Kratos и Hydra)
4. TLS сертификат `wildcard-archpad-pro-tls` должен быть скопирован в namespace `secure`

## Настройка Vault

### 1. Создание секретов в Vault

Секреты должны быть созданы в следующих путях Vault KV v2:

- `/kv/data/archpad/demo/ory/kratos` - секреты для Kratos
- `/kv/data/archpad/demo/ory/hydra` - секреты для Hydra
- `/kv/data/archpad/demo/ory/oauthkeeper` - секреты для Oathkeeper

**Важно:** Пользователь указал путь `/v1/kv/data/archpad/demo/ory/oauthkeeper` - возможно опечатка, но в коде используется `oauthkeeper` для совместимости. Если путь должен быть `oathkeeper`, нужно изменить в `oathkeeper.deployment.yaml`.

### 2. Секреты для Kratos (`/kv/data/archpad/demo/ory/kratos`)

```json
{
  "DSN": "postgres://kratos_user:password@postgres:5432/kratos?sslmode=disable&max_conns=20&max_idle_conns=4",
  "KRATOS_SECRET": "ReMUeeq8tyEmmAHFBUiKtzkEmX9aMZr7",
  "SMTP_CONNECTION_URI": "smtp://mailpit:1025/?disable_starttls=true",
  "SMTP_FROM_ADDRESS": "no-reply@archpad.local"
}
```

**Переменные:**
- `DSN` - строка подключения к PostgreSQL для Kratos
- `KRATOS_SECRET` - секретный ключ для подписи cookies и токенов (должен быть стабильным)
- `SMTP_CONNECTION_URI` - URI подключения к SMTP серверу
- `SMTP_FROM_ADDRESS` - адрес отправителя для email

### 3. Секреты для Hydra (`/kv/data/archpad/demo/ory/hydra`)

```json
{
  "DSN": "postgres://hydra_user:password@postgres:5432/hydra?sslmode=disable&max_conns=20&max_idle_conns=4",
  "SECRETS_SYSTEM": "nApRkoCIUm7lLYvGCvAmT8jgnqk0LhDAXlBaWVIngEL"
}
```

**Переменные:**
- `DSN` - строка подключения к PostgreSQL для Hydra
- `SECRETS_SYSTEM` - системный секрет для шифрования (должен быть стабильным при использовании персистентной БД)

### 4. Секреты для Oathkeeper (`/kv/data/archpad/demo/ory/oauthkeeper`)

```json
{
  "ORY_CLIENT_ID": "archpad-oathkeeper",
  "ORY_CLIENT_SECRET": "4oG5JkhLBhSL1L41VimM36bc70YNOerv"
}
```

**Переменные:**
- `ORY_CLIENT_ID` - ID OAuth2 клиента для Oathkeeper (используется для introspection)
- `ORY_CLIENT_SECRET` - секрет OAuth2 клиента для Oathkeeper

**Важно:** Эти же credentials будут использованы при создании OAuth2 клиента в Hydra через Job `hydra-init-client`.

### 5. Настройка Vault Kubernetes Auth

Для работы Vault Agent Injector нужно настроить Kubernetes Auth Role в Vault:

```bash
# Подключитесь к Vault
kubectl exec -n vault vault-0 -- vault auth enable kubernetes

# Настройте Kubernetes Auth (замените значения на ваши)
kubectl exec -n vault vault-0 -- vault write auth/kubernetes/config \
  kubernetes_host="https://kubernetes.default.svc" \
  kubernetes_ca_cert=@/var/run/secrets/kubernetes.io/serviceaccount/ca.crt

# Создайте роль для ServiceAccount'ов в namespace secure
kubectl exec -n vault vault-0 -- vault write auth/kubernetes/role/secure \
  bound_service_account_names=kratos,hydra,oathkeeper \
  bound_service_account_namespaces=secure \
  policies=archpad \
  ttl=1h
```

**Важно:** Убедитесь, что политика `archpad` существует в Vault и позволяет читать секреты:
- `kv/data/archpad/demo/ory/kratos`
- `kv/data/archpad/demo/ory/hydra`
- `kv/data/archpad/demo/ory/oauthkeeper`

## Копирование TLS Secret

TLS secret для wildcard сертификата должен быть скопирован в namespace `secure`:

```bash
kubectl get secret wildcard-archpad-pro-tls -n argocd -o yaml | \
  sed 's/namespace: argocd/namespace: secure/' | \
  sed '/resourceVersion:/d' | \
  sed '/uid:/d' | \
  sed '/creationTimestamp:/d' | \
  kubectl apply -f -
```

## Развертывание

После настройки Vault и копирования TLS secret, ArgoCD автоматически развернет компоненты:

1. **ServiceAccounts** (wave 45) - создаются ServiceAccount'ы для каждого компонента
2. **ConfigMaps** (wave 50) - создаются конфигурационные файлы
3. **Migration Jobs** (wave 55, PreSync hooks) - выполняются миграции БД для Kratos и Hydra
4. **Deployments и Services** (wave 60) - запускаются приложения
5. **Init Clients Job** (wave 65, PostSync hook) - создаются OAuth2 клиенты в Hydra
6. **Middlewares** (wave 70) - настраиваются Traefik middlewares
7. **IngressRoutes** (wave 75) - настраивается доступ через Traefik

## Проверка развертывания

### Проверка Pods

```bash
kubectl get pods -n secure
```

Ожидаемый вывод:
- `kratos-xxx` - Running
- `hydra-xxx` - Running
- `oathkeeper-xxx` - Running

### Проверка миграций

```bash
# Проверка миграций Kratos
kubectl logs -n secure job/kratos-migrate

# Проверка миграций Hydra
kubectl logs -n secure job/hydra-migrate
```

### Проверка инициализации OAuth2 клиентов

```bash
kubectl logs -n secure job/hydra-init-client
```

### Проверка доступа

- `https://kratos.archpad.pro` - Kratos UI
- `https://hydra.archpad.pro` - Hydra UI (если включен)
- `https://api.archpad.pro` - Oathkeeper (API Gateway)

## DNS настройка

Добавьте A-записи в DNS:

- `kratos.archpad.pro` → IP LoadBalancer Traefik
- `hydra.archpad.pro` → IP LoadBalancer Traefik
- `api.archpad.pro` → IP LoadBalancer Traefik

Получить IP:
```bash
kubectl get svc -n traefik traefik
```

## Troubleshooting

### Vault Agent Injector не работает

Проверьте, что Vault Agent Injector установлен:
```bash
kubectl get pods -n vault -l app=vault-agent-injector
```

Если не установлен, установите:
```bash
helm repo add hashicorp https://helm.releases.hashicorp.com
helm install vault-agent-injector hashicorp/vault -n vault --set injector.enabled=true
```

### Секреты не читаются из Vault

Проверьте логи Vault Agent:
```bash
kubectl logs -n secure <pod-name> -c vault-agent
```

Проверьте, что ServiceAccount имеет правильные permissions:
```bash
kubectl auth can-i get pods --as=system:serviceaccount:secure:kratos -n secure
```

### Миграции не выполняются

Проверьте логи Job:
```bash
kubectl logs -n secure job/kratos-migrate
kubectl logs -n secure job/hydra-migrate
```

Убедитесь, что PostgreSQL доступен и секреты из Vault правильно загружаются.

### OAuth2 клиенты не создаются

Проверьте логи Job:
```bash
kubectl logs -n secure job/hydra-init-client
```

Убедитесь, что Hydra доступен и готов:
```bash
kubectl exec -n secure <hydra-pod> -- curl -fsS http://localhost:4445/health/ready
```
