output "project" {
  description = "Timeweb Cloud project context"
  value = {
    id   = var.twc_project_id
    name = var.twc_project_name
  }
}

output "k8s_cluster" {
  description = "Kubernetes cluster summary"
  value = {
    id             = twc_k8s_cluster.cluster.id
    name           = twc_k8s_cluster.cluster.name
    version        = try(twc_k8s_cluster.cluster.version, null)
    preset_id      = try(twc_k8s_cluster.cluster.preset_id, null)
    network_id     = try(twc_k8s_cluster.cluster.network_id, null)
    network_driver = try(twc_k8s_cluster.cluster.network_driver, null)
  }
}

output "k8s_cluster_kubeconfig" {
  description = "Kubernetes cluster kubeconfig (sensitive)"
  value       = twc_k8s_cluster.cluster.kubeconfig
  sensitive   = true
}

output "k8s_cluster_kubeconfig_path" {
  description = "Path to saved kubeconfig file"
  value       = local_file.kubeconfig.filename
}

output "k8s_node_group_workers" {
  description = "Kubernetes workers node group summary"
  value = {
    id          = twc_k8s_node_group.workers.id
    name        = twc_k8s_node_group.workers.name
    cluster_id  = twc_k8s_node_group.workers.cluster_id
    preset_id   = try(twc_k8s_node_group.workers.preset_id, null)
    node_count  = try(twc_k8s_node_group.workers.node_count, null)
    autoscaling = {
      enabled = try(twc_k8s_node_group.workers.is_autoscaling, null)
      min     = try(twc_k8s_node_group.workers.min_size, null)
      max     = try(twc_k8s_node_group.workers.max_size, null)
    }
  }
}

output "db_cluster" {
  description = "Managed DB cluster summary"
  value = {
    id                = twc_database_cluster.cluster.id
    name              = twc_database_cluster.cluster.name
    type              = try(twc_database_cluster.cluster.type, null)
    preset_id         = try(twc_database_cluster.cluster.preset_id, null)
    availability_zone = try(twc_database_cluster.cluster.availability_zone, null)
    network_id        = try(twc_database_cluster.cluster.network[0].id, null)
  }
}

output "db_instances" {
  description = "DB instances inside the managed cluster (by name)"
  value = {
    for db_name, db_res in twc_database_instance.db :
    db_name => {
      id         = db_res.id
      name       = db_res.name
      cluster_id = db_res.cluster_id
    }
  }
}