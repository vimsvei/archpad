# Container Registry configuration for Traefik namespace

resource "kubernetes_secret" "registry_credentials" {
  count = local.registry_enabled ? 1 : 0

  metadata {
    name      = "registry-credentials"
    namespace = var.k8s_namespace_traefik
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
    namespace = var.k8s_namespace_traefik
  }

  image_pull_secret {
    name = kubernetes_secret.registry_credentials[0].metadata[0].name
  }

  depends_on = [kubernetes_secret.registry_credentials]
}
