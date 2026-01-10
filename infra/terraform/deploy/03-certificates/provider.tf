terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.30"
    }

    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.16"
    }
    
    time = {
      source  = "hashicorp/time"
      version = "~> 0.13"
    }
    
    null = {
      source  = "hashicorp/null"
      version = "~> 3.2"
    }
  }
  required_version = ">= 0.13"
}

# Используем kubeconfig из init через remote state
data "terraform_remote_state" "init" {
  backend = "local"

  config = {
    path = "${path.module}/../../init/terraform.tfstate"
  }
}

# Проверяем, существует ли state файл для Traefik
data "external" "traefik_state_exists" {
  program = ["sh", "-c", <<-EOT
    if [ -f "${path.module}/../01-traefik/terraform.tfstate" ]; then
      echo '{"exists": "true"}'
    else
      echo '{"exists": "false"}'
    fi
  EOT
  ]
}

# Используем outputs из 01-traefik (Traefik)
data "terraform_remote_state" "traefik" {
  count = data.external.traefik_state_exists.result.exists == "true" ? 1 : 0
  backend = "local"

  config = {
    path = "${path.module}/../01-traefik/terraform.tfstate"
  }
}

# Проверяем, существует ли state файл для Vault
data "external" "vault_state_exists" {
  program = ["sh", "-c", <<-EOT
    if [ -f "${path.module}/../02-vault/terraform.tfstate" ]; then
      echo '{"exists": "true"}'
    else
      echo '{"exists": "false"}'
    fi
  EOT
  ]
}

# Используем outputs из 02-vault (Vault)
data "terraform_remote_state" "vault" {
  count = data.external.vault_state_exists.result.exists == "true" ? 1 : 0
  backend = "local"

  config = {
    path = "${path.module}/../02-vault/terraform.tfstate"
  }
}

locals {
  # Используем kubeconfig из init, либо из переменной если указан
  kubeconfig_file = var.kubeconfig_path != "" ? abspath(var.kubeconfig_path) : "${path.module}/../../init/kubeconfig.yaml"
  registry_enabled = var.registry_url != null && var.registry_token != null
  
  # Проверяем, готов ли Traefik для использования
  traefik_ready = length(data.terraform_remote_state.traefik) > 0 && try(data.terraform_remote_state.traefik[0].outputs.traefik_crd_ready, null) != null
  
  # Общие метки для cert-manager ресурсов
  cert_manager_labels = {
    app                        = "cert-manager"
    "app.kubernetes.io/name"   = "cert-manager"
    "app.kubernetes.io/part-of" = "archpad"
  }
}

provider "kubernetes" {
  config_path    = local.kubeconfig_file
  config_context = var.kubeconfig_context
}

provider "helm" {
  kubernetes {
    config_path    = local.kubeconfig_file
    config_context = var.kubeconfig_context
  }
}
