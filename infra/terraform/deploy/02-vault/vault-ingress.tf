# Используем null_resource с kubectl для создания IngressRoute после установки Traefik CRD
# Это позволяет избежать ошибок на этапе plan, когда CRD еще не установлен
# IngressRoute будет создан только если Traefik уже развернут

resource "null_resource" "vault_ingressroute" {
  count = local.traefik_ready ? 1 : 0

  depends_on = [
    helm_release.vault,
  ]

  provisioner "local-exec" {
    command = <<-EOT
      kubectl apply --kubeconfig=${local.kubeconfig_file} -f - <<'YAML_EOF'
${templatefile("${path.module}/ingressroute.yaml.tpl", {
  vault_namespace = kubernetes_namespace.vault.metadata[0].name
  vault_host      = var.vault_host
})}
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
    traefik_crd     = try(local.traefik_crd_ready, "not-ready")
    vault_release   = helm_release.vault.id
    kubeconfig_file = local.kubeconfig_file
  }
}
