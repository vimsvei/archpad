apiVersion: traefik.io/v1alpha1
kind: IngressRoute
metadata:
  name: vault
  namespace: ${vault_namespace}
spec:
  entryPoints:
    - websecure
  routes:
    - match: Host(`${vault_host}`)
      kind: Rule
      services:
        - name: vault
          port: 8200
  tls: {}
