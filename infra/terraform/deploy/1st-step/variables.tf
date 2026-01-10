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

# S3 Storage variables for Vault (optional, but recommended for production)
variable "s3_endpoint" {
  type        = string
  description = "TimeWeb S3 endpoint (e.g., https://s3.timeweb.com)"
  default     = null
}

variable "s3_bucket" {
  type        = string
  description = "TimeWeb S3 bucket name for Vault storage"
  default     = null
}

variable "s3_access_key" {
  type        = string
  description = "TimeWeb S3 access key"
  sensitive   = true
  default     = null
}

variable "s3_secret_key" {
  type        = string
  description = "TimeWeb S3 secret key"
  sensitive   = true
  default     = null
}

variable "s3_region" {
  type        = string
  description = "TimeWeb S3 region (e.g., ru-1)"
  default     = "ru-1"
}

# S3 Bucket configuration (optional - для создания bucket через Terraform)
variable "s3_bucket_name" {
  type        = string
  description = "Имя S3 bucket для Vault (если null и s3_endpoint указан, будет создан новый bucket)"
  default     = null
}

variable "s3_preset_id" {
  type        = number
  description = "TimeWeb S3 preset ID (по умолчанию 2669 - минимальный)"
  default     = 2669
}

variable "s3_bucket_type" {
  type        = string
  description = "Тип S3 bucket (public или private, по умолчанию private для безопасности)"
  default     = "private"
}

variable "s3_project_id" {
  type        = number
  description = "TimeWeb Project ID для S3 bucket"
  default     = 1984197
}

variable "twc_token" {
  type        = string
  description = "TimeWeb Cloud API token (требуется для создания S3 bucket)"
  sensitive   = true
  default     = null
}