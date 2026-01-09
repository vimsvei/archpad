resource "kubernetes_manifest" "traefik_tlsstore_default" {
  manifest = {
    apiVersion = "traefik.io/v1alpha1"
    kind       = "TLSStore"
    metadata = {
      name      = "default"
      namespace = "traefik"
    }
    spec = {
      defaultCertificate = {
        secretName = "archpad-wildcard-tls"
      }
    }
  }

  depends_on = [kubernetes_manifest.wildcard_cert]
}
