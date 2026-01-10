apiVersion: cert-manager.io/v1
kind: Certificate
metadata:
  name: ${certificate_name}
  namespace: ${namespace}
spec:
  secretName: ${secret_name}
  issuerRef:
    name: letsencrypt-prod
    kind: ClusterIssuer
  dnsNames:
    - ${domain_root}
    - '*.${domain_root}'
