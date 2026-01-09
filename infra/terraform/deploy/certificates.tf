# Cert-Manager ClusterIssuer для Let's Encrypt
resource "kubernetes_manifest" "cluster_issuer_letsencrypt_prod" {
  manifest = {
    apiVersion = "cert-manager.io/v1"
    kind       = "ClusterIssuer"
    metadata   = { name = "letsencrypt-prod" }
    spec = {
      acme = {
        email  = var.acme_email
        server = "https://acme-v02.api.letsencrypt.org/directory"
        privateKeySecretRef = { name = "letsencrypt-prod-account-key" }
        solvers = [
          {
            dns01 = {
              webhook = {
                groupName  = var.timeweb_dns01_group_name
                solverName = var.timeweb_dns01_solver_name
                config     = {}
              }
            }
          }
        ]
      }
    }
  }

  depends_on = [helm_release.cert_manager]
}

# Wildcard сертификат для домена
resource "kubernetes_manifest" "wildcard_cert" {
  manifest = {
    apiVersion = "cert-manager.io/v1"
    kind       = "Certificate"
    metadata = {
      name      = "archpad-wildcard"
      namespace = "traefik"
    }
    spec = {
      secretName = "archpad-wildcard-tls"
      issuerRef = {
        name = "letsencrypt-prod"
        kind = "ClusterIssuer"
      }
      dnsNames = [
        var.domain_root,
        "*.${var.domain_root}"
      ]
    }
  }

  depends_on = [
    kubernetes_manifest.cluster_issuer_letsencrypt_prod,
  ]
}