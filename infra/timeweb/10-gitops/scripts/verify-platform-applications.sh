#!/usr/bin/env bash
# Проверка, что изменения platform-applications применились:
# - ServerSideApply у platform-applications
# - Нет SharedResourceWarning / SyncError (resourceVersion)
# Запускать из корня репо при наличии доступа в кластер (VPN/сеть Timeweb).
#
# Использование:
#   export KUBECONFIG=infra/timeweb/k8s_config/twc-archpad-k8s-cluster-config.yaml
#   ./infra/timeweb/10-gitops/scripts/verify-platform-applications.sh
# Если KUBECONFIG не задан, скрипт попробует путь infra/timeweb/k8s_config/... относительно корня репо.

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="${REPO_ROOT:-$(cd "$SCRIPT_DIR/../../../.." && pwd)}"
DEFAULT_KUBECONFIG="$REPO_ROOT/infra/timeweb/k8s_config/twc-archpad-k8s-cluster-config.yaml"
KUBECONFIG="${KUBECONFIG:-$DEFAULT_KUBECONFIG}"
export KUBECONFIG

if [[ ! -f "$KUBECONFIG" ]]; then
  echo "Kubeconfig not found: $KUBECONFIG"
  echo "Задайте KUBECONFIG или положите конфиг в infra/timeweb/k8s_config/"
  exit 1
fi

echo "KUBECONFIG=$KUBECONFIG"
echo ""

echo "=== 1. Доступность кластера ==="
if ! kubectl cluster-info 2>/dev/null; then
  echo "Ошибка: кластер недоступен (проверьте VPN/сеть)."
  exit 1
fi
echo ""

echo "=== 2. Статус platform-applications ==="
kubectl get application platform-applications -n argocd -o wide
SYNC=$(kubectl get application platform-applications -n argocd -o jsonpath='{.status.sync.status}' 2>/dev/null || echo "?")
HEALTH=$(kubectl get application platform-applications -n argocd -o jsonpath='{.status.health.status}' 2>/dev/null || echo "?")
echo "  Sync: $SYNC  Health: $HEALTH"
echo ""

echo "=== 3. SyncOptions platform-applications (ожидается ServerSideApply=true) ==="
kubectl get application platform-applications -n argocd -o jsonpath='{.spec.syncPolicy.syncOptions[*]}' 2>/dev/null | tr ' ' '\n' | sed 's/^/  /'
echo ""
echo ""

echo "=== 4. События platform-applications (SharedResourceWarning / SyncError) ==="
EVENTS=$(kubectl get application platform-applications -n argocd -o jsonpath='{.status.conditions[*].message}' 2>/dev/null)
if echo "$EVENTS" | grep -q "SharedResourceWarning\|SyncError\|resourceVersion"; then
  echo "  ВНИМАНИЕ: найдены предупреждения или ошибки:"
  echo "$EVENTS" | tr ';' '\n' | sed 's/^/  /'
else
  echo "  Критичных предупреждений/ошибок не найдено."
fi
echo ""

echo "=== 5. События в argocd (последние по Application) ==="
kubectl get events -n argocd --field-selector involvedObject.kind=Application --sort-by='.lastTimestamp' 2>/dev/null | tail -15
echo ""

echo "=== 6. Дочерние приложения (кратко) ==="
kubectl get applications -n argocd -o custom-columns='NAME:.metadata.name,SYNC:.status.sync.status,HEALTH:.status.health.status' 2>/dev/null | head -25
echo ""

echo "=== 7. hasura-sync-service (ранее была ошибка resourceVersion) ==="
kubectl get application hasura-sync-service -n argocd -o wide 2>/dev/null || echo "  Application не найден."
echo ""

echo "Готово. Если Sync=Synced и Health=Healthy, изменения применились успешно."
