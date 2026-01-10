# RBAC права для cert-manager ServiceAccount для работы с TimeWeb DNS webhook
# cert-manager использует registry-service-account для доступа к container registry,
# но этому ServiceAccount нужны дополнительные права для работы с webhook TimeWeb DNS
# RBAC ресурс создается только если используется DNS-01 challenge (timeweb_dns01_group_name != null)

resource "kubernetes_cluster_role" "cert_manager_timeweb_webhook" {
  count = var.timeweb_dns01_group_name != null ? 1 : 0

  metadata {
    name   = "cert-manager-timeweb-webhook"
    labels = local.cert_manager_labels
  }

  rule {
    api_groups = [var.timeweb_dns01_group_name]
    resources  = ["*"]
    verbs      = ["*"]
  }
}

resource "kubernetes_cluster_role_binding" "cert_manager_timeweb_webhook" {
  count = var.timeweb_dns01_group_name != null ? 1 : 0

  metadata {
    name   = "cert-manager-timeweb-webhook"
    labels = local.cert_manager_labels
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = kubernetes_cluster_role.cert_manager_timeweb_webhook[0].metadata[0].name
  }

  subject {
    kind      = "ServiceAccount"
    name      = length(kubernetes_service_account.registry_sa) > 0 ? kubernetes_service_account.registry_sa[0].metadata[0].name : "cert-manager"
    namespace = kubernetes_namespace.cert_manager.metadata[0].name
  }

  depends_on = [
    kubernetes_cluster_role.cert_manager_timeweb_webhook,
    kubernetes_namespace.cert_manager,
  ]
}