#!/bin/sh
set -e
MAX_ATTEMPTS=${MAX_ATTEMPTS:-30}
ATTEMPT=0
VAULT_NAMESPACE=${VAULT_NAMESPACE:-vault}
KUBECONFIG_FILE=${KUBECONFIG_FILE:-""}
KUBECONFIG_ARG=${KUBECONFIG_FILE:+"--kubeconfig=${KUBECONFIG_FILE}"}

echo "Ожидание разблокировки Vault..."

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
  # Проверяем статус Vault через kubectl exec
  if kubectl exec -n ${VAULT_NAMESPACE} vault-0 ${KUBECONFIG_ARG} \
    -- vault status -address=http://127.0.0.1:8200 2>/dev/null | grep -q "Sealed.*false"; then
    echo "Vault разблокирован и готов к работе"
    exit 0
  fi
  
  ATTEMPT=$((ATTEMPT + 1))
  echo "Попытка $ATTEMPT/$MAX_ATTEMPTS: Vault еще заблокирован, ждем 5 секунд..."
  sleep 5
done

echo "ERROR: Vault не разблокирован за $MAX_ATTEMPTS попыток"
echo "Пожалуйста, разблокируйте Vault вручную и повторите terraform apply"
exit 1
