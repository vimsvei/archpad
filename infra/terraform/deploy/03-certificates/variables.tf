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

variable "acme_email" {
  type        = string
  description = "Email for Let's Encrypt account"
}

variable "domain_root" {
  description = "Root domain zone (e.g., archpad.pro)"
  type        = string
  default     = "archpad.pro"
}

variable "timeweb_dns01_group_name" {
  type        = string
  description = "cert-manager webhook groupName (must include cluster ID for Timeweb)"
  default     = null
}

variable "timeweb_dns01_solver_name" {
  type        = string
  description = "cert-manager webhook solverName for Timeweb (должно быть 'twcloud-dns' согласно документации TimeWeb)"
  default     = "twcloud-dns"
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

# Traefik namespace (defaults to traefik)
variable "k8s_namespace_traefik" {
  description = "Kubernetes namespace for Traefik"
  type        = string
  default     = "traefik"
}
