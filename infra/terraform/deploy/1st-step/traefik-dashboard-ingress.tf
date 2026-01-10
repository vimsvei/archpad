# IngressRoute для Traefik Dashboard
# Используем null_resource с kubectl для создания IngressRoute после установки Traefik CRD

resource "null_resource" "traefik_dashboard_ingressroute" {
  depends_on = [
    time_sleep.wait_for_traefik_crd,
    helm_release.traefik,
  ]

  provisioner "local-exec" {
    command = <<-EOT
      kubectl apply --kubeconfig=${local.kubeconfig_file} -f - <<'YAML_EOF'
apiVersion: traefik.io/v1alpha1
kind: IngressRoute
metadata:
  name: traefik-dashboard
  namespace: ${kubernetes_namespace.traefik.metadata[0].name}
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(`traefik.archpad.pro`)
      kind: Rule
      services:
        - name: api@internal
          kind: TraefikService
  tls: {}
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
