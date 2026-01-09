#!/bin/sh
set -eu

echo "Waiting for Vault to be ready..."
until vault status > /dev/null 2>&1; do sleep 1; done
echo "Vault is ready. Initializing..."

# Verify token is set
if [ -z "${VAULT_TOKEN:-}" ]; then
  echo "Error: VAULT_TOKEN is not set"
  exit 1
fi

echo "Using Vault token: ${VAULT_TOKEN}" # Show full token for debugging

# Enable KV v2 secrets engine (ignore error if already enabled)
if ! vault secrets list | grep -q "^kv/"; then
  echo "Enabling KV v2 secrets engine..."
  vault secrets enable -version=2 -path=kv kv || {
    echo "Warning: Failed to enable KV secrets engine (may already be enabled)"
  }
else
  echo "KV secrets engine already enabled, skipping..."
fi

# Create policy
vault policy write archpad /vault-config/policy-archpad.hcl || true

# Try to read VAULT_TOKEN from .env file
ENV_FILE="/app/.env"
VAULT_APP_TOKEN=""
if [ -f "$ENV_FILE" ]; then
  # Extract VAULT_TOKEN from .env file (handle quoted and unquoted values)
  VAULT_APP_TOKEN=$(grep "^VAULT_TOKEN=" "$ENV_FILE" | cut -d'=' -f2- | sed 's/^["'\'']//;s/["'\'']$//' | head -1 || echo "")
fi

# Create or use token with policy (for app services)
# In dev mode: use token from VAULT_TOKEN (.env) if provided, otherwise create fixed token
# In production: generate random secure token
# In both cases, output the full token to logs
if [ "${VAULT_DEV_MODE:-true}" = "true" ]; then
  # Dev mode: check if VAULT_TOKEN is provided in .env file
  if [ -n "$VAULT_APP_TOKEN" ] && [ "$VAULT_APP_TOKEN" != "root" ]; then
    # Use existing token from .env
    echo "Dev mode: Using token from VAULT_TOKEN in .env file"
    APP_TOKEN="$VAULT_APP_TOKEN"
    echo "Full token from .env: ${APP_TOKEN}"
    
    # Check if token exists and verify it has archpad policy
    TOKEN_INFO=$(vault token lookup "$APP_TOKEN" 2>/dev/null || echo "")
    if [ -n "$TOKEN_INFO" ]; then
      if echo "$TOKEN_INFO" | grep -q "archpad"; then
        echo "Token verified: has 'archpad' policy"
      else
        echo "Warning: Token exists but doesn't have 'archpad' policy"
        echo "Creating new token with archpad policy..."
        # Create new token with archpad policy
        TOKEN_OUTPUT=$(vault token create -policy=archpad -ttl=0 -display-name=archpad-app-token -format=json)
        APP_TOKEN=$(echo "$TOKEN_OUTPUT" | grep -o '"client_token":"[^"]*' | cut -d'"' -f4)
        echo "Created new token with policy 'archpad'"
        echo "Full token: ${APP_TOKEN}"
        echo "IMPORTANT: Update VAULT_TOKEN in .env with this token!"
      fi
    else
      echo "Warning: Token from VAULT_TOKEN not found in Vault"
      echo "Creating new token with archpad policy..."
      # Create new token with archpad policy
      TOKEN_OUTPUT=$(vault token create -policy=archpad -ttl=0 -display-name=archpad-app-token -format=json)
      APP_TOKEN=$(echo "$TOKEN_OUTPUT" | grep -o '"client_token":"[^"]*' | cut -d'"' -f4)
      echo "Created new token with policy 'archpad'"
      echo "Full token: ${APP_TOKEN}"
      echo "IMPORTANT: Update VAULT_TOKEN in .env with this token!"
    fi
  else
    # Create fixed token for dev convenience
    echo "Dev mode: Creating fixed token 'archpad-token'"
    vault token revoke archpad-token 2>/dev/null || true
    TOKEN_OUTPUT=$(vault token create -policy=archpad -ttl=0 -id=archpad-token -display-name=archpad-app-token -format=json || true)
    if [ -n "$TOKEN_OUTPUT" ]; then
      # Extract actual client_token from JSON
      APP_TOKEN=$(echo "$TOKEN_OUTPUT" | grep -o '"client_token":"[^"]*' | cut -d'"' -f4 || echo "archpad-token")
      echo "Created token with policy 'archpad'"
      echo "Token ID: archpad-token (fixed ID for dev mode)"
      echo "Full token: ${APP_TOKEN}"
    else
      echo "Warning: Failed to create archpad-token"
      APP_TOKEN=""
    fi
  fi
else
  # Production mode: generate random secure token
  echo "Production mode: Generating random secure token"
  TOKEN_OUTPUT=$(vault token create -policy=archpad -ttl=0 -display-name=archpad-app-token -format=json)
  APP_TOKEN=$(echo "$TOKEN_OUTPUT" | grep -o '"client_token":"[^"]*' | cut -d'"' -f4)
  echo "=========================================="
  echo "IMPORTANT: Save this token securely!"
  echo "VAULT_TOKEN=${APP_TOKEN}"
  echo "=========================================="
  # Save to file for convenience (should be moved to secure storage in production)
  echo "$APP_TOKEN" > /tmp/vault-app-token.txt
  echo "Token also saved to /tmp/vault-app-token.txt (remove this in production!)"
fi

# Try to load secrets from .env if available and secrets are not already loaded
if [ -f "$ENV_FILE" ]; then
  echo "Found .env at $ENV_FILE"
  echo "Checking if secrets are already loaded..."
  if ! vault kv get -format=json kv/data/archpad > /dev/null 2>&1; then
    echo "Secrets not found, loading from .env..."
    # Call seed.sh to load secrets
    sh /vault-config/seed.sh "$ENV_FILE" || {
      echo "Warning: Failed to load secrets from .env (this is OK if you'll load them manually)"
      echo "You can load secrets manually using: cd infra/vault && ./seed.sh ../../.env"
    }
  else
    echo "Secrets already loaded, skipping automatic loading..."
  fi
else
  echo "Note: .env not found at $ENV_FILE, skipping automatic secret loading"
  echo "To load secrets manually:"
  echo "  1. Make sure .env exists in the project root"
  echo "  2. Run: cd infra/vault && ./seed.sh ../../.env"
fi

echo "Vault initialization complete"
