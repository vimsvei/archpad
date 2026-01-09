#!/bin/sh
set -eu

# Generate env files for all services from Vault
# This script reads service configuration from Vault and generates separate env files
# Configuration is stored in kv/data/archpad/service-config
# Each service has its own path: kv/data/archpad/{service-name}

VAULT_ADDR="${VAULT_ADDR:-http://localhost:8200}"
VAULT_TOKEN="${VAULT_TOKEN:-root}"
OUTPUT_DIR="${1:-/vault-env-output}"
VAULT_BASE_PATH="${VAULT_BASE_PATH:-kv/data/archpad}"

echo "Generating env files for all services..."
echo "Output directory: $OUTPUT_DIR"
echo "Vault base path: $VAULT_BASE_PATH"

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Try to read service configuration from Vault
# Configuration format: {"services": {"postgres": {"keys": ["KEY1", "KEY2"]}, ...}}
# Or if config doesn't exist, use default: read all keys from service-specific path
CONFIG_PATH="$VAULT_BASE_PATH/service-config"
SERVICE_CONFIG=""

if vault kv get -format=json "$CONFIG_PATH" > /tmp/service-config.json 2>/dev/null; then
  echo "Found service configuration at $CONFIG_PATH"
  # Parse config to get list of services
  if command -v python3 > /dev/null 2>&1; then
    SERVICES=$(python3 << 'PYTHON'
import json
import sys
try:
    with open('/tmp/service-config.json', 'r') as f:
        data = json.load(f)
    config = data.get('data', {}).get('data', {})
    services = config.get('services', {})
    # Return comma-separated list of service names
    print(','.join(services.keys()))
except:
    print('', file=sys.stderr)
    sys.exit(1)
PYTHON
    )
    if [ -n "$SERVICES" ]; then
      SERVICE_CONFIG="from-vault"
    fi
  fi
  rm -f /tmp/service-config.json
fi

if [ "$SERVICE_CONFIG" = "from-vault" ]; then
  echo "Using service configuration from Vault"
  # Read service list and their key mappings from Vault
  vault kv get -format=json "$CONFIG_PATH" > /tmp/service-config.json
  
  if command -v python3 > /dev/null 2>&1; then
    OUTPUT_DIR="$OUTPUT_DIR" VAULT_BASE_PATH="$VAULT_BASE_PATH" python3 << 'PYTHON_SCRIPT'
import json
import sys
import os

try:
    with open('/tmp/service-config.json', 'r') as f:
        data = json.load(f)
    
    config = data.get('data', {}).get('data', {})
    services = config.get('services', {})
    output_dir = os.environ.get('OUTPUT_DIR', '/vault-env-output')
    vault_base_path = os.environ.get('VAULT_BASE_PATH', 'kv/data/archpad')
    
    for service_name, service_config in services.items():
        # Get keys for this service
        keys = service_config.get('keys', [])
        service_path = service_config.get('path', f"{vault_base_path}/{service_name}")
        
        if keys:
            # Generate env file with specific keys
            keys_str = ','.join(keys)
            output_file = f"{output_dir}/docker-compose.{service_name}.env"
            print(f"{service_name}:{service_path}:{keys_str}:{output_file}")
        else:
            # No keys specified - read all from service path
            output_file = f"{output_dir}/docker-compose.{service_name}.env"
            print(f"{service_name}:{service_path}::{output_file}")
            
except Exception as e:
    print(f"Error: {e}", file=sys.stderr)
    sys.exit(1)
PYTHON_SCRIPT
  else
    echo "Error: Python3 required for reading service configuration from Vault"
    exit 1
  fi | while IFS=: read -r service_name service_path keys output_file; do
    if [ -z "$service_name" ]; then
      continue
    fi
    
    echo "Generating $output_file for service $service_name from path $service_path"
    
    if [ -n "$keys" ]; then
      # Generate with specific keys
      sh /vault-config/generate-env.sh "$output_file" "$service_path" "$keys" || {
        echo "Warning: Failed to generate env file for $service_name"
      }
    else
      # Generate all keys from service path
      sh /vault-config/generate-env.sh "$output_file" "$service_path" "" || {
        echo "Warning: Failed to generate env file for $service_name"
      }
    fi
  done
  
  rm -f /tmp/service-config.json
else
  echo "No service configuration found in Vault, using default: read all keys from service-specific paths"
  # Default: list all services by checking which paths exist in Vault
  # For now, use a predefined list, but this could be made dynamic
  DEFAULT_SERVICES="postgres kratos hydra hasura oathkeeper pgadmin tolgee portal grafana postgres-exporter"
  
  for service in $DEFAULT_SERVICES; do
    service_path="$VAULT_BASE_PATH/$service"
    output_file="$OUTPUT_DIR/docker-compose.$service.env"
    
    echo "Checking $service_path for service $service..."
    
    # Check if path exists in Vault
    if vault kv get -format=json "$service_path" > /dev/null 2>&1; then
      echo "Generating $output_file for service $service from path $service_path (all keys)"
      # Read all keys from service-specific path
      sh /vault-config/generate-env.sh "$output_file" "$service_path" "" || {
        echo "Warning: Failed to generate env file for $service"
      }
    else
      echo "Warning: Path $service_path not found in Vault, skipping $service"
    fi
  done
fi

echo "Successfully generated env files for all services"
