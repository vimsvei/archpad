# Компоненты системы

## Обзор

Документация по всем компонентам системы, их настройке и использованию.

## Frontend

### Portal

Next.js приложение, доступное через `https://portal.archpad.pro`.

**Секреты:** См. [VAULT_SECRETS_STRUCTURE.md](./VAULT_SECRETS_STRUCTURE.md#31-portal-configuration)

**Особенности:**
- Получает `NEXT_PUBLIC_*` секреты из Vault во время сборки (через GitLab CI/CD)
- Использует внутренние URL для серверных запросов (Hasura, Keycloak, Oathkeeper)
- Hot reload в режиме разработки

## Backend Services

### arch-repo-service

Основной сервис для работы с проектами.

**Секреты:** См. [VAULT_SECRETS_STRUCTURE.md](./VAULT_SECRETS_STRUCTURE.md#2-backend-services)

**Особенности:**
- Использует PostgreSQL для хранения данных
- Доступен через Oathkeeper API Gateway

### tenant-service

Сервис для работы с tenant'ами.

**Секреты:** См. [VAULT_SECRETS_STRUCTURE.md](./VAULT_SECRETS_STRUCTURE.md#2-backend-services)

### hasura-sync-service

Job для синхронизации схемы БД с Hasura.

**Секреты:** См. [VAULT_SECRETS_STRUCTURE.md](./VAULT_SECRETS_STRUCTURE.md#2-backend-services)

**Особенности:**
- Запускается как Kubernetes Job
- Выполняется автоматически при синхронизации ArgoCD (PreSync hook)

## Инфраструктура

### Hasura

GraphQL API и управление БД.

**Секреты:** См. [VAULT_SECRETS_STRUCTURE.md](./VAULT_SECRETS_STRUCTURE.md#4-hasura)

**Особенности:**
- Использует PostgreSQL для метаданных и данных
- Доступен через Oathkeeper API Gateway (`https://apim.archpad.pro/v1/graphql`)
- Внутренний доступ: `http://hasura.platform.svc:8080`

### Tolgee

Сервис интернационализации (i18n).

**Секреты:** См. [VAULT_SECRETS_STRUCTURE.md](./VAULT_SECRETS_STRUCTURE.md#5-tolgee-i18n)

**Особенности:**
- Использует PostgreSQL для хранения переводов
- API ключ создается в интерфейсе Tolgee после первого входа администратора
- Доступен через `https://i18n.archpad.pro`

### Mailpit

SMTP сервер для разработки (email testing).

**Особенности:**
- Используется Keycloak для отправки email (verification/recovery), если SMTP настроен на Keycloak
- Веб-интерфейс доступен через `https://mail.archpad.pro`
- SMTP доступен по `mailpit.platform.svc.cluster.local:1025`

## Безопасность

### Keycloak + Oathkeeper

Keycloak и Oathkeeper развертываются в Kubernetes через ArgoCD с использованием секретов из Vault.

**Требования:**
1. Vault развернут и доступен через `vault.archpad.pro`
2. Vault Agent Injector установлен в кластере
3. PostgreSQL доступен (для Keycloak)
4. TLS сертификат `wildcard-archpad-pro-tls` должен быть скопирован в namespace `secure`

**Секреты:** См. [VAULT_SECRETS_STRUCTURE.md](./VAULT_SECRETS_STRUCTURE.md) (разделы Keycloak и Oathkeeper)

### Keycloak

Identity & Access Management (IdM/IAM) для проекта: пользователи, роли, группы, OIDC/JWT.

**Особенности:**
- Использует PostgreSQL для хранения данных
- Публичный URL: `https://id.archpad.pro`
- Внутренний доступ: `http://keycloak.secure.svc:8080`
- Realm/clients/roles поддерживаются “как код” (bootstrap import + sync job)

### Oathkeeper

API Gateway / Authorization Proxy.

**Особенности:**
- Валидирует JWT по JWKS из Keycloak (issuer `https://id.archpad.pro/realms/archpad`)
- Проксирует запросы к backend сервисам
- Доступен через `https://api.archpad.pro`
- Внутренний доступ: `http://oathkeeper.secure.svc:4455`
 - Не использует БД напрямую

**Секреты в Vault:**
 - Путь: `/v1/kv/data/archpad/demo/ory/oathkeeper`

### Копирование TLS Secret

TLS secret для wildcard сертификата должен быть скопирован в namespace `secure`:

```bash
kubectl get secret wildcard-archpad-pro-tls -n argocd -o yaml | \
  sed 's/namespace: argocd/namespace: secure/' | \
  sed '/resourceVersion:/d' | \
  sed '/uid:/d' | \
  sed '/creationTimestamp:/d' | \
  kubectl apply -f -
```

## Управление секретами

### Vault

HashiCorp Vault для хранения секретов.

**Особенности:**
- Развертывается через ArgoCD как Helm Application
- Storage: Raft (локальное хранилище на PersistentVolume)
- UI доступен через `https://vault.archpad.pro`
- Использует Kubernetes Auth Method для автоматической аутентификации подов

**Подробнее:** См. [VAULT_SETUP.md](./VAULT_SETUP.md)

## Container Registry

### Синхронизация секрета

Секрет `archpad-registry-secret` для доступа к Container Registry автоматически синхронизируется из Vault в Kubernetes через Job `registry-secret-sync`.

**Как это работает:**
1. Vault Agent Injector загружает секреты из Vault по пути `/v1/kv/data/container-register`
2. Job `registry-secret-sync` создает или обновляет Kubernetes Secret `archpad-registry-secret`
3. ServiceAccounts используют этот секрет через `imagePullSecrets` для загрузки образов

**Обновление секрета:**
1. Обновите секрет в Vault по пути `/v1/kv/data/container-register`
2. ArgoCD автоматически пересоздаст Job при следующей синхронизации
3. Job обновит Kubernetes Secret с новыми значениями

## Troubleshooting

### Проблема: Сервис не может получить секреты из Vault

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

### Проблема: Сервис не может подключиться к PostgreSQL

1. Проверьте, что `POSTGRES_HOST` установлен в Vault (должен быть IP адрес, не доменное имя)
2. Проверьте логи сервиса:
```bash
kubectl logs -n platform -l app=arch-repo-service --tail=50
```

3. Проверьте доступность PostgreSQL:
```bash
kubectl exec -n platform -l app=arch-repo-service -- \
  nc -zv <POSTGRES_HOST> 5432
```

### Проблема: OAuth2 клиенты не создаются

1. Проверьте логи Job:
```bash
kubectl logs -n secure job/keycloak-sync --tail=50
```

2. Проверьте, что Keycloak доступен:
```bash
kubectl exec -n secure deploy/keycloak -- curl -fsS http://localhost:8080/realms/archpad
```

## Дополнительная документация

- [Deployment](./DEPLOYMENT.md) - развертывание компонентов
- [VAULT_SECRETS_STRUCTURE.md](./VAULT_SECRETS_STRUCTURE.md) - структура секретов
- [SECRETS.md](./SECRETS.md) - управление секретами
- [Vault Setup](./VAULT_SETUP.md) - настройка Vault
- [Local Development](./LOCAL_DEVELOPMENT.md) - локальная разработка
