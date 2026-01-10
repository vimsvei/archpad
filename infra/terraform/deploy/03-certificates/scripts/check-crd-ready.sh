#!/bin/sh
set +e  # Не падать сразу при ошибках
MAX_ATTEMPTS=${MAX_ATTEMPTS:-120}  # Увеличено до 120 попыток (10 минут)
ATTEMPT=0
KUBECONFIG_FILE=${KUBECONFIG_FILE:-""}
CRD_NAME=${CRD_NAME:-"clusterissuers.cert-manager.io"}

# Если указан kubeconfig, используем его через переменную окружения KUBECONFIG
# Это более надежный способ, чем --kubeconfig
if [ -n "${KUBECONFIG_FILE}" ]; then
  export KUBECONFIG="${KUBECONFIG_FILE}"
  KUBECONFIG_ARG=""
else
  KUBECONFIG_ARG=""
fi

echo "Ожидание установки CRD ${CRD_NAME}..."
echo "Проверка статуса cert-manager..."

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
  # Проверяем наличие CRD несколькими способами
  # Попытка 1: прямая проверка по имени
  if kubectl get crd ${CRD_NAME} ${KUBECONFIG_ARG} >/dev/null 2>&1; then
    echo "✅ CRD ${CRD_NAME} установлен и готов к использованию"
    exit 0
  fi
  
  # Попытка 2: проверка через API версию (более надежный способ)
  if kubectl api-resources ${KUBECONFIG_ARG} 2>/dev/null | grep -q "clusterissuers.*cert-manager.io"; then
    echo "✅ CRD clusterissuers доступен через API (API версия: cert-manager.io/v1)"
    exit 0
  fi
  
  ATTEMPT=$((ATTEMPT + 1))
  
  # Каждые 12 попыток (1 минута) выводим диагностическую информацию
  if [ $((ATTEMPT % 12)) -eq 0 ]; then
    echo ""
    echo "=== Диагностика (попытка $ATTEMPT/$MAX_ATTEMPTS) ==="
    echo "Проверка подов cert-manager:"
    kubectl get pods -n cert-manager ${KUBECONFIG_ARG} 2>&1 | head -5 || true
    echo ""
    echo "Проверка всех CRD cert-manager:"
    kubectl get crd ${KUBECONFIG_ARG} 2>&1 | grep cert-manager || echo "Нет CRD cert-manager"
    echo ""
    echo "Проверка через API resources:"
    kubectl api-resources ${KUBECONFIG_ARG} 2>&1 | grep -i clusterissuer || echo "ClusterIssuer не найден в API"
    echo ""
  fi
  
  echo "Попытка $ATTEMPT/$MAX_ATTEMPTS: CRD ${CRD_NAME} еще не установлен, ждем 5 секунд..."
  sleep 5
done

echo ""
echo "❌ ERROR: CRD ${CRD_NAME} не установлен за $MAX_ATTEMPTS попыток"
echo ""
echo "=== Финальная диагностика ==="
echo "Статус подов cert-manager:"
kubectl get pods -n cert-manager ${KUBECONFIG_ARG} 2>&1 || true
echo ""
echo "События в namespace cert-manager:"
kubectl get events -n cert-manager --sort-by='.lastTimestamp' ${KUBECONFIG_ARG} 2>&1 | tail -10 || true
echo ""
echo "Все CRD cert-manager:"
kubectl get crd ${KUBECONFIG_ARG} 2>&1 | grep cert-manager || echo "Нет CRD cert-manager"
echo ""
echo "Пожалуйста, проверьте статус cert-manager вручную:"
echo "  kubectl get pods -n cert-manager"
echo "  kubectl logs -n cert-manager -l app=cert-manager"
exit 1
