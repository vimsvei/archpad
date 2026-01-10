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

    twc = {
      source  = "tf.timeweb.cloud/timeweb-cloud/timeweb-cloud"
      version = "~> 1.0"
    }

    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }

    vault = {
      source  = "hashicorp/vault"
      version = "~> 4.0"
    }

    external = {
      source  = "hashicorp/external"
      version = "~> 2.3"
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

# Проверяем существование state файла Traefik перед чтением
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

# Используем remote state от Traefik для получения информации о CRD (опционально)
# Если Traefik еще не развернут, этот data source будет пустым
data "terraform_remote_state" "traefik" {
  count = data.external.traefik_state_exists.result.exists == "true" ? 1 : 0
  
  backend = "local"

  config = {
    path = "${path.module}/../01-traefik/terraform.tfstate"
  }
}

locals {
  # Используем kubeconfig из init, либо из переменной если указан
  kubeconfig_file = var.kubeconfig_path != "" ? abspath(var.kubeconfig_path) : "${path.module}/../../init/kubeconfig.yaml"
  registry_enabled = var.registry_url != null && var.registry_token != null
  
  # Получаем S3 bucket из init через remote state
  s3_bucket_name = try(data.terraform_remote_state.init.outputs.s3_bucket.name, "")
  s3_bucket_id   = try(data.terraform_remote_state.init.outputs.s3_bucket.id, "")
  
  # Префикс для Vault storage в S3 bucket (создаст папку vault_storage/)
  vault_s3_path = "vault_storage"
  
  # Получаем информацию о Traefik из remote state (опционально)
  # Если Traefik еще не развернут, будет null
  traefik_crd_ready = length(data.terraform_remote_state.traefik) > 0 ? try(data.terraform_remote_state.traefik[0].outputs.traefik_crd_ready, null) : null
  traefik_ready     = length(data.terraform_remote_state.traefik) > 0 && try(data.terraform_remote_state.traefik[0].outputs.traefik_crd_ready, null) != null
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

provider "twc" {
  token = var.twc_token
}

provider "random" {
}
