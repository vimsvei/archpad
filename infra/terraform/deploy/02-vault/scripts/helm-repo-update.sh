#!/bin/sh
set +e  # Не останавливаться при ошибках
if command -v helm >/dev/null 2>&1; then
  # Добавляем репозиторий, если его нет
  helm repo add hashicorp https://helm.releases.hashicorp.com 2>/dev/null || true
  
  # Пытаемся обновить репозиторий, но не падаем при ошибке
  # Если репозиторий недоступен (403), Helm будет использовать кэш
  helm repo update hashicorp 2>/dev/null || {
    echo "Warning: Failed to update hashicorp repo (may be network/VPN issue)"
    echo "Helm will use cached chart if available, continuing..."
  }
else
  echo "Helm not found, Terraform will handle repo update"
fi
