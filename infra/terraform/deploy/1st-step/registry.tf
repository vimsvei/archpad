# Container Registry configuration for Traefik and Vault namespaces

locals {
  registry_namespaces = [
    "traefik",
    "vault",
  ]
}

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