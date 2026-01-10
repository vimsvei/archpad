#!/bin/sh
set -e
VAULT_NAMESPACE=${VAULT_NAMESPACE:-vault}
VAULT_TOKEN=${VAULT_TOKEN:-""}
KV_PATH=${KV_PATH:-kv}
KV_VERSION=${KV_VERSION:-2}
KUBECONFIG_FILE=${KUBECONFIG_FILE:-""}
KUBECONFIG_ARG=${KUBECONFIG_FILE:+"--kubeconfig=${KUBECONFIG_FILE}"}

if [ -z "$VAULT_TOKEN" ]; then
  echo "ERROR: VAULT_TOKEN не установлен"
  exit 1
fi

# Выполняем команду через kubectl exec
kubectl exec -n ${VAULT_NAMESPACE} vault-0 ${KUBECONFIG_ARG} \
  -- sh -c "
    export VAULT_ADDR='http://127.0.0.1:8200'
    export VAULT_TOKEN='${VAULT_TOKEN}'
    
    # Проверяем, существует ли уже secrets engine по этому пути
    if vault secrets list | grep -q '^${KV_PATH}/'; then
      echo 'KV secrets engine уже включен по пути ${KV_PATH}/'
    else
      echo 'Включение KV secrets engine версии ${KV_VERSION} по пути ${KV_PATH}...'
      
      # Включаем KV secrets engine версии 2 (или 1, если указано)
      if [ ${KV_VERSION} -eq 2 ]; then
        vault secrets enable -path=${KV_PATH} -version=2 kv
      else
        vault secrets enable -path=${KV_PATH} kv
      fi
      
      echo 'KV secrets engine успешно включен по пути ${KV_PATH}/'
    fi
  "
