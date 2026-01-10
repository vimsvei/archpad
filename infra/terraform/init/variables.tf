variable "twc_token" {
  description = "API token for Timeweb Cloud"
  type        = string
  sensitive   = true
}

variable "twc_project_id" {
  description = "Project ID"
  type        = number
  default     = 1984197
}

variable "twc_project_name" {
  description = "Project Name"
  type        = string
  default     = "archpad"
}

variable "twc_db_cluster_name" {
  description = "DB Cluster Name"
  type        = string
  default     = "archpad-db-cluster"
}

variable "twc_k8s_cluster_name" {
  description = "K8s Cluster Name"
  type        = string
  default     = "archpad-k8s-cluster"
}

variable "twc_k8s_workers_name" {
  description = "K8s Workers Group Name"
  type        = string
  default     = "archpad-k8s-workers"
}

variable "twc_network_id" {
  description = "Network ID"
  type        = string
  default     = "network-974c97ae99c64b41b106db46e2efdaa6"
}

variable "twc_s3_bucket_name" {
  description = "S3 Bucket Name"
  type        = string
  default     = "archpad-s3"
}

variable "postgres_admin_password" {
  description = "PostgreSQL admin password for the managed database cluster. If not provided, you will need to get it from TimeWeb Cloud panel or API after cluster creation."
  type        = string
  sensitive   = true
  default     = null
}
