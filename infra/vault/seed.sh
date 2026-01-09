#!/bin/sh
set -eu

# Скрипт для первоначальной загрузки секретов из .env в Vault
# Использование: ./seed.sh [path-to-.env-file]
# Требует: vault CLI или curl
# По умолчанию читает из .env (файл со всеми секретами)

ENV_FILE="${1:-../../.env}"
VAULT_ADDR="${VAULT_ADDR:-http://localhost:8200}"
VAULT_TOKEN="${VAULT_TOKEN:-root}"
VAULT_SECRETS_PATH="${VAULT_SECRETS_PATH:-kv/data/archpad}"

if [ ! -f "$ENV_FILE" ]; then
  echo "Error: .env file not found at $ENV_FILE"
  exit 1
fi

echo "Loading secrets from $ENV_FILE to Vault at $VAULT_ADDR"
echo "Secrets path: $VAULT_SECRETS_PATH"

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
fi

# Read .env file and prepare JSON payload
# Filter out comments, empty lines, and *_HOST/*_ENDPOINT variables
# Convert KEY=value to JSON
SECRETS_JSON=$(awk '
  BEGIN {
    print "{"
    first = 1
  }
  /^[^#]/ && /=/ {
    gsub(/^[ \t]+|[ \t]+$/, "")  # trim whitespace
    # Find first = sign to split key and value
    eq_pos = index($0, "=")
    if (eq_pos == 0) next
    key = substr($0, 1, eq_pos - 1)
    value = substr($0, eq_pos + 1)
    gsub(/^[ \t]+|[ \t]+$/, "", key)  # trim key
    # Skip *_HOST and *_ENDPOINT variables (these stay in .env)
    if (key ~ /_(HOST|ENDPOINT)$/) {
      next
    }
    if (!first) print ","
    gsub(/^[ \t]+|[ \t]+$/, "", value)  # trim value
    # Remove quotes if present
    gsub(/^["\047]|["\047]$/, "", value)
    # Escape JSON special characters
    gsub(/\\/, "\\\\", value)
    gsub(/"/, "\\\"", value)
    gsub(/\n/, "\\n", value)
    gsub(/\r/, "\\r", value)
    gsub(/\t/, "\\t", value)
    printf "  \"%s\": \"%s\"", key, value
    first = 0
  }
  END {
    print "\n}"
  }
' "$ENV_FILE")

# Write secrets to Vault
if [ "$USE_VAULT_CLI" = true ]; then
  echo "Writing secrets to Vault using vault CLI..."
  echo "$SECRETS_JSON" | vault kv put "$VAULT_SECRETS_PATH" - || {
    echo "Error: Failed to write secrets to Vault"
    exit 1
  }
else
  # Use curl to write to Vault API
  echo "Writing secrets to Vault using curl..."
  API_URL="${VAULT_ADDR}/v1/${VAULT_SECRETS_PATH}"
  PAYLOAD=$(printf '{"data": %s}' "$SECRETS_JSON")
  
  HTTP_CODE=$(curl -s -o /tmp/vault-response.txt -w "%{http_code}" \
    -X POST \
    -H "X-Vault-Token: ${VAULT_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "$PAYLOAD" \
    "$API_URL")
  
  if [ "$HTTP_CODE" -ge 200 ] && [ "$HTTP_CODE" -lt 300 ]; then
    echo "Successfully wrote secrets to Vault"
  else
    echo "Error: Failed to write secrets to Vault (HTTP $HTTP_CODE)"
    cat /tmp/vault-response.txt
    rm -f /tmp/vault-response.txt
    exit 1
  fi
  rm -f /tmp/vault-response.txt
fi

echo "Successfully loaded secrets to Vault!"
echo "Note: Variables matching *_HOST and *_ENDPOINT were excluded (they stay in .env)"
if [ "$USE_VAULT_CLI" = true ]; then
  echo "You can verify with: vault kv get $VAULT_SECRETS_PATH"
fi
