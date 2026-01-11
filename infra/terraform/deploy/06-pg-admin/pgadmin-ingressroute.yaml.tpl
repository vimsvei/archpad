apiVersion: traefik.io/v1alpha1
kind: IngressRoute
metadata:
  name: pgadmin
  namespace: ${pgadmin_namespace}
spec:
  entryPoints:
  - websecure
  routes:
  - match: Host(`${host}`)
    kind: Rule
    services:
    - name: pgadmin
      port: 80
  tls: {}
