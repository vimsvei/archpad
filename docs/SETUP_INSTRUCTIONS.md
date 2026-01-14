# Инструкции по настройке и деплою

## ✅ Что уже сделано

1. ✅ Обновлен код для работы с новой структурой секретов Vault
2. ✅ Созданы Kubernetes манифесты для всех сервисов
3. ✅ Настроен GitLab CI/CD для сборки Docker образов
4. ✅ Созданы скрипты для локальной разработки с удаленными Ory сервисами

## 📋 Следующие шаги

### 1. Настройка GitLab CI/CD

1. **Добавьте переменные в GitLab:**
   - Перейдите в **Settings → CI/CD → Variables**
   - Добавьте:
     - `REGISTRY_USERNAME` (Type: Variable, Protected: false, Masked: false)
     - `REGISTRY_PASSWORD` (Type: Variable, Protected: true, Masked: true)

2. **Настройте GitLab Runner** с поддержкой Docker (если еще не настроен)

3. **Проверьте работу pipeline:**
   - Сделайте коммит в `main` или `develop` ветку
   - Pipeline автоматически запустится
   - Проверьте логи сборки в GitLab CI/CD

Подробнее: [GITLAB_CI.md](./GITLAB_CI.md)

### 2. Обновление манифестов Kubernetes

После успешной сборки образов обновите манифесты:

1. **Получите SHA коммита** из GitLab CI/CD (первые 8 символов)

2. **Обновите образы в манифестах:**

   ```bash
   # arch-repo-service
   # infra/timeweb/10-gitops/apps/backend/arch-repo-service/arch-repo-service.deployment.yaml
   image: registry.timeweb.cloud/archpad/arch-repo-service:abc12345
   
   # tenant-service
   # infra/timeweb/10-gitops/apps/backend/tenant-service/tenant-service.deployment.yaml
   image: registry.timeweb.cloud/archpad/tenant-service:abc12345
   
   # hasura-sync-service
   # infra/timeweb/10-gitops/apps/backend/hasura-sync-service/hasura-sync-service.job.yaml
   image: registry.timeweb.cloud/archpad/hasura-sync-service:abc12345
   
   # portal
   # infra/timeweb/10-gitops/apps/frontend/portal/portal.deployment.yaml
   image: registry.timeweb.cloud/archpad/portal:abc12345
   ```

3. **Обновите команды запуска:**

   Уберите временные заглушки (`sleep infinity`) и используйте реальные команды:

   ```yaml
   # arch-repo-service
   args:
     - |
       set -a
       . /vault/secrets/arch-repo-service
       set +a
       exec node dist/apps/arch-repo-service/apps/arch-repo-service/src/main.js
   
   # tenant-service
   args:
     - |
       set -a
       . /vault/secrets/tenant-service
       set +a
       exec node dist/apps/tenant-service/apps/tenant-service/src/main.js
   
   # hasura-sync-service
   args:
     - |
       set -a
       . /vault/secrets/hasura-sync-service
       set +a
       exec node dist/apps/hasura-sync-service/apps/hasura-sync-service/src/main.js
   
   # portal
   args:
     - |
       set -a
       . /vault/secrets/portal
       set +a
       exec node server.js
   ```

4. **Закоммитьте изменения** - ArgoCD автоматически синхронизирует

### 3. Локальная разработка

#### Быстрый старт:

1. **Создайте `.env.local`** (см. пример в `docs/LOCAL_DEVELOPMENT.md`)

2. **Запустите:**
   ```bash
   ./scripts/dev-local.sh
   ```

3. **Откройте Portal:** http://localhost:3000

#### Что работает:

✅ **Hot reload** для Portal (Next.js)  
✅ **Hot reload** для Backend (NestJS с `--watch`)  
✅ **Ory из Kubernetes** через port-forward  
✅ **Hasura, Tolgee** из Kubernetes через port-forward  

Подробнее: [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md)

### 4. Проверка деплоя

После обновления манифестов проверьте:

1. **ArgoCD Applications:**
   ```bash
   kubectl get applications -n argocd
   ```

2. **Pods:**
   ```bash
   kubectl get pods -n platform
   ```

3. **Логи:**
   ```bash
   kubectl logs -n platform -l app=arch-repo-service --tail=50
   kubectl logs -n platform -l app=portal --tail=50
   ```

4. **Доступность:**
   - Portal: https://portal.archpad.pro
   - Backend через API Gateway: https://api.archpad.pro

## 🔧 Решение проблем

### Проблема: Образы не собираются в CI/CD

**Решение:**
1. Проверьте переменные `REGISTRY_USERNAME` и `REGISTRY_PASSWORD` в GitLab
2. Убедитесь, что GitLab Runner имеет доступ к Docker
3. Проверьте логи pipeline в GitLab CI/CD

### Проблема: Pods не запускаются

**Решение:**
1. Проверьте логи pod'ов: `kubectl logs -n platform <pod-name>`
2. Проверьте, что секреты созданы в Vault
3. Проверьте, что Vault роль `platform` обновлена с новыми ServiceAccount'ами

### Проблема: Port-forward не работает

**Решение:**
1. Проверьте подключение к кластеру: `kubectl cluster-info`
2. Проверьте, что сервисы запущены: `kubectl get svc -n platform`
3. Проверьте, что порты не заняты: `lsof -i :8080`

## 📚 Дополнительная документация

- [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md) - Подробная инструкция по локальной разработке
- [GITLAB_CI.md](./GITLAB_CI.md) - Настройка GitLab CI/CD
- [SECRETS.md](./SECRETS.md) - Управление секретами
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Развертывание в Kubernetes
- [VAULT_SETUP.md](./VAULT_SETUP.md) - Настройка Vault
