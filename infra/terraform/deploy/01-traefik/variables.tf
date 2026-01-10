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
