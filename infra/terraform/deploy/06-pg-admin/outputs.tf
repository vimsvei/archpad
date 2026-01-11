output "pgadmin_namespace" {
  description = "Kubernetes namespace for pgAdmin"
  value       = kubernetes_namespace.pgadmin.metadata[0].name
  sensitive   = false
}

output "pgadmin_host" {
  description = "Domain name for pgAdmin"
  value       = var.pgadmin_host
  sensitive   = false
}

output "pgadmin_service" {
  description = "Kubernetes Service for pgAdmin"
  value = {
    name      = kubernetes_service.pgadmin.metadata[0].name
    namespace = kubernetes_service.pgadmin.metadata[0].namespace
  }
  sensitive = false
}
