# BasicAuth для защиты Traefik Dashboard
# Создаем Secret с htpasswd хешем для логина/пароля

# Получаем пароль из Vault (если vault_address и vault_token указаны, и password не указан напрямую)
data "vault_kv_secret_v2" "traefik_dashboard_password" {
  count = var.traefik_dashboard_username != null && var.traefik_dashboard_password == null && local.vault_address_value != null && var.vault_token != null ? 1 : 0

  mount = "kv"
  name  = "archpad/${var.vault_environment}/traefik"
}

# Локальная переменная для пароля (из переменной или из Vault)
locals {
  traefik_dashboard_password_value = var.traefik_dashboard_password != null ? var.traefik_dashboard_password : (length(data.vault_kv_secret_v2.traefik_dashboard_password) > 0 ? data.vault_kv_secret_v2.traefik_dashboard_password[0].data["TRAEFIK_ADMIN_PASSWORD"] : null)
  
  traefik_dashboard_auth_enabled = var.traefik_dashboard_username != null && local.traefik_dashboard_password_value != null
}

# Генерируем htpasswd хеш через external data source
data "external" "htpasswd_hash" {
  count = local.traefik_dashboard_auth_enabled ? 1 : 0
  
  program = ["sh", "-c", <<-EOT
    HASH=$(htpasswd -nbBC 10 "${var.traefik_dashboard_username}" "${local.traefik_dashboard_password_value}" 2>/dev/null || echo "ERROR")
    if [ "$HASH" = "ERROR" ]; then
      echo '{"error": "htpasswd failed"}' >&2
      exit 1
    fi
    echo "{\"hash\": \"$HASH\"}"
  EOT
  ]
}

resource "kubernetes_secret" "traefik_dashboard_auth" {
  count = local.traefik_dashboard_auth_enabled ? 1 : 0

  metadata {
    name      = "traefik-dashboard-auth"
    namespace = kubernetes_namespace.traefik.metadata[0].name
  }

  # Используем хеш из external data source
  data = {
    users = data.external.htpasswd_hash[0].result.hash
  }

  type = "Opaque"

  depends_on = [
    kubernetes_namespace.traefik,
    data.external.htpasswd_hash,
  ]
}

# Middleware для BasicAuth
resource "kubernetes_manifest" "traefik_dashboard_basicauth_middleware" {
  count = local.traefik_dashboard_auth_enabled ? 1 : 0

  depends_on = [
    time_sleep.wait_for_traefik_crd,
    kubernetes_secret.traefik_dashboard_auth,
  ]

  manifest = {
    apiVersion = "traefik.io/v1alpha1"
    kind       = "Middleware"
    metadata = {
      name      = "traefik-dashboard-basicauth"
      namespace = kubernetes_namespace.traefik.metadata[0].name
    }
    spec = {
      basicAuth = {
        secret = kubernetes_secret.traefik_dashboard_auth[0].metadata[0].name
      }
    }
  }
}
