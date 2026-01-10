#!/bin/bash
# Скрипт для проверки статуса Vault

KUBECONFIG_PATH="${1:-../../init/kubeconfig.yaml}"

echo "=== Статус сервиса Vault ==="
kubectl get svc -n vault --kubeconfig="$KUBECONFIG_PATH"

echo ""
echo "=== Статус подов Vault ==="
kubectl get pods -n vault --kubeconfig="$KUBECONFIG_PATH"

echo ""
echo "=== IngressRoute для Vault ==="
kubectl get ingressroute -n vault --kubeconfig="$KUBECONFIG_PATH" || echo "IngressRoute не найден"

echo ""
echo "=== Описание IngressRoute (если существует) ==="
kubectl describe ingressroute vault -n vault --kubeconfig="$KUBECONFIG_PATH" 2>/dev/null || echo "IngressRoute vault не найден"

echo ""
echo "=== Описание сервиса Vault ==="
kubectl describe svc vault -n vault --kubeconfig="$KUBECONFIG_PATH" 2>/dev/null || echo "Сервис vault не найден"

echo ""
echo "=== Логи Vault (последние 20 строк) ==="
kubectl logs -n vault -l app.kubernetes.io/name=vault --kubeconfig="$KUBECONFIG_PATH" --tail=20 2>/dev/null || echo "Логи недоступны"

echo ""
echo "=== События в namespace vault ==="
kubectl get events -n vault --kubeconfig="$KUBECONFIG_PATH" --sort-by='.lastTimestamp' | tail -10
