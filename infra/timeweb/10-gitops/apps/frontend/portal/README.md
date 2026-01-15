# Portal (Frontend) Deployment

## Структура

Portal - это Next.js приложение, доступное через `portal.archpad.pro`.

## Манифесты

- `portal.serviceaccount.yaml` - ServiceAccount для Vault Kubernetes Auth
- `portal.deployment.yaml` - Deployment с Vault Agent Injector
- `portal.service.yaml` - Service для внутреннего доступа
- `portal.ingressroute.yaml` - IngressRoute для внешнего доступа через Traefik
- `portal.app.yaml` - ArgoCD Application для управления деплоем

## Секреты

Секреты загружаются через Vault Agent Injector из:
- `/v1/kv/data/archpad/demo/frontend/portal` - основные секреты Portal
- `/v1/kv/data/archpad/demo/hasura/secret` - `HASURA_GRAPHQL_ADMIN_SECRET` (берется из Hasura секрета)
- `/v1/kv/data/archpad/demo/hasura/endpoint` - `HASURA_INTERNAL_URL`
- `/v1/kv/data/archpad/demo/ory/kratos/endpoint` - `ORY_KRATOS_INTERNAL_URL`

Подробнее см. [SECRETS.md](../../../../docs/SECRETS.md)

## Vault Kubernetes Auth

ServiceAccount `portal` добавлен в Vault роль `platform`.

Роль обновляется автоматически через Job `hasura-vault-role` (см. `apps/hasura/hasura-vault-role.job.yaml`).

## Доступ

Portal доступен через:
- Внешний URL: `https://portal.archpad.pro`
- Внутренний Service: `portal.platform.svc:3000`

## TODO: Настройка CI/CD

После настройки GitLab CI/CD для сборки Docker образов нужно:

1. Обновить `image` в `portal.deployment.yaml`:
   ```yaml
   image: registry.timeweb.cloud/archpad/portal:${GIT_COMMIT_SHA}
   ```

2. Обновить команду запуска в `args`:
   ```yaml
   args:
     - |
       set -a
       . /vault/secrets/portal
       set +a
       exec node server.js
   ```

3. Настроить GitLab CI/CD pipeline для:
   - Сборки Docker образа (используя `packages/portal/Dockerfile`)
   - Тегирования по git commit SHA
   - Публикации в Container Registry TimeWeb

## Деплой

Portal управляется через ArgoCD Application. После коммита в Git, ArgoCD автоматически синхронизирует изменения.

Для ручного деплоя:
```bash
kubectl apply -f infra/timeweb/10-gitops/apps/frontend/portal/
```
