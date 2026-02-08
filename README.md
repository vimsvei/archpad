# ArchPad

Платформа для работы с архитектурными артефактами — репозиторий проектов, справочники, решения и связная модель данных.

## Стек

| Слой | Технологии |
|------|------------|
| **Frontend** | Next.js, React, Tolgee (i18n) |
| **Backend** | NestJS, Hasura GraphQL |
| **Auth** | Keycloak, auth-service, Oathkeeper |
| **Инфра** | PostgreSQL, Vault, Traefik |
| **DevOps** | Kubernetes, ArgoCD, GitLab CI |

## Структура репозитория

```
archpad/
├── packages/
│   ├── contract/     # Общие типы (TypeScript)
│   ├── backend/      # NestJS: arch-repo, tenant, auth, hasura-sync
│   ├── portal/       # Next.js frontend
│   └── landing/      # Лендинг (Next.js + Velite + Tolgee)
├── infra/timeweb/    # ArgoCD манифесты для K8s
├── docs/             # Документация
└── scripts/          # render-env.sh, setup-argocd-image-updater.sh
```

## Быстрый старт

### Сборка

```bash
pnpm install
pnpm run build:all
```

## Документация

| Раздел | Описание |
|--------|----------|
| [**Обзор документации**](docs/README.md) | Индекс всей документации |
| [Настройка и деплой](docs/SETUP_INSTRUCTIONS.md) | Первоначальная настройка |
| [Развёртывание в K8s](docs/DEPLOYMENT.md) | ArgoCD, namespaces, GitOps |
| [Компоненты системы](docs/COMPONENTS.md) | Описание всех сервисов |

### По темам

- **Инфраструктура:** [DEPLOYMENT](docs/DEPLOYMENT.md) · [RESOURCE_MANAGEMENT](docs/RESOURCE_MANAGEMENT.md)
- **Секреты:** [VAULT_SETUP](docs/VAULT_SETUP.md) · [VAULT_SECRETS_STRUCTURE](docs/VAULT_SECRETS_STRUCTURE.md)
- **CI/CD:** [GITLAB_CI](docs/GITLAB_CI.md) · [ARGOCD_IMAGE_UPDATER](docs/ARGOCD_IMAGE_UPDATER.md)
- **Мониторинг:** [MONITORING](docs/MONITORING.md)

---

## URLs

Рабочие адреса: `*.archpad.pro`

| Сервис | URL |
|--------|-----|
| Portal | https://portal.archpad.pro |
| Keycloak | https://id.archpad.pro |
| API Gateway | https://api.archpad.pro |
| Hasura GraphQL | https://apim.archpad.pro/v1/graphql |
| Tolgee | https://i18n.archpad.pro |
| Mailpit | https://mail.archpad.pro |
| Vault | https://vault.archpad.pro |
| Grafana | https://monitoring.archpad.pro |
| ArgoCD | https://argo.archpad.pro |
