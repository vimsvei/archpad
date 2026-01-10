# TLS Сертификаты и Let's Encrypt

## Почему используется TRAEFIK DEFAULT CERTIFICATE?

**Сейчас используется самоподписанный сертификат Traefik по умолчанию** потому что:

1. **Cert-Manager еще не развернут** - он развертывается во **2nd-step**
2. **Let's Encrypt ClusterIssuer не создан** - создается во **2nd-step** после установки cert-manager
3. **TLSStore не настроен** - настраивается во **2nd-step** для использования Let's Encrypt сертификатов

## Когда появятся Let's Encrypt сертификаты?

После развертывания **2nd-step**:

1. **Cert-Manager** будет установлен
2. **ClusterIssuer для Let's Encrypt** будет создан
3. **TLSStore для Let's Encrypt** будет настроен
4. **Certificate ресурсы** будут созданы для каждого домена
5. **Let's Encrypt сертификаты** будут автоматически выданы и использоваться

## Текущий статус

**1st-step (текущий):**
- ✅ Traefik развернут
- ✅ Vault развернут
- ❌ Cert-Manager - **не развернут** (будет в 2nd-step)
- ❌ Let's Encrypt - **не настроен** (будет в 2nd-step)
- ⚠️ Используется самоподписанный сертификат Traefik по умолчанию

**2nd-step (следующий):**
- ✅ Cert-Manager будет развернут
- ✅ Let's Encrypt ClusterIssuer будет создан
- ✅ TLSStore будет настроен
- ✅ Let's Encrypt сертификаты будут автоматически выданы

## Что делать сейчас?

1. **Завершить 1st-step** - Traefik и Vault уже развернуты
2. **Настроить DNS** - `*.archpad.pro → 85.239.35.237`
3. **Перейти к 2nd-step** - развернуть cert-manager и настроить Let's Encrypt

## После развертывания 2nd-step

Let's Encrypt сертификаты будут автоматически выданы для:
- `vault.archpad.pro`
- `traefik.archpad.pro`
- `hasura.archpad.pro`
- и других доменов

И вы увидите в браузере **валидный SSL сертификат** вместо TRAEFIK DEFAULT CERTIFICATE.
