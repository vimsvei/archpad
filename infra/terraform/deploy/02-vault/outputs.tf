output "vault_namespace" {
  description = "Vault namespace name"
  value       = kubernetes_namespace.vault.metadata[0].name
}

output "vault_host" {
  description = "Vault UI/API host"
  value       = var.vault_host
}

output "vault_address" {
  description = "Vault API address"
  value       = var.vault_address != null ? var.vault_address : "https://${var.vault_host}"
}
