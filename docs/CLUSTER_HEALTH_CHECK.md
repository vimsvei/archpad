# Проверка состояния кластера

**Дата проверки:** 2026-01-15  
**Время:** ~19:00 UTC

## Критические проблемы

### 1. ❌ Vault Kubernetes Auth не настроен

**Проблема:** Vault Kubernetes Auth Method не настроен или был сброшен после инцидента с Vault.

**Симптомы:**
- Все поды с Vault Agent не могут аутентифицироваться: `permission denied` при попытке `PUT /v1/auth/kubernetes/login`
- Поды зависают в статусе `Init:0/1` (Vault Agent init контейнер не может запуститься)
- Oathkeeper падает с ошибкой: `can't open '/vault/secrets/oathkeeper': No such file or directory`

**Затронутые сервисы:**
- `tenant-service` - Init:0/1
- `hasura-sync-service` - Init:0/1  
- `hydra` - Init:0/1
- `kratos` - Pending (не может запуститься)
- `oathkeeper` - CrashLoopBackOff (не может найти секреты)
- Все новые поды в статусе Pending

**Решение:**
Теперь настройка Kubernetes Auth Method автоматизирована через Job `vault-setup-kubernetes-auth`. 

**Автоматическое восстановление:**
1. Убедитесь, что Secret `vault-root-token` существует в namespace `vault`
2. Примените манифесты через GitOps или вручную:
   ```bash
   kubectl apply -f infra/timeweb/10-gitops/apps/vault/vault-setup-kubernetes-auth.configmap.yaml
   kubectl apply -f infra/timeweb/10-gitops/apps/vault/vault-setup-kubernetes-auth.job.yaml
   ```
3. Дождитесь завершения Job:
   ```bash
   kubectl wait --for=condition=complete job/vault-setup-kubernetes-auth -n vault --timeout=300s
   ```
4. Проверьте логи:
   ```bash
   kubectl logs job/vault-setup-kubernetes-auth -n vault
   ```

После успешного выполнения Job все поды с Vault Agent смогут аутентифицироваться автоматически.

Подробнее см. `docs/VAULT_SETUP.md`.

### 2. ⚠️ Нехватка CPU ресурсов

**Проблема:** 11 подов в статусе Pending из-за нехватки CPU.

**Текущее использование:**
- `worker-192.168.0.13`: CPU 161m (8%), Memory 2320Mi (60%)
- `worker-192.168.0.14`: CPU 233m (11%), Memory 2957Mi (77%)

**Затронутые поды:**
- `arch-repo-service-68cb7c6cb8-75fc7` - Pending
- `arch-repo-service-84f6774d6-gddd9` - Pending
- `portal-7877c7ff78-h5hck` - Pending
- `tolgee-54d6994cc-9kzts` - Pending
- `pgadmin-855d87cf74-gzg4f` - Pending
- `hydra-init-client-bjw6j` - Pending
- `kratos-migrate-tqtz4` - Pending
- И другие...

**Решение:**
- Увеличить лимиты CPU для нод
- Или уменьшить requests/limits для подов
- Или добавить больше нод в кластер

### 3. ❌ Vault Setup Policy Jobs падают

**Проблема:** Все `vault-setup-policy-*` джобы в статусе Error.

**Ошибка:**
```
Failed to apply policy (HTTP 403)
{"errors":["2 errors occurred:\n\t* permission denied\n\t* invalid token\n\n"]}
```

**Причина:** Токен, используемый джобом, не имеет прав или неверный.

**Решение:** Проверить и обновить токен в Secret для vault-setup-policy джоба.

## Состояние компонентов

### ✅ Работающие сервисы

- **Hasura**: `hasura-78689cf8c4-tbk7k` - Running (2/2)
- **Portal (старый)**: `portal-686b8bb48-wf9mc` - Running (2/2)
- **Tenant Service (старый)**: `tenant-service-6d78957cb6-sghrk` - Running (2/2)
- **Tolgee (старый)**: `tolgee-76d666b684-vt5nj` - Running (2/2)
- **Mailpit**: `mailpit-85d8bfc47f-4gtq6` - Running (1/1)
- **Vault**: `vault-0` - Running (1/1)
- **Vault Agent Injector**: `vault-agent-injector-784678cdd6-25txh` - Running (1/1)

### ❌ Проблемные сервисы

- **Oathkeeper**: `oathkeeper-84b54bb8d6-rw6lg` - CrashLoopBackOff (35 рестартов)
  - Ошибка: `can't open '/vault/secrets/oathkeeper': No such file or directory`
  - Причина: Vault Agent не может загрузить секреты из-за проблем с Kubernetes Auth

- **Kratos**: `kratos-76f98d8bbb-7grgf` - Pending
  - Не может запуститься из-за проблем с Vault Agent

- **Hydra**: `hydra-786cf7f759-9hw4x` - Init:0/1
  - Vault Agent init контейнер не может аутентифицироваться

- **Kratos Migrate**: `kratos-migrate-tqtz4` - Pending
  - Не может запуститься

- **Hydra Init Client**: `hydra-init-client-bjw6j` - Pending
  - Не может запуститься

### ⚠️ Поды в статусе Pending (11 штук)

Все из-за нехватки CPU или проблем с Vault Agent:
- `arch-repo-service-68cb7c6cb8-75fc7`
- `arch-repo-service-84f6774d6-gddd9`
- `portal-7877c7ff78-h5hck`
- `tenant-service-69d584b4db-bqh68` (Init:0/1 - Vault Agent)
- `hasura-sync-service-qllcj` (Init:0/1 - Vault Agent)
- `tolgee-54d6994cc-9kzts`
- `pgadmin-855d87cf74-gzg4f`
- `hydra-init-client-bjw6j`
- `kratos-migrate-tqtz4`
- `kratos-76f98d8bbb-7grgf`
- `hydra-786cf7f759-9hw4x` (Init:0/1 - Vault Agent)

## Состояние Vault

**Статус:** ✅ Unsealed, Initialized

```
Seal Type       shamir
Initialized     true
Sealed          false
Storage Type    file  ⚠️ (должно быть S3!)
Version         1.18.0
```

**Проблемы:**
- ⚠️ Использует `file` storage вместо S3 (после переинициализации)
- ❌ Kubernetes Auth Method не настроен
- ❌ Vault Setup Policy джобы не могут применить политики

## Рекомендации по восстановлению

### Приоритет 1: Настроить Vault Kubernetes Auth (автоматизировано)

**Новое:** Настройка Kubernetes Auth Method теперь автоматизирована через Job `vault-setup-kubernetes-auth`.

**Шаги восстановления:**

1. Убедитесь, что Secret `vault-root-token` существует:
   ```bash
   kubectl get secret vault-root-token -n vault
   ```
   Если нет, создайте (замените `<your-vault-root-token>` на реальный токен):
   ```bash
   kubectl create secret generic vault-root-token \
     --from-literal=VAULT_ROOT_TOKEN='<your-vault-root-token>' \
     --namespace=vault
   ```

2. Примените манифесты (если еще не применены через GitOps):
   ```bash
   kubectl apply -f infra/timeweb/10-gitops/apps/vault/vault-setup-kubernetes-auth.configmap.yaml
   kubectl apply -f infra/timeweb/10-gitops/apps/vault/vault-setup-kubernetes-auth.job.yaml
   ```

3. Дождитесь завершения Job:
   ```bash
   kubectl wait --for=condition=complete job/vault-setup-kubernetes-auth -n vault --timeout=300s
   ```

4. Проверьте логи:
   ```bash
   kubectl logs job/vault-setup-kubernetes-auth -n vault
   ```
   Должно быть: `✓ Kubernetes Auth configured successfully`

5. После успешной настройки Kubernetes Auth, другие Job'ы автоматически создадут роли:
   - `secure-vault-role` (sync-wave: 41) - создаст роль для namespace `secure`
   - `hasura-vault-role` (sync-wave: 46) - создаст роль для namespace `platform`

6. Перезапустите проблемные поды:
   ```bash
   kubectl delete pod -n platform -l app=tenant-service
   kubectl delete pod -n platform -l app=hasura-sync-service
   kubectl delete pod -n secure -l app=hydra
   kubectl delete pod -n secure -l app=kratos
   kubectl delete pod -n secure -l app=oathkeeper
   ```

### Приоритет 2: Решить проблему с CPU

- Проверить requests/limits для подов
- Рассмотреть возможность масштабирования кластера
- Или оптимизировать ресурсы существующих подов

### Приоритет 3: Исправить Vault Setup Policy

- Проверить токен в Secret для vault-setup-policy
- Убедиться, что токен имеет права на создание политик
- Перезапустить джобы

## Команды для диагностики

```bash
export KUBECONFIG=/Users/vimsvei/workspace/zelentsov.solutions/archpad/infra/timeweb/k8s_config/twc-archpad-k8s-cluster-config.yaml

# Проверить поды
kubectl get pods --all-namespaces

# Проверить логи Vault Agent
kubectl logs -n platform tenant-service-69d584b4db-bqh68 -c vault-agent-init

# Проверить состояние Vault
kubectl exec -n vault vault-0 -- vault status

# Проверить события
kubectl get events --all-namespaces --sort-by='.lastTimestamp' | tail -30
```

## Следующие шаги

1. ✅ Настроить Vault Kubernetes Auth Method
2. ✅ Проверить и обновить роли Vault для namespaces
3. ✅ Решить проблему с CPU (масштабирование или оптимизация)
4. ✅ Исправить Vault Setup Policy джобы
5. ✅ Перезапустить все проблемные поды
6. ✅ Проверить, что все сервисы работают корректно
