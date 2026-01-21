# Настройка Vault для Archpad

## Обзор

Этот документ описывает полную настройку HashiCorp Vault для работы с сервисами Archpad в Kubernetes кластере. Vault используется для безопасного хранения и управления секретами (пароли, токены, ключи API и т.д.).

## Развертывание Vault

Vault развертывается через ArgoCD как Helm Application с использованием:
- **Storage**: S3 (хранилище в S3 bucket `9f328daa-archpad-s3-storage`, путь `vault-secret/`)
- **Mode**: Standalone (без HA для простоты)
- **UI**: Включен для веб-доступа
- **Ingress**: Traefik IngressRoute на `vault.archpad.pro`

**Важно**: Vault использует S3 storage backend. Если данные в S3 будут потеряны или очищены, Vault начнет новую инициализацию и все секреты будут потеряны!

### Требования

1. **Traefik** должен быть развернут и доступен
2. **Wildcard Certificate** должен быть выпущен для `*.archpad.pro`
3. **DNS** запись для `vault.archpad.pro` должна указывать на LoadBalancer IP Traefik

### После развертывания

#### 1. Копирование TLS Secret

TLS secret находится в namespace `argocd`, но нужен в namespace `vault` для IngressRoute:

```bash
kubectl get secret wildcard-archpad-pro-tls -n argocd -o yaml | \
  sed 's/namespace: argocd/namespace: vault/' | \
  sed '/resourceVersion:/d' | \
  sed '/uid:/d' | \
  sed '/creationTimestamp:/d' | \
  kubectl apply -f -
```

#### 2. Инициализация Vault

После развертывания Vault нужно:

1. **Разблокировать Vault** (unseal):
   ```bash
   # Получить unseal keys (обычно через UI при первом запуске)
   kubectl exec -n vault vault-0 -- vault operator init
   ```

2. **Разблокировать Vault** используя unseal keys:
   ```bash
   kubectl exec -n vault vault-0 -- vault operator unseal <unseal-key-1>
   kubectl exec -n vault vault-0 -- vault operator unseal <unseal-key-2>
   kubectl exec -n vault vault-0 -- vault operator unseal <unseal-key-3>
   ```

3. **Включить KV secrets engine** через UI Vault или CLI:
   - Через UI: зайти в `https://vault.archpad.pro`, выбрать "Enable new engine" → "KV" → версия 2
   - Через CLI: `kubectl exec -n vault vault-0 -- vault secrets enable -path=kv -version=2 kv`

#### 3. Настройка DNS

В панели управления DNS добавьте A-запись:
- **Имя**: `vault`
- **Тип**: A
- **Значение**: IP LoadBalancer Traefik (получить: `kubectl get svc -n traefik traefik`)

#### 4. Доступ к UI

После настройки DNS доступ к Vault UI:
- `https://vault.archpad.pro`

### Конфигурация

- **Namespace**: `vault`
- **Helm Chart**: `vault` от HashiCorp (версия 0.27.0)
- **Vault Version**: 1.18.0
- **Storage**: Raft на PersistentVolume (10Gi)
- **Service**: ClusterIP на порту 8200
- **Ingress**: Traefik IngressRoute на `vault.archpad.pro`

### Проблемы при развертывании

#### StorageClass не найден

Если StorageClass не найден в кластере, проверьте доступные:
```bash
kubectl get storageclass
```

И обновите `storageClass` в `vault.app.yaml` или оставьте пустую строку для использования default.

#### TLS Secret не найден

Убедитесь, что wildcard certificate выпущен и secret скопирован в namespace vault (см. выше).

## Архитектура

### Как сервисы получают секреты

**Backend сервисы и Portal НЕ используют токены напрямую!** Они используют **Kubernetes Auth Method** через ServiceAccount токены. Это безопасный и правильный подход.

#### Vault Agent Injector (автоматически)

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
   - Role "platform" или "secure" (из аннотации)
4. **Получает Vault токен** с правами политики "archpad"
5. **Читает секреты** из Vault
6. **Записывает секреты в файлы** `/vault/secrets/...`
7. **Приложение читает секреты** из этих файлов

```
┌─────────────────────────────────────────────────────────┐
│  Pod (arch-repo-service)                                 │
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
│  └── Role: "secure"                                      │
│      ├── Bound ServiceAccounts:                         │
│      │   - keycloak                                     │
│      │   - oathkeeper                                   │
│      ├── Bound Namespaces: secure                       │
│      └── Policies: archpad                              │
└─────────────────────────────────────────────────────────┘
```

### Что используется

✅ **ServiceAccount токен** - автоматически создается Kubernetes  
✅ **Kubernetes Auth Method** - безопасная аутентификация  
✅ **Vault Agent Injector** - автоматически инжектирует секреты  
✅ **Role-based access** - каждый сервис имеет свою роль

### Что НЕ используется

❌ **Root токен** - НЕ используется сервисами  
❌ **Ограниченный токен (vault-setup-token)** - НЕ используется сервисами  
❌ **Прямой доступ к Vault API** - НЕ используется сервисами

## Быстрый старт

### 1. Первоначальная настройка Vault

#### Шаг 1: Создать Secret с root токеном (только для первоначальной настройки)

```bash
# Получите root токен из Vault UI или из инициализации Vault
kubectl create secret generic vault-root-token \
  --from-literal=VAULT_ROOT_TOKEN='<your-vault-root-token>' \
  --namespace=vault
```

**Важно:** Root токен нужен только для первого запуска Job'а, который создаст ограниченный токен.

#### Шаг 2: Применить манифесты через GitOps

После push в Git ArgoCD автоматически выполнит настройку в следующем порядке:

1. **Настройка Kubernetes Auth Method** (`vault-setup-kubernetes-auth`):
   - Включает Kubernetes Auth Method
   - Настраивает конфигурацию (kubernetes_host, kubernetes_ca_cert, token_reviewer_jwt)
   - **Критично:** Без этого все поды с Vault Agent не смогут аутентифицироваться!

2. **Создание политик** (`vault-setup-policy`):
   - Применяет политику `vault-setup` в Vault
   - Применяет политику `archpad` в Vault
   - Создает ограниченный токен с политикой `vault-setup`
   - Выводит токен в логи

3. **Создание ролей** (`secure-vault-role`, `hasura-vault-role`):
   - Создает роль `secure` для namespace `secure`
   - Создает роль `platform` для namespace `platform`

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

### 2. Альтернатива: Применить вручную (для быстрого тестирования)

Если манифесты еще не применены через GitOps:

```bash
# 1. Настроить Kubernetes Auth Method (ВАЖНО: должно быть первым!)
kubectl apply -f infra/timeweb/10-gitops/apps/vault/vault-setup-kubernetes-auth.configmap.yaml
kubectl apply -f infra/timeweb/10-gitops/apps/vault/vault-setup-kubernetes-auth.job.yaml
kubectl wait --for=condition=complete job/vault-setup-kubernetes-auth -n vault --timeout=300s

# 2. Применить ConfigMap с политикой
kubectl apply -f infra/timeweb/10-gitops/apps/vault/vault-setup-policy.configmap.yaml

# 3. Применить Job для создания политики и токена
kubectl apply -f infra/timeweb/10-gitops/apps/vault/vault-setup-policy.job.yaml

# 4. Дождаться завершения Job
kubectl wait --for=condition=complete job/vault-setup-policy -n vault --timeout=300s

# 5. Получить токен из логов
kubectl logs job/vault-setup-policy -n vault | grep -A 5 "Token:"
```

## Настройка Kubernetes Auth Method

### Автоматическая настройка

Kubernetes Auth Method настраивается автоматически через Job `vault-setup-kubernetes-auth`, который:

1. **Включает Kubernetes Auth Method** (если еще не включен)
2. **Настраивает конфигурацию** Kubernetes Auth:
   - `kubernetes_host` - адрес Kubernetes API
   - `kubernetes_ca_cert` - CA сертификат Kubernetes
   - `token_reviewer_jwt` - ServiceAccount токен для проверки других токенов

**Порядок выполнения:**
1. `vault-setup-kubernetes-auth` (sync-wave: 5) - настраивает Kubernetes Auth Method
2. `vault-setup-policy` (sync-wave: 6) - создает политики и ограниченный токен
3. `secure-vault-role` (sync-wave: 41) - создает роль для namespace `secure`
4. `hasura-vault-role` (sync-wave: 46) - создает роль для namespace `platform`

**Важно:** Job `vault-setup-kubernetes-auth` должен выполниться успешно до того, как другие Job'ы попытаются создать роли. Если Kubernetes Auth Method не настроен, все поды с Vault Agent не смогут аутентифицироваться.

### Проблема (устарело)

Job'ы для настройки Vault roles (`hasura-vault-role.job.yaml`, `secure-vault-role.job.yaml`) изначально использовали root токен из Secret `vault-root-token`. Это небезопасно, так как:
- Root токен имеет полный доступ ко всем секретам
- Если токен скомпрометирован, злоумышленник получит доступ ко всем данным
- Root токен не должен использоваться в production

### Решение: Ограниченный токен

Создана политика `vault-setup` с ограниченными правами:
- ✅ Управление Kubernetes Auth Method
- ✅ Создание и обновление ролей
- ✅ Управление политиками (для создания политики archpad)
- ❌ НЕТ доступа к секретам
- ❌ НЕТ доступа к токенам
- ❌ НЕТ доступа к root функциям

### Политика vault-setup

```hcl
# Политика для настройки Vault (только для управления auth и roles)
# НЕ дает доступ к секретам

# Управление Kubernetes Auth Method
path "sys/auth/kubernetes" {
  capabilities = ["create", "read", "update", "delete", "sudo"]
}

path "sys/auth/kubernetes/*" {
  capabilities = ["create", "read", "update", "delete"]
}

# Конфигурация Kubernetes Auth
path "auth/kubernetes/config" {
  capabilities = ["create", "read", "update", "delete", "sudo"]
}

# Управление ролями Kubernetes Auth
path "auth/kubernetes/role/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

# Управление политиками
path "sys/policies/acl/vault-setup" {
  capabilities = ["create", "read", "update", "delete"]
}

path "sys/policies/acl/archpad" {
  capabilities = ["create", "read", "update", "delete"]
}

# Явно запрещаем доступ к секретам
path "kv/*" {
  capabilities = ["deny"]
}

# Запрещаем доступ к токенам
path "auth/token/*" {
  capabilities = ["deny"]
}
```

### Как это работает

Job'ы (`hasura-vault-role`, `secure-vault-role`) теперь:
1. **Пытаются использовать ограниченный токен** из Secret `vault-setup-token`
2. **Fallback на root токен** (для обратной совместимости, если ограниченный токен не создан)
3. **Логируют предупреждение**, если используется root токен

## Проверка работы

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

### Проверить, что Job'ы используют ограниченный токен

```bash
# Проверить логи Job'ов
kubectl logs job/hasura-vault-role -n platform | grep "Using limited setup token"
kubectl logs job/secure-vault-role -n secure | grep "Using limited setup token"
```

### Проверить безопасность

```bash
# Проверить, что сервисы используют Kubernetes Auth
kubectl exec -n platform deployment/arch-repo-service -c vault-agent -- \
  cat /vault/secrets/arch-repo-service

# Проверить, что используется ограниченный токен
kubectl get secret vault-setup-token -n platform

# Проверить, что root токен не используется (должен быть пустым или не существовать)
kubectl get secret vault-root-token -n platform 2>/dev/null || echo "Root token secret not found (good!)"
```

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
│   ├── admin/               # Keycloak admin bootstrap
│   ├── connect/             # Keycloak public hostname (KEYCLOAK_HOST)
│   ├── db/                  # Keycloak DB credentials
│   └── smtp/                # Keycloak SMTP settings (optional)
├── hasura/
│   ├── hasura/              # Секреты для Hasura
│   └── secret/             # Hasura admin secret
├── ory/
│   └── oathkeeper/         # Секреты для Oathkeeper
├── tolgee/                  # Секреты для Tolgee
└── postgres/                # Секреты для PostgreSQL
```

### Политика archpad

Политика `archpad` дает доступ на чтение всех секретов в `kv/data/archpad`:

```hcl
# Читать секреты в kv/data/archpad и всех подпутях
path "kv/data/archpad" {
  capabilities = ["read"]
}
```

## Сравнение методов аутентификации

| Компонент | Метод аутентификации | Токен |
|-----------|---------------------|-------|
| **Сервисы** (arch-repo-service, portal, etc.) | Kubernetes Auth через ServiceAccount | ServiceAccount токен → Vault токен (автоматически) |
| **Job'ы** (hasura-vault-role, secure-vault-role) | Прямой токен из Secret | vault-setup-token (ограниченный) или vault-root-token (fallback) |

## Решение проблем

### Проблема: Vault начал новую инициализацию (Vault is sealed)

**Симптомы:**
- Vault возвращает ошибку "Vault is sealed"
- CI/CD пайплайны не могут получить секреты
- Сервисы не могут получить секреты через Vault Agent Injector
- Vault пишет данные в кластер (file storage), а не в S3

**Причины:**
Vault должен использовать S3 storage backend (`9f328daa-archpad-s3-storage`, путь `vault-secret/`), но может использовать file storage по умолчанию. Новая инициализация может начаться если:

1. **Helm chart использует file storage вместо S3**
   - Helm chart для Vault по умолчанию может создавать file storage
   - `extraConfig` добавляется в конец конфигурации, но Vault использует первый найденный storage backend
   - Если file storage определен первым, S3 из `extraConfig` игнорируется
   - Решение: убедиться, что `dataStorage.enabled: false` и нет дефолтного file storage

1. **S3 bucket был очищен или переинициализирован**
   - Данные Vault были удалены из S3
   - Путь в S3 изменился

2. **Vault pod был пересоздан и не нашел данные в S3**
   - Проблемы с доступом к S3
   - Неправильные credentials для S3

3. **Vault был переинициализирован вручную**
   - Выполнена команда `vault operator init` вручную
   - Это создает новые unseal keys и root token

4. **Проблемы с доступом к S3**
   - S3 credentials изменились
   - S3 endpoint недоступен
   - Проблемы с сетью

**Диагностика:**

```bash
# 1. Проверить статус Vault
kubectl exec -n vault vault-0 -- vault status

# 2. Проверить логи Vault
kubectl logs -n vault vault-0 --tail=100

# 3. Проверить фактическую конфигурацию Vault (какой storage используется)
kubectl exec -n vault vault-0 -- cat /vault/config/extraconfig-from-values.hcl
kubectl exec -n vault vault-0 -- cat /vault/config/config.hcl

# 4. Проверить, используется ли file storage (данные в кластере)
kubectl exec -n vault vault-0 -- ls -la /vault/data 2>/dev/null || echo "File storage не используется (хорошо)"

# 5. Проверить доступность S3
# (требуется доступ к S3 bucket)
aws s3 ls s3://9f328daa-archpad-s3-storage/vault-secret/ --endpoint-url=https://s3.twcstorage.ru

# 6. Проверить конфигурацию Helm chart
kubectl get configmap vault-config -n vault -o yaml
```

**Решение:**

1. **Если Vault использует file storage вместо S3:**
   - Проверьте конфигурацию в `vault.app.yaml`: `dataStorage.enabled: false`
   - Убедитесь, что `extraVolumes: []` (пустой массив, не `emptyDir`)
   - Проверьте фактическую конфигурацию Vault в кластере (см. диагностику выше)
   - Если file storage используется, нужно:
     - Остановить Vault
     - Удалить данные из file storage (если они есть)
     - Обновить конфигурацию Helm chart
     - Перезапустить Vault
     - Переинициализировать Vault (он будет использовать S3)

2. **Если Vault был переинициализирован случайно:**
   - Восстановите данные из бэкапа S3 (если есть)
   - Или восстановите секреты вручную

3. **Если S3 bucket был очищен:**
   - Восстановите данные из бэкапа
   - Или переинициализируйте Vault и восстановите все секреты

4. **Если проблема с доступом к S3:**
   - Проверьте S3 credentials в `vault.app.yaml`
   - Проверьте доступность S3 endpoint
   - Проверьте сетевую связность

4. **Разпечатать Vault после переинициализации:**
   ```bash
   # Получить новые unseal keys (из логов или UI)
   kubectl logs -n vault vault-0 | grep "Unseal Key"

   # Разпечатать Vault
   kubectl exec -n vault vault-0 -- vault operator unseal <unseal-key-1>
   kubectl exec -n vault vault-0 -- vault operator unseal <unseal-key-2>
   kubectl exec -n vault vault-0 -- vault operator unseal <unseal-key-3>
   ```

5. **Восстановить секреты:**
   - После разпечатывания Vault нужно восстановить все секреты
   - Используйте скрипты из `infra/vault/seed.sh` или восстановите вручную

**Профилактика:**
- Регулярно делайте бэкапы S3 bucket
- Не выполняйте `vault operator init` вручную без необходимости
- Храните unseal keys в безопасном месте
- Настройте мониторинг статуса Vault

### Проблема: Job не может запуститься - ошибка pull образа

#### Диагностика

```bash
# Проверить статус Pod
kubectl get pods -n vault -l job-name=vault-setup-policy

# Проверить детали Pod
kubectl describe pod -n vault -l job-name=vault-setup-policy

# Проверить события
kubectl get events -n vault --sort-by='.lastTimestamp' | grep vault-setup-policy
```

#### Решение

Job использует образ `alpine:latest` с установкой `curl` и `jq`. Если проблема с образом, проверьте доступность образа:

```bash
# Проверить, доступен ли образ
docker pull alpine:latest
```

### Проблема: Job зависает или не завершается

#### Диагностика

```bash
# Проверить логи Pod
kubectl logs -n vault -l job-name=vault-setup-policy --tail=100

# Проверить статус Job
kubectl get job vault-setup-policy -n vault -o yaml

# Проверить, не заблокирован ли Vault
kubectl exec -n vault deployment/vault -- vault status
```

#### Решение: Проверить доступность Vault

```bash
# Проверить, доступен ли Vault
kubectl get pods -n vault
kubectl get svc -n vault

# Проверить, не заблокирован ли Vault
kubectl exec -n vault deployment/vault -- vault status
```

Если Vault заблокирован, нужно его разблокировать:

```bash
# Получить unseal keys (из инициализации Vault)
kubectl exec -n vault deployment/vault -- vault operator unseal <unseal-key-1>
kubectl exec -n vault deployment/vault -- vault operator unseal <unseal-key-2>
kubectl exec -n vault deployment/vault -- vault operator unseal <unseal-key-3>
```

### Проблема: Application OutOfSync/Missing

#### Решение

```bash
# Синхронизировать Application вручную
kubectl patch application platform-applications -n argocd --type merge -p '{"operation":{"initiatedBy":{"username":"admin"},"sync":{"revision":"HEAD"}}}'

# Или через ArgoCD CLI
argocd app sync platform-applications
```

### Проблема: Сервисы не могут получить секреты

#### Диагностика

```bash
# Проверить, что Vault Agent sidecar запущен
kubectl get pods -n platform -l app=arch-repo-service -o jsonpath='{.items[0].spec.containers[*].name}'

# Проверить логи Vault Agent
kubectl logs -n platform -l app=arch-repo-service -c vault-agent --tail=50

# Проверить, что секреты записаны в файлы
kubectl exec -n platform -l app=arch-repo-service -c arch-repo-service -- \
  ls -la /vault/secrets/
```

#### Решение

1. Проверить, что ServiceAccount существует:
   ```bash
   kubectl get serviceaccount arch-repo-service -n platform
   ```

2. Проверить, что Vault роль настроена:
   ```bash
   kubectl logs job/hasura-vault-role -n platform
   ```

3. Проверить, что политика `archpad` существует в Vault:
   ```bash
   kubectl exec -n vault deployment/vault -- vault policy read archpad
   ```

## Безопасность

Этот подход безопасен, потому что:

1. **ServiceAccount токены** автоматически ротируются Kubernetes
2. **Ограниченные права** - каждый сервис имеет доступ только к своим секретам
3. **Нет хранения токенов** - токены не хранятся в коде или конфигурации
4. **Автоматическое управление** - Vault Agent управляет жизненным циклом токенов
5. **Принцип наименьших привилегий** - каждый сервис имеет доступ только к нужным секретам
6. **Ограниченный токен для Job'ов** - Job'ы используют ограниченный токен вместо root токена

## Рекомендации

1. **Ротация токенов**: Настроить автоматическую ротацию ограниченного токена
2. **Мониторинг**: Настроить алерты на использование root токена
3. **Аудит**: Включить аудит в Vault для отслеживания доступа
4. **Политики**: Разделить политики по сервисам для принципа наименьших привилегий
5. **Удалить root токен**: После проверки, что все работает с ограниченным токеном, удалите Secret с root токеном (но сохраните токен в безопасном месте)

## Дополнительная информация

- [Официальная документация Vault Agent Injector](https://www.vaultproject.io/docs/platform/k8s/injector)
- [Kubernetes Auth Method](https://www.vaultproject.io/docs/auth/kubernetes)
- [Vault Policies](https://www.vaultproject.io/docs/concepts/policies)
