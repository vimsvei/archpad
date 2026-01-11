# Kubernetes Namespace для pgAdmin
resource "kubernetes_namespace" "pgadmin" {
  metadata {
    name = var.pgadmin_namespace
  }
}

# Получение секретов pgAdmin из Vault
# В секрете pg-admin хранится только пароль: PGADMIN_PASSWORD
data "vault_kv_secret_v2" "pgadmin" {
  mount = var.kv_secrets_engine_path
  name  = "archpad/${var.vault_environment}/pg-admin"
}

# Получение секретов PostgreSQL из Vault для подключения
# Креды суперюзера кластера БД: POSTGRES_USERNAME, POSTGRES_PASSWORD
data "vault_kv_secret_v2" "database_cluster" {
  mount = var.kv_secrets_engine_path
  name  = "archpad/${var.vault_environment}/database-cluster"
}

locals {
  pgadmin_email = coalesce(
    var.pgadmin_default_email,
    "admin@archpad.pro"
  )
  
  pgadmin_password = coalesce(
    try(data.vault_kv_secret_v2.pgadmin.data["PGADMIN_PASSWORD"], null),
    var.pgadmin_default_password,
    "admin"
  )
  
  postgres_username = try(
    data.vault_kv_secret_v2.database_cluster.data["POSTGRES_USERNAME"],
    "gen_user"
  )
  
  postgres_password = try(
    data.vault_kv_secret_v2.database_cluster.data["POSTGRES_PASSWORD"],
    ""
  )
  
  # Формируем servers.json для pgAdmin
  pgadmin_servers_json = jsonencode({
    Servers = {
      "1" = {
        Name         = "archpad-db-cluster"
        Group        = "Archpad"
        Host         = var.postgres_host
        Port         = var.postgres_port
        MaintenanceDB = var.postgres_admin_database
        Username     = local.postgres_username
        SSLMode      = "disable"
        # Password будет введен пользователем или сохранен в pgAdmin
      }
    }
  })
}

# Secret для pgAdmin credentials
resource "kubernetes_secret" "pgadmin_credentials" {
  metadata {
    name      = "pgadmin-credentials"
    namespace = kubernetes_namespace.pgadmin.metadata[0].name
  }

  data = {
    PGADMIN_DEFAULT_EMAIL    = local.pgadmin_email
    PGADMIN_DEFAULT_PASSWORD = local.pgadmin_password
  }

  depends_on = [kubernetes_namespace.pgadmin]
}

# ConfigMap для pgAdmin servers.json
resource "kubernetes_config_map" "pgadmin_servers" {
  metadata {
    name      = "pgadmin-servers"
    namespace = kubernetes_namespace.pgadmin.metadata[0].name
  }

  data = {
    "servers.json" = local.pgadmin_servers_json
  }

  depends_on = [kubernetes_namespace.pgadmin]
}

# Deployment для pgAdmin
resource "kubernetes_deployment" "pgadmin" {
  metadata {
    name      = "pgadmin"
    namespace = kubernetes_namespace.pgadmin.metadata[0].name
    labels = {
      app = "pgadmin"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "pgadmin"
      }
    }

    template {
      metadata {
        labels = {
          app = "pgadmin"
        }
      }

      spec {
        container {
          name  = "pgadmin"
          image = "dpage/pgadmin4:latest"

          port {
            container_port = 80
            name           = "http"
          }

          env {
            name = "PGADMIN_DEFAULT_EMAIL"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.pgadmin_credentials.metadata[0].name
                key  = "PGADMIN_DEFAULT_EMAIL"
              }
            }
          }

          env {
            name = "PGADMIN_DEFAULT_PASSWORD"
            value_from {
              secret_key_ref {
                name = kubernetes_secret.pgadmin_credentials.metadata[0].name
                key  = "PGADMIN_DEFAULT_PASSWORD"
              }
            }
          }

          env {
            name  = "PGADMIN_CONFIG_ENHANCED_COOKIE_PROTECTION"
            value = "True"
          }

          env {
            name  = "PGADMIN_CONFIG_CONSOLE_LOG_LEVEL"
            value = "25"
          }

          env {
            name  = "PGADMIN_CONFIG_MASTER_PASSWORD_REQUIRED"
            value = "False"
          }

          env {
            name  = "PGADMIN_CONFIG_ALLOW_SAVE_PASSWORD"
            value = "True"
          }

          volume_mount {
            name       = "pgadmin-servers"
            mount_path = "/pgadmin4/servers.json"
            sub_path   = "servers.json"
            read_only  = true
          }

          readiness_probe {
            http_get {
              path = "/misc/ping"
              port = 80
            }
            initial_delay_seconds = 60
            period_seconds        = 10
            timeout_seconds       = 5
            failure_threshold     = 5
            success_threshold     = 1
          }

          liveness_probe {
            http_get {
              path = "/misc/ping"
              port = 80
            }
            initial_delay_seconds = 120
            period_seconds        = 30
            timeout_seconds       = 5
            failure_threshold     = 3
          }

          resources {
            requests = {
              cpu    = "100m"
              memory = "256Mi"
            }
            limits = {
              cpu    = "500m"
              memory = "512Mi"
            }
          }
        }

        volume {
          name = "pgadmin-servers"
          config_map {
            name = kubernetes_config_map.pgadmin_servers.metadata[0].name
          }
        }
      }
    }
  }

  depends_on = [
    kubernetes_namespace.pgadmin,
    kubernetes_secret.pgadmin_credentials,
    kubernetes_config_map.pgadmin_servers,
  ]
}

# Service для pgAdmin
resource "kubernetes_service" "pgadmin" {
  metadata {
    name      = "pgadmin"
    namespace = kubernetes_namespace.pgadmin.metadata[0].name
    labels = {
      app = "pgadmin"
    }
  }

  spec {
    type = "ClusterIP"

    selector = {
      app = "pgadmin"
    }

    port {
      port        = 80
      target_port = 80
      protocol    = "TCP"
      name        = "http"
    }
  }

  depends_on = [kubernetes_deployment.pgadmin]
}
