# Container Registry configuration for TimeWeb Cloud
# 
# Примечание: Container Registry нужно создать вручную через панель управления TimeWeb Cloud:
# 1. Перейдите в раздел Kubernetes -> Реестры контейнеров
# 2. Создайте реестр и сохраните токен (начинается с registry-)
# 3. Укажите переменные registry_url (домен, например: archpad-cr.registry.twcstorage.ru) 
#    и registry_token в terraform.tfvars
#
# После создания реестра, Kubernetes будет использовать его для загрузки ваших образов
# Пример использования образа: archpad-cr.registry.twcstorage.ru/your-app:tag

locals {
  # Namespace для которых нужны секреты реестра
  registry_namespaces = [
    "default",
    "hasura",
    "traefik",
    "vault",
    "cert-manager",
  ]
}

# Секреты реестра для всех namespace
resource "kubernetes_secret" "registry_credentials" {
  for_each = local.registry_enabled ? toset(local.registry_namespaces) : toset([])

  metadata {
    name      = "registry-credentials"
    namespace = each.value
  }

  type = "kubernetes.io/dockerconfigjson"

  data = {
    ".dockerconfigjson" = jsonencode({
      auths = {
        (var.registry_url) = {
          username = "registry"
          password = var.registry_token
          auth     = base64encode("registry:${var.registry_token}")
        }
      }
    })
  }
}

# ServiceAccount с секретом для pull образов из реестра в каждом namespace
resource "kubernetes_service_account" "registry_sa" {
  for_each = local.registry_enabled ? toset(local.registry_namespaces) : toset([])

  metadata {
    name      = "registry-service-account"
    namespace = each.value
  }

  image_pull_secret {
    name = kubernetes_secret.registry_credentials[each.value].metadata[0].name
  }

  depends_on = [kubernetes_secret.registry_credentials]
}
