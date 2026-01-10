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

# Используем remote state из 01-traefik для получения информации о Traefik
data "terraform_remote_state" "traefik" {
  backend = "local"

  config = {
    path = "${path.module}/../01-traefik/terraform.tfstate"
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
  # Если указан postgres_traefik_host и use_kubectl_port_forward = true, используем port-forward
  # Иначе подключаемся напрямую к домену (если DNS настроен) или к postgres_host
  use_traefik_port_forward = var.postgres_traefik_host != null && var.postgres_traefik_host != "" && var.use_kubectl_port_forward
  actual_use_port_forward = var.use_kubectl_port_forward && (var.postgres_k8s_pod != null || var.postgres_k8s_service != null)
  
  # Определяем реальный хост и порт для подключения
  # Приоритет:
  # 1. Если указан postgres_traefik_host и use_kubectl_port_forward = false - используем домен напрямую (pg.archpad.pro:80 или указанный port)
  # 2. Если указан postgres_traefik_host и use_kubectl_port_forward = true - используем port-forward (localhost:local_port)
  # 3. Если используется port-forward - подключаемся к localhost:local_port
  # 4. Иначе используем напрямую postgres_host (должен быть доступен из сети, где запущен Terraform)
  postgres_connection_host = local.actual_use_port_forward ? "localhost" : (
    var.postgres_traefik_host != null && var.postgres_traefik_host != "" ? var.postgres_traefik_host : (
      var.postgres_host != null ? var.postgres_host : "localhost"
    )
  )
  # Если используется Traefik host, используем порт 80 по умолчанию (TCP доступен на порту 80 через LoadBalancer)
  # Или указанный postgres_traefik_port, или port-forward порт
  # ВАЖНО: LoadBalancer экспортирует PostgreSQL TCP трафик на порту 80, а не на 5432!
  postgres_connection_port = local.actual_use_port_forward ? var.postgres_local_port : (
    var.postgres_traefik_host != null && var.postgres_traefik_host != "" ? coalesce(var.postgres_traefik_port, 80) : var.postgres_port
  )
  
  # Имя Traefik Service (обычно совпадает с именем Helm release)
  # Получаем namespace Traefik из remote state модуля 01-traefik или используем переменную
  traefik_namespace_from_state = try(
    data.terraform_remote_state.traefik.outputs.traefik_namespace,
    null
  )
  traefik_service_name = try(
    data.terraform_remote_state.traefik.outputs.traefik_service.name,
    "traefik"
  )
  traefik_service_namespace = coalesce(
    local.traefik_namespace_from_state,
    var.k8s_namespace_traefik,
    "traefik"
  )
  
  # Определяем, к какому ресурсу делать port-forward (только если use_kubectl_port_forward = true)
  # Если используется Traefik и нужен port-forward, делаем port-forward к поду Traefik (внутри пода есть порт 5432 для entryPoint postgres)
  # Иначе используем указанные postgres_k8s_service или postgres_k8s_pod
  # Для Traefik используем pod, так как Service не экспортирует порт 5432
  port_forward_resource_type = local.use_traefik_port_forward ? "pod" : (
    var.postgres_k8s_service != null ? "service" : (
      var.postgres_k8s_pod != null ? "pod" : null
    )
  )
  port_forward_resource_name = local.use_traefik_port_forward ? null : (
    var.postgres_k8s_service != null ? var.postgres_k8s_service : (
      var.postgres_k8s_pod != null ? var.postgres_k8s_pod : null
    )
  )
  port_forward_namespace = local.use_traefik_port_forward ? local.traefik_service_namespace : var.postgres_k8s_namespace
  
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
# Если указан postgres_traefik_host, автоматически делаем port-forward к Traefik Service
resource "null_resource" "postgres_port_forward" {
  count = local.actual_use_port_forward && local.port_forward_resource_name != null ? 1 : 0
  
  provisioner "local-exec" {
    command = <<-EOT
      # Определяем ресурс для port-forward
      RESOURCE_TYPE="${local.port_forward_resource_type}"
      NAMESPACE="${local.port_forward_namespace}"
      
      if [ "$RESOURCE_TYPE" = "" ]; then
        echo "Error: Port-forward resource type not determined. Check your configuration." >&2
        exit 1
      fi
      
      # Если используется Traefik, находим под Traefik
      if [ "$RESOURCE_TYPE" = "pod" ] && [ -z "${local.port_forward_resource_name}" ]; then
        echo "Finding Traefik pod in namespace $NAMESPACE..."
        RESOURCE_NAME=$$$$(kubectl get pods --namespace=$${NAMESPACE} --kubeconfig=${local.kubeconfig_file} -l app.kubernetes.io/name=traefik -o jsonpath='{.items[0].metadata.name}' 2>/dev/null || echo "")
        if [ -z "$$RESOURCE_NAME" ]; then
          echo "Error: Traefik pod not found in namespace $NAMESPACE" >&2
          exit 1
        fi
        echo "Found Traefik pod: $$RESOURCE_NAME"
      else
        RESOURCE_NAME="${local.port_forward_resource_name}"
      fi
      
      if [ -z "$$RESOURCE_NAME" ]; then
        echo "Error: Port-forward resource name not determined. Check your configuration." >&2
        exit 1
      fi
      
      echo "Starting port-forward: $RESOURCE_TYPE/$$RESOURCE_NAME in namespace $NAMESPACE"
      echo "Forwarding local port ${var.postgres_local_port} to remote port ${var.postgres_port}"
      
      # Проверяем, не запущен ли уже port-forward
      PID_FILE="/tmp/postgres-pf-${var.postgres_local_port}.pid"
      if [ -f "$$PID_FILE" ]; then
        read OLD_PID < "$$PID_FILE" 2>/dev/null || OLD_PID=""
        if [ -n "$$OLD_PID" ] && kill -0 "$$OLD_PID" 2>/dev/null; then
          echo "Port-forward already running with PID $$OLD_PID, killing it first..."
          kill "$$OLD_PID" 2>/dev/null || true
          sleep 1
        fi
        rm -f "$$PID_FILE"
      fi
      
      kubectl port-forward \
        --namespace=$${NAMESPACE} \
        --kubeconfig=${local.kubeconfig_file} \
        "$${RESOURCE_TYPE}/$${RESOURCE_NAME}" \
        ${var.postgres_local_port}:${var.postgres_port} &
      PF_PID=$$!
      echo $$PF_PID > "$$PID_FILE"
      sleep 3
      if ! kill -0 "$$PF_PID" 2>/dev/null; then
        echo "Error: Port-forward failed to start" >&2
        rm -f "$$PID_FILE"
        exit 1
      fi
      echo "Port-forward started successfully with PID $$PF_PID"
    EOT
  }
  
  provisioner "local-exec" {
    when    = destroy
    command = <<-EOT
      PID_FILE="/tmp/postgres-pf-${self.triggers.local_port}.pid"
      if [ -f "$$PID_FILE" ]; then
        read PID < "$$PID_FILE" 2>/dev/null || PID=""
        if [ -n "$$PID" ] && kill -0 "$$PID" 2>/dev/null; then
          echo "Stopping port-forward (PID $$PID)..."
          kill "$$PID" 2>/dev/null || true
        fi
        rm -f "$$PID_FILE"
      fi
    EOT
    on_failure = continue
  }
  
  triggers = {
    postgres_pod           = var.postgres_k8s_pod
    postgres_service       = var.postgres_k8s_service
    postgres_host          = var.postgres_host
    postgres_traefik_host  = var.postgres_traefik_host
    namespace              = local.port_forward_namespace
    resource_type          = local.port_forward_resource_type
    resource_name          = local.port_forward_resource_name
    local_port             = var.postgres_local_port
    remote_port            = var.postgres_port
  }
}

# Маркерный ресурс для синхронизации - используется в depends_on для PostgreSQL ресурсов
# Этот ресурс всегда создается, но зависит от port-forward только если он используется
resource "null_resource" "postgres_connection_ready" {
  # Всегда создаем этот ресурс, но он зависит от port-forward только если он используется
  # Используем triggers для условной зависимости
  # Если port-forward используется, ссылаемся на него через try(), если нет - используем другие значения
  triggers = local.actual_use_port_forward && local.port_forward_resource_type != null ? {
    port_forward_id = try(null_resource.postgres_port_forward[0].id, "waiting")
    use_port_forward = "true"
  } : {
    use_port_forward = "false"
    connection_type = var.postgres_traefik_host != null && var.postgres_traefik_host != "" ? "traefik" : "direct"
    postgres_host = var.postgres_host
  }
}
