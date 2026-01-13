#!/bin/bash
# Скрипт для создания секрета Container Registry в Kubernetes
# 
# Использование:
#   ./create-registry-secret.sh <REGISTRY_USERNAME> <REGISTRY_PASSWORD> [REGISTRY_URL]
#
# Или получите credentials из Vault:
#   VAULT_ADDR="https://vault.archpad.pro"
#   VAULT_TOKEN="<your-token>"
#   REGISTRY_USERNAME=$(curl -s -H "X-Vault-Token: ${VAULT_TOKEN}" "${VAULT_ADDR}/v1/kv/data/archpad/demo/registry" | jq -r '.data.data.REGISTRY_USERNAME')
#   REGISTRY_PASSWORD=$(curl -s -H "X-Vault-Token: ${VAULT_TOKEN}" "${VAULT_ADDR}/v1/kv/data/archpad/demo/registry" | jq -r '.data.data.REGISTRY_PASSWORD')
#   ./create-registry-secret.sh "${REGISTRY_USERNAME}" "${REGISTRY_PASSWORD}"

set -e

REGISTRY_USERNAME="${1}"
REGISTRY_PASSWORD="${2}"
REGISTRY_URL="${3:-archpad-cr.registry.twcstorage.ru}"
KUBECONFIG="${KUBECONFIG:-/path/to/twc-archpad-k8s-cluster-config.yaml}"

if [ -z "${REGISTRY_USERNAME}" ] || [ -z "${REGISTRY_PASSWORD}" ]; then
  echo "ERROR: REGISTRY_USERNAME and REGISTRY_PASSWORD are required"
  echo ""
  echo "Usage:"
  echo "  $0 <REGISTRY_USERNAME> <REGISTRY_PASSWORD> [REGISTRY_URL]"
  echo ""
  echo "Or get credentials from Vault:"
  echo "  VAULT_ADDR=\"https://vault.archpad.pro\""
  echo "  VAULT_TOKEN=\"<your-token>\""
  echo "  REGISTRY_USERNAME=\$(curl -s -H \"X-Vault-Token: \${VAULT_TOKEN}\" \"\${VAULT_ADDR}/v1/kv/data/archpad/demo/registry\" | jq -r '.data.data.REGISTRY_USERNAME')"
  echo "  REGISTRY_PASSWORD=\$(curl -s -H \"X-Vault-Token: \${VAULT_TOKEN}\" \"\${VAULT_ADDR}/v1/kv/data/archpad/demo/registry\" | jq -r '.data.data.REGISTRY_PASSWORD')"
  echo "  $0 \"\${REGISTRY_USERNAME}\" \"\${REGISTRY_PASSWORD}\""
  exit 1
fi

echo "Creating registry secret..."
echo "  Registry URL: ${REGISTRY_URL}"
echo "  Username: ${REGISTRY_USERNAME}"
echo ""

# Удаляем существующий секрет, если есть
kubectl delete secret archpad-registry-secret -n platform --ignore-not-found=true

# Создаем новый секрет
kubectl create secret docker-registry archpad-registry-secret \
  --docker-server="${REGISTRY_URL}" \
  --docker-username="${REGISTRY_USERNAME}" \
  --docker-password="${REGISTRY_PASSWORD}" \
  --namespace=platform

echo ""
echo "✅ Secret 'archpad-registry-secret' created successfully in namespace 'platform'"
echo ""
echo "Verifying secret..."
kubectl get secret archpad-registry-secret -n platform
echo ""
echo "After creating the secret, pods should automatically retry pulling images."
echo "You can check pod status with:"
echo "  kubectl get pods -n platform"
