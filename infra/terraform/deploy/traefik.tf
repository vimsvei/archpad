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

  # Желательно зафиксировать версию чарта, чтобы обновления не ломали прод
  version    = "34.1.0"

  # Traefik как ingress-controller
  values = [yamlencode(merge({
    deployment = {
      replicas = 2
    }

    service = {
      type = "LoadBalancer"
      # ВАЖНО: Публичный IP для Kubernetes сервисов получается через LoadBalancer Service, 
      # а не через настройки кластера. TimeWeb Cloud автоматически создаст LoadBalancer 
      # и назначит публичный IP после развертывания Traefik.
      # 
      # После развертывания публичный IP можно получить:
      # 1. Через Terraform: terraform output traefik_lb_ip
      # 2. Через kubectl: kubectl get svc traefik -n traefik
      # 3. Через панель управления TimeWeb Cloud -> LoadBalancers
      #
      # Этот IP адрес нужно будет указать в DNS записях для ваших доменов
      # (hasura.archpad.pro, vault.archpad.pro и т.д.)
      annotations = {
        # Опциональные аннотации для LoadBalancer (если нужны специфичные настройки TimeWeb Cloud)
      }
    }

    ports = {
      web = {
        port = 80
        redirectTo = { port = "websecure" }
      }
      websecure = {
        port = 443
      }
    }

    providers = {
      kubernetesCRD = { enabled = true }
      kubernetesIngress = { enabled = true }
    }

    additionalArguments = [
      "--api.dashboard=true",
      "--entrypoints.web.address=:80",
      "--entrypoints.websecure.address=:443",
    ]
  }, local.registry_enabled ? {
    serviceAccount = {
      create = false
      name   = kubernetes_service_account.registry_sa["traefik"].metadata[0].name
    }
  } : {}))]

  depends_on = [kubernetes_namespace.traefik]
}

data "kubernetes_service" "traefik" {
  metadata {
    name      = "traefik"
    namespace = kubernetes_namespace.traefik.metadata[0].name
  }

  depends_on = [helm_release.traefik]
}
