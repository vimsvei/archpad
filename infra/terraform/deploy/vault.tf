resource "kubernetes_namespace" "vault" {
  metadata { name = "vault" }
}

resource "helm_release" "vault" {
  name       = "vault"
  namespace  = kubernetes_namespace.vault.metadata[0].name
  repository = "https://helm.releases.hashicorp.com"
  chart      = "vault"
  version    = "0.28.0"

  values = [yamlencode({
    global = {
      enabled = true
    }

    server = merge({
      # На старте: 1 реплика, storage raft (потом можно масштабировать до 3)
      ha = {
        enabled  = true
        replicas = 1
        raft = {
          enabled = true
          setNodeId = true
        }
      }

      ui = {
        enabled = true
      }
    }, local.registry_enabled ? {
      serviceAccount = {
        create = false
        name   = kubernetes_service_account.registry_sa["vault"].metadata[0].name
      }
    } : {})
  })]

  depends_on = [kubernetes_namespace.vault]
}

