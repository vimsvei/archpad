# TLSStore для Traefik (использует wildcard сертификат как default)
# Создается только если Traefik готов и wildcard сертификат создан
resource "kubernetes_manifest" "traefik_tlsstore_default" {
  count = local.traefik_ready && length(null_resource.wildcard_cert) > 0 ? 1 : 0
  
  manifest = {
    apiVersion = "traefik.io/v1alpha1"
    kind       = "TLSStore"
    metadata = {
      name      = "default"
      namespace = var.k8s_namespace_traefik
    }
    spec = {
      defaultCertificate = {
        secretName = "${replace(var.domain_root, ".", "-")}-wildcard-tls"
      }
    }
  }

  depends_on = [null_resource.wildcard_cert]
}
