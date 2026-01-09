resource "kubernetes_namespace" "cert_manager" {
  metadata { name = "cert-manager" }
}

resource "helm_release" "cert_manager" {
  name       = "cert-manager"
  namespace  = kubernetes_namespace.cert_manager.metadata[0].name
  repository = "https://charts.jetstack.io"
  chart      = "cert-manager"
  version    = "1.14.5"

  set {
    name  = "crds.enabled"
    value = "true"
  }

  dynamic "set" {
    for_each = local.registry_enabled ? [1] : []
    content {
      name  = "serviceAccount.create"
      value = "false"
    }
  }

  dynamic "set" {
    for_each = local.registry_enabled ? [1] : []
    content {
      name  = "serviceAccount.name"
      value = kubernetes_service_account.registry_sa["cert-manager"].metadata[0].name
    }
  }
}

