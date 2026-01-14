# Backend Services Deployment

## Структура

Каждый backend сервис имеет свою директорию с манифестами Kubernetes:

- `arch-repo-service/` - основной сервис для работы с проектами
- `tenant-service/` - сервис для работы с tenant'ами
- `hasura-sync-service/` - Job для синхронизации схемы БД с Hasura

## Манифесты

Каждый сервис включает:

- `*.serviceaccount.yaml` - ServiceAccount для Vault Kubernetes Auth
- `*.deployment.yaml` или `*.job.yaml` - Deployment/Job с Vault Agent Injector
- `*.service.yaml` - Service для внутреннего доступа (только для Deployment)
- `*.app.yaml` - ArgoCD Application для управления деплоем

## Секреты

Все секреты загружаются через Vault Agent Injector из следующих путей:

### arch-repo-service
- `/v1/kv/data/archpad/demo/backend/arch-repo-service`
- `/v1/kv/data/archpad/demo/backend/common`
- `/v1/kv/data/archpad/demo/postgres`

### tenant-service
- `/v1/kv/data/archpad/demo/backend/tenant-service`
- `/v1/kv/data/archpad/demo/backend/common`
- `/v1/kv/data/archpad/demo/postgres`

### hasura-sync-service
- `/v1/kv/data/archpad/demo/backend/hasura-sync-service`
- `/v1/kv/data/archpad/demo/hasura-secret`
- `/v1/kv/data/archpad/demo/backend/common`
- `/v1/kv/data/archpad/demo/postgres`

Подробнее см. [SECRETS.md](../../../../docs/SECRETS.md)

## Container Registry Secret

Секрет `archpad-registry-secret` для доступа к Container Registry автоматически синхронизируется из Vault через Job `registry-secret-sync`.

- **Vault путь:** `/v1/kv/data/container-register`
- **Kubernetes Secret:** `archpad-registry-secret` в namespace `platform`
- **Синхронизация:** автоматическая при каждой синхронизации ArgoCD

Подробнее см. [SECRETS.md](../../../../docs/SECRETS.md)

## Vault Kubernetes Auth

Все ServiceAccount'ы добавлены в Vault роль `platform`:
- `arch-repo-service`
- `tenant-service`
- `hasura-sync-service`
- `registry-secret-sync`

Роль обновляется автоматически через Job `hasura-vault-role` (см. `apps/hasura/hasura-vault-role.job.yaml`).

## Доступ к сервисам

Backend сервисы доступны только внутри кластера через Service (ClusterIP).

Внешний доступ осуществляется через Oathkeeper API Gateway (`api.archpad.pro`), который:
1. Проверяет токен аутентификации
2. Добавляет необходимые заголовки
3. Проксирует запросы в соответствующий backend сервис

## TODO: Настройка CI/CD

После настройки GitLab CI/CD для сборки Docker образов нужно:

1. Обновить `image` в `*.deployment.yaml` и `*.job.yaml`:
   ```yaml
   image: registry.timeweb.cloud/archpad/arch-repo-service:${GIT_COMMIT_SHA}
   ```

2. Обновить команды запуска в `args`:
   - Для arch-repo-service: `exec node dist/apps/arch-repo-service/apps/arch-repo-service/src/main.js`
   - Для tenant-service: `exec node dist/apps/tenant-service/apps/tenant-service/src/main.js`
   - Для hasura-sync-service: `exec node dist/apps/hasura-sync-service/apps/hasura-sync-service/src/main.js`

3. Настроить GitLab CI/CD pipeline для:
   - Сборки Docker образов
   - Тегирования по git commit SHA
   - Публикации в Container Registry TimeWeb

## Деплой

Все сервисы управляются через ArgoCD Applications. После коммита в Git, ArgoCD автоматически синхронизирует изменения.

Для ручного деплоя:
```bash
kubectl apply -f infra/timeweb/10-gitops/apps/backend/<service-name>/
```
