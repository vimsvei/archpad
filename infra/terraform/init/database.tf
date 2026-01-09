resource "twc_database_cluster" "cluster" {
  project_id        = var.twc_project_id
  name              = var.twc_db_cluster_name
  type              = "postgres18"
  replications      = 1
  preset_id         = 1139
  availability_zone = "msk-1"

  network {
    id = var.twc_network_id
  }
}

resource "twc_database_instance" "db" {
  for_each   = var.databases
  cluster_id = twc_database_cluster.cluster.id
  name       = each.key
}