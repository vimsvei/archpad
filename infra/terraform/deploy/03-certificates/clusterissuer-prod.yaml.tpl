apiVersion: cert-manager.io/v1
kind: ClusterIssuer
metadata:
  name: letsencrypt-prod
spec:
  acme:
    email: ${acme_email}
    server: https://acme-v02.api.letsencrypt.org/directory
    privateKeySecretRef:
      name: letsencrypt-prod-account-key
    solvers:
%{ if timeweb_dns01_group_name != null ~}
      - dns01:
          webhook:
            groupName: ${timeweb_dns01_group_name}
            solverName: ${timeweb_dns01_solver_name}
            config: {}
%{ else ~}
      - http01:
          ingress:
            class: traefik
%{ endif ~}
