output "traefik_service" {
  description = "Traefik Service (LoadBalancer) basics"
  value = {
    namespace = data.kubernetes_service.traefik.metadata[0].namespace
    name      = data.kubernetes_service.traefik.metadata[0].name
    type      = data.kubernetes_service.traefik.spec[0].type
  }
}

locals {
  traefik_status = try(data.kubernetes_service.traefik.status, [])
  traefik_status_any = try(jsondecode(jsonencode(local.traefik_status)), [])
  traefik_lb_ingress = try(local.traefik_status_any[0].load_balancer[0].ingress, [])
}

output "traefik_lb_ip" {
  description = <<-EOT
    External IP of Traefik LoadBalancer (публичный IP для доступа к сервисам)
    
    ВАЖНО: Этот IP адрес нужно использовать для настройки DNS записей:
    - hasura.archpad.pro → этот IP
    - vault.archpad.pro → этот IP
    - *.archpad.pro → этот IP (wildcard)
    
    Примечание: IP может быть назначен не сразу после развертывания.
    Если значение null, подождите 1-2 минуты и выполните:
    terraform refresh && terraform output traefik_lb_ip
  EOT
  value       = try(local.traefik_lb_ingress[0].ip, null)
}

output "traefik_lb_hostname" {
  description = "External hostname of Traefik LoadBalancer (if provided by cloud)"
  value       = try(local.traefik_lb_ingress[0].hostname, null)
}

output "traefik_loadbalancer_info" {
  description = "Полная информация о LoadBalancer Traefik (для отладки)"
  value = {
    ip          = try(local.traefik_lb_ingress[0].ip, "назначается...")
    hostname    = try(local.traefik_lb_ingress[0].hostname, null)
    namespace   = data.kubernetes_service.traefik.metadata[0].namespace
    service_name = data.kubernetes_service.traefik.metadata[0].name
    note        = "Если IP еще не назначен, подождите 1-2 минуты и выполните: terraform refresh"
  }
}