resource "kubernetes_namespace" "vault" {
  metadata { name = "vault" }
}

# Secret для S3 credentials (только если используется S3)
resource "kubernetes_secret" "vault_s3" {
  count = var.use_s3_storage ? 1 : 0

  metadata {
    name      = "vault-s3-credentials"
    namespace = kubernetes_namespace.vault.metadata[0].name
  }

  data = {
    access_key = base64encode(var.s3_access_key)
    secret_key = base64encode(var.s3_secret_key)
    endpoint   = base64encode(var.s3_endpoint)
    bucket     = base64encode(local.s3_bucket_name)
    region     = base64encode(var.s3_region)
    path       = base64encode(var.vault_s3_path)
  }

  depends_on = [kubernetes_namespace.vault]
}

# Обновление репозитория Helm перед использованием (выполняется через local-exec)
# Пропускается если helm не установлен (Terraform Helm provider обновит репозиторий автоматически)
# Если репозиторий недоступен (403), используется кэш Helm
resource "null_resource" "helm_repo_update_hashicorp" {
  provisioner "local-exec" {
    command    = "bash '${path.module}/scripts/helm-repo-update.sh' || echo 'Helm repo update failed, using cached chart if available'"
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
  
  # Отключаем атомарные операции, чтобы позволить удаление даже при ошибках
  # Это необходимо при переключении между Raft и S3 storage
  atomic                     = false
  cleanup_on_fail           = false
  disable_webhooks          = true
  
  depends_on = [
    null_resource.helm_repo_update_hashicorp,
    kubernetes_namespace.vault
  ]
  
  # Используем lifecycle для более безопасного обновления
  lifecycle {
    create_before_destroy = false  # Сначала удаляем старый release, затем создаем новый
    # ВАЖНО: При переключении между Raft и S3 storage нужно принудительно пересоздать release
    # Используйте: terraform taint helm_release.vault && terraform apply
  }

  values = [yamlencode({
    global = {
      enabled = true
    }

    server = merge({
      ha = {
        enabled  = var.use_s3_storage ? false : true  # Отключаем HA при использовании S3
        replicas = 1
        raft = var.use_s3_storage ? {
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
      dataStorage = var.use_s3_storage ? {
        enabled = false  # Не нужен PersistentVolume при использовании S3
      } : {
        enabled = true
        size = "10Gi"
        storageClass = "local-path"  # Используем local-path если не используется S3
        accessMode = "ReadWriteOnce"
      }

      # Конфигурация S3 backend для Vault
      # Используем server.extraConfig для конфигурации storage
      # Vault будет использовать S3 bucket из init с префиксом vault_storage/
      extraConfig = var.use_s3_storage ? join("\n", [
        "storage \"s3\" {",
        "  access_key = \"${var.s3_access_key}\"",
        "  secret_key = \"${var.s3_secret_key}\"",
        "  bucket     = \"${local.s3_bucket_name}\"",
        "  endpoint   = \"${var.s3_endpoint}\"",
        "  region     = \"${var.s3_region}\"",
        "  path       = \"${var.vault_s3_path}\"",
        "}"
      ]) : ""
    }, local.registry_enabled && length(kubernetes_service_account.registry_sa) > 0 ? {
      serviceAccount = {
        create = false
        name   = kubernetes_service_account.registry_sa[0].metadata[0].name
      }
    } : {})
  })]
}