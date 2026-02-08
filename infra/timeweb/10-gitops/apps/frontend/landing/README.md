# Landing

Landing — Next.js приложение лендинга ArchPad, доступное через `archpad.pro`.

## Манифесты

- `landing.app.yaml` — ArgoCD Application
- `landing.serviceaccount.yaml` — ServiceAccount для Vault Kubernetes Auth
- `landing.deployment.yaml` — Deployment с Vault Agent Injector
- `landing.service.yaml` — Service
- `landing.ingressroute.yaml` — IngressRoute (Traefik)

## Vault

Секреты в `/v1/kv/data/archpad/demo/frontend/landing`:

- `NEXT_PUBLIC_TOLGEE_API_KEY` — API ключ Tolgee
- `NEXT_PUBLIC_TOLGEE_API_URL` — URL Tolgee API (например `https://i18n.archpad.pro`)
- `NEXT_PUBLIC_SITE_URL` — публичный URL лендинга (по умолчанию `https://archpad.pro`)

ServiceAccount `landing` должен быть добавлен в Vault роль `platform` (bound_service_account_names).

## Настройка DNS

Добавить A/CNAME запись для `archpad.pro` на адрес Ingress.

## Проверка

```bash
kubectl get deployment landing -n platform
kubectl get pods -n platform -l app=landing
curl -s https://archpad.pro | head -20
```
