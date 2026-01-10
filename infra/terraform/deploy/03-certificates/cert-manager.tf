resource "kubernetes_namespace" "cert_manager" {
  metadata { 
    name = "cert-manager" 
  }
}

resource "helm_release" "cert_manager" {
  name       = "cert-manager"
  namespace  = kubernetes_namespace.cert_manager.metadata[0].name
  repository = "oci://quay.io/jetstack/charts"
  chart      = "cert-manager"
  version    = "v1.19.2"

  timeout    = 600
  
  atomic                     = false
  cleanup_on_fail           = false
  disable_webhooks          = true
  wait                      = true
  wait_for_jobs            = false

  # Игнорируем изменения версии, если она обновлена через панель управления
  lifecycle {
    ignore_changes = [version]
  }

  # CRD должны устанавливаться автоматически, но для cert-manager v1.14+
  # может потребоваться установить их отдельно или использовать installCRDs=true
  set {
    name  = "installCRDs"
    value = "true"
  }
  
  # Также оставляем crds.enabled для совместимости
  set {
    name  = "crds.enabled"
    value = "true"
  }

  # Настройка ServiceAccount для использования registry credentials
  dynamic "set" {
    for_each = local.registry_enabled && length(kubernetes_service_account.registry_sa) > 0 ? [1] : []
    content {
      name  = "serviceAccount.create"
      value = "false"
    }
  }

  dynamic "set" {
    for_each = local.registry_enabled && length(kubernetes_service_account.registry_sa) > 0 ? [1] : []
    content {
      name  = "serviceAccount.name"
      value = kubernetes_service_account.registry_sa[0].metadata[0].name
    }
  }

  depends_on = [
    kubernetes_namespace.cert_manager,
    kubernetes_service_account.registry_sa
  ]
}

# Ждем, пока cert-manager будет готов и CRD установлены
resource "time_sleep" "wait_for_cert_manager" {
  depends_on = [
    helm_release.cert_manager,
    null_resource.install_cert_manager_crds
  ]
  create_duration = "30s"  # Уменьшено, так как CRD устанавливаются отдельно
}
