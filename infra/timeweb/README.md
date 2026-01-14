# Timeweb Kubernetes GitOps bootstrap (ArgoCD -> Traefik -> cert-manager -> wildcard -> Argo ingressroute)

## Preconditions (manual, one-time)
1) You already have kubeconfig working.
2) In Timeweb panel install addons:
    - cert-manager (addon)
    - cert-manager Webhook (addon)  <-- required for DNS-01 wildcard
3) Domain is delegated to Timeweb NS (required by webhook).
4) Decide:
    - base domain: archpad.pro
    - argocd host: argo.archpad.pro

## Step 1: Create namespaces
kubectl apply -f infra/timeweb/00-bootstrap/namespaces.yaml

## Step 2: Install Argo CD (bootstrap, no ingress yet)
helm repo add argo https://argoproj.github.io/argo-helm
helm repo update

helm upgrade --install argocd argo/argo-cd \
-n argocd \
-f infra/timeweb/00-bootstrap/argocd-values.bootstrap.yaml

## Step 3: Access Argo CD (temporary) via port-forward
kubectl -n argocd port-forward svc/argocd-server 8080:80

Open: http://localhost:8080

Get initial admin password:
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d && echo

## Step 4: Create Git repo and push infra/timeweb/10-gitops
- Create a repo (GitHub/GitLab) and push infra/timeweb/10-gitops folder.
- Update root-app.yaml with your repo URL.

Apply root app:
kubectl apply -f infra/timeweb/10-gitops/root-app.yaml

## Step 5: Configure Timeweb webhook solverName (one-time)
Find webhook deployment name:
kubectl -n cert-manager get deploy | grep -i webhook

Inspect args/env to find solverName and required groupName format:
kubectl -n cert-manager get deploy <DEPLOY_NAME> -o yaml | sed -n '1,200p'

Update:
- issuer-timeweb.clusterissuer.yaml:
  PATCHME_CLUSTER_ID
  PATCHME_SOLVER_NAME
  PATCHME_EMAIL

Commit & push -> Argo sync.

## Step 6: Traefik external IP and DNS
After Traefik app is synced, get external IP:
kubectl -n traefik get svc traefik -o wide

In Timeweb DNS:
- Create A record: *.archpad.pro -> <EXTERNAL_IP>
- (optional) Create A record: argo.archpad.pro -> <EXTERNAL_IP>

## Step 7: Verify wildcard cert issuance
kubectl -n platform describe certificate archpad-wildcard
kubectl -n platform get secret archpad-wildcard-tls

## Step 8: Open Argo CD via HTTPS
https://argo.archpad.pro
