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

variable "k8s_namespace_traefik" {
  type        = string
  default     = "traefik"
}

# Traefik Dashboard authentication (optional)
variable "traefik_dashboard_username" {
  description = "Username for Traefik Dashboard BasicAuth (optional, if not set dashboard will be public)"
  type        = string
  sensitive   = true
  default     = null
}

variable "traefik_dashboard_password" {
  description = "Password for Traefik Dashboard BasicAuth (optional, if not set will try to get from Vault or dashboard will be public)"
  type        = string
  sensitive   = true
  default     = null
}

# Vault configuration (optional, for getting traefik_dashboard_password from Vault)
variable "vault_address" {
  description = "Vault API address (e.g., https://vault.archpad.pro)"
  type        = string
  default     = null
}

variable "vault_token" {
  description = "Vault token for authentication (required if getting password from Vault)"
  type        = string
  sensitive   = true
  default     = null
}

variable "vault_environment" {
  description = "Vault environment for secrets path (e.g., demo, prod)"
  type        = string
  default     = "demo"
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

# PostgreSQL TCP Routing через Traefik (опционально)
variable "postgres_host" {
  type        = string
  description = "Приватный IP PostgreSQL managed database (например, 192.168.0.4)"
  default     = null
}

variable "postgres_port" {
  type        = number
  description = "Порт PostgreSQL (по умолчанию 5432)"
  default     = 5432
}

variable "postgres_traefik_host" {
  type        = string
  description = "Домен для PostgreSQL через Traefik (например, pg.archpad.pro). Если указан, будет создан IngressRouteTCP и Service/Endpoints"
  default     = null
}

variable "postgres_traefik_service_namespace" {
  type        = string
  description = "Namespace для PostgreSQL Service и Endpoints (по умолчанию 'default')"
  default     = null
}
