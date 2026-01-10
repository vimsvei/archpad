#!/bin/bash
# Скрипт для проверки RBAC конфигурации Traefik

KUBECONFIG_PATH="${1:-../../init/kubeconfig.yaml}"

echo "=== ServiceAccount Traefik ==="
kubectl get sa traefik -n traefik --kubeconfig="$KUBECONFIG_PATH"

echo ""
echo "=== ClusterRole для Traefik ==="
kubectl get clusterrole | grep traefik --kubeconfig="$KUBECONFIG_PATH" || echo "ClusterRole не найден"

echo ""
echo "=== ClusterRoleBinding для Traefik ==="
kubectl get clusterrolebinding | grep traefik --kubeconfig="$KUBECONFIG_PATH" || echo "ClusterRoleBinding не найден"

echo ""
echo "=== Детали ClusterRoleBinding (если существует) ==="
CLUSTER_ROLE_BINDING=$(kubectl get clusterrolebinding --kubeconfig="$KUBECONFIG_PATH" -o jsonpath='{.items[?(@.subjects[?(@.name=="traefik")])].metadata.name}' 2>/dev/null | head -1)
if [ -n "$CLUSTER_ROLE_BINDING" ]; then
  kubectl describe clusterrolebinding "$CLUSTER_ROLE_BINDING" --kubeconfig="$KUBECONFIG_PATH"
else
  echo "ClusterRoleBinding для ServiceAccount traefik не найден"
fi

echo ""
echo "=== Все ClusterRole для поиска ==="
kubectl get clusterrole --kubeconfig="$KUBECONFIG_PATH" | grep -E "traefik|system:traefik" || echo "Не найдено"
