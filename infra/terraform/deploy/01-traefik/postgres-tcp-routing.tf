# ============================================================================
# Traefik TCP Routing для PostgreSQL managed database
# ============================================================================
# Создает Service, Endpoints и IngressRouteTCP для маршрутизации PostgreSQL
# через Traefik на домене pg.archpad.pro

locals {
  # Проверяем, нужно ли создавать Traefik routing для PostgreSQL
  create_postgres_routing = var.postgres_traefik_host != null && var.postgres_traefik_host != ""

  # Namespace для PostgreSQL Service - используем namespace Traefik для упрощения разрешения имен
  # Это избежит проблем с поиском сервиса в других namespace
  postgres_service_namespace = var.postgres_traefik_service_namespace != null ? var.postgres_traefik_service_namespace : kubernetes_namespace.traefik.metadata[0].name

  # kubeconfig_file уже определен в provider.tf
}

# Kubernetes Service для PostgreSQL (headless, для использования с Endpoints)
resource "null_resource" "postgres_service" {
  count = local.create_postgres_routing ? 1 : 0

  provisioner "local-exec" {
    command = <<-EOT
      kubectl apply --kubeconfig=${local.kubeconfig_file} -f - <<YAML_EOF
apiVersion: v1
kind: Service
metadata:
  name: postgres-external
  namespace: ${local.postgres_service_namespace}
spec:
  type: ClusterIP
  ports:
    - port: ${var.postgres_port}
      targetPort: ${var.postgres_port}
      protocol: TCP
      name: postgres
  clusterIP: None  # Headless service для использования с Endpoints
YAML_EOF
    EOT
  }

  provisioner "local-exec" {
    when    = destroy
    command = <<-EOT
      kubectl delete service postgres-external -n ${self.triggers.postgres_service_namespace} --kubeconfig=${self.triggers.kubeconfig_file} --ignore-not-found=true
    EOT
  }

  triggers = {
    postgres_service_namespace = local.postgres_service_namespace
    postgres_host              = var.postgres_host
    postgres_port              = var.postgres_port
    kubeconfig_file            = local.kubeconfig_file
  }
}

# Kubernetes Endpoints для PostgreSQL (указывает на приватный IP)
resource "null_resource" "postgres_endpoints" {
  count = local.create_postgres_routing ? 1 : 0

  depends_on = [null_resource.postgres_service]

  provisioner "local-exec" {
    command = <<-EOT
      kubectl apply --kubeconfig=${local.kubeconfig_file} -f - <<YAML_EOF
apiVersion: v1
kind: Endpoints
metadata:
  name: postgres-external
  namespace: ${local.postgres_service_namespace}
subsets:
  - addresses:
      - ip: ${var.postgres_host}
    ports:
      - port: ${var.postgres_port}
        name: postgres
        protocol: TCP
YAML_EOF
    EOT
  }

  provisioner "local-exec" {
    when    = destroy
    command = <<-EOT
      kubectl delete endpoints postgres-external -n ${self.triggers.postgres_service_namespace} --kubeconfig=${self.triggers.kubeconfig_file} --ignore-not-found=true
    EOT
  }

  triggers = {
    postgres_service_namespace = local.postgres_service_namespace
    postgres_host              = var.postgres_host
    postgres_port              = var.postgres_port
    kubeconfig_file            = local.kubeconfig_file
  }
}

# Traefik IngressRouteTCP для PostgreSQL
resource "null_resource" "postgres_ingressroute_tcp" {
  count = local.create_postgres_routing ? 1 : 0

  depends_on = [
    helm_release.traefik,
    time_sleep.wait_for_traefik_crd,
    null_resource.postgres_service[0],
    null_resource.postgres_endpoints[0],
  ]

  provisioner "local-exec" {
    command = <<-EOT
      # Ждем, пока сервис будет создан и будет доступен
      echo "Waiting for service postgres-external in namespace ${local.postgres_service_namespace}..."
      timeout 30 bash -c 'until kubectl get svc postgres-external -n ${local.postgres_service_namespace} --kubeconfig=${local.kubeconfig_file} >/dev/null 2>&1; do sleep 1; done' || true
      sleep 2

      # Проверяем, что сервис действительно существует
      if ! kubectl get svc postgres-external -n ${local.postgres_service_namespace} --kubeconfig=${local.kubeconfig_file} >/dev/null 2>&1; then
        echo "Error: Service postgres-external not found in namespace ${local.postgres_service_namespace}" >&2
        exit 1
      fi

      # Принудительно удаляем старый IngressRouteTCP с неправильной конфигурацией (entryPoint "postgres")
      echo "Removing old IngressRouteTCP if exists (may have wrong entryPoint 'postgres')..."
      kubectl delete ingressroutetcp postgres -n ${kubernetes_namespace.traefik.metadata[0].name} --kubeconfig=${local.kubeconfig_file} --ignore-not-found=true || true
      sleep 3
      
      # Проверяем, что ресурс действительно удален
      echo "Checking if IngressRouteTCP was removed..."
      if kubectl get ingressroutetcp postgres -n ${kubernetes_namespace.traefik.metadata[0].name} --kubeconfig=${local.kubeconfig_file} 2>/dev/null; then
        echo "Warning: IngressRouteTCP still exists, forcing deletion..."
        kubectl delete ingressroutetcp postgres -n ${kubernetes_namespace.traefik.metadata[0].name} --kubeconfig=${local.kubeconfig_file} --grace-period=0 --force 2>/dev/null || true
        sleep 2
      fi

      # Создаем новый ресурс с правильной конфигурацией
      echo "Creating new IngressRouteTCP..."
      kubectl apply --kubeconfig=${local.kubeconfig_file} -f - <<YAML_EOF
apiVersion: traefik.io/v1alpha1
kind: IngressRouteTCP
metadata:
  name: postgres
  namespace: ${kubernetes_namespace.traefik.metadata[0].name}
spec:
  entryPoints:
    - web
  routes:
    # Маршрутизация PostgreSQL через порт 80 (entryPoint web)
    # LoadBalancer экспортирует только порт 80, который соответствует entryPoint web
    # Для TCP без TLS НЕЛЬЗЯ использовать HostSNI с доменом - HostSNI работает только с TLS
    # Используем HostSNI("*") для всех TCP соединений без TLS на этом entryPoint
    # HTTP редиректы не мешают TCP трафику, так как Traefik различает HTTP и raw TCP протоколы
    - match: HostSNI("*")
      services:
        - name: postgres-external
          namespace: ${local.postgres_service_namespace}
          port: ${var.postgres_port}
YAML_EOF

      # Проверяем, что ресурс создан правильно
      echo "Verifying IngressRouteTCP was created..."
      kubectl get ingressroutetcp postgres -n ${kubernetes_namespace.traefik.metadata[0].name} --kubeconfig=${local.kubeconfig_file} -o yaml | grep -A 5 "match:" || echo "Warning: Could not verify match rule"

      # Ждем немного, чтобы Traefik подхватил изменения
      sleep 5

      # Проверяем статус IngressRouteTCP
      echo "Checking IngressRouteTCP status..."
      kubectl get ingressroutetcp postgres -n ${kubernetes_namespace.traefik.metadata[0].name} --kubeconfig=${local.kubeconfig_file} -o yaml || true

      # Перезапускаем Traefik для обновления конфигурации (опционально, если проблема с кэшем)
      echo "Restarting Traefik to refresh configuration..."
      kubectl rollout restart deployment ${var.k8s_namespace_traefik} -n ${kubernetes_namespace.traefik.metadata[0].name} --kubeconfig=${local.kubeconfig_file} || true

      echo "IngressRouteTCP created successfully"
    EOT
  }

  provisioner "local-exec" {
    when    = destroy
    command = <<-EOT
      kubectl delete ingressroutetcp postgres -n ${self.triggers.traefik_namespace} --kubeconfig=${self.triggers.kubeconfig_file} --ignore-not-found=true
    EOT
  }

  triggers = {
    namespace         = local.postgres_service_namespace
    traefik_namespace = kubernetes_namespace.traefik.metadata[0].name
    postgres_host     = var.postgres_traefik_host
    postgres_port     = var.postgres_port
    kubeconfig_file   = local.kubeconfig_file
    # Для TCP без TLS используем HostSNI("*") - нельзя использовать HostSNI с доменом без TLS
    match_rule        = "HostSNI(\"*\")"
    service_name      = "postgres-external"
    # ВАЖНО: entryPoint изменен с "postgres" на "web" - это принудительно пересоздаст ресурс
    entrypoint        = "web"
  }
}
