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

# Получение пароля администратора из TimeWeb Cloud API после создания кластера
# Если пароль задан в переменной, используем его; иначе пытаемся получить через API
data "external" "db_cluster_credentials" {
  count = var.postgres_admin_password == null ? 1 : 0

  program = ["bash", "-c", <<-EOT
    # Получаем credentials через TimeWeb Cloud API
    # API endpoint: GET /v1/databases/{cluster_id}/credentials
    CLUSTER_ID="${twc_database_cluster.cluster.id}"
    TOKEN="${var.twc_token}"
    
    # Пытаемся получить пароль через API
    RESPONSE=$(curl -s -X GET \
      "https://api.timeweb.cloud/api/v1/databases/$CLUSTER_ID/credentials" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Content-Type: application/json" 2>/dev/null || echo '{"error":"API call failed"}')
    
    # Парсим ответ и извлекаем пароль
    PASSWORD=$(echo "$RESPONSE" | grep -o '"password":"[^"]*"' | cut -d'"' -f4 || echo "")
    
    if [ -z "$PASSWORD" ]; then
      echo "{\"password\":\"\",\"error\":\"Could not retrieve password from API. Please get it manually from TimeWeb Cloud panel.\"}" | jq -c
    else
      echo "{\"password\":\"$PASSWORD\"}" | jq -c
    fi
  EOT
  ]

  depends_on = [twc_database_cluster.cluster]
}

locals {
  # Получаем пароль из API (может быть пустой строкой или null)
  # Если пароль пустой, используем null вместо пустой строки
  password_from_api = var.postgres_admin_password == null ? try(
    length(data.external.db_cluster_credentials[0].result.password) > 0 ? data.external.db_cluster_credentials[0].result.password : null,
    null
  ) : null
  
  # Используем пароль из переменной, если задан, иначе пытаемся получить из API
  # Если пароль не задан нигде, остается null (пользователь должен получить его вручную)
  postgres_admin_password_resolved = var.postgres_admin_password != null ? var.postgres_admin_password : local.password_from_api
}
