resource "twc_k8s_cluster" "cluster" {
  project_id     = var.twc_project_id
  name           = var.twc_k8s_cluster_name
  network_id     = var.twc_network_id
  network_driver = "calico"
  version        = "v1.34.2+k0s.0"
  preset_id      = 1673
}

resource "twc_k8s_node_group" "workers" {
  cluster_id     = twc_k8s_cluster.cluster.id
  name           = var.twc_k8s_workers_name
  preset_id      = 1679
  node_count     = 2
  min_size       = 2
  max_size       = 4
  is_autoscaling = true
}

# Сохраняем kubeconfig для использования в deploy
resource "local_file" "kubeconfig" {
  content       = twc_k8s_cluster.cluster.kubeconfig
  filename      = "${path.module}/kubeconfig.yaml"
  file_permission = "0600"

  depends_on = [twc_k8s_cluster.cluster]
}