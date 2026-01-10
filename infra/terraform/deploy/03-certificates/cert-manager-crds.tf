# Установка CRD cert-manager вручную через kubectl
# Это необходимо, так как Helm может не устанавливать CRD автоматически
# или устанавливать их с задержкой

resource "null_resource" "install_cert_manager_crds" {
  depends_on = [helm_release.cert_manager]

  provisioner "local-exec" {
    environment = {
      KUBECONFIG = local.kubeconfig_file
    }
    command = <<-EOT
      # Скачиваем и применяем CRD для cert-manager v1.19.2
      echo "Установка CRD cert-manager..."
      kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.19.2/cert-manager.crds.yaml || \
      echo "Предупреждение: CRD могут быть уже установлены или недоступны из GitHub"
    EOT
  }

  # Триггеры для пересоздания при изменении версии cert-manager
  triggers = {
    cert_manager_version = helm_release.cert_manager.version
    cert_manager_id      = helm_release.cert_manager.id
    kubeconfig_file      = local.kubeconfig_file
  }
}
