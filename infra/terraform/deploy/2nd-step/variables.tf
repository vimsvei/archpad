variable "kubeconfig_path" {
  description = "Path to kubeconfig file (optional, defaults to init/kubeconfig.yaml)"
  type        = string
  default     = ""
}

variable "kubeconfig_context" {
  description = "Optional kubeconfig context name"
  type        = string
  default     = null
}

variable "hasura_admin_secret" {
  description = "Hasura admin secret"
  type        = string
  sensitive   = true
}

variable "hasura_database_url" {
  description = "Postgres URL for Hasura (main DB)"
  type        = string
  sensitive   = true
}

variable "hasura_metadata_database_url" {
  description = "Postgres URL for Hasura metadata DB (recommended separate DB)"
  type        = string
  sensitive   = true
}

variable "hasura_host" {
  description = "Public host for Hasura"
  type        = string
  default     = "hasura.archpad.pro"
}

variable "domain_root" {
  description = "Root domain zone"
  type        = string
  default     = "archpad.pro"
}

variable "acme_email" {
  type        = string
  description = "Email for Let's Encrypt account"
}

variable "timeweb_dns01_group_name" {
  type        = string
  description = "cert-manager webhook groupName (must include cluster ID for Timeweb)"
}

variable "timeweb_dns01_solver_name" {
  type        = string
  description = "cert-manager webhook solverName for Timeweb"
}

# Container Registry variables (optional)
variable "registry_url" {
  type        = string
  description = "TimeWeb Container Registry domain (e.g., archpad-cr.registry.twcstorage.ru)"
  default     = null
}

variable "registry_token" {
  type        = string
  description = "TimeWeb Container Registry token (starts with registry-)"
  sensitive   = true
  default     = null
}