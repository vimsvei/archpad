resource "twc_s3_bucket" "archpad-s3-bucket" {
  name = var.twc_s3_bucket_name
  project_id = var.twc_project_id
  preset_id = 2673
  type = "private"
}
