# Управление секретами

## Обзор

Все секреты хранятся в HashiCorp Vault и автоматически загружаются в поды через Vault Agent Injector с использованием Kubernetes Auth Method.

## Структура секретов в Vault

Секреты хранятся в KV v2 по следующей структуре:

```
kv/data/archpad/demo/
├── backend/
│   ├── common/              # Общие секреты для backend сервисов
│   ├── arch-repo-service/   # Секреты для arch-repo-service
│   ├── tenant-service/      # Секреты для tenant-service
│   └── hasura-sync-service/ # Секреты для hasura-sync-service
├── frontend/
│   └── portal/              # Секреты для Portal
├── keycloak/
│   ├── admin/               # Keycloak admin bootstrap (user/password)
│   ├── connect/             # Keycloak public hostname (KEYCLOAK_HOST)
│   ├── db/                  # Keycloak DB credentials
│   └── smtp/                # Keycloak SMTP settings (optional)
├── hasura/
│   ├── hasura/              # Секреты для Hasura
│   └── secret/             # Hasura admin secret
├── ory/
│   └── oathkeeper/         # Секреты для Oathkeeper (API Gateway / forwardAuth)
├── tolgee/                  # Секреты для Tolgee
├── postgres/                # Секреты для PostgreSQL
└── container-register/      # Секреты для Container Registry
```

## Как это работает

### Vault Agent Injector

Когда Pod запускается с аннотациями Vault:

```yaml
annotations:
  vault.hashicorp.com/agent-inject: "true"
  vault.hashicorp.com/role: "platform"
```

Vault Agent Injector автоматически:
1. Создает sidecar контейнер (Vault Agent) в Pod'е
2. Получает ServiceAccount токен из Kubernetes
3. Аутентифицируется в Vault через Kubernetes Auth Method
4. Получает Vault токен с правами политики "archpad"
5. Читает секреты из Vault
6. Записывает секреты в файлы `/vault/secrets/...`
7. Приложение читает секреты из этих файлов

Подробнее см. [VAULT_SETUP.md](./VAULT_SETUP.md).

## Структура секретов

Полная структура всех секретов и переменных описана в отдельном документе:

👉 **[VAULT_SECRETS_STRUCTURE.md](./VAULT_SECRETS_STRUCTURE.md)** - Полная структура всех секретов Vault

В этом документе описаны все пути в Vault, названия переменных (без значений) и их использование в системе.

## Создание и обновление секретов

### Через Vault API

```bash
VAULT_ADDR="https://vault.archpad.pro"
VAULT_TOKEN="<your-token>"

# Пример: создание секрета для Portal
curl -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "NEXT_PUBLIC_URL": "https://portal.archpad.pro",
      "NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT": "https://apim.archpad.pro/v1/graphql",
      "NEXT_PUBLIC_TOLGEE_API_URL": "https://i18n.archpad.pro",
      "NEXT_PUBLIC_TOLGEE_API_KEY": "tgpak_...",
      "NEXT_PUBLIC_KEYCLOAK_PUBLIC_URL": "https://id.archpad.pro",
      "NEXT_PUBLIC_KEYCLOAK_CLIENT_ID": "portal",
      "KEYCLOAK_REALM": "archpad",
      "KEYCLOAK_SERVICE_CLIENT_ID": "portal-admin",
      "KEYCLOAK_SERVICE_CLIENT_SECRET": "<portal-admin client secret>",
      "NEXT_PUBLIC_API_GRAPHQL_ENDPOINT": "https://api.archpad.pro/graphql"
    }
  }' \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/frontend/portal"
```

### Через Vault UI

1. Откройте Vault UI: `https://vault.archpad.pro`
2. Перейдите в нужный путь секрета
3. Добавьте или обновите значения
4. Сохраните изменения

### Через Vault CLI

```bash
# Установка Vault CLI (если не установлен)
# brew install vault  # macOS
# или скачайте с https://www.vaultproject.io/downloads

# Логин в Vault
export VAULT_ADDR="https://vault.archpad.pro"
export VAULT_TOKEN="<your-token>"

# Создание/обновление секрета
vault kv put kv/archpad/demo/frontend/portal \
  NEXT_PUBLIC_URL="https://portal.archpad.pro" \
  NEXT_PUBLIC_KEYCLOAK_PUBLIC_URL="https://id.archpad.pro" \
  NEXT_PUBLIC_KEYCLOAK_CLIENT_ID="portal" \
  KEYCLOAK_REALM="archpad"

# Просмотр секрета
vault kv get kv/archpad/demo/frontend/portal
```

## Применение изменений

После обновления секрета в Vault:

1. **Автоматически:** Vault Agent перезагрузит секреты при следующем обновлении токена (обычно каждые 1 час)

2. **Вручную:** Перезапустите поды:
```bash
# Перезапустить конкретный сервис
kubectl delete pod -n platform -l app=arch-repo-service

# Перезапустить все поды в namespace
kubectl delete pod -n platform --all
```

## Проверка секретов

### Проверка в Vault

```bash
# Через Vault CLI
vault kv get kv/archpad/demo/frontend/portal

# Через Vault API
curl -H "X-Vault-Token: ${VAULT_TOKEN}" \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/frontend/portal" | jq
```

### Проверка в Pod'е

```bash
# Проверить, что секреты загружены
kubectl exec -n platform -l app=arch-repo-service -c arch-repo-service -- \
  cat /vault/secrets/arch-repo-service

# Проверить логи Vault Agent
kubectl logs -n platform -l app=arch-repo-service -c vault-agent --tail=50
```

## Безопасность

1. **Не коммитьте секреты в Git** - все секреты должны быть в Vault
2. **Используйте ограниченные токены** - для доступа к Vault используйте токены с минимальными правами
3. **Ротация секретов** - регулярно обновляйте пароли и токены
4. **Аудит** - включите аудит в Vault для отслеживания доступа
5. **Принцип наименьших привилегий** - каждый сервис имеет доступ только к нужным секретам

## Troubleshooting

### Секреты не загружаются

1. Проверьте логи Vault Agent:
```bash
kubectl logs -n platform -l app=arch-repo-service -c vault-agent --tail=50
```

2. Проверьте, что ServiceAccount существует:
```bash
kubectl get serviceaccount arch-repo-service -n platform
```

3. Проверьте, что Vault роль настроена:
```bash
kubectl logs job/hasura-vault-role -n platform
```

### Секреты не обновляются

1. Перезапустите поды (см. выше)
2. Проверьте, что секрет обновлен в Vault
3. Проверьте логи Vault Agent на наличие ошибок

## Дополнительная документация

- **[VAULT_SECRETS_STRUCTURE.md](./VAULT_SECRETS_STRUCTURE.md)** - Полная структура всех секретов и переменных
- [VAULT_SETUP.md](./VAULT_SETUP.md) - Полная настройка Vault и Kubernetes Auth Method
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Развертывание компонентов
