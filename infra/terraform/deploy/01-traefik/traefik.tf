resource "kubernetes_namespace" "traefik" {
  metadata {
    name = var.k8s_namespace_traefik
  }
}

resource "helm_release" "traefik" {
  name       = var.k8s_namespace_traefik
  namespace  = kubernetes_namespace.traefik.metadata[0].name
  repository = "https://traefik.github.io/charts"
  chart      = "traefik"
  version    = "34.1.0"
  
  # Увеличиваем timeout для развертывания Traefik
  timeout    = 1800  # 30 минут
  
  # Не удаляем атомарно - позволяет продолжить даже при ошибках удаления
  atomic                     = false
  cleanup_on_fail           = false
  
  # Отключаем хуки при удалении для более быстрого удаления
  disable_webhooks          = true
  
  # НЕ ждать успешного статуса - позволяет применить даже если поды не готовы
  # Это даст возможность проверить проблему вручную
  wait                      = true
  wait_for_jobs            = false

  values = [yamlencode(merge({
    image = {
      tag = "3.6.6"  # Используем конкретную версию образа Traefik
    }
    
    # RBAC для Traefik (нужно для чтения ConfigMap, IngressRoute и других ресурсов)
    rbac = {
      enabled = true
      namespaced = false  # ClusterRole для доступа ко всем namespace
    }
    
    # ServiceAccount настройки
    # Если используется registry, используем существующий ServiceAccount
    # Иначе Helm chart создаст свой ServiceAccount
    serviceAccountName = local.registry_enabled ? kubernetes_service_account.registry_sa[0].metadata[0].name : null
    
    deployment = {
      replicas = 1  # Уменьшаем количество реплик для отладки
      # Ограничиваем ресурсы для Traefik (в случае нехватки ресурсов в кластере)
      resources = {
        requests = {
          cpu    = "100m"
          memory = "128Mi"
        }
        limits = {
          cpu    = "500m"
          memory = "512Mi"
        }
      }
    }

    service = {
      type = "LoadBalancer"
      annotations = {
        # Метки для идентификации LoadBalancer в TimeWeb Cloud
        "service.beta.kubernetes.io/external-traffic" = "OnlyLocal"
      }
      labels = {
        # Метки для более понятной идентификации
        "app.kubernetes.io/component" = "loadbalancer"
        "app.kubernetes.io/part-of"   = "archpad"
      }
    }

    ports = {
      web = {
        port = 8000  # Порт внутри пода (непривилегированный)
        exposedPort = 80  # Порт в LoadBalancer (публичный)
      }
      websecure = {
        port = 8443  # Порт внутри пода (непривилегированный)
        exposedPort = 443  # Порт в LoadBalancer (публичный)
      }
    }

    providers = {
      kubernetesCRD = { enabled = true }
      kubernetesIngress = { enabled = true }
    }

    additionalArguments = [
      "--api.dashboard=true",
      "--entrypoints.web.address=:8000",  # Используем непривилегированный порт
      "--entrypoints.websecure.address=:8443",  # Используем непривилегированный порт
      "--entrypoints.web.http.redirections.entrypoint.to=websecure",
      "--entrypoints.web.http.redirections.entrypoint.scheme=https",
      "--entrypoints.web.http.redirections.entrypoint.permanent=true",
    ]
  }))]

  depends_on = [kubernetes_namespace.traefik]
}

# Задержка для установки CRD Traefik после развертывания Helm chart
resource "time_sleep" "wait_for_traefik_crd" {
  depends_on = [helm_release.traefik]
  
  create_duration = "30s"
}

data "kubernetes_service" "traefik" {
  metadata {
    name      = "traefik"
    namespace = kubernetes_namespace.traefik.metadata[0].name
  }

  depends_on = [helm_release.traefik]
}