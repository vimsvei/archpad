# Используем null_resource с kubectl для создания IngressRoute после установки Traefik CRD
# Это позволяет избежать ошибок на этапе plan, когда CRD еще не установлен

resource "null_resource" "vault_ingressroute" {
  depends_on = [
    time_sleep.wait_for_traefik_crd,
    helm_release.vault,
  ]

  provisioner "local-exec" {
    command = <<-EOT
      kubectl apply --kubeconfig=${local.kubeconfig_file} -f - <<'YAML_EOF'
apiVersion: traefik.io/v1alpha1
kind: IngressRoute
metadata:
  name: vault
  namespace: ${kubernetes_namespace.vault.metadata[0].name}
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(`${var.vault_host}`)
      kind: Rule
      services:
        - name: vault
          port: 8200
  tls: {}
YAML_EOF
    EOT
  }

  provisioner "local-exec" {
    when    = destroy
    command = <<-EOT
      kubectl delete ingressroute vault -n ${self.triggers.vault_namespace} --kubeconfig=${self.triggers.kubeconfig_file} --ignore-not-found=true
    EOT
  }

  triggers = {
    vault_namespace = kubernetes_namespace.vault.metadata[0].name
    vault_host      = var.vault_host
    traefik_crd     = time_sleep.wait_for_traefik_crd.id
    vault_release   = helm_release.vault.id
    kubeconfig_file = local.kubeconfig_file
  }
}
