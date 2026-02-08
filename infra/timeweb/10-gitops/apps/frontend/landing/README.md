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
- `NEXT_PUBLIC_TOLGEE_API_URL` и `TOLGEE_API_URL` — из `kv/data/archpad/demo/tolgee/front`
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

## Troubleshooting

### Пустая страница / Safari не находит сервер

1. **DNS** — убедитесь, что `archpad.pro` резолвится в IP Ingress:
   ```bash
   nslookup archpad.pro
   # или
   dig archpad.pro A
   ```
   Добавьте A/CNAME запись на IP вашего Ingress (Traefik LoadBalancer).

2. **TLS secret в platform** — для HTTPS нужен `wildcard-archpad-pro-tls`:
   ```bash
   kubectl get secret wildcard-archpad-pro-tls -n platform
   ```
   Если нет — Job `mailpit-copy-tls-secret` копирует из argocd, или вручную:
   ```bash
   kubectl get secret wildcard-archpad-pro-tls -n argocd -o yaml | \
     sed 's/namespace: argocd/namespace: platform/' | \
     sed '/resourceVersion:/d' | sed '/uid:/d' | sed '/creationTimestamp:/d' | \
     kubectl apply -f -
   ```

3. **Логи landing** — проверить, что pod получает запросы:
   ```bash
   kubectl logs -n platform -l app=landing --tail=50
   ```

4. **Проверка из кластера**:
   ```bash
   kubectl run -it --rm debug --image=curlimages/curl --restart=Never -- \
     curl -s -o /dev/null -w "%{http_code}" http://landing.platform.svc:3000/
   ```
