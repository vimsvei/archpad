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

variable "vault_host" {
  description = "Public host for Vault UI/API"
  type        = string
  default     = "vault.archpad.pro"
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

# S3 Storage variables for Vault
# Bucket берется из init через remote state, нужно указать только credentials
variable "s3_endpoint" {
  type        = string
  description = "TimeWeb S3 endpoint (e.g., https://s3.timeweb.com)"
  default     = "https://s3.timeweb.com"
}

variable "s3_access_key" {
  type        = string
  description = "TimeWeb S3 access key (required for S3 storage)"
  sensitive   = true
  default     = null
}

variable "s3_secret_key" {
  type        = string
  description = "TimeWeb S3 secret key (required for S3 storage)"
  sensitive   = true
  default     = null
}

variable "s3_region" {
  type        = string
  description = "TimeWeb S3 region (e.g., ru-1)"
  default     = "ru-1"
}

variable "vault_s3_path" {
  type        = string
  description = "Префикс (путь) для Vault storage в S3 bucket (создаст папку в bucket)"
  default     = "vault_storage"
}

variable "use_s3_storage" {
  type        = bool
  description = "Использовать S3 storage для Vault вместо Raft (требует s3_access_key и s3_secret_key)"
  default     = false
}

variable "twc_token" {
  type        = string
  description = "TimeWeb Cloud API token (требуется для создания S3 bucket)"
  sensitive   = true
  default     = null
}

# Vault configuration variables
variable "vault_address" {
  type        = string
  description = "Vault API address (e.g., https://vault.archpad.pro)"
  default     = null
}

variable "vault_token" {
  type        = string
  description = "Vault root token (required for configuring secrets engines and policies)"
  sensitive   = true
  default     = null
}

variable "vault_helm_chart_version" {
  type        = string
  default     = "0.31.0"
}

variable "vault_version" {
  type        = string
  default     = "1.20.4"
}

variable "enable_kv_secrets_engine" {
  type        = bool
  description = "Enable KV secrets engine at path 'kv' (default: true)"
  default     = true
}

variable "kv_secrets_engine_path" {
  type        = string
  description = "Path for KV secrets engine mount (default: kv)"
  default     = "kv"
}

variable "kv_secrets_engine_version" {
  type        = number
  description = "KV secrets engine version (1 or 2, default: 2)"
  default     = 2
}
