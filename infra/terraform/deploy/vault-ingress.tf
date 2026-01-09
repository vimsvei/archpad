resource "kubernetes_manifest" "vault_ingressroute" {
  manifest = {
    apiVersion = "traefik.io/v1alpha1"
    kind       = "IngressRoute"
    metadata = {
      name      = "vault"
      namespace = kubernetes_namespace.vault.metadata[0].name
    }
    spec = {
      entryPoints = ["websecure"]
      routes = [
        {
          match = "Host(`${var.vault_host}`)"
          kind  = "Rule"
          services = [
            {
              name = "vault"
              port = 8200
            }
          ]
        }
      ]
      tls = {}
    }
  }

  depends_on = [
    helm_release.traefik,
    helm_release.vault,
  ]
  
  # TLSStore создается условно, поэтому зависимость не обязательна
  # depends_on = [kubernetes_manifest.traefik_tlsstore_default]
}

