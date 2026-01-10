# Container Registry configuration for Vault namespace

resource "kubernetes_secret" "registry_credentials" {
  count = local.registry_enabled ? 1 : 0

  metadata {
    name      = "registry-credentials"
    namespace = kubernetes_namespace.vault.metadata[0].name
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
  count = local.registry_enabled ? 1 : 0

  metadata {
    name      = "registry-service-account"
    namespace = kubernetes_namespace.vault.metadata[0].name
  }

  image_pull_secret {
    name = kubernetes_secret.registry_credentials[0].metadata[0].name
  }

  depends_on = [kubernetes_secret.registry_credentials]
}
