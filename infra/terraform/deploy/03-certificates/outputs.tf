output "cert_manager_namespace" {
  description = "Namespace where cert-manager is installed"
  value       = kubernetes_namespace.cert_manager.metadata[0].name
}

output "cert_manager_release" {
  description = "Helm release information for cert-manager"
  value = {
    name      = helm_release.cert_manager.name
    namespace = helm_release.cert_manager.namespace
    version   = helm_release.cert_manager.version
    status    = helm_release.cert_manager.status
  }
}

output "letsencrypt_prod_issuer" {
  description = "Let's Encrypt Production ClusterIssuer name"
  value       = "letsencrypt-prod"
}

output "letsencrypt_staging_issuer" {
  description = "Let's Encrypt Staging ClusterIssuer name"
  value       = "letsencrypt-staging"
}

output "wildcard_certificate" {
  description = "Wildcard certificate information (if created)"
  value = length(null_resource.wildcard_cert) > 0 ? {
    name       = "${replace(var.domain_root, ".", "-")}-wildcard"
    namespace  = var.k8s_namespace_traefik
    secretName = "${replace(var.domain_root, ".", "-")}-wildcard-tls"
    dnsNames   = [var.domain_root, "*.${var.domain_root}"]
  } : null
}

output "traefik_tlsstore" {
  description = "Traefik TLSStore information (if created)"
  value = length(kubernetes_manifest.traefik_tlsstore_default) > 0 ? {
    name      = kubernetes_manifest.traefik_tlsstore_default[0].manifest.metadata.name
    namespace = kubernetes_manifest.traefik_tlsstore_default[0].manifest.metadata.namespace
  } : null
}
