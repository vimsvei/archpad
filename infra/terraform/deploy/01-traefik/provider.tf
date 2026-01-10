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
      version = "~> 0.11"
    }

    null = {
      source  = "hashicorp/null"
      version = "~> 3.2"
    }

    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }

    external = {
      source  = "hashicorp/external"
      version = "~> 2.3"
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

# Проверяем существование state файла Vault перед чтением
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

# Используем remote state от Vault для получения информации (опционально)
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
  
  # Получаем Vault address из переменной или из remote state Vault модуля
  vault_address_value = var.vault_address != null ? var.vault_address : (
    length(data.terraform_remote_state.vault) > 0 ? 
    try(data.terraform_remote_state.vault[0].outputs.vault_address, null) : 
    null
  )
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

provider "random" {
}

# Vault provider (conditional - only if vault_address and vault_token are provided)
provider "vault" {
  address = local.vault_address_value != null ? local.vault_address_value : "https://vault.archpad.pro"
  token   = var.vault_token
}
