# Импорт существующих ресурсов в Terraform

Если ресурсы уже существуют в Kubernetes (созданные ранее через другой модуль), но отсутствуют в state файле Terraform, их нужно импортировать.

## Команды для импорта

### 1. Импорт namespace
```bash
terraform import kubernetes_namespace.traefik traefik
```

### 2. Импорт registry secret
```bash
terraform import 'kubernetes_secret.registry_credentials[0]' traefik/registry-credentials
```

### 3. Импорт service account
```bash
terraform import 'kubernetes_service_account.registry_sa[0]' traefik/registry-service-account
```

### 4. Импорт ClusterRole
```bash
terraform import kubernetes_cluster_role_v1.traefik traefik
```

### 5. Импорт ClusterRoleBinding
```bash
terraform import kubernetes_cluster_role_binding_v1.traefik traefik
```

### 6. Импорт Helm release
Если Traefik установлен через Helm:
```bash
terraform import helm_release.traefik traefik/traefik
```

## Проверка после импорта

После импорта выполните:
```bash
terraform plan
```

Это покажет разницу между реальным состоянием и желаемым. Если есть различия, Terraform предложит их исправить.

## Альтернативное решение

Если импорт слишком сложен или ресурсы отличаются от желаемого состояния, можно:

1. **Удалить ресурсы вручную** и дать Terraform создать их заново:
   ```bash
   kubectl delete namespace traefik
   ```

2. **Или удалить только проблемные ресурсы**:
   ```bash
   kubectl delete secret registry-credentials -n traefik
   ```

⚠️ **ВНИМАНИЕ:** Удаление ресурсов может привести к простою сервиса. Используйте с осторожностью!
