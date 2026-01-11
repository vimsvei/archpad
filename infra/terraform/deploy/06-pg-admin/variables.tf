variable "kubeconfig_path" {
  type        = string
  description = "Path to kubeconfig file (defaults to ../../init/kubeconfig.yaml)"
  default     = ""
}

variable "vault_address" {
  type        = string
  description = "Vault server address (defaults to value from Vault module remote state)"
  default     = null
}

variable "vault_token" {
  type        = string
  description = "Vault token for authentication"
  sensitive   = true
  default     = null
}

variable "vault_environment" {
  type        = string
  description = "Vault environment (e.g., 'demo', 'prod')"
  default     = "demo"
}

variable "kv_secrets_engine_path" {
  type        = string
  description = "Vault KV secrets engine path (defaults to 'kv')"
  default     = "kv"
}

variable "pgadmin_namespace" {
  type        = string
  description = "Kubernetes namespace for pgAdmin"
  default     = "pgadmin"
}

variable "pgadmin_host" {
  type        = string
  description = "Domain name for pgAdmin (e.g., pgadmin.archpad.pro)"
  default     = "pgadmin.archpad.pro"
}

variable "postgres_host" {
  type        = string
  description = "PostgreSQL server host (IP address)"
  default     = "192.168.0.4"
}

variable "postgres_port" {
  type        = number
  description = "PostgreSQL server port"
  default     = 5432
}

variable "postgres_admin_database" {
  type        = string
  description = "PostgreSQL admin database name"
  default     = "default_db"
}

variable "pgadmin_default_email" {
  type        = string
  description = "pgAdmin default email (if not provided, will be retrieved from Vault)"
  default     = null
  sensitive   = true
}

variable "pgadmin_default_password" {
  type        = string
  description = "pgAdmin default password (if not provided, will be retrieved from Vault)"
  default     = null
  sensitive   = true
}

variable "k8s_namespace_traefik" {
  type        = string
  description = "Kubernetes namespace for Traefik (defaults to value from Traefik module remote state)"
  default     = null
}
