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

    null = {
      source  = "hashicorp/null"
      version = "~> 3.2"
    }

    vault = {
      source  = "hashicorp/vault"
      version = "~> 4.0"
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

# Используем remote state от Traefik для получения информации о namespace
data "terraform_remote_state" "traefik" {
  backend = "local"

  config = {
    path = "${path.module}/../01-traefik/terraform.tfstate"
  }
}

# Используем remote state от Vault для получения информации (опционально)
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
  
  # Получаем Vault address из переменной или из remote state Vault модуля
  vault_address_value = var.vault_address != null ? var.vault_address : (
    length(data.terraform_remote_state.vault) > 0 ? try(data.terraform_remote_state.vault[0].outputs.vault_address, null) : null
  )
  
  # Namespace Traefik из remote state
  traefik_namespace = try(data.terraform_remote_state.traefik.outputs.traefik_namespace, "traefik")
}

# Provider для Kubernetes
provider "kubernetes" {
  config_path = local.kubeconfig_file
}

# Provider для Helm
provider "helm" {
  kubernetes {
    config_path = local.kubeconfig_file
  }
}

# Provider для Vault
# ВАЖНО: Vault token должен быть указан через переменную var.vault_token
provider "vault" {
  address = local.vault_address_value
  token   = var.vault_token
}
