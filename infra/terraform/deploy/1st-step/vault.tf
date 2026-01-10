resource "kubernetes_namespace" "vault" {
  metadata { name = "vault" }
}

# Secret для S3 credentials (только если используется S3)
resource "kubernetes_secret" "vault_s3" {
  count = var.s3_endpoint != null ? 1 : 0

  metadata {
    name      = "vault-s3-credentials"
    namespace = kubernetes_namespace.vault.metadata[0].name
  }

  data = {
    access_key = var.s3_access_key
    secret_key = var.s3_secret_key
    endpoint   = var.s3_endpoint
    bucket     = local.s3_bucket_name
    region     = var.s3_region
  }

  depends_on = [kubernetes_namespace.vault]
}

# Обновление репозитория Helm перед использованием (выполняется через local-exec)
# Пропускается если helm не установлен (Terraform Helm provider обновит репозиторий автоматически)
resource "null_resource" "helm_repo_update_hashicorp" {
  provisioner "local-exec" {
    command    = <<-EOT
      if command -v helm >/dev/null 2>&1; then
        helm repo add hashicorp https://helm.releases.hashicorp.com 2>/dev/null || true
        helm repo update hashicorp 2>/dev/null || echo "Failed to update hashicorp repo, continuing anyway"
      else
        echo "Helm not found, Terraform will handle repo update"
      fi
    EOT
    on_failure = continue
  }
  
  # Триггер срабатывает только при первом применении
  # Для повторного обновления репозитория используйте: terraform taint null_resource.helm_repo_update_hashicorp
}

resource "helm_release" "vault" {
  name       = "vault"
  namespace  = kubernetes_namespace.vault.metadata[0].name
  repository = "https://helm.releases.hashicorp.com"
  chart      = "vault"
  version    = "0.28.0"
  
  # Увеличиваем timeout для обработки возможных проблем с доступом к репозиторию
  timeout    = 600
  
  depends_on = [
    null_resource.helm_repo_update_hashicorp,
    kubernetes_namespace.vault
  ]

  values = [yamlencode({
    global = {
      enabled = true
    }

    server = merge({
      ha = {
        enabled  = var.s3_endpoint != null ? false : true  # Отключаем HA при использовании S3
        replicas = var.s3_endpoint != null ? 1 : 1
        raft = var.s3_endpoint != null ? {
          enabled = false  # Отключаем Raft при использовании S3
        } : {
          enabled = true
          setNodeId = true
        }
      }

      ui = {
        enabled = true
      }

      service = {
        enabled = true
        type = "ClusterIP"
      }

      # Настройка PersistentVolumeClaim только если не используется S3
      dataStorage = var.s3_endpoint != null ? {
        enabled = false  # Не нужен PersistentVolume при использовании S3
      } : {
        enabled = true
        size = "10Gi"
        storageClass = var.s3_endpoint == null ? "local-path" : ""  # Используем local-path если не используется S3
        accessMode = "ReadWriteOnce"
      }

      # Конфигурация S3 backend для Vault
      # Используем server.extraSecretEnvironmentVars для безопасной передачи credentials
      # И server.extraConfig для конфигурации storage
      extraSecretEnvironmentVars = var.s3_endpoint != null ? [
        {
          envName = "AWS_ACCESS_KEY_ID"
          secretName = kubernetes_secret.vault_s3[0].metadata[0].name
          secretKey = "access_key"
        },
        {
          envName = "AWS_SECRET_ACCESS_KEY"
          secretName = kubernetes_secret.vault_s3[0].metadata[0].name
          secretKey = "secret_key"
        }
      ] : []
      
      # Конфигурация S3 storage через extraConfig (HCL формат)
      extraConfig = var.s3_endpoint != null ? <<-EOT
        storage "s3" {
          access_key = "${var.s3_access_key}"
          secret_key = "${var.s3_secret_key}"
          bucket     = "${local.s3_bucket_name}"
          endpoint   = "${var.s3_endpoint}"
          region     = "${var.s3_region}"
        }
      EOT : ""
    }, local.registry_enabled ? {
      serviceAccount = {
        create = false
        name   = kubernetes_service_account.registry_sa["vault"].metadata[0].name
      }
    } : {})
  })]
}