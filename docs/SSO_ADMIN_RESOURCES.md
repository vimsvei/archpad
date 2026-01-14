# SSO для административных ресурсов

## Обзор

Проектирование единого входа (SSO) для административных ресурсов инфраструктуры:
- **Traefik Dashboard** (`proxy.archpad.pro`)
- **Vault UI** (`vault.archpad.pro`)
- **Grafana** (`monitoring.archpad.pro`)
- **ArgoCD** (`argocd.archpad.pro`)
- **Другие административные ресурсы**

## Цели

1. **Единое окно авторизации** - один вход для всех административных ресурсов
2. **Централизованное управление пользователями** - через Kratos
3. **Отдельный пул административных пользователей** - не пересекается с пользователями портала
4. **Безопасность** - проверка аутентификации на стороне Kratos
5. **Fallback на логин/пароль** - если SSO недоступно, но проверка через Kratos API

## Архитектура

### Компоненты

- **Kratos** - Identity Management (IdM) для административных пользователей
- **Hydra** - OAuth2/OIDC сервер (уже настроен)
- **Oathkeeper** - API Gateway / Authorization Proxy (уже настроен)

### Поток аутентификации

```
Пользователь → Oathkeeper → Hydra (OAuth2) → Kratos (проверка пользователя) → Доступ к ресурсу
```

Если SSO недоступно:
```
Пользователь → Ресурс → Kratos API (проверка логин/пароль) → Доступ к ресурсу
```

## Анализ ресурсов

### 1. Traefik Dashboard

**URL:** `https://proxy.archpad.pro`

**Текущая аутентификация:**
- Basic Auth через Traefik Middleware
- Secret: `traefik-dashboard-auth` (htpasswd)

**Поддержка SSO:**
- ✅ **Forward Auth** - Traefik поддерживает forward auth через внешний сервис
- ✅ **OAuth2** - можно использовать OAuth2 через forward auth
- ✅ **OIDC** - можно использовать OIDC через forward auth

**Варианты реализации:**

**Вариант 1: Forward Auth через Oathkeeper (рекомендуется)**
- Использовать Oathkeeper как forward auth endpoint
- Oathkeeper проверяет токен через Hydra
- Если токена нет - редирект на Hydra для аутентификации

**Вариант 2: OAuth2 Middleware**
- Использовать Traefik OAuth2 middleware
- Прямая интеграция с Hydra

**Вариант 3: Fallback на Basic Auth + Kratos API**
- Если SSO недоступно - использовать Basic Auth
- Проверка пароля через Kratos Admin API

**Рекомендация:** ✅ Вариант 1 (Forward Auth через Oathkeeper)

**Ресурсы:** Без дополнительных ресурсов (Oathkeeper уже развернут)

---

### 2. Vault UI

**URL:** `https://vault.archpad.pro`

**Текущая аутентификация:**
- Vault токены (root token, user tokens)

**Поддержка SSO:**
- ✅ **OIDC Auth Method** - Vault поддерживает OIDC аутентификацию (бесплатно)
- ✅ **JWT Auth Method** - можно использовать JWT токены от Hydra
- ✅ **Userpass Auth Method** - можно использовать с проверкой через Kratos API

**Варианты реализации:**

**Вариант 1: OIDC Auth Method (рекомендуется)**
- Настроить Vault OIDC Auth Method с Hydra как провайдером
- Пользователи входят через Hydra → получают Vault токен

**Вариант 2: JWT Auth Method**
- Использовать JWT токены от Hydra
- Vault проверяет JWT через Hydra introspection endpoint

**Вариант 3: Userpass + Kratos API**
- Создать пользователей в Vault через Userpass method
- Проверка пароля через Kratos Admin API (кастомный plugin или external auth)

**Рекомендация:** ✅ Вариант 1 (OIDC Auth Method)

**Ресурсы:** Без дополнительных ресурсов

---

### 3. Grafana

**URL:** `https://monitoring.archpad.pro`

**Текущая аутентификация:**
- Локальные пользователи (admin/password)

**Поддержка SSO:**
- ✅ **Generic OAuth** - Grafana поддерживает Generic OAuth (бесплатно)
- ✅ **Generic OIDC** - Grafana поддерживает Generic OIDC (бесплатно)
- ✅ **LDAP** - можно использовать, но не подходит для Kratos

**Варианты реализации:**

**Вариант 1: Generic OAuth (рекомендуется)**
- Настроить Grafana Generic OAuth с Hydra
- Пользователи входят через Hydra → получают доступ к Grafana

**Вариант 2: Generic OIDC**
- Настроить Grafana Generic OIDC с Hydra
- Аналогично OAuth, но через OIDC протокол

**Вариант 3: Fallback на логин/пароль + Kratos API**
- Если SSO недоступно - использовать логин/пароль
- Проверка через Kratos Admin API (кастомный auth proxy)

**Рекомендация:** ✅ Вариант 1 (Generic OAuth)

**Ресурсы:** Без дополнительных ресурсов

---

### 4. ArgoCD

**URL:** `https://argocd.archpad.pro`

**Текущая аутентификация:**
- Локальные пользователи (admin/password)

**Поддержка SSO:**
- ✅ **OIDC** - ArgoCD поддерживает OIDC (бесплатно)
- ✅ **LDAP** - ArgoCD поддерживает LDAP (бесплатно)
- ✅ **SAML** - ArgoCD поддерживает SAML (бесплатно)
- ✅ **Dex** - можно использовать Dex как промежуточный слой

**Варианты реализации:**

**Вариант 1: OIDC (рекомендуется)**
- Настроить ArgoCD OIDC с Hydra
- Пользователи входят через Hydra → получают доступ к ArgoCD

**Вариант 2: Dex + Hydra**
- Использовать Dex как промежуточный слой
- Dex подключается к Hydra через OIDC

**Вариант 3: Fallback на логин/пароль + Kratos API**
- Если SSO недоступно - использовать логин/пароль
- Проверка через Kratos Admin API (кастомный auth proxy)

**Рекомендация:** ✅ Вариант 1 (OIDC)

**Ресурсы:** Без дополнительных ресурсов

---

## Управление пользователями

### Отдельный пул административных пользователей в Kratos

**Схема идентификации:**

Создать отдельную схему для административных пользователей:

```json
{
  "id": "admin",
  "schema": {
    "type": "object",
    "properties": {
      "email": {
        "type": "string",
        "format": "email"
      },
      "name": {
        "type": "string"
      },
      "role": {
        "type": "string",
        "enum": ["admin", "operator", "viewer"]
      }
    },
    "required": ["email", "name", "role"]
  }
}
```

**Создание пользователей через Kratos Admin API:**

```bash
# Создать административного пользователя
curl -X POST https://auth.archpad.pro/admin/identities \
  -H "Authorization: Bearer <admin-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "schema_id": "admin",
    "traits": {
      "email": "admin@archpad.pro",
      "name": "Admin User",
      "role": "admin"
    },
    "credentials": {
      "password": {
        "config": {
          "password": "<secure-password>"
        }
      }
    }
  }'
```

**Управление через Kratos UI:**

Если настроен административный UI для Kratos, можно управлять пользователями через веб-интерфейс.

**Примечание:** Пользователи портала используют схему `default`, административные пользователи используют схему `admin`.

---

## План работ

### Этап 1: Подготовка инфраструктуры (1-2 дня)

1. **Настроить отдельную схему в Kratos для административных пользователей**
   - Создать схему `admin` в Kratos
   - Настроить поля: email, name, role

2. **Создать OAuth2 клиенты в Hydra для каждого ресурса**
   - Traefik Dashboard client
   - Vault client
   - Grafana client
   - ArgoCD client

3. **Настроить Oathkeeper для forward auth**
   - Создать access rules для административных ресурсов
   - Настроить forward auth endpoint

**Ресурсы:**
- CPU: 0 (используем существующие компоненты)
- Memory: 0 (используем существующие компоненты)
- Storage: 0 (используем существующие компоненты)

---

### Этап 2: Интеграция Traefik Dashboard (1 день)

1. **Настроить Forward Auth через Oathkeeper**
   - Создать Traefik ForwardAuth middleware
   - Настроить Oathkeeper endpoint для forward auth
   - Обновить IngressRoute для Traefik Dashboard

2. **Протестировать аутентификацию**
   - Проверить редирект на Hydra
   - Проверить получение токена
   - Проверить доступ к Traefik Dashboard

**Ресурсы:**
- CPU: 0 (используем существующие компоненты)
- Memory: 0 (используем существующие компоненты)

---

### Этап 3: Интеграция Vault (1-2 дня)

1. **Настроить OIDC Auth Method в Vault**
   - Включить OIDC auth method
   - Настроить подключение к Hydra
   - Создать роль для административных пользователей

2. **Настроить политики доступа**
   - Создать политики для разных ролей (admin, operator, viewer)
   - Настроить маппинг ролей из Kratos

3. **Протестировать аутентификацию**
   - Проверить вход через Hydra
   - Проверить получение Vault токена
   - Проверить доступ к Vault UI

**Ресурсы:**
- CPU: 0 (используем существующие компоненты)
- Memory: 0 (используем существующие компоненты)

---

### Этап 4: Интеграция Grafana (1 день)

1. **Настроить Generic OAuth в Grafana**
   - Настроить OAuth2 провайдер (Hydra)
   - Настроить маппинг ролей из Kratos
   - Настроить автоматическое создание пользователей

2. **Настроить роли в Grafana**
   - Admin role - полный доступ
   - Editor role - редактирование дашбордов
   - Viewer role - только просмотр

3. **Протестировать аутентификацию**
   - Проверить вход через Hydra
   - Проверить доступ к Grafana
   - Проверить роли пользователей

**Ресурсы:**
- CPU: 0 (используем существующие компоненты)
- Memory: 0 (используем существующие компоненты)

---

### Этап 5: Интеграция ArgoCD (1-2 дня)

1. **Настроить OIDC в ArgoCD**
   - Настроить OIDC провайдер (Hydra)
   - Настроить маппинг ролей из Kratos
   - Настроить RBAC в ArgoCD

2. **Настроить RBAC политики**
   - Admin policy - полный доступ
   - Operator policy - управление приложениями
   - Viewer policy - только просмотр

3. **Протестировать аутентификацию**
   - Проверить вход через Hydra
   - Проверить доступ к ArgoCD
   - Проверить роли пользователей

**Ресурсы:**
- CPU: 0 (используем существующие компоненты)
- Memory: 0 (используем существующие компоненты)

---

### Этап 6: Fallback на логин/пароль (опционально, 2-3 дня)

Если SSO недоступно, реализовать проверку через Kratos API:

1. **Создать auth proxy для каждого ресурса**
   - Traefik: кастомный forward auth endpoint
   - Vault: external auth plugin или proxy
   - Grafana: кастомный auth proxy
   - ArgoCD: кастомный auth proxy

2. **Интегрировать с Kratos Admin API**
   - Проверка логина/пароля через Kratos
   - Получение информации о пользователе
   - Проверка ролей

**Ресурсы:**
- CPU: ~50m на каждый auth proxy
- Memory: ~64Mi на каждый auth proxy
- **Итого:** ~200m CPU, ~256Mi Memory (если нужен fallback)

---

## Оценка ресурсов

### Вычислительные ресурсы

**Без fallback (только SSO):**
- CPU: **0** (используем существующие компоненты)
- Memory: **0** (используем существующие компоненты)
- Storage: **0** (используем существующие компоненты)

**С fallback (SSO + логин/пароль через Kratos API):**
- CPU: **~200m** (auth proxies)
- Memory: **~256Mi** (auth proxies)
- Storage: **0**

### Трудозатраты

- **Этап 1:** 1-2 дня (подготовка инфраструктуры)
- **Этап 2:** 1 день (Traefik Dashboard)
- **Этап 3:** 1-2 дня (Vault)
- **Этап 4:** 1 день (Grafana)
- **Этап 5:** 1-2 дня (ArgoCD)
- **Этап 6:** 2-3 дня (fallback, опционально)

**Итого:** 7-11 дней (без fallback), 9-14 дней (с fallback)

### Секреты в Vault

Нужно создать секреты для OAuth2 клиентов:

1. **OAuth2 Client Secrets** (для каждого ресурса):
   - `kv/data/archpad/monitoring/oauth/traefik` - Traefik Dashboard client
   - `kv/data/archpad/monitoring/oauth/vault` - Vault client
   - `kv/data/archpad/monitoring/oauth/grafana` - Grafana client
   - `kv/data/archpad/monitoring/oauth/argocd` - ArgoCD client

2. **Kratos Admin Token** (для управления пользователями):
   - `kv/data/archpad/monitoring/kratos/admin-token` - токен для Kratos Admin API

---

## Сравнительная таблица

| Ресурс | SSO Поддержка | Метод | Сложность | Ресурсы |
|--------|---------------|-------|-----------|---------|
| Traefik Dashboard | ✅ Forward Auth | OAuth2 через Oathkeeper | Средняя | 0 |
| Vault UI | ✅ OIDC Auth Method | OIDC через Hydra | Средняя | 0 |
| Grafana | ✅ Generic OAuth | OAuth2 через Hydra | Низкая | 0 |
| ArgoCD | ✅ OIDC | OIDC через Hydra | Средняя | 0 |

**Все ресурсы поддерживают SSO в бесплатных версиях!** ✅

---

## Риски и митигация

### Риск 1: Проблемы совместимости

**Описание:** Возможны проблемы совместимости между Hydra и ресурсами.

**Митигация:**
- Тестирование на тестовом окружении перед развертыванием
- Использование стандартных протоколов (OAuth2/OIDC)
- Документирование всех конфигураций

### Риск 2: Сложность настройки

**Описание:** Настройка SSO может быть сложной для некоторых ресурсов.

**Митигация:**
- Поэтапное развертывание (по одному ресурсу)
- Детальная документация для каждого ресурса
- Тестирование после каждого этапа

### Риск 3: Зависимость от Kratos/Hydra

**Описание:** Все ресурсы зависят от Kratos/Hydra для аутентификации.

**Митигация:**
- Реализация fallback на логин/пароль через Kratos API
- Мониторинг доступности Kratos/Hydra
- Резервные методы аутентификации

---

## Рекомендации

### Приоритет развертывания

1. **Высокий приоритет:**
   - Grafana (самый простой для интеграции)
   - Traefik Dashboard (важный административный ресурс)

2. **Средний приоритет:**
   - Vault UI (важный, но требует больше настройки)
   - ArgoCD (важный, но требует больше настройки)

3. **Низкий приоритет:**
   - Fallback на логин/пароль (можно добавить позже)

### Подход к развертыванию

1. **Начать с Grafana** - самый простой для интеграции
2. **Затем Traefik Dashboard** - важный ресурс, средняя сложность
3. **Затем Vault и ArgoCD** - более сложные, но важные ресурсы
4. **В конце fallback** - если нужен резервный метод

---

## Следующие шаги

1. ✅ **Анализ завершен** - все ресурсы поддерживают SSO
2. ⏳ **Создать схему административных пользователей в Kratos**
3. ⏳ **Создать OAuth2 клиенты в Hydra**
4. ⏳ **Начать с Grafana** (самый простой)
5. ⏳ **Затем Traefik Dashboard**
6. ⏳ **Затем Vault и ArgoCD**
7. ⏳ **Добавить fallback** (опционально)

---

## Дополнительные ресурсы

- [Kratos Admin API](https://www.ory.sh/docs/kratos/reference/api#tag/identity)
- [Hydra OAuth2 Clients](https://www.ory.sh/docs/hydra/reference/api#tag/oAuth2)
- [Traefik Forward Auth](https://doc.traefik.io/traefik/middlewares/forwardauth/)
- [Vault OIDC Auth Method](https://developer.hashicorp.com/vault/docs/auth/oidc)
- [Grafana Generic OAuth](https://grafana.com/docs/grafana/latest/setup-grafana/configure-security/configure-authentication/generic-oauth/)
- [ArgoCD OIDC](https://argo-cd.readthedocs.io/en/stable/operator-manual/user-management/#existing-oidc-provider)
