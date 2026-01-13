#!/bin/bash

# Скрипт для проверки и настройки ArgoCD Image Updater
# Использование: ./scripts/setup-argocd-image-updater.sh

set -e

NAMESPACE="argocd"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ARGOCD_DIR="$PROJECT_ROOT/infra/timeweb/10-gitops/apps/argocd"
ARGOCD_IMAGE_UPDATER_DIR="$PROJECT_ROOT/infra/timeweb/10-gitops/apps/argocd-image-updater"

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔍 Проверка ArgoCD Image Updater..."

# Функция для проверки наличия команды
check_command() {
    if ! command -v "$1" &> /dev/null; then
        echo -e "${RED}❌ Команда $1 не найдена${NC}"
        exit 1
    fi
}

# Функция для проверки подключения к кластеру
check_kubectl() {
    if ! kubectl cluster-info &> /dev/null; then
        echo -e "${RED}❌ Не удалось подключиться к кластеру Kubernetes${NC}"
        echo "Проверьте настройки kubeconfig"
        exit 1
    fi
    echo -e "${GREEN}✅ Подключение к кластеру установлено${NC}"
}

# Функция для проверки namespace
check_namespace() {
    if ! kubectl get namespace "$NAMESPACE" &> /dev/null; then
        echo -e "${YELLOW}⚠️  Namespace $NAMESPACE не существует${NC}"
        echo "Создаю namespace..."
        kubectl create namespace "$NAMESPACE"
        echo -e "${GREEN}✅ Namespace $NAMESPACE создан${NC}"
    else
        echo -e "${GREEN}✅ Namespace $NAMESPACE существует${NC}"
    fi
}

# Функция для проверки Image Updater
check_image_updater() {
    echo ""
    echo "📦 Проверка ArgoCD Image Updater..."
    
    # Проверка через ArgoCD Application (GitOps)
    if kubectl get application argocd-image-updater -n "$NAMESPACE" &> /dev/null; then
        APP_STATUS=$(kubectl get application argocd-image-updater -n "$NAMESPACE" -o jsonpath='{.status.sync.status}' 2>/dev/null || echo "Unknown")
        APP_HEALTH=$(kubectl get application argocd-image-updater -n "$NAMESPACE" -o jsonpath='{.status.health.status}' 2>/dev/null || echo "Unknown")
        echo -e "${GREEN}✅ ArgoCD Application 'argocd-image-updater' существует${NC}"
        echo "   Sync Status: $APP_STATUS"
        echo "   Health Status: $APP_HEALTH"
        
        if [ "$APP_STATUS" = "Synced" ] && [ "$APP_HEALTH" = "Healthy" ]; then
            echo -e "${GREEN}✅ Application синхронизирован и здоров${NC}"
        else
            echo -e "${YELLOW}⚠️  Application требует синхронизации${NC}"
            echo "   Выполните: kubectl get application argocd-image-updater -n $NAMESPACE"
        fi
    else
        echo -e "${YELLOW}⚠️  ArgoCD Application 'argocd-image-updater' не найден${NC}"
        echo "   Это означает, что Image Updater не управляется через GitOps"
        echo "   Application должен быть в: infra/timeweb/10-gitops/apps/argocd-image-updater/argocd-image-updater.app.yaml"
    fi
    
    # Проверка Deployment
    if kubectl get deployment argocd-image-updater -n "$NAMESPACE" &> /dev/null; then
        echo -e "${GREEN}✅ Deployment 'argocd-image-updater' существует${NC}"
        
        # Проверка статуса подов
        READY=$(kubectl get deployment argocd-image-updater -n "$NAMESPACE" -o jsonpath='{.status.readyReplicas}' 2>/dev/null || echo "0")
        DESIRED=$(kubectl get deployment argocd-image-updater -n "$NAMESPACE" -o jsonpath='{.spec.replicas}' 2>/dev/null || echo "0")
        
        if [ "$READY" = "$DESIRED" ] && [ "$READY" != "0" ]; then
            echo -e "${GREEN}✅ Pods готовы ($READY/$DESIRED)${NC}"
        else
            echo -e "${YELLOW}⚠️  Pods не готовы ($READY/$DESIRED)${NC}"
            echo "   Проверьте логи: kubectl logs -n $NAMESPACE -l app.kubernetes.io/name=argocd-image-updater"
        fi
    else
        echo -e "${RED}❌ Deployment 'argocd-image-updater' не найден${NC}"
        echo ""
        echo "Для установки через GitOps:"
        echo "  1. Убедитесь, что манифесты в Git: infra/timeweb/10-gitops/apps/argocd-image-updater/"
        echo "  2. Синхронизируйте Application в ArgoCD UI или выполните:"
        echo "     kubectl patch application argocd-image-updater -n $NAMESPACE --type merge -p '{\"operation\":{\"initiatedBy\":{\"username\":\"admin\"},\"sync\":{\"revision\":\"HEAD\"}}}'"
        echo ""
        echo "Или установите вручную через Helm:"
        echo "  helm repo add argo https://argoproj.github.io/argo-helm"
        echo "  helm install argocd-image-updater argo/argocd-image-updater --namespace $NAMESPACE"
        echo ""
        read -p "Продолжить настройку без установки? (y/n) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    fi
}

# Функция для проверки ConfigMap
check_configmap() {
    echo ""
    echo "📋 Проверка ConfigMap..."
    
    if kubectl get configmap argocd-image-updater-config -n "$NAMESPACE" &> /dev/null; then
        echo -e "${GREEN}✅ ConfigMap существует${NC}"
        
        # Проверяем, откуда он управляется (GitOps или вручную)
        MANAGED_BY=$(kubectl get configmap argocd-image-updater-config -n "$NAMESPACE" -o jsonpath='{.metadata.labels.app\.kubernetes\.io/managed-by}' 2>/dev/null || echo "")
        if [ "$MANAGED_BY" = "argocd" ]; then
            echo "   Управляется через ArgoCD (GitOps)"
        else
            echo "   Управляется вручную"
            read -p "Обновить ConfigMap из Git? (y/n) " -n 1 -r
            echo
            if [[ $REPLY =~ ^[Yy]$ ]]; then
                if [ -f "$ARGOCD_IMAGE_UPDATER_DIR/argocd-image-updater.configmap.yaml" ]; then
                    kubectl apply -f "$ARGOCD_IMAGE_UPDATER_DIR/argocd-image-updater.configmap.yaml"
                    echo -e "${GREEN}✅ ConfigMap обновлен${NC}"
                else
                    echo -e "${RED}❌ Файл не найден: $ARGOCD_IMAGE_UPDATER_DIR/argocd-image-updater.configmap.yaml${NC}"
                fi
            fi
        fi
    else
        echo -e "${YELLOW}⚠️  ConfigMap не существует${NC}"
        echo "Создаю ConfigMap из Git..."
        if [ -f "$ARGOCD_IMAGE_UPDATER_DIR/argocd-image-updater.configmap.yaml" ]; then
            kubectl apply -f "$ARGOCD_IMAGE_UPDATER_DIR/argocd-image-updater.configmap.yaml"
            echo -e "${GREEN}✅ ConfigMap создан${NC}"
        else
            echo -e "${RED}❌ Файл не найден: $ARGOCD_IMAGE_UPDATER_DIR/argocd-image-updater.configmap.yaml${NC}"
            echo "   Убедитесь, что манифесты находятся в Git репозитории"
        fi
    fi
}

# Функция для проверки Registry Secret
check_registry_secret() {
    echo ""
    echo "🔐 Проверка Secret для Container Registry..."
    
    if kubectl get secret archpad-registry-secret -n "$NAMESPACE" &> /dev/null; then
        echo -e "${GREEN}✅ Secret для Container Registry существует${NC}"
    else
        echo -e "${YELLOW}⚠️  Secret для Container Registry не существует${NC}"
        echo ""
        echo "Для создания Secret выполните:"
        echo "  kubectl create secret docker-registry archpad-registry-secret \\"
        echo "    --docker-server=archpad-cr.registry.twcstorage.ru \\"
        echo "    --docker-username=<REGISTRY_USERNAME> \\"
        echo "    --docker-password=<REGISTRY_PASSWORD> \\"
        echo "    --namespace=$NAMESPACE"
        echo ""
        read -p "Создать Secret сейчас? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            read -p "Введите REGISTRY_USERNAME: " REGISTRY_USERNAME
            read -s -p "Введите REGISTRY_PASSWORD: " REGISTRY_PASSWORD
            echo
            kubectl create secret docker-registry archpad-registry-secret \
                --docker-server=archpad-cr.registry.twcstorage.ru \
                --docker-username="$REGISTRY_USERNAME" \
                --docker-password="$REGISTRY_PASSWORD" \
                --namespace="$NAMESPACE"
            echo -e "${GREEN}✅ Secret создан${NC}"
        fi
    fi
}

# Функция для проверки Git Secret
check_git_secret() {
    echo ""
    echo "🔑 Проверка Secret для Git SSH ключа..."
    
    if kubectl get secret argocd-image-updater-git-ssh-key -n "$NAMESPACE" &> /dev/null; then
        echo -e "${GREEN}✅ Secret для Git SSH ключа существует${NC}"
    else
        echo -e "${YELLOW}⚠️  Secret для Git SSH ключа не существует${NC}"
        echo ""
        echo "Для создания Secret выполните:"
        echo "  1. Создайте SSH ключ:"
        echo "     ssh-keygen -t ed25519 -C \"argocd-image-updater@archpad.pro\" -f argocd-image-updater-key"
        echo ""
        echo "  2. Добавьте публичный ключ в GitLab (Settings → SSH Keys)"
        echo ""
        echo "  3. Создайте Secret:"
        echo "     kubectl create secret generic argocd-image-updater-git-ssh-key \\"
        echo "       --from-file=ssh-privatekey=argocd-image-updater-key \\"
        echo "       --namespace=$NAMESPACE"
        echo ""
        read -p "Создать Secret сейчас? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            read -p "Путь к приватному SSH ключу: " SSH_KEY_PATH
            if [ -f "$SSH_KEY_PATH" ]; then
                kubectl create secret generic argocd-image-updater-git-ssh-key \
                    --from-file=ssh-privatekey="$SSH_KEY_PATH" \
                    --namespace="$NAMESPACE"
                echo -e "${GREEN}✅ Secret создан${NC}"
            else
                echo -e "${RED}❌ Файл не найден: $SSH_KEY_PATH${NC}"
            fi
        fi
    fi
}

# Функция для перезапуска Image Updater
restart_image_updater() {
    echo ""
    read -p "Перезапустить ArgoCD Image Updater для применения изменений? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        if kubectl get deployment argocd-image-updater -n "$NAMESPACE" &> /dev/null; then
            kubectl rollout restart deployment/argocd-image-updater -n "$NAMESPACE"
            echo -e "${GREEN}✅ ArgoCD Image Updater перезапущен${NC}"
            echo "Ожидание готовности подов..."
            kubectl rollout status deployment/argocd-image-updater -n "$NAMESPACE" --timeout=60s
        else
            echo -e "${YELLOW}⚠️  ArgoCD Image Updater не установлен${NC}"
        fi
    fi
}

# Функция для проверки логов
check_logs() {
    echo ""
    read -p "Показать последние логи ArgoCD Image Updater? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        if kubectl get pods -n "$NAMESPACE" -l app.kubernetes.io/name=argocd-image-updater &> /dev/null; then
            kubectl logs -n "$NAMESPACE" -l app.kubernetes.io/name=argocd-image-updater --tail=50
        else
            echo -e "${YELLOW}⚠️  Pods ArgoCD Image Updater не найдены${NC}"
        fi
    fi
}

# Главная функция
main() {
    echo "=========================================="
    echo "  ArgoCD Image Updater Setup Script"
    echo "=========================================="
    echo ""
    
    check_command kubectl
    check_kubectl
    check_namespace
    check_image_updater
    check_configmap
    check_registry_secret
    check_git_secret
    restart_image_updater
    check_logs
    
    echo ""
    echo "=========================================="
    echo -e "${GREEN}✅ Проверка завершена${NC}"
    echo "=========================================="
    echo ""
    echo "=========================================="
    echo "  Информация о компонентах"
    echo "=========================================="
    echo ""
    echo "📁 Манифесты в Git:"
    if [ -d "$ARGOCD_IMAGE_UPDATER_DIR" ]; then
        echo -e "${GREEN}✅ $ARGOCD_IMAGE_UPDATER_DIR${NC}"
        echo "   Содержит:"
        ls -1 "$ARGOCD_IMAGE_UPDATER_DIR"/*.yaml 2>/dev/null | sed 's/^/     - /' || echo "     (файлы не найдены)"
    else
        echo -e "${RED}❌ $ARGOCD_IMAGE_UPDATER_DIR не существует${NC}"
    fi
    echo ""
    echo "📚 Документация:"
    echo "  - README: $ARGOCD_IMAGE_UPDATER_DIR/README.md"
    echo "  - Документация: docs/ARGOCD_IMAGE_UPDATER_SETUP.md"
    echo "  - Быстрый старт: docs/ARGOCD_IMAGE_UPDATER_QUICKSTART.md"
    echo ""
    echo "💡 Для управления через GitOps:"
    echo "  - Убедитесь, что манифесты в Git: infra/timeweb/10-gitops/apps/argocd-image-updater/"
    echo "  - ArgoCD Application автоматически подхватит их через platform-applications"
    echo ""
}

# Запуск
main
