#!/bin/bash
# Скрипт для проверки статуса Traefik без использования Helm

KUBECONFIG_PATH="${1:-../../init/kubeconfig.yaml}"

echo "=== Статус подов Traefik ==="
kubectl get pods -n traefik --kubeconfig="$KUBECONFIG_PATH"

echo ""
echo "=== События в namespace traefik ==="
kubectl get events -n traefik --kubeconfig="$KUBECONFIG_PATH" --sort-by='.lastTimestamp' | tail -10

echo ""
echo "=== Логи Traefik (последние 20 строк) ==="
kubectl logs -n traefik -l app.kubernetes.io/name=traefik --kubeconfig="$KUBECONFIG_PATH" --tail=20 || echo "Логи недоступны"

echo ""
echo "=== Статус Service Traefik ==="
kubectl get svc -n traefik --kubeconfig="$KUBECONFIG_PATH"

echo ""
echo "=== Описание подов (последний под) ==="
kubectl describe pod -n traefik -l app.kubernetes.io/name=traefik --kubeconfig="$KUBECONFIG_PATH" | tail -20
