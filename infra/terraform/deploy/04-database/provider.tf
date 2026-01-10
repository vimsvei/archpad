terraform {
  required_providers {
    vault = {
      source  = "hashicorp/vault"
      version = "~> 4.0"
    }

    postgresql = {
      source  = "cyrilgdn/postgresql"
      version = "~> 1.24"
    }

    external = {
      source  = "hashicorp/external"
      version = "~> 2.3"
    }

    null = {
      source  = "hashicorp/null"
      version = "~> 3.2"
    }
  }
  required_version = ">= 0.13"
}

# Используем remote state из init для получения информации о БД кластере
data "terraform_remote_state" "init" {
  backend = "local"

  config = {
    path = "${path.module}/../../init/terraform.tfstate"
  }
}

# Используем remote state из 02-vault для получения информации о Vault
data "terraform_remote_state" "vault" {
  backend = "local"

  config = {
    path = "${path.module}/../02-vault/terraform.tfstate"
  }
}

locals {
  # Адрес Vault из vault state или переменной
  vault_address = try(
    data.terraform_remote_state.vault.outputs.vault_address,
    var.vault_address != null ? var.vault_address : "https://${var.vault_host}"
  )

  # Путь к секретам в Vault
  vault_secrets_path = "${var.kv_secrets_engine_path}/data/archpad/${var.vault_environment}/database"
}

# Provider для Vault
provider "vault" {
  address = local.vault_address
  token   = var.vault_token
}

locals {
  # Определяем реальный хост и порт для подключения
  # Приоритет:
  # 1. Если указан postgres_traefik_host - используем Traefik routing (pg.archpad.pro)
  # 2. Если используется port-forward - подключаемся к localhost:local_port
  # 3. Иначе используем напрямую postgres_host (должен быть доступен из сети, где запущен Terraform)
  postgres_connection_host = var.postgres_traefik_host != null && var.postgres_traefik_host != "" ? var.postgres_traefik_host : (
    var.use_kubectl_port_forward ? "localhost" : (var.postgres_host != null ? var.postgres_host : "localhost")
  )
  postgres_connection_port = var.use_kubectl_port_forward ? var.postgres_local_port : var.postgres_port
  
  # Путь к kubeconfig
  kubeconfig_file = var.kubeconfig_path != "" ? abspath(var.kubeconfig_path) : "${path.module}/../../init/kubeconfig.yaml"
}

# Provider для PostgreSQL
# Если используется port-forward, подключаемся через localhost
# Пароль администратора берется из Vault или из переменной
provider "postgresql" {
  host            = local.postgres_connection_host
  port            = local.postgres_connection_port
  database        = var.postgres_admin_database
  username        = local.postgres_admin_user_from_vault
  password        = local.postgres_admin_password_from_vault
  sslmode         = var.postgres_ssl_mode
  connect_timeout = var.postgres_connect_timeout
  superuser       = false
}

# Запускаем kubectl port-forward перед применением, если нужно
# Поддерживается port-forward к pod или service
resource "null_resource" "postgres_port_forward" {
  count = var.use_kubectl_port_forward ? 1 : 0
  
  provisioner "local-exec" {
    command = <<-EOT
      # Если указан postgres_k8s_service, используем service, иначе pod
      if [ -n "${var.postgres_k8s_service}" ]; then
        RESOURCE_TYPE="service"
        RESOURCE_NAME="${var.postgres_k8s_service}"
      elif [ -n "${var.postgres_k8s_pod}" ]; then
        RESOURCE_TYPE="pod"
        RESOURCE_NAME="${var.postgres_k8s_pod}"
      else
        # Если указан postgres_host (приватный IP), создаем временный port-forward
        # через специальный pod или используем прямое подключение через VPN
        if [ -n "${var.postgres_host}" ]; then
          echo "Warning: postgres_host is set but no pod/service specified. Using direct connection to ${var.postgres_host}" >&2
          exit 0
        else
          echo "Error: Either postgres_k8s_pod, postgres_k8s_service, or postgres_host must be set when use_kubectl_port_forward is true" >&2
          exit 1
        fi
      fi
      
      kubectl port-forward \
        --namespace=${var.postgres_k8s_namespace} \
        --kubeconfig=${local.kubeconfig_file} \
        "$${RESOURCE_TYPE}/$${RESOURCE_NAME}" \
        ${var.postgres_local_port}:${var.postgres_port} &
      PF_PID=$$!
      echo $$PF_PID > /tmp/postgres-pf-${var.postgres_local_port}.pid
      sleep 2
      if ! kill -0 $$PF_PID 2>/dev/null; then
        echo "Port-forward failed" >&2
        exit 1
      fi
    EOT
  }
  
  provisioner "local-exec" {
    when    = destroy
    command = <<-EOT
      if [ -f /tmp/postgres-pf-${self.triggers.local_port}.pid ]; then
        kill $$(cat /tmp/postgres-pf-${self.triggers.local_port}.pid) 2>/dev/null || true
        rm -f /tmp/postgres-pf-${self.triggers.local_port}.pid
      fi
    EOT
    on_failure = continue
  }
  
  triggers = {
    postgres_pod     = var.postgres_k8s_pod
    postgres_service = var.postgres_k8s_service
    postgres_host    = var.postgres_host
    namespace        = var.postgres_k8s_namespace
    local_port       = var.postgres_local_port
    remote_port      = var.postgres_port
  }
}
