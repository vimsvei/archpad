# Как сервисы получают секреты из Vault

## Краткий ответ

**Backend сервисы и Portal НЕ используют токены напрямую!** Они используют **Kubernetes Auth Method** через ServiceAccount токены. Это безопасный и правильный подход.

## Как это работает

### 1. Vault Agent Injector (автоматически)

Когда Pod запускается с аннотациями Vault:

```yaml
annotations:
  vault.hashicorp.com/agent-inject: "true"
  vault.hashicorp.com/role: "platform"
```

Vault Agent Injector автоматически:
1. **Создает sidecar контейнер** (Vault Agent) в Pod'е
2. **Получает ServiceAccount токен** из Kubernetes
3. **Аутентифицируется в Vault** через Kubernetes Auth Method, используя:
   - ServiceAccount токен (автоматически)
   - Role "platform" (из аннотации)
4. **Получает Vault токен** с правами политики "archpad"
5. **Читает секреты** из Vault
6. **Записывает секреты в файлы** `/vault/secrets/...`
7. **Приложение читает секреты** из этих файлов

### 2. Архитектура

```
┌─────────────────────────────────────────────────────────┐
│  Pod (arch-repo-service)                                │
│                                                          │
│  ┌──────────────────┐  ┌─────────────────────────────┐ │
│  │  Vault Agent     │  │  Application Container      │ │
│  │  (sidecar)       │  │  (arch-repo-service)        │ │
│  │                  │  │                              │ │
│  │  1. Читает       │  │  Читает секреты из          │ │
│  │     ServiceAccount│  │  /vault/secrets/           │ │
│  │     токен из     │  │                              │ │
│  │     /var/run/... │  │                              │ │
│  │                  │  │                              │ │
│  │  2. Аутентифици- │  │                              │ │
│  │     руется в     │  │                              │ │
│  │     Vault через  │  │                              │ │
│  │     Kubernetes   │  │                              │ │
│  │     Auth Method  │  │                              │ │
│  │     (role:       │  │                              │ │
│  │      "platform") │  │                              │ │
│  │                  │  │                              │ │
│  │  3. Получает     │  │                              │ │
│  │     Vault токен  │  │                              │ │
│  │     (с правами   │  │                              │ │
│  │      политики    │  │                              │ │
│  │      "archpad")  │  │                              │ │
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
│  └── Policy: "archpad"                                   │
│      └── Доступ: kv/data/archpad/* (read only)           │
└─────────────────────────────────────────────────────────┘
```

### 3. Что НЕ используется

❌ **Root токен** - НЕ используется сервисами
❌ **Ограниченный токен (vault-setup-token)** - НЕ используется сервисами
❌ **Прямой доступ к Vault API** - НЕ используется сервисами

### 4. Что используется

✅ **ServiceAccount токен** - автоматически создается Kubernetes
✅ **Kubernetes Auth Method** - безопасная аутентификация
✅ **Vault Agent Injector** - автоматически инжектирует секреты
✅ **Role-based access** - каждый сервис имеет свою роль

## Проверка

### Проверить, что Vault Agent работает

```bash
# Проверить, что Vault Agent sidecar запущен
kubectl get pods -n platform -l app=arch-repo-service -o jsonpath='{.items[0].spec.containers[*].name}'
# Должно показать: arch-repo-service vault-agent

# Проверить логи Vault Agent
kubectl logs -n platform -l app=arch-repo-service -c vault-agent --tail=50

# Проверить, что секреты записаны в файлы
kubectl exec -n platform -l app=arch-repo-service -c arch-repo-service -- \
  cat /vault/secrets/arch-repo-service
```

### Проверить аутентификацию

```bash
# Проверить, что ServiceAccount существует
kubectl get serviceaccount arch-repo-service -n platform

# Проверить, что Vault Agent использует правильную роль
kubectl logs -n platform -l app=arch-repo-service -c vault-agent | grep "role"
```

## Безопасность

Этот подход безопасен, потому что:

1. **ServiceAccount токены** автоматически ротируются Kubernetes
2. **Ограниченные права** - каждый сервис имеет доступ только к своим секретам
3. **Нет хранения токенов** - токены не хранятся в коде или конфигурации
4. **Автоматическое управление** - Vault Agent управляет жизненным циклом токенов
5. **Принцип наименьших привилегий** - каждый сервис имеет доступ только к нужным секретам

## Сравнение с Job'ами

| Компонент | Метод аутентификации | Токен |
|-----------|---------------------|-------|
| **Сервисы** (arch-repo-service, portal, etc.) | Kubernetes Auth через ServiceAccount | ServiceAccount токен → Vault токен (автоматически) |
| **Job'ы** (hasura-vault-role, secure-vault-role) | Прямой токен из Secret | vault-setup-token (ограниченный) или vault-root-token (fallback) |

## Дополнительная информация

- [Официальная документация Vault Agent Injector](https://www.vaultproject.io/docs/platform/k8s/injector)
- [Kubernetes Auth Method](https://www.vaultproject.io/docs/auth/kubernetes)
