# Отладка доступа к Vault UI

## Проблема: "no available server" при открытии https://vault.archpad.pro

## Проверка статуса

### 1. Проверить сервис Vault

```bash
kubectl get svc -n vault --kubeconfig=../../init/kubeconfig.yaml
```

Должен быть сервис `vault` типа `ClusterIP` на порту 8200.

### 2. Проверить поды Vault

```bash
kubectl get pods -n vault --kubeconfig=../../init/kubeconfig.yaml
kubectl logs -n vault -l app.kubernetes.io/name=vault --kubeconfig=../../init/kubeconfig.yaml
```

### 3. Проверить IngressRoute

```bash
kubectl get ingressroute -n vault --kubeconfig=../../init/kubeconfig.yaml
kubectl describe ingressroute vault -n vault --kubeconfig=../../init/kubeconfig.yaml
```

### 4. Проверить DNS

```bash
# Проверить резолвинг домена
dig vault.archpad.pro
nslookup vault.archpad.pro

# Должен вернуть: 85.239.35.237
```

### 5. Проверить сервис Traefik

```bash
kubectl get svc -n traefik --kubeconfig=../../init/kubeconfig.yaml
```

## Возможные причины

1. **DNS не настроен** - домен `vault.archpad.pro` не резолвится в `85.239.35.237`
2. **IngressRoute не создан** - проверьте, был ли выполнен `terraform apply` после создания `vault-ingress.tf`
3. **Сервис Vault не работает** - проверьте логи подов Vault
4. **Неверное имя сервиса** - в IngressRoute указано `vault`, но сервис может иметь другое имя
5. **Проблема с портом** - сервис Vault должен слушать на порту 8200

## Решение

1. **Убедитесь, что DNS настроен:**
   ```
   vault.archpad.pro → A → 85.239.35.237
   ```

2. **Проверьте, что IngressRoute создан:**
   ```bash
   terraform apply  # Если IngressRoute не создан
   ```

3. **Проверьте логи Traefik:**
   ```bash
   kubectl logs -n traefik -l app.kubernetes.io/name=traefik --kubeconfig=../../init/kubeconfig.yaml | grep vault
   ```

4. **Проверьте события:**
   ```bash
   kubectl get events -n vault --sort-by='.lastTimestamp' --kubeconfig=../../init/kubeconfig.yaml
   kubectl get events -n traefik --sort-by='.lastTimestamp' --kubeconfig=../../init/kubeconfig.yaml
   ```
