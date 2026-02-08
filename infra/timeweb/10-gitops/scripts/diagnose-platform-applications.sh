#!/usr/bin/env bash
# Диагностика platform-applications и дочерних приложений

set -e

echo "=== 1. Статус platform-applications ==="
kubectl get application platform-applications -n argocd -o wide 2>/dev/null || true
kubectl describe application platform-applications -n argocd 2>/dev/null | tail -50 || true

echo ""
echo "=== 2. Все дочерние Applications ==="
kubectl get applications -n argocd -l app.kubernetes.io/instance=platform-applications 2>/dev/null || true
kubectl get applications -n argocd 2>/dev/null | head -30

echo ""
echo "=== 3. Статус landing app (если есть) ==="
kubectl get application landing -n argocd -o wide 2>/dev/null || true
kubectl describe application landing -n argocd 2>/dev/null | tail -60 || true

echo ""
echo "=== 4. Landing pods ==="
kubectl get pods -n platform -l app=landing 2>/dev/null || true
kubectl describe pod -n platform -l app=landing 2>/dev/null | tail -80 || true

echo ""
echo "=== 5. События в namespace platform ==="
kubectl get events -n platform --sort-by='.lastTimestamp' 2>/dev/null | tail -20
