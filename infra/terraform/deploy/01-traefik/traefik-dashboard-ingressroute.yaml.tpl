apiVersion: traefik.io/v1alpha1
kind: IngressRoute
metadata:
  name: traefik-dashboard
  namespace: ${namespace}
spec:
  entryPoints:
  - websecure
  routes:
  - match: Host(`traefik.archpad.pro`)
    kind: Rule
%{ if middleware_enabled ~}
    middlewares:
    - name: ${middleware_name}
      namespace: ${namespace}
%{ endif ~}
    services:
    - name: api@internal
      kind: TraefikService
  tls: {}
