# Vault Deployment

## Обзор

Vault развертывается через ArgoCD как Helm Application с использованием:
- **Storage**: Raft (локальное хранилище на PersistentVolume)
- **Mode**: Standalone (без HA для простоты)
- **UI**: Включен для веб-доступа
- **Ingress**: Traefik IngressRoute на `vault.archpad.pro`

## Требования

1. **Traefik** должен быть развернут и доступен
2. **Wildcard Certificate** должен быть выпущен для `*.archpad.pro`
3. **DNS** запись для `vault.archpad.pro` должна указывать на LoadBalancer IP Traefik

## После развертывания

### 1. Копирование TLS Secret

TLS secret находится в namespace `argocd`, но нужен в namespace `vault` для IngressRoute:

```bash
kubectl get secret wildcard-archpad-pro-tls -n argocd -o yaml | \
  sed 's/namespace: argocd/namespace: vault/' | \
  sed '/resourceVersion:/d' | \
  sed '/uid:/d' | \
  sed '/creationTimestamp:/d' | \
  kubectl apply -f -
```

### 2. Инициализация Vault

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

### 3. Настройка DNS

В панели управления DNS добавьте A-запись:
- **Имя**: `vault`
- **Тип**: A
- **Значение**: IP LoadBalancer Traefik (получить: `kubectl get svc -n traefik traefik`)

### 4. Доступ к UI

После настройки DNS доступ к Vault UI:
- `https://vault.archpad.pro`

## Конфигурация

- **Namespace**: `vault`
- **Helm Chart**: `vault` от HashiCorp (версия 0.27.0)
- **Vault Version**: 1.18.0
- **Storage**: Raft на PersistentVolume (10Gi)
- **Service**: ClusterIP на порту 8200
- **Ingress**: Traefik IngressRoute на `vault.archpad.pro`

## Обновление

При изменении конфигурации Vault через Git изменения автоматически применятся через ArgoCD.

## Проблемы

### StorageClass не найден

Если StorageClass не найден в кластере, проверьте доступные:
```bash
kubectl get storageclass
```

И обновите `storageClass` в `vault.app.yaml` или оставьте пустую строку для использования default.

### TLS Secret не найден

Убедитесь, что wildcard certificate выпущен и secret скопирован в namespace vault (см. шаг 1 выше).
