# IngressRoute для pgAdmin через Traefik
# Используем null_resource с kubectl для создания IngressRoute после установки Traefik CRD

locals {
  traefik_ready = try(data.terraform_remote_state.traefik.outputs.traefik_namespace != null, false)
}

resource "null_resource" "pgadmin_ingressroute" {
  count = local.traefik_ready ? 1 : 0

  depends_on = [
    kubernetes_service.pgadmin,
  ]

  provisioner "local-exec" {
    command = <<-EOT
      kubectl apply --kubeconfig=${local.kubeconfig_file} -f - <<'YAML_EOF'
${templatefile("${path.module}/pgadmin-ingressroute.yaml.tpl", {
  traefik_namespace = local.traefik_namespace
  pgadmin_namespace = kubernetes_namespace.pgadmin.metadata[0].name
  host              = var.pgadmin_host
})}
YAML_EOF
    EOT
  }

  provisioner "local-exec" {
    when    = destroy
    command = <<-EOT
      kubectl delete ingressroute pgadmin -n ${self.triggers.pgadmin_namespace} --kubeconfig=${self.triggers.kubeconfig_file} --ignore-not-found=true
    EOT
  }

  triggers = {
    traefik_namespace  = local.traefik_namespace
    pgadmin_namespace  = kubernetes_namespace.pgadmin.metadata[0].name
    pgadmin_host       = var.pgadmin_host
    pgadmin_service    = kubernetes_service.pgadmin.metadata[0].name
    kubeconfig_file    = local.kubeconfig_file
  }
}
