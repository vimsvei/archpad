# Настройка DNS для ArchPad

## IP адрес LoadBalancer
**85.239.35.237**

## Требуемые DNS записи

### 1. Основной домен (wildcard)
```
*.archpad.pro  →  A  →  85.239.35.237  (TTL: 300)
```

Это покроет все поддомены:
- `vault.archpad.pro`
- `traefik.archpad.pro`
- `hasura.archpad.pro`
- и другие

### 2. Альтернативный вариант (если wildcard не поддерживается)
Можно создать отдельные A-записи для каждого поддомена:

```
archpad.pro      →  A  →  85.239.35.237  (TTL: 300)
vault.archpad.pro    →  A  →  85.239.35.237  (TTL: 300)
traefik.archpad.pro  →  A  →  85.239.35.237  (TTL: 300)
hasura.archpad.pro   →  A  →  85.239.35.237  (TTL: 300)
```

## Где настроить DNS

1. **У вашего регистратора домена** (где вы регистрировали `archpad.pro`)
2. **Или у DNS провайдера** (Cloudflare, Route53, Namecheap, etc.)

## Проверка DNS

После настройки DNS записей, проверьте распространение:

```bash
# Проверить DNS записи
dig vault.archpad.pro
dig traefik.archpad.pro
dig *.archpad.pro

# Или с помощью nslookup
nslookup vault.archpad.pro
nslookup traefik.archpad.pro
```

DNS записи могут распространяться от нескольких минут до 24 часов (в зависимости от TTL).

## Доступ к сервисам

После настройки DNS и создания IngressRoute:

### Vault UI
- URL: `https://vault.archpad.pro`
- IngressRoute уже создан в Terraform

### Traefik Dashboard
- URL: `https://traefik.archpad.pro/dashboard/`
- IngressRoute будет создан после `terraform apply`

### Временный доступ (до настройки DNS)

Можно временно использовать IP адрес напрямую (если порты доступны):

```bash
# Проверить доступные порты
kubectl get svc -n traefik --kubeconfig=../../init/kubeconfig.yaml

# Если порт 443 доступен напрямую, можно использовать:
# https://85.239.35.237 (не рекомендуется для production)
```

**Важно:** После настройки DNS используйте доменные имена, а не IP адреса.
