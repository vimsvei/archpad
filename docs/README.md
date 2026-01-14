# Документация проекта

## Обзор

Эта документация описывает настройку, развертывание и управление платформой ArchPad в Kubernetes кластере.

## Быстрый старт

1. [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md) - Инструкции по первоначальной настройке
2. [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md) - Локальная разработка с удаленными сервисами
3. [DEPLOYMENT.md](./DEPLOYMENT.md) - Развертывание в Kubernetes

## Основная документация

### Развертывание и инфраструктура

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Развертывание компонентов в Kubernetes
- [COMPONENTS.md](./COMPONENTS.md) - Описание всех компонентов системы
- [RESOURCE_MANAGEMENT.md](./RESOURCE_MANAGEMENT.md) - Управление ресурсами кластера
- [RESOURCE_CALCULATION.md](./RESOURCE_CALCULATION.md) - Расчет ресурсов для различных конфигураций нод

### Управление секретами

- [VAULT_SETUP.md](./VAULT_SETUP.md) - Полная настройка HashiCorp Vault
- [SECRETS.md](./SECRETS.md) - Управление секретами в Vault

### CI/CD и автоматизация

- [GITLAB_CI.md](./GITLAB_CI.md) - Настройка GitLab CI/CD для сборки Docker образов
- [ARGOCD_IMAGE_UPDATER.md](./ARGOCD_IMAGE_UPDATER.md) - Автоматическое обновление образов через ArgoCD Image Updater

### Разработка

- [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md) - Локальная разработка с удаленными сервисами
- [SERVICES_SETUP.md](./SERVICES_SETUP.md) - Настройка backend и frontend сервисов

### Мониторинг

- [MONITORING.md](./MONITORING.md) - Обзор решений для мониторинга Kubernetes кластера

## Структура документации

### По компонентам

- **Frontend**: Portal (Next.js) - см. [COMPONENTS.md](./COMPONENTS.md#frontend)
- **Backend**: arch-repo-service, tenant-service, hasura-sync-service - см. [COMPONENTS.md](./COMPONENTS.md#backend-services)
- **Инфраструктура**: Hasura, Tolgee, Mailpit - см. [COMPONENTS.md](./COMPONENTS.md#инфраструктура)
- **Безопасность**: Kratos, Hydra, Oathkeeper - см. [COMPONENTS.md](./COMPONENTS.md#безопасность-ory)
- **Управление секретами**: Vault - см. [VAULT_SETUP.md](./VAULT_SETUP.md)

### По задачам

- **Первоначальная настройка**: [SETUP_INSTRUCTIONS.md](./SETUP_INSTRUCTIONS.md)
- **Локальная разработка**: [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md)
- **Развертывание**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Настройка CI/CD**: [GITLAB_CI.md](./GITLAB_CI.md)
- **Управление секретами**: [SECRETS.md](./SECRETS.md)
- **Оптимизация ресурсов**: [RESOURCE_MANAGEMENT.md](./RESOURCE_MANAGEMENT.md)

## Дополнительные ресурсы

- [Официальная документация Vault](https://www.vaultproject.io/docs)
- [Официальная документация ArgoCD Image Updater](https://argocd-image-updater.readthedocs.io/)
- [Официальная документация Ory](https://www.ory.sh/docs/)
