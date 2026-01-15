#!/bin/bash
set -euo pipefail

# Скрипт для генерации токенов Vault: setup_token и gitlab_token
# Использование: ./generate-tokens.sh [VAULT_ADDR] [VAULT_ROOT_TOKEN]

VAULT_ADDR="${1:-${VAULT_ADDR:-https://vault.archpad.pro}}"

# Убеждаемся, что VAULT_ADDR начинается с http:// или https://
if [[ ! "$VAULT_ADDR" =~ ^https?:// ]]; then
  VAULT_ADDR="https://${VAULT_ADDR}"
fi
VAULT_ROOT_TOKEN="${2:-${VAULT_ROOT_TOKEN:-}}"

if [ -z "$VAULT_ROOT_TOKEN" ]; then
  echo "ERROR: VAULT_ROOT_TOKEN is required"
  echo "Usage: $0 [VAULT_ADDR] [VAULT_ROOT_TOKEN]"
  echo "Or set environment variables: VAULT_ADDR and VAULT_ROOT_TOKEN"
  exit 1
fi

echo "=========================================="
echo "Generating Vault tokens"
echo "=========================================="
echo "Vault Address: $VAULT_ADDR"
echo ""

# Проверяем доступность Vault
HEALTH_RESPONSE=$(curl -sS -H "X-Vault-Token: ${VAULT_ROOT_TOKEN}" "${VAULT_ADDR}/v1/sys/health" 2>&1)
if [ $? -ne 0 ]; then
  echo "ERROR: Cannot connect to Vault at $VAULT_ADDR"
  echo "Response: $HEALTH_RESPONSE"
  echo "Make sure Vault is unsealed and VAULT_ROOT_TOKEN is correct"
  exit 1
fi

# Проверяем, что Vault не запечатан
if echo "$HEALTH_RESPONSE" | jq -e '.sealed == true' >/dev/null 2>&1; then
  echo "ERROR: Vault is sealed"
  echo "Please unseal Vault before generating tokens"
  exit 1
fi

echo "✓ Vault is accessible"
echo ""

# Проверяем существование политик
echo "Checking required policies..."
POLICIES_CHECK=$(curl -sS -H "X-Vault-Token: ${VAULT_ROOT_TOKEN}" "${VAULT_ADDR}/v1/sys/policies/acl" 2>&1)
if echo "$POLICIES_CHECK" | jq -e '.errors' >/dev/null 2>&1; then
  echo "WARNING: Cannot check policies (may not have permission)"
else
  HAS_VAULT_SETUP=$(echo "$POLICIES_CHECK" | jq -r '.data.keys[]? | select(. == "vault-setup")' 2>/dev/null || echo "")
  HAS_ARCHPAD=$(echo "$POLICIES_CHECK" | jq -r '.data.keys[]? | select(. == "archpad")' 2>/dev/null || echo "")
  
  if [ -z "$HAS_VAULT_SETUP" ]; then
    echo "WARNING: Policy 'vault-setup' does not exist"
    echo "  The token will be created, but may not work correctly"
    echo "  Please ensure the policy is created via vault-setup-policy job"
  else
    echo "  ✓ Policy 'vault-setup' exists"
  fi
  
  if [ -z "$HAS_ARCHPAD" ]; then
    echo "WARNING: Policy 'archpad' does not exist"
    echo "  The token will be created, but may not work correctly"
    echo "  Please ensure the policy is created"
  else
    echo "  ✓ Policy 'archpad' exists"
  fi
fi
echo ""

# Генерируем setup_token
echo "1. Generating setup_token..."
echo "   This token will be used by vault-setup-policy job and other setup jobs"
echo "   Policy: vault-setup (limited permissions for Kubernetes auth setup)"

SETUP_TOKEN_RESPONSE=$(curl -sS -w "\nHTTP_CODE:%{http_code}" -X POST \
  -H "X-Vault-Token: ${VAULT_ROOT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "policies": ["vault-setup"],
    "ttl": "0",
    "renewable": true,
    "display_name": "vault-setup-token",
    "meta": {
      "purpose": "Vault setup and Kubernetes auth configuration"
    }
  }' \
  "${VAULT_ADDR}/v1/auth/token/create" 2>&1)

# Извлекаем HTTP код и тело ответа
HTTP_CODE=$(echo "$SETUP_TOKEN_RESPONSE" | grep -o "HTTP_CODE:[0-9]*" | cut -d: -f2)
SETUP_TOKEN_RESPONSE_BODY=$(echo "$SETUP_TOKEN_RESPONSE" | sed '/HTTP_CODE:/d')

# Проверяем HTTP код
if [ "$HTTP_CODE" != "200" ]; then
  echo "ERROR: Failed to create setup_token (HTTP $HTTP_CODE)"
  echo "Response: $SETUP_TOKEN_RESPONSE_BODY"
  exit 1
fi

# Проверяем, что ответ является валидным JSON
if ! echo "$SETUP_TOKEN_RESPONSE_BODY" | jq . >/dev/null 2>&1; then
  echo "ERROR: Invalid JSON response from Vault"
  echo "Response: $SETUP_TOKEN_RESPONSE_BODY"
  exit 1
fi

# Проверяем наличие ошибок в ответе
if echo "$SETUP_TOKEN_RESPONSE_BODY" | jq -e '.errors' >/dev/null 2>&1; then
  echo "ERROR: Failed to create setup_token"
  echo "$SETUP_TOKEN_RESPONSE_BODY" | jq -r '.errors[]?' 2>/dev/null || echo "$SETUP_TOKEN_RESPONSE_BODY"
  exit 1
fi

SETUP_TOKEN=$(echo "$SETUP_TOKEN_RESPONSE_BODY" | jq -r '.auth.client_token // empty')

if [ -z "$SETUP_TOKEN" ] || [ "$SETUP_TOKEN" = "null" ]; then
  echo "ERROR: Failed to extract setup_token from response"
  echo "$SETUP_TOKEN_RESPONSE"
  exit 1
fi

echo "   ✓ setup_token created"
echo "   Token (first 20 chars): ${SETUP_TOKEN:0:20}..."
echo ""

# Генерируем gitlab_token
echo "2. Generating gitlab_token..."
echo "   This token will be used by GitLab CI/CD pipelines"
echo "   Policy: archpad (read access to kv/data/archpad/*)"

GITLAB_TOKEN_RESPONSE=$(curl -sS -w "\nHTTP_CODE:%{http_code}" -X POST \
  -H "X-Vault-Token: ${VAULT_ROOT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "policies": ["archpad"],
    "ttl": "0",
    "renewable": true,
    "display_name": "gitlab-ci-token",
    "meta": {
      "purpose": "GitLab CI/CD pipeline access to secrets"
    }
  }' \
  "${VAULT_ADDR}/v1/auth/token/create" 2>&1)

# Извлекаем HTTP код и тело ответа
HTTP_CODE=$(echo "$GITLAB_TOKEN_RESPONSE" | grep -o "HTTP_CODE:[0-9]*" | cut -d: -f2)
GITLAB_TOKEN_RESPONSE_BODY=$(echo "$GITLAB_TOKEN_RESPONSE" | sed '/HTTP_CODE:/d')

# Проверяем HTTP код
if [ "$HTTP_CODE" != "200" ]; then
  echo "ERROR: Failed to create gitlab_token (HTTP $HTTP_CODE)"
  echo "Response: $GITLAB_TOKEN_RESPONSE_BODY"
  exit 1
fi

# Проверяем, что ответ является валидным JSON
if ! echo "$GITLAB_TOKEN_RESPONSE_BODY" | jq . >/dev/null 2>&1; then
  echo "ERROR: Invalid JSON response from Vault"
  echo "Response: $GITLAB_TOKEN_RESPONSE_BODY"
  exit 1
fi

# Проверяем наличие ошибок в ответе
if echo "$GITLAB_TOKEN_RESPONSE_BODY" | jq -e '.errors' >/dev/null 2>&1; then
  echo "ERROR: Failed to create gitlab_token"
  echo "$GITLAB_TOKEN_RESPONSE_BODY" | jq -r '.errors[]?' 2>/dev/null || echo "$GITLAB_TOKEN_RESPONSE_BODY"
  exit 1
fi

GITLAB_TOKEN=$(echo "$GITLAB_TOKEN_RESPONSE_BODY" | jq -r '.auth.client_token // empty')

if [ -z "$GITLAB_TOKEN" ] || [ "$GITLAB_TOKEN" = "null" ]; then
  echo "ERROR: Failed to extract gitlab_token from response"
  echo "$GITLAB_TOKEN_RESPONSE"
  exit 1
fi

echo "   ✓ gitlab_token created"
echo "   Token (first 20 chars): ${GITLAB_TOKEN:0:20}..."
echo ""

# Сохраняем токены в Vault
echo "3. Saving tokens to Vault..."
echo "   Storing tokens in: kv/data/archpad/demo/vault/tokens"

TOKENS_JSON=$(cat <<EOF
{
  "data": {
    "SETUP_TOKEN": "${SETUP_TOKEN}",
    "GITLAB_TOKEN": "${GITLAB_TOKEN}"
  }
}
EOF
)

TOKENS_SAVE_RESPONSE=$(curl -sS -X POST \
  -H "X-Vault-Token: ${VAULT_ROOT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "$TOKENS_JSON" \
  "${VAULT_ADDR}/v1/kv/data/archpad/demo/vault/tokens")

if echo "$TOKENS_SAVE_RESPONSE" | jq -e '.errors' >/dev/null 2>&1; then
  echo "WARNING: Failed to save tokens to Vault"
  echo "$TOKENS_SAVE_RESPONSE" | jq -r '.errors[]?' 2>/dev/null || echo "$TOKENS_SAVE_RESPONSE"
  echo ""
  echo "Tokens were generated but not saved to Vault."
  echo "You can save them manually or run this script again."
else
  echo "   ✓ Tokens saved to Vault"
fi

echo ""
echo "=========================================="
echo "Token Generation Complete"
echo "=========================================="
echo ""
echo "IMPORTANT: Save these tokens securely!"
echo ""
echo "setup_token:"
echo "  ${SETUP_TOKEN}"
echo ""
echo "gitlab_token:"
echo "  ${GITLAB_TOKEN}"
echo ""
echo "=========================================="
echo "Next Steps:"
echo "=========================================="
echo ""
echo "1. Create Kubernetes Secret for setup_token:"
echo "   kubectl create secret generic vault-setup-token \\"
echo "     --from-literal=VAULT_SETUP_TOKEN='${SETUP_TOKEN}' \\"
echo "     --namespace=platform"
echo ""
echo "   kubectl create secret generic vault-setup-token \\"
echo "     --from-literal=VAULT_SETUP_TOKEN='${SETUP_TOKEN}' \\"
echo "     --namespace=secure"
echo ""
echo "2. Set GitLab CI/CD Variable for gitlab_token:"
echo "   Go to: GitLab → Settings → CI/CD → Variables"
echo "   Add variable:"
echo "     Key: VAULT_TOKEN"
echo "     Value: ${GITLAB_TOKEN}"
echo "     Type: Variable"
echo "     Flags: Masked (recommended), Protected (recommended)"
echo ""
echo "3. Verify tokens:"
echo "   # Test setup_token"
echo "   export VAULT_TOKEN='${SETUP_TOKEN}'"
echo "   vault token lookup"
echo ""
echo "   # Test gitlab_token"
echo "   export VAULT_TOKEN='${GITLAB_TOKEN}'"
echo "   vault kv get kv/data/archpad/demo/frontend/portal"
echo ""
echo "=========================================="
