#!/bin/bash

VAULT_ADDR="${VAULT_ADDR:-https://vault.archpad.pro}"
VAULT_TOKEN="${VAULT_TOKEN}"

echo "Creating Hasura secrets in Vault at ${VAULT_ADDR}"

# --- Hasura Secrets ---
HASURA_PATH="kv/data/archpad/demo/hasura"

# Компоненты для формирования строк подключения
HASURA_USER="hasura_user"
HASURA_DB_PASSWORD="CHANGE_ME"
HASURA_DB="hasura"
PROJECT_DB="project"
TENANT_DB="tenant"
POSTGRES_HOST="postgres-service"
POSTGRES_PORT="5432"
HASURA_GRAPHQL_ADMIN_SECRET=$(openssl rand -base64 32)

echo -e "\n=== Creating Hasura secrets ==="
echo "Path: ${HASURA_PATH}"
echo "NOTE: Using component-based approach - strings will be formed from components"
echo "      Please update placeholder values with real PostgreSQL connection details"

JSON_PAYLOAD=$(cat <<EOF
{
  "HASURA_USER": "${HASURA_USER}",
  "HASURA_DB_PASSWORD": "${HASURA_DB_PASSWORD}",
  "HASURA_DB": "${HASURA_DB}",
  "PROJECT_DB": "${PROJECT_DB}",
  "TENANT_DB": "${TENANT_DB}",
  "POSTGRES_HOST": "${POSTGRES_HOST}",
  "POSTGRES_PORT": "${POSTGRES_PORT}",
  "HASURA_GRAPHQL_ADMIN_SECRET": "${HASURA_GRAPHQL_ADMIN_SECRET}"
}
EOF
)

echo "Creating secret at ${HASURA_PATH}..."
curl -s -H "X-Vault-Token: ${VAULT_TOKEN}" \
     -H "Content-Type: application/json" \
     -X POST \
     -d "{\"data\": ${JSON_PAYLOAD}}" \
     "${VAULT_ADDR}/v1/${HASURA_PATH}" > /dev/null && echo "  ✓ Successfully created secret at ${HASURA_PATH}" || echo "  ✗ Failed to create secret at ${HASURA_PATH}"

echo -e "\n✓ Hasura secrets successfully created in Vault!\n"
echo "IMPORTANT: Please update placeholder values with real PostgreSQL connection details:"
echo "  1. Update HASURA_USER in: ${HASURA_PATH}"
echo "  2. Update HASURA_DB_PASSWORD in: ${HASURA_PATH}"
echo "  3. Update HASURA_DB in: ${HASURA_PATH}"
echo "  4. Update PROJECT_DB in: ${HASURA_PATH}"
echo "  5. Update TENANT_DB in: ${HASURA_PATH}"
echo "  6. Update POSTGRES_HOST in: ${HASURA_PATH} (if different from postgres-service)"
echo "  7. Update POSTGRES_PORT in: ${HASURA_PATH} (if different from 5432)"
echo -e "\nDatabase connection strings will be automatically formed from these components."
echo -e "\nTo update, use Vault UI or curl commands (see README.md)"
