# IngressRoute для Traefik Dashboard
# Используем null_resource с kubectl для создания IngressRoute после установки Traefik CRD

resource "null_resource" "traefik_dashboard_ingressroute" {
  depends_on = [
    time_sleep.wait_for_traefik_crd,
    helm_release.traefik,
    kubernetes_manifest.traefik_dashboard_basicauth_middleware,
  ]

  provisioner "local-exec" {
    command = <<-EOT
      kubectl apply --kubeconfig=${local.kubeconfig_file} -f - <<YAML_EOF
${templatefile("${path.module}/traefik-dashboard-ingressroute.yaml.tpl", {
  namespace        = kubernetes_namespace.traefik.metadata[0].name
  middleware_enabled = local.traefik_dashboard_auth_enabled
  middleware_name   = local.traefik_dashboard_auth_enabled ? "traefik-dashboard-basicauth" : ""
})}
YAML_EOF
    EOT
  }

  provisioner "local-exec" {
    when    = destroy
    command = <<-EOT
      kubectl delete ingressroute traefik-dashboard -n ${self.triggers.traefik_namespace} --kubeconfig=${self.triggers.kubeconfig_file} --ignore-not-found=true
    EOT
  }

  triggers = {
    traefik_namespace = kubernetes_namespace.traefik.metadata[0].name
    traefik_crd       = time_sleep.wait_for_traefik_crd.id
    traefik_release   = helm_release.traefik.id
    kubeconfig_file   = local.kubeconfig_file
  }
}
