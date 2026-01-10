# Проверка готовности CRD перед созданием ClusterIssuer
resource "null_resource" "check_crd_ready" {
  depends_on = [time_sleep.wait_for_cert_manager]

  provisioner "local-exec" {
    command = "KUBECONFIG_FILE='${local.kubeconfig_file}' CRD_NAME='clusterissuers.cert-manager.io' MAX_ATTEMPTS=120 bash '${path.module}/scripts/check-crd-ready.sh'"
  }

  triggers = {
    cert_manager_ready = time_sleep.wait_for_cert_manager.id
    kubeconfig_file    = local.kubeconfig_file
  }
}

# Cert-Manager ClusterIssuer для Let's Encrypt Staging (для тестирования)
# Используем null_resource с kubectl для обхода проблемы с проверкой CRD во время plan
resource "null_resource" "cluster_issuer_letsencrypt_staging" {
  depends_on = [null_resource.check_crd_ready]

  provisioner "local-exec" {
    environment = {
      KUBECONFIG = local.kubeconfig_file
    }
    command = <<-EOT
      kubectl apply -f - <<'YAML_EOF'
${templatefile("${path.module}/clusterissuer-staging.yaml.tpl", {
  acme_email               = var.acme_email
  timeweb_dns01_group_name = var.timeweb_dns01_group_name
  timeweb_dns01_solver_name = var.timeweb_dns01_solver_name
})}
YAML_EOF
    EOT
  }

  provisioner "local-exec" {
    when    = destroy
    environment = {
      KUBECONFIG = self.triggers.kubeconfig_file
    }
    command = <<-EOT
      kubectl delete clusterissuer letsencrypt-staging --ignore-not-found=true
    EOT
  }

  triggers = {
    acme_email               = var.acme_email
    timeweb_dns01_group_name = var.timeweb_dns01_group_name
    timeweb_dns01_solver_name = var.timeweb_dns01_solver_name
    crd_ready                = null_resource.check_crd_ready.id
    kubeconfig_file          = local.kubeconfig_file
  }
}

# Cert-Manager ClusterIssuer для Let's Encrypt Production
# Используем null_resource с kubectl для обхода проблемы с проверкой CRD во время plan
resource "null_resource" "cluster_issuer_letsencrypt_prod" {
  depends_on = [null_resource.check_crd_ready]

  provisioner "local-exec" {
    environment = {
      KUBECONFIG = local.kubeconfig_file
    }
    command = <<-EOT
      kubectl apply -f - <<'YAML_EOF'
${templatefile("${path.module}/clusterissuer-prod.yaml.tpl", {
  acme_email               = var.acme_email
  timeweb_dns01_group_name = var.timeweb_dns01_group_name
  timeweb_dns01_solver_name = var.timeweb_dns01_solver_name
})}
YAML_EOF
    EOT
  }

  provisioner "local-exec" {
    when    = destroy
    environment = {
      KUBECONFIG = self.triggers.kubeconfig_file
    }
    command = <<-EOT
      kubectl delete clusterissuer letsencrypt-prod --ignore-not-found=true
    EOT
  }

  triggers = {
    acme_email               = var.acme_email
    timeweb_dns01_group_name = var.timeweb_dns01_group_name
    timeweb_dns01_solver_name = var.timeweb_dns01_solver_name
    crd_ready                = null_resource.check_crd_ready.id
    kubeconfig_file          = local.kubeconfig_file
  }
}

# Wildcard сертификат для домена (создается только если Traefik готов и domain_root указан)
# Используем null_resource с kubectl для обхода проблемы с проверкой CRD во время plan
resource "null_resource" "wildcard_cert" {
  count = local.traefik_ready && var.domain_root != "" ? 1 : 0

  depends_on = [
    null_resource.cluster_issuer_letsencrypt_prod,
  ]

  provisioner "local-exec" {
    environment = {
      KUBECONFIG = local.kubeconfig_file
    }
    command = <<-EOT
      kubectl apply -f - <<'YAML_EOF'
${templatefile("${path.module}/wildcard-cert.yaml.tpl", {
  certificate_name = "${replace(var.domain_root, ".", "-")}-wildcard"
  namespace        = var.k8s_namespace_traefik
  secret_name      = "${replace(var.domain_root, ".", "-")}-wildcard-tls"
  domain_root      = var.domain_root
})}
YAML_EOF
    EOT
  }

  provisioner "local-exec" {
    when    = destroy
    environment = {
      KUBECONFIG = self.triggers.kubeconfig_file
    }
    command = <<-EOT
      kubectl delete certificate ${self.triggers.certificate_name} -n ${self.triggers.namespace} --ignore-not-found=true
    EOT
  }

  triggers = {
    certificate_name = "${replace(var.domain_root, ".", "-")}-wildcard"
    namespace        = var.k8s_namespace_traefik
    secret_name      = "${replace(var.domain_root, ".", "-")}-wildcard-tls"
    domain_root      = var.domain_root
    issuer_ready     = null_resource.cluster_issuer_letsencrypt_prod.id
    kubeconfig_file  = local.kubeconfig_file
    traefik_ready    = try(local.traefik_ready, false)
  }
}
