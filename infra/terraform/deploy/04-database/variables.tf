variable "kubeconfig_path" {
  description = "Path to kubeconfig file (optional, defaults to init/kubeconfig.yaml)"
  type        = string
  default     = ""
}

variable "vault_host" {
  description = "Public host for Vault UI/API"
  type        = string
  default     = "vault.archpad.pro"
}

variable "vault_address" {
  type        = string
  description = "Vault API address (e.g., https://vault.archpad.pro)"
  default     = null
}

variable "vault_token" {
  type        = string
  description = "Vault root token (required for reading secrets)"
  sensitive   = true
  default     = null
}

variable "kv_secrets_engine_path" {
  type        = string
  description = "Path for KV secrets engine mount (default: kv)"
  default     = "kv"
}

variable "vault_environment" {
  type        = string
  description = "Vault environment path (e.g., 'demo', 'staging', 'production')"
  default     = "demo"
}

# PostgreSQL connection variables
variable "postgres_host" {
  type        = string
  description = "PostgreSQL host address"
  default     = null
}

variable "postgres_port" {
  type        = number
  description = "PostgreSQL port"
  default     = 5432
}

variable "postgres_admin_database" {
  type        = string
  description = "Admin database name (usually 'default_db' for TimeWeb Cloud managed PostgreSQL)"
  default     = "default_db"
}

variable "postgres_admin_user" {
  type        = string
  description = "PostgreSQL admin user (retrieved from Vault secret database-cluster, key POSTGRES_USERNAME)"
  default     = null
  sensitive   = true
}

variable "postgres_admin_password" {
  type        = string
  description = "PostgreSQL admin password"
  sensitive   = true
  default     = null
}

variable "postgres_ssl_mode" {
  type        = string
  description = "PostgreSQL SSL mode. Supported values: require (default), verify-full, verify-ca, disable. Для подключения через Traefik TCP проксирование обычно используется 'disable'"
  default     = "disable"
}

variable "postgres_connect_timeout" {
  type        = number
  description = "PostgreSQL connection timeout in seconds"
  default     = 30
}



# Database user names (optional, можно получить из Vault)
variable "archpad_db_user_name" {
  type        = string
  description = "Project database user name (optional, defaults to 'project_db_user')"
  default     = "archpad_user"
}

variable "tenant_db_user_name" {
  type        = string
  description = "Project database user name (optional, defaults to 'project_db_user')"
  default     = "tenant_user"
}

variable "hasura_db_user_name" {
  type        = string
  description = "Hasura database user name (optional, defaults to 'hasura_db_user')"
  default     = "hasura_user"
}

variable "kratos_db_user_name" {
  type        = string
  description = "Kratos database user name (optional, defaults to 'kratos_db_user')"
  default     = "kratos_user"
}

variable "hydra_db_user_name" {
  type        = string
  description = "Hydra database user name (optional, defaults to 'hydra_db_user')"
  default     = "hydra_user"
}

variable "tolgee_db_user_name" {
  type        = string
  description = "Tolgee database user name (optional, defaults to 'tolgee_db_user')"
  default     = "tolgee_user"
}

# Kubernetes port-forward options (для подключения к приватному IP PostgreSQL)
variable "use_kubectl_port_forward" {
  type        = bool
  description = "Использовать kubectl port-forward для подключения к PostgreSQL (если БД только с приватным IP)"
  default     = false
}

variable "postgres_k8s_namespace" {
  type        = string
  description = "Kubernetes namespace, где находится PostgreSQL pod (если используется port-forward)"
  default     = "default"
}

variable "postgres_k8s_pod" {
  type        = string
  description = "Имя PostgreSQL pod в Kubernetes (если используется port-forward к pod)"
  default     = null
}

variable "postgres_k8s_service" {
  type        = string
  description = "Имя PostgreSQL service в Kubernetes (если используется port-forward к service)"
  default     = null
}

variable "postgres_local_port" {
  type        = number
  description = "Локальный порт для kubectl port-forward (если используется port-forward)"
  default     = 5433
}

# Traefik TCP routing для PostgreSQL
variable "postgres_traefik_host" {
  type        = string
  description = "Домен для PostgreSQL через Traefik (например, pg.archpad.pro). Если указан, будет создан IngressRouteTCP и Service"
  default     = null
}

variable "postgres_traefik_port" {
  type        = number
  description = "Порт Traefik для подключения к PostgreSQL через домен (по умолчанию используется postgres_port, но может быть 8080 или другой порт LoadBalancer)"
  default     = null
}

variable "postgres_traefik_namespace" {
  type        = string
  description = "Namespace для Traefik IngressRouteTCP (по умолчанию используется namespace из Traefik)"
  default     = null
}

variable "k8s_namespace_traefik" {
  type        = string
  description = "Kubernetes namespace для Traefik (используется для port-forward к Traefik Service)"
  default     = "traefik"
}
