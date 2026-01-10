apiVersion: traefik.io/v1alpha1
kind: IngressRouteTCP
metadata:
  name: postgres
  namespace: ${traefik_namespace}
spec:
  entryPoints:
    - postgres
  routes:
    # Для PostgreSQL без TLS используем маршрутизацию всего трафика на порту postgres
    # HostSNI("*") для TCP без TLS - используем двойные кавычки вместо обратных
    - match: HostSNI("*")
      services:
        - name: postgres-external
          namespace: ${namespace}
          port: ${postgres_port}
