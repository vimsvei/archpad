#!/bin/bash
set -euo pipefail

# Скрипт для создания Secret с setup_token в Kubernetes
# Использование: ./create-setup-token-secret.sh [KUBECONFIG_PATH]

KUBECONFIG_PATH="${1:-$(pwd)/infra/timeweb/k8s_config/twc-archpad-k8s-cluster-config.yaml}"
SETUP_TOKEN="${SETUP_TOKEN:-hvs.CAESIGvK8iJjPcVqkoq7v9hJjfWZm4mMaEXk2cDI2qK5_WuQGh4KHGh2cy5hemNUWnFQMEtDT2pGdmNSSlphQ3paaHI}"

if [ -z "$SETUP_TOKEN" ]; then
  echo "ERROR: SETUP_TOKEN is required"
  echo "Usage: SETUP_TOKEN='your-token' $0 [KUBECONFIG_PATH]"
  exit 1
fi

export KUBECONFIG="$KUBECONFIG_PATH"

echo "=========================================="
echo "Creating vault-setup-token Secret"
echo "=========================================="
echo "KUBECONFIG: $KUBECONFIG"
echo "Token (first 20 chars): ${SETUP_TOKEN:0:20}..."
echo ""

# Проверяем подключение к кластеру
if ! kubectl cluster-info &>/dev/null; then
  echo "ERROR: Cannot connect to Kubernetes cluster"
  echo "Please check KUBECONFIG: $KUBECONFIG"
  exit 1
fi

echo "✓ Connected to cluster"
echo ""

# Создаем Secret в namespace platform
echo "1. Creating Secret in namespace 'platform'..."
if kubectl get secret vault-setup-token -n platform &>/dev/null; then
  echo "   Secret already exists, updating..."
  kubectl delete secret vault-setup-token -n platform
fi

kubectl create secret generic vault-setup-token \
  --from-literal=VAULT_SETUP_TOKEN="$SETUP_TOKEN" \
  --namespace=platform

echo "   ✓ Secret created in namespace 'platform'"
echo ""

# Создаем Secret в namespace secure
echo "2. Creating Secret in namespace 'secure'..."
if kubectl get secret vault-setup-token -n secure &>/dev/null; then
  echo "   Secret already exists, updating..."
  kubectl delete secret vault-setup-token -n secure
fi

kubectl create secret generic vault-setup-token \
  --from-literal=VAULT_SETUP_TOKEN="$SETUP_TOKEN" \
  --namespace=secure

echo "   ✓ Secret created in namespace 'secure'"
echo ""

# Проверяем созданные Secret'ы
echo "3. Verifying secrets..."
echo ""
echo "Platform namespace:"
kubectl get secret vault-setup-token -n platform -o jsonpath='{.metadata.name}' && echo " ✓"
kubectl get secret vault-setup-token -n platform -o jsonpath='{.data.VAULT_SETUP_TOKEN}' | base64 -d | head -c 20 && echo "..."
echo ""
echo "Secure namespace:"
kubectl get secret vault-setup-token -n secure -o jsonpath='{.metadata.name}' && echo " ✓"
kubectl get secret vault-setup-token -n secure -o jsonpath='{.data.VAULT_SETUP_TOKEN}' | base64 -d | head -c 20 && echo "..."
echo ""

echo "=========================================="
echo "✅ Setup token secrets created successfully!"
echo "=========================================="
echo ""
echo "The following Job's will now use this token:"
echo "  - vault-setup-policy (namespace: vault)"
echo "  - hasura-vault-role (namespace: platform)"
echo "  - secure-vault-role (namespace: secure)"
echo ""
