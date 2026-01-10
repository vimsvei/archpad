# Настройка KV Secrets Engine для Vault через Terraform
# Используем null_resource с kubectl exec для выполнения vault CLI команд
# Это позволяет автоматически включить KV secrets engine без ручной настройки через UI

locals {
  # Определяем адрес Vault - либо из переменной, либо формируем из vault_host
  vault_address = var.vault_address != null ? var.vault_address : "https://${var.vault_host}"
  
  # Используем kubectl exec для выполнения vault CLI команд
  vault_cli_prefix = <<-EOT
    kubectl exec -n ${kubernetes_namespace.vault.metadata[0].name} vault-0 -- \
      vault -address=http://127.0.0.1:8200
  EOT
}

# Проверка, что Vault разблокирован и доступен
# Этот ресурс ждет, пока Vault станет доступным после разблокировки
resource "null_resource" "vault_unsealed_check" {
  count = var.enable_kv_secrets_engine && var.vault_token != null ? 1 : 0

  provisioner "local-exec" {
    command = "VAULT_NAMESPACE='${kubernetes_namespace.vault.metadata[0].name}' KUBECONFIG_FILE='${local.kubeconfig_file}' MAX_ATTEMPTS=30 bash '${path.module}/scripts/check-unsealed.sh'"
  }

  triggers = {
    vault_release = helm_release.vault.id
  }

  depends_on = [helm_release.vault]
}

# Включение KV Secrets Engine через Vault CLI
resource "null_resource" "vault_kv_secrets_engine" {
  count = var.enable_kv_secrets_engine && var.vault_token != null ? 1 : 0

  provisioner "local-exec" {
    command = "VAULT_NAMESPACE='${kubernetes_namespace.vault.metadata[0].name}' VAULT_TOKEN='${var.vault_token}' KV_PATH='${var.kv_secrets_engine_path}' KV_VERSION=${var.kv_secrets_engine_version} KUBECONFIG_FILE='${local.kubeconfig_file}' bash '${path.module}/scripts/enable-kv-secrets-engine.sh'"
  }

  provisioner "local-exec" {
    when    = destroy
    command = <<-EOT
      # При удалении не удаляем secrets engine, так как это может привести к потере данных
      echo "KV secrets engine остается включенным для сохранения данных"
    EOT
    on_failure = continue
  }

  triggers = {
    vault_release          = helm_release.vault.id
    vault_token            = var.vault_token
    kv_path                = var.kv_secrets_engine_path
    kv_version             = var.kv_secrets_engine_version
    enable_kv_secrets      = var.enable_kv_secrets_engine
    vault_unsealed_check   = null_resource.vault_unsealed_check[0].id
  }

  depends_on = [
    helm_release.vault,
    null_resource.vault_unsealed_check
  ]
}
