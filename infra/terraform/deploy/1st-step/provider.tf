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

locals {
  # Используем kubeconfig из init, либо из переменной если указан
  kubeconfig_file = var.kubeconfig_path != "" ? abspath(var.kubeconfig_path) : "${path.module}/../../init/kubeconfig.yaml"
  registry_enabled = var.registry_url != null && var.registry_token != null
  
  # Определяем имя S3 bucket для Vault
  s3_bucket_name = var.s3_endpoint != null ? (
    var.s3_bucket != null ? var.s3_bucket : (
      var.s3_bucket_name == null && var.s3_endpoint != null ? try(twc_s3_bucket.vault_storage[0].name, "") : ""
    )
  ) : ""
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
  # Используем токен из переменной, если указан
  # Если не указан, provider автоматически использует переменную окружения TWC_TOKEN
  # Если ни то, ни другое не указано, но S3 не используется - provider все равно инициализируется
  # В этом случае можно указать токен через переменную окружения: export TWC_TOKEN=your-token
  token = var.twc_token
}

provider "random" {
}