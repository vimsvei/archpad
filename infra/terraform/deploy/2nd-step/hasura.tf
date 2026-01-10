resource "kubernetes_namespace" "hasura" {
  metadata {
    name = "hasura"
  }
}

# Секрет и ServiceAccount для реестра создаются через registry.tf

resource "kubernetes_secret" "hasura_secrets" {
  metadata {
    name      = "hasura-secrets"
    namespace = kubernetes_namespace.hasura.metadata[0].name
  }

  type = "Opaque"

  data = {
    HASURA_GRAPHQL_ADMIN_SECRET           = base64encode(var.hasura_admin_secret)
    HASURA_GRAPHQL_DATABASE_URL           = base64encode(var.hasura_database_url)
    HASURA_GRAPHQL_METADATA_DATABASE_URL  = base64encode(var.hasura_metadata_database_url)
  }
}

resource "kubernetes_deployment_v1" "hasura" {
  metadata {
    name      = "hasura"
    namespace = kubernetes_namespace.hasura.metadata[0].name
    labels = { app = "hasura" }
  }

  spec {
    replicas = 2

    selector {
      match_labels = { app = "hasura" }
    }

    template {
      metadata {
        labels = { app = "hasura" }
      }

      spec {
        service_account_name = local.registry_enabled ? kubernetes_service_account.registry_sa["hasura"].metadata[0].name : null

        container {
          name  = "hasura"
          image = "hasura/graphql-engine:v2.42.0"

          port {
            container_port = 8080
          }

          env_from {
            secret_ref {
              name = kubernetes_secret.hasura_secrets.metadata[0].name
            }
          }

          env {
            name  = "HASURA_GRAPHQL_ENABLE_CONSOLE"
            value = "false"
          }

          env {
            name  = "HASURA_GRAPHQL_ENABLED_APIS"
            value = "graphql,metadata,config,pgdump,metrics"
          }

          readiness_probe {
            http_get {
              path = "/healthz"
              port = 8080
            }
            initial_delay_seconds = 10
            period_seconds        = 10
          }

          liveness_probe {
            http_get {
              path = "/healthz"
              port = 8080
            }
            initial_delay_seconds = 30
            period_seconds        = 20
          }
        }
      }
    }
  }
}

resource "kubernetes_service_v1" "hasura" {
  metadata {
    name      = "hasura"
    namespace = kubernetes_namespace.hasura.metadata[0].name
    labels = { app = "hasura" }
  }

  spec {
    selector = { app = "hasura" }

    port {
      name        = "http"
      port        = 80
      target_port = 8080
    }
  }
}

# Traefik IngressRoute (CRD)
resource "kubernetes_manifest" "hasura_ingressroute" {
  manifest = {
    apiVersion = "traefik.io/v1alpha1"
    kind       = "IngressRoute"
    metadata = {
      name      = "hasura"
      namespace = kubernetes_namespace.hasura.metadata[0].name
    }
    spec = {
      entryPoints = ["websecure"]
      routes = [
        {
          match = "Host(`${var.hasura_host}`)"
          kind  = "Rule"
          services = [
            {
              name = kubernetes_service_v1.hasura.metadata[0].name
              port = 80
            }
          ]
        }
      ]
      tls = {}
    }
  }

  # Traefik развернут в 1st-step, поэтому явная зависимость не требуется
  # TLSStore создается в этом же шаге (3rd-step)
}
