#!/bin/bash
# Скрипт для создания отдельного токена Vault для GitLab CI/CD
# Этот токен используется только для чтения секретов во время сборки Docker-образов
# Использует только curl и jq (не требует vault CLI)

set -e

VAULT_ADDR="${VAULT_ADDR:-https://vault.archpad.pro}"
VAULT_TOKEN_ROOT="${VAULT_TOKEN_ROOT:-}"
VAULT_TOKEN="${VAULT_TOKEN:-$VAULT_TOKEN_ROOT}"

if [ -z "$VAULT_TOKEN" ]; then
  echo "ERROR: VAULT_TOKEN or VAULT_TOKEN_ROOT is not set"
  echo ""
  echo "Usage:"
  echo "  export VAULT_TOKEN=your-vault-token"
  echo "  ./create-gitlab-token.sh"
  echo ""
  echo "Or use VAULT_TOKEN_ROOT (will be used as VAULT_TOKEN):"
  echo "  export VAULT_ADDR=https://vault.archpad.pro"
  echo "  export VAULT_TOKEN_ROOT=your-root-token"
  echo "  ./create-gitlab-token.sh"
  exit 1
fi

# Проверяем наличие curl и jq
if ! command -v curl >/dev/null 2>&1; then
  echo "ERROR: curl is not installed. Please install curl first."
  exit 1
fi

if ! command -v jq >/dev/null 2>&1; then
  echo "ERROR: jq is not installed. Please install jq first."
  echo "  macOS: brew install jq"
  echo "  Linux: apt-get install jq or yum install jq"
  exit 1
fi

echo "Creating Vault token for GitLab CI/CD..."
echo "Vault address: $VAULT_ADDR"
echo ""

# Проверяем, что политика archpad существует через API
echo "Checking if 'archpad' policy exists..."
POLICY_CHECK=$(curl -s -H "X-Vault-Token: ${VAULT_TOKEN}" \
  "${VAULT_ADDR}/v1/sys/policies/acl/archpad" 2>&1)

if echo "$POLICY_CHECK" | jq -e '.errors' >/dev/null 2>&1; then
  echo "⚠️  Could not verify policy 'archpad' (token may not have read permissions)"
  echo "   Continuing anyway - if policy exists in Vault UI, token creation should work"
else
  echo "✅ Policy 'archpad' exists (verified via API)"
fi
echo ""

# Создаем токен с политикой archpad через Vault API
# Используем display-name для идентификации, но не фиксированный ID, чтобы не перезаписать существующий токен
echo "Creating new token with 'archpad' policy..."

# Создаем JSON payload для создания токена
TOKEN_PAYLOAD=$(cat <<EOF
{
  "policies": ["archpad"],
  "ttl": "0",
  "renewable": true,
  "display_name": "gitlab-ci-token"
}
EOF
)

# Создаем токен через Vault API
TOKEN_OUTPUT=$(curl -s -X POST \
  -H "X-Vault-Token: ${VAULT_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "$TOKEN_PAYLOAD" \
  "${VAULT_ADDR}/v1/auth/token/create" 2>&1)

# Проверяем результат
if echo "$TOKEN_OUTPUT" | jq -e '.auth.client_token' >/dev/null 2>&1; then
  TOKEN=$(echo "$TOKEN_OUTPUT" | jq -r '.auth.client_token')
  TOKEN_ACCESSOR=$(echo "$TOKEN_OUTPUT" | jq -r '.auth.accessor')
  
  if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
    echo "ERROR: Token was not created (empty or null)"
    echo ""
    echo "Output:"
    echo "$TOKEN_OUTPUT"
    exit 1
  fi
  
  echo "✅ Token created successfully!"
  echo ""
  echo "=========================================="
  echo "GitLab CI/CD Vault Token"
  echo "=========================================="
  echo "Token: $TOKEN"
  echo "Token Accessor: $TOKEN_ACCESSOR"
  echo "Policy: archpad"
  echo "TTL: unlimited (0)"
  echo "Renewable: true"
  echo ""
  echo "Next steps:"
  echo "1. Copy the token above"
  echo "2. Go to GitLab: Settings → CI/CD → Variables"
  echo "3. Add variable:"
  echo "   - Key: VAULT_TOKEN"
  echo "   - Value: <paste token here>"
  echo "   - Type: Variable"
  echo "   - Flags: ✅ Masked (recommended)"
  echo "   - ✅ Protect variable (optional, for protected branches)"
  echo "4. Save"
  echo ""
  echo "⚠️  IMPORTANT: Save this token securely!"
  echo "   You won't be able to see it again after closing this script."
  echo "=========================================="
else
  echo "ERROR: Failed to create token"
  echo ""
  echo "Output:"
  echo "$TOKEN_OUTPUT"
  echo ""
  
  # Пытаемся извлечь сообщение об ошибке
  ERROR_MSG=$(echo "$TOKEN_OUTPUT" | jq -r '.errors[]?' 2>/dev/null || echo "")
  if [ -n "$ERROR_MSG" ]; then
    echo "Error message: $ERROR_MSG"
    echo ""
  fi
  
  echo "Possible issues:"
  echo "1. Token doesn't have permission to create tokens"
  echo "2. Policy 'archpad' doesn't exist"
  echo "3. Vault address is incorrect or unreachable"
  echo ""
  echo "Try checking in Vault UI:"
  echo "  - Go to: Access → Policies → Check if 'archpad' policy exists"
  echo "  - Verify your token has 'create' permission for tokens"
  echo ""
  echo "Or try creating token manually via API:"
  echo "  curl -X POST \\"
  echo "    -H \"X-Vault-Token: \${VAULT_TOKEN}\" \\"
  echo "    -H \"Content-Type: application/json\" \\"
  echo "    -d '{\"policies\":[\"archpad\"],\"ttl\":\"0\",\"display_name\":\"gitlab-ci-token\"}' \\"
  echo "    \"\${VAULT_ADDR}/v1/auth/token/create\" | jq -r '.auth.client_token'"
  exit 1
fi
