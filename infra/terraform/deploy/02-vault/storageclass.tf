# Установка local-path-provisioner для динамического создания PersistentVolume
# Устанавливается только если НЕ используется S3 для Vault
# Это необходимо для работы Vault и других сервисов, требующих persistent storage
# Используем YAML манифесты, так как Helm chart может быть недоступен

resource "null_resource" "local_path_provisioner" {
  count = var.use_s3_storage ? 0 : 1

  provisioner "local-exec" {
    command = <<-EOT
      kubectl apply --kubeconfig=${local.kubeconfig_file} -f https://raw.githubusercontent.com/rancher/local-path-provisioner/v0.0.24/deploy/local-path-storage.yaml
      kubectl patch storageclass local-path --kubeconfig=${local.kubeconfig_file} -p '{"metadata": {"annotations": {"storageclass.kubernetes.io/is-default-class": "true"}}}' || true
    EOT
  }

  provisioner "local-exec" {
    when    = destroy
    command = <<-EOT
      kubectl delete --kubeconfig=${self.triggers.kubeconfig_file} -f https://raw.githubusercontent.com/rancher/local-path-provisioner/v0.0.24/deploy/local-path-storage.yaml --ignore-not-found=true
    EOT
  }

  triggers = {
    kubeconfig_file = local.kubeconfig_file
  }
}
