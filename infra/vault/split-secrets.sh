#!/bin/sh
set -eu

# Скрипт для разделения секретов из kv/data/archpad по путям для каждого сервиса
# Использование: ./split-secrets.sh
# Требует: vault CLI

VAULT_ADDR="${VAULT_ADDR:-http://localhost:8200}"
VAULT_TOKEN="${VAULT_TOKEN:-root}"
VAULT_BASE_PATH="${VAULT_BASE_PATH:-kv/data/archpad}"

echo "Splitting secrets from $VAULT_BASE_PATH into service-specific paths..."

# Check if vault CLI is available
if command -v vault > /dev/null 2>&1; then
  USE_VAULT_CLI=true
  export VAULT_ADDR
  export VAULT_TOKEN
  
  # Check if Vault is accessible
  if ! vault status > /dev/null 2>&1; then
    echo "Error: Cannot connect to Vault at $VAULT_ADDR"
    echo "Make sure Vault is running and VAULT_ADDR/VAULT_TOKEN are set correctly"
    exit 1
  fi
else
  USE_VAULT_CLI=false
  echo "Warning: vault CLI not found, will use curl instead"
  
  # Check if Vault is accessible via API
  if ! curl -s -f -H "X-Vault-Token: ${VAULT_TOKEN}" "${VAULT_ADDR}/v1/sys/health" > /dev/null 2>&1; then
    echo "Error: Cannot connect to Vault at $VAULT_ADDR"
    echo "Make sure Vault is running and VAULT_ADDR/VAULT_TOKEN are set correctly"
    exit 1
  fi
fi

# Read all secrets from base path
echo "Reading all secrets from $VAULT_BASE_PATH..."
if [ "$USE_VAULT_CLI" = true ]; then
  vault kv get -format=json "$VAULT_BASE_PATH" > /tmp/all-secrets.json || {
    echo "Error: Failed to read secrets from $VAULT_BASE_PATH"
    exit 1
  }
else
  # Use curl to read from Vault API
  API_URL="${VAULT_ADDR}/v1/${VAULT_BASE_PATH}"
  HTTP_CODE=$(curl -s -o /tmp/all-secrets.json -w "%{http_code}" \
    -H "X-Vault-Token: ${VAULT_TOKEN}" \
    "$API_URL")
  
  if [ "$HTTP_CODE" -lt 200 ] || [ "$HTTP_CODE" -ge 300 ]; then
    echo "Error: Failed to read secrets from Vault (HTTP $HTTP_CODE)"
    cat /tmp/all-secrets.json
    rm -f /tmp/all-secrets.json
    exit 1
  fi
fi

# Define service-to-keys mapping
# This is a default mapping - can be overridden via Vault UI
SERVICE_KEYS="
postgres:POSTGRES_USER,POSTGRES_PASSWORD,PG_PORT
kratos:KRATOS_DB_USER,KRATOS_DB_PASS,KRATOS_DB,KRATOS_SYSTEM_SECRET
hydra:HYDRA_DB_USER,HYDRA_DB_PASS,HYDRA_DB,HYDRA_SYSTEM_SECRET
hasura:HASURA_DB_USER,HASURA_DB_PASS,HASURA_DB,HASURA_ADMIN_SECRET,POSTGRES_USER,POSTGRES_PASSWORD,PROJECT_DB
oathkeeper:ORY_CLIENT_ID,ORY_CLIENT_SECRET
pgadmin:PGADMIN_DEFAULT_EMAIL,PGADMIN_DEFAULT_PASSWORD
tolgee:TOLGEE_DB_USER,TOLGEE_DB_PASS,TOLGEE_DB,TOLGEE_ADMIN_USER,TOLGEE_ADMIN_PASS,TOLGEE_API_KEY
portal:NEXT_PUBLIC_TOLGEE_API_KEY
grafana:GRAFANA_ADMIN_USER,GRAFANA_ADMIN_PASSWORD
postgres-exporter:POSTGRES_USER,POSTGRES_PASSWORD
"

# Parse all secrets
if command -v python3 > /dev/null 2>&1; then
  python3 << 'PYTHON_SCRIPT'
import json
import sys
import os

try:
    with open('/tmp/all-secrets.json', 'r') as f:
        data = json.load(f)
    
    all_secrets = data.get('data', {}).get('data', {})
    vault_base_path = os.environ.get('VAULT_BASE_PATH', 'kv/data/archpad')
    
    # Service to keys mapping (can be read from Vault config later)
    service_mapping = {
        'postgres': ['POSTGRES_USER', 'POSTGRES_PASSWORD', 'PG_PORT'],
        'kratos': ['KRATOS_DB_USER', 'KRATOS_DB_PASS', 'KRATOS_DB', 'KRATOS_SYSTEM_SECRET'],
        'hydra': ['HYDRA_DB_USER', 'HYDRA_DB_PASS', 'HYDRA_DB', 'HYDRA_SYSTEM_SECRET'],
        'hasura': ['HASURA_DB_USER', 'HASURA_DB_PASS', 'HASURA_DB', 'HASURA_ADMIN_SECRET', 'POSTGRES_USER', 'POSTGRES_PASSWORD', 'PROJECT_DB'],
        'oathkeeper': ['ORY_CLIENT_ID', 'ORY_CLIENT_SECRET'],
        'pgadmin': ['PGADMIN_DEFAULT_EMAIL', 'PGADMIN_DEFAULT_PASSWORD'],
        'tolgee': ['TOLGEE_DB_USER', 'TOLGEE_DB_PASS', 'TOLGEE_DB', 'TOLGEE_ADMIN_USER', 'TOLGEE_ADMIN_PASS', 'TOLGEE_API_KEY'],
        'portal': ['NEXT_PUBLIC_TOLGEE_API_KEY'],
        'grafana': ['GRAFANA_ADMIN_USER', 'GRAFANA_ADMIN_PASSWORD'],
        'postgres-exporter': ['POSTGRES_USER', 'POSTGRES_PASSWORD'],
    }
    
    # Split secrets by service
    for service_name, keys in service_mapping.items():
        service_secrets = {}
        for key in keys:
            if key in all_secrets:
                service_secrets[key] = all_secrets[key]
        
        if service_secrets:
            service_path = f"{vault_base_path}/{service_name}"
            # Write service secrets to JSON file for vault CLI
            with open(f'/tmp/{service_name}-secrets.json', 'w') as f:
                json.dump(service_secrets, f, indent=2)
            print(f"{service_name}:{service_path}:{len(service_secrets)} keys")
        else:
            print(f"{service_name}:SKIP:no keys found", file=sys.stderr)
            
except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
    sys.exit(1)
PYTHON_SCRIPT

  # Write secrets to service-specific paths
  echo "$SERVICE_KEYS" | grep -v '^$' | while IFS=: read -r service keys; do
    service=$(echo "$service" | xargs)
    keys=$(echo "$keys" | xargs)
    
    if [ -z "$service" ] || [ -z "$keys" ]; then
      continue
    fi
    
    service_path="$VAULT_BASE_PATH/$service"
    secrets_file="/tmp/${service}-secrets.json"
    
    if [ -f "$secrets_file" ]; then
      echo "Writing secrets for $service to $service_path..."
      if [ "$USE_VAULT_CLI" = true ]; then
        vault kv put "$service_path" @ "$secrets_file" || {
          echo "Warning: Failed to write secrets for $service"
        }
      else
        # Use curl to write to Vault API
        API_URL="${VAULT_ADDR}/v1/${service_path}"
        PAYLOAD=$(cat "$secrets_file")
        HTTP_CODE=$(curl -s -o /tmp/vault-response.txt -w "%{http_code}" \
          -X POST \
          -H "X-Vault-Token: ${VAULT_TOKEN}" \
          -H "Content-Type: application/json" \
          -d "{\"data\": $PAYLOAD}" \
          "$API_URL")
        
        if [ "$HTTP_CODE" -ge 200 ] && [ "$HTTP_CODE" -lt 300 ]; then
          echo "Successfully wrote secrets for $service"
        else
          echo "Warning: Failed to write secrets for $service (HTTP $HTTP_CODE)"
          cat /tmp/vault-response.txt
        fi
        rm -f /tmp/vault-response.txt
      fi
      rm -f "$secrets_file"
    fi
  done
else
  echo "Error: Python3 is required for splitting secrets"
  exit 1
fi

rm -f /tmp/all-secrets.json

echo "Successfully split secrets into service-specific paths!"
echo "You can now configure service mappings in Vault UI at: $VAULT_BASE_PATH/service-config"
