# Настройка Vault Kubernetes Auth Method

## Проблема

Сейчас Job'ы для настройки Vault roles используют root токен из Secret, что небезопасно. Нужно настроить правильную аутентификацию через Kubernetes Auth Method.

## Текущая ситуация

### ✅ Что работает правильно:

1. **Vault Agent Injector** - правильно настроен для сервисов:
   - Использует аннотации `vault.hashicorp.com/role: "platform"` или `"secure"`
   - Vault Agent автоматически получает токен через Kubernetes Auth Method
   - Сервисы НЕ используют root токен напрямую

2. **Kubernetes Auth Method** - настроен через Job'ы:
   - Включается автоматически при первом запуске
   - Настраивается для работы с Kubernetes API
   - Создаются роли `platform` и `secure`

### ❌ Проблема:

Job'ы для настройки Vault roles (`hasura-vault-role.job.yaml`, `secure-vault-role.job.yaml`) используют root токен из Secret `vault-root-token`. Это небезопасно, так как:
- Root токен имеет полный доступ ко всем секретам
- Если токен скомпрометирован, злоумышленник получит доступ ко всем данным
- Root токен не должен использоваться в production

## Решение

### Вариант 1: Создать ограниченный токен для настройки (рекомендуется)

Создать специальный токен с политикой, которая позволяет только:
- Управлять Kubernetes Auth Method
- Создавать и обновлять роли
- НЕ читать секреты

### Вариант 2: Использовать Kubernetes Auth для Job'ов

Настроить Job'ы так, чтобы они использовали Kubernetes Auth Method через ServiceAccount, а не root токен.

## Рекомендуемое решение: Ограниченный токен

### Шаг 1: Создать политику для настройки Vault

```hcl
# vault-setup-policy.hcl
# Политика для настройки Vault (только для управления auth и roles)
path "sys/auth/kubernetes" {
  capabilities = ["create", "read", "update", "delete", "sudo"]
}

path "sys/auth/kubernetes/*" {
  capabilities = ["create", "read", "update", "delete"]
}

path "auth/kubernetes/config" {
  capabilities = ["create", "read", "update", "delete", "sudo"]
}

path "auth/kubernetes/role/*" {
  capabilities = ["create", "read", "update", "delete"]
}

# НЕ даем доступ к секретам
path "kv/*" {
  capabilities = ["deny"]
}
```

### Шаг 2: Создать токен с этой политикой

```bash
# В Vault UI или через CLI
vault token create \
  -policy=vault-setup \
  -ttl=8760h \
  -renewable=true
```

### Шаг 3: Обновить Job'ы для использования ограниченного токена

Изменить Secret с `vault-root-token` на `vault-setup-token` с ограниченным токеном.

## Альтернативное решение: Kubernetes Auth для Job'ов

### Шаг 1: Создать ServiceAccount для Job'ов

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: vault-setup
  namespace: platform
```

### Шаг 2: Создать Vault роль для этого ServiceAccount

```bash
vault write auth/kubernetes/role/vault-setup \
  bound_service_account_names=vault-setup \
  bound_service_account_namespaces=platform \
  policies=vault-setup \
  ttl=1h
```

### Шаг 3: Обновить Job'ы для использования Kubernetes Auth

Изменить Job'ы так, чтобы они использовали Vault Agent Injector вместо прямого использования токена.

## Текущая архитектура (как работает)

```
┌─────────────────────────────────────────────────────────┐
│  Kubernetes Pod (arch-repo-service)                     │
│                                                          │
│  ┌──────────────────┐  ┌─────────────────────────────┐ │
│  │  Vault Agent     │  │  Application Container      │ │
│  │  (sidecar)       │  │  (arch-repo-service)        │ │
│  │                  │  │                              │ │
│  │  1. Получает     │  │  Читает секреты из          │ │
│  │     ServiceAccount│  │  /vault/secrets/           │ │
│  │     токен        │  │                              │ │
│  │                  │  │                              │ │
│  │  2. Аутентифици- │  │                              │ │
│  │     руется в     │  │                              │ │
│  │     Vault через  │  │                              │ │
│  │     Kubernetes   │  │                              │ │
│  │     Auth Method  │  │                              │ │
│  │                  │  │                              │ │
│  │  3. Получает     │  │                              │ │
│  │     Vault токен  │  │                              │ │
│  │                  │  │                              │ │
│  │  4. Читает       │  │                              │ │
│  │     секреты      │  │                              │ │
│  │                  │  │                              │ │
│  │  5. Записывает   │  │                              │ │
│  │     в файлы      │  │                              │ │
│  └──────────────────┘  └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                          │
                          │ Kubernetes Auth Method
                          │ (использует ServiceAccount токен)
                          ▼
┌─────────────────────────────────────────────────────────┐
│  Vault Server                                            │
│                                                          │
│  Kubernetes Auth Method                                  │
│  ├── Role: "platform"                                    │
│  │   ├── Bound ServiceAccounts:                         │
│  │   │   - arch-repo-service                            │
│  │   │   - tenant-service                               │
│  │   │   - hasura-sync-service                          │
│  │   │   - portal                                       │
│  │   │   - hasura                                       │
│  │   │   - tolgee                                       │
│  │   ├── Bound Namespaces: platform                     │
│  │   └── Policies: archpad                              │
│  │                                                       │
│  └── Role: "secure"                                      │
│      ├── Bound ServiceAccounts:                         │
│      │   - kratos                                       │
│      │   - hydra                                        │
│      │   - oathkeeper                                   │
│      ├── Bound Namespaces: secure                       │
│      └── Policies: archpad                              │
└─────────────────────────────────────────────────────────┘
```

## Что нужно сделать

1. ✅ **Сервисы уже правильно настроены** - используют Kubernetes Auth через ServiceAccount
2. ❌ **Job'ы используют root токен** - нужно исправить
3. ✅ **Vault Agent Injector работает правильно** - автоматически инжектирует секреты

## План действий

✅ **Выполнено:**
1. ✅ Создана политика `vault-setup` в ConfigMap
2. ✅ Создан Job для применения политики и генерации ограниченного токена
3. ✅ Обновлены Job'ы для использования ограниченного токена (с fallback на root для обратной совместимости)
4. ✅ Создана документация

## Как применить изменения

### ✅ Автоматически через GitOps

После push в Git следующие манифесты применятся автоматически через ArgoCD:
- ✅ `vault-setup-policy.configmap.yaml` - ConfigMap с политикой
- ✅ `vault-setup-policy.job.yaml` - Job для создания политики и токена
- ✅ Обновленные `hasura-vault-role.job.yaml` и `secure-vault-role.job.yaml`

**Просто сделайте push в Git - ArgoCD автоматически синхронизирует изменения!**

### ⚠️ Вручную (только один раз)

**Secret'ы с токенами НЕ должны быть в Git** (это секретные данные). Их нужно создать вручную:

#### Шаг 1: Создать Secret с root токеном (только для первоначальной настройки)

```bash
# Создать Secret с root токеном Vault
# Получите root токен из Vault UI или из инициализации Vault
kubectl create secret generic vault-root-token \
  --from-literal=VAULT_ROOT_TOKEN='<your-vault-root-token>' \
  --namespace=vault
```

**Важно:** Root токен нужен только для первого запуска Job'а, который создаст ограниченный токен.

#### Шаг 2: Дождаться автоматического применения манифестов

После push в Git ArgoCD автоматически:
1. Применит ConfigMap с политикой
2. Запустит Job `vault-setup-policy`, который:
   - Применит политику в Vault
   - Создаст ограниченный токен
   - Выведет токен в логи

#### Шаг 3: Получить ограниченный токен из логов Job

```bash
# Дождаться завершения Job (ArgoCD запустит его автоматически)
kubectl wait --for=condition=complete job/vault-setup-policy -n vault --timeout=300s

# Получить токен из логов Job
kubectl logs job/vault-setup-policy -n vault | grep -A 5 "Token:"
```

#### Шаг 4: Создать Secret с ограниченным токеном

```bash
# Получить токен из логов Job (скопировать из вывода выше)
SETUP_TOKEN="<token-from-job-logs>"

# Создать Secret в namespace platform
kubectl create secret generic vault-setup-token \
  --from-literal=VAULT_SETUP_TOKEN="$SETUP_TOKEN" \
  --namespace=platform

# Создать Secret в namespace secure
kubectl create secret generic vault-setup-token \
  --from-literal=VAULT_SETUP_TOKEN="$SETUP_TOKEN" \
  --namespace=secure
```

**После этого все Job'ы будут использовать ограниченный токен автоматически!**

#### Шаг 5: Проверить работу

После следующего синхронизации ArgoCD (или вручную запустите синхронизацию):

```bash
# Проверить, что Job'ы используют ограниченный токен
kubectl logs job/hasura-vault-role -n platform | grep "Using limited setup token"
kubectl logs job/secure-vault-role -n secure | grep "Using limited setup token"
```

#### Шаг 6: (Опционально) Удалить root токен из Secret

После проверки, что все работает с ограниченным токеном:

```bash
# Удалить Secret с root токеном (он больше не нужен)
kubectl delete secret vault-root-token -n vault
```

**Важно:** Сохраните root токен в безопасном месте (например, в password manager) на случай экстренного доступа.

## Резюме: Что автоматически, что вручную

### ✅ Автоматически через GitOps (после push в Git):

- ConfigMap с политикой Vault
- Job для создания политики и ограниченного токена
- Обновленные Job'ы для использования ограниченного токена
- Все манифесты Kubernetes

### ⚠️ Вручную (только один раз):

- Secret с root токеном (`vault-root-token`) - для первоначальной настройки
- Secret с ограниченным токеном (`vault-setup-token`) - после получения токена из Job

**После первоначальной настройки все работает автоматически через GitOps!**

## Проверка безопасности

После настройки проверить:

```bash
# Проверить, что сервисы используют Kubernetes Auth
kubectl exec -n platform deployment/arch-repo-service -c vault-agent -- \
  cat /vault/secrets/arch-repo-service

# Проверить, что Job'ы НЕ используют root токен
kubectl get secret vault-root-token -n platform -o jsonpath='{.data.VAULT_ROOT_TOKEN}' | base64 -d
# Должен быть пустым или не существовать

# Проверить, что используется ограниченный токен
kubectl get secret vault-setup-token -n platform
```

## Дополнительные рекомендации

1. **Ротация токенов**: Настроить автоматическую ротацию ограниченного токена
2. **Мониторинг**: Настроить алерты на использование root токена
3. **Аудит**: Включить аудит в Vault для отслеживания доступа
4. **Политики**: Разделить политики по сервисам для принципа наименьших привилегий
