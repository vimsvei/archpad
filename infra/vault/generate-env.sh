#!/bin/sh
set -eu

# Generate env file for docker-compose services from Vault
# This script reads secrets from Vault and generates a .env file

VAULT_ADDR="${VAULT_ADDR:-http://localhost:8200}"
VAULT_TOKEN="${VAULT_TOKEN:-root}"  # Default to root token (for vault-env-generator, can read all secrets)
VAULT_SECRETS_PATH="${VAULT_SECRETS_PATH:-kv/data/archpad}"
OUTPUT_FILE="${1:-/vault-env-output/docker-compose.env}"

# Verify token is set
if [ -z "${VAULT_TOKEN:-}" ]; then
  echo "Error: VAULT_TOKEN is not set"
  exit 1
fi

# Create output directory if it doesn't exist
mkdir -p "$(dirname "$OUTPUT_FILE")"

echo "Generating $OUTPUT_FILE from Vault secrets..."
echo "Using Vault token: ${VAULT_TOKEN:0:10}..." # Show first 10 chars for debugging

# Check if vault CLI is available
if ! command -v vault > /dev/null 2>&1; then
  echo "Error: vault CLI is required"
  exit 1
fi

export VAULT_ADDR
export VAULT_TOKEN

# Wait for Vault to be ready
until vault status > /dev/null 2>&1; do
  echo "Waiting for Vault..."
  sleep 1
done

# Get secrets from Vault and convert to env format
# Filter out *_HOST and *_ENDPOINT variables (these stay in .env)

# Get all keys from the secret path
vault kv get -format=json "$VAULT_SECRETS_PATH" > /tmp/vault-secrets.json || {
  echo "Error: Failed to get secrets from Vault"
  exit 1
}

# Try to use Python for parsing if available, otherwise use simple parsing
if command -v python3 > /dev/null 2>&1; then
  echo "Using Python3 for JSON parsing..."
  python3 << 'PYTHON_SCRIPT' > "$OUTPUT_FILE"
import json
import sys
import re

try:
    with open('/tmp/vault-secrets.json', 'r') as f:
        data = json.load(f)
    
    # Extract data.data structure (KV v2 format)
    secrets = data.get('data', {}).get('data', {})
    
    if not secrets:
        print("Warning: No secrets found in data.data", file=sys.stderr)
        sys.exit(1)
    
    # Filter out *_HOST and *_ENDPOINT and write to env format
    for key, value in secrets.items():
        # Filter out *_HOST and *_ENDPOINT
        if not re.search(r'_(HOST|ENDPOINT)$', key):
            # Convert value to string and escape if needed
            if isinstance(value, (int, float, bool)):
                value = str(value)
            elif not isinstance(value, str):
                value = str(value)
            # Don't escape - just print as-is for env file
            print(f"{key}={value}")
except Exception as e:
    print(f"Error parsing JSON: {e}", file=sys.stderr)
    sys.exit(1)
PYTHON_SCRIPT
  PYTHON_EXIT=$?
else
  echo "Python3 not available, using simple parsing..."
  PYTHON_EXIT=1
fi

if [ ${PYTHON_EXIT:-1} -ne 0 ]; then
  # Fallback: extract key-value pairs using awk (more reliable for JSON)
  echo "Using fallback parsing method (awk)..."
  
  # Simple and reliable: use grep to extract all "KEY":"VALUE" pairs, then process with awk
  grep -oE '"[A-Z_][A-Z0-9_]*":\s*"[^"]*"' /tmp/vault-secrets.json | \
    awk '{
      # Remove leading and trailing quotes and extract key and value
      gsub(/^"/, "", $0)
      gsub(/"$/, "", $0)
      # Split by ": " to get key and value
      split($0, parts, /":\s*"/)
      if (length(parts) == 2) {
        key = parts[1]
        value = parts[2]
        # Remove trailing quote from value if present
        gsub(/"$/, "", value)
        # Filter out unwanted keys
        if (key !~ /_(HOST|ENDPOINT)$/ && 
            key != "metadata" && 
            key != "data" &&
            key != "request_id" &&
            key != "lease_id" &&
            key != "lease_duration" &&
            key != "renewable" &&
            key != "mount_type" &&
            key != "warnings" &&
            key != "created_time" &&
            key != "deletion_time" &&
            key != "destroyed" &&
            key != "version" &&
            key != "custom_metadata" &&
            length(key) > 0) {
          print key "=" value
        }
      }
    }' | \
    grep -v '^$' > "$OUTPUT_FILE" || {
      echo "Error: Failed to parse secrets"
      echo "Debug: Sample grep output:"
      grep -oE '"[A-Z_][A-Z0-9_]*":\s*"[^"]*"' /tmp/vault-secrets.json | head -3
      rm -f /tmp/vault-secrets.json
      exit 1
    }
  
  # Verify we got valid output (check that lines contain both key and value)
  if [ ! -s "$OUTPUT_FILE" ]; then
    echo "Error: Output file is empty"
    rm -f /tmp/vault-secrets.json
    exit 1
  fi
  
  # Check for invalid lines (only = without key or value)
  if grep -q '^=' "$OUTPUT_FILE" || ! grep -q '=' "$OUTPUT_FILE"; then
    echo "Error: Invalid output format detected"
    echo "Debug: First 5 lines of output:"
    head -5 "$OUTPUT_FILE"
    rm -f /tmp/vault-secrets.json
    exit 1
  fi
fi

rm -f /tmp/vault-secrets.json

echo "Successfully generated $OUTPUT_FILE with $(wc -l < "$OUTPUT_FILE") variables"
