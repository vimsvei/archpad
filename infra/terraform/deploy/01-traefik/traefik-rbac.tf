# Дополнительные RBAC ресурсы для Traefik
# Создаём ClusterRoleBinding вручную, если Helm chart не создал его правильно

resource "kubernetes_cluster_role_binding_v1" "traefik" {
  metadata {
    name = "traefik"
    labels = {
      "app.kubernetes.io/name"     = "traefik"
      "app.kubernetes.io/instance" = var.k8s_namespace_traefik
    }
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = kubernetes_cluster_role_v1.traefik.metadata[0].name
  }

  subject {
    kind      = "ServiceAccount"
    name      = "traefik"
    namespace = kubernetes_namespace.traefik.metadata[0].name
  }

  depends_on = [
    kubernetes_namespace.traefik,
    helm_release.traefik
  ]
}

resource "kubernetes_cluster_role_v1" "traefik" {
  metadata {
    name = "traefik"
    labels = {
      "app.kubernetes.io/name"     = "traefik"
      "app.kubernetes.io/instance" = var.k8s_namespace_traefik
    }
  }

  rule {
    api_groups = [""]
    resources  = ["configmaps", "endpoints", "persistentvolumeclaims", "secrets", "services"]
    verbs      = ["get", "list", "watch"]
  }

  rule {
    api_groups = [""]
    resources  = ["nodes"]
    verbs      = ["list", "watch"]
  }

  rule {
    api_groups = [""]
    resources  = ["nodes/status"]
    verbs      = ["get"]
  }

  rule {
    api_groups = [""]
    resources  = ["pods"]
    verbs      = ["get", "list", "watch"]
  }

  rule {
    api_groups = ["extensions", "networking.k8s.io"]
    resources  = ["ingresses"]
    verbs      = ["get", "list", "watch"]
  }

  rule {
    api_groups = ["extensions", "networking.k8s.io"]
    resources  = ["ingresses/status"]
    verbs      = ["update"]
  }

  rule {
    api_groups = ["traefik.io"]
    resources  = ["*"]
    verbs      = ["get", "list", "watch"]
  }

  depends_on = [
    helm_release.traefik
  ]
}
