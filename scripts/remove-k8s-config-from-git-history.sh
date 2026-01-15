#!/bin/bash

# Скрипт для удаления infra/timeweb/k8s_config из всей истории git
# 
# ВНИМАНИЕ: Этот скрипт перезаписывает историю git!
# Используйте только если вы уверены, что делаете.
#
# После выполнения необходимо сделать force push:
#   git push origin --force --all
#
# Предупреждение: Это повлияет на всех, кто работает с репозиторием.
# Они должны будут сделать: git fetch && git reset --hard origin/main

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Проверка, что мы в git репозитории
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    log_error "Не найдено git репозитория"
    exit 1
fi

# Проверка на незакоммиченные изменения
if ! git diff-index --quiet HEAD --; then
    log_error "Обнаружены незакоммиченные изменения. Пожалуйста, закоммитьте или сохраните изменения перед выполнением скрипта."
    exit 1
fi

log_warning "=========================================="
log_warning "ВНИМАНИЕ: УДАЛЕНИЕ ИЗ ИСТОРИИ GIT"
log_warning "=========================================="
log_warning "Этот скрипт удалит 'infra/timeweb/k8s_config/' из ВСЕЙ истории git."
log_warning "Это потребует перезаписи истории и force push."
log_warning ""
log_warning "Последствия:"
log_warning "  - Вся история git будет перезаписана"
log_warning "  - Все коммиты будут иметь новые хеши"
log_warning "  - Потребуется force push: git push origin --force --all"
log_warning "  - Все разработчики должны будут пересинхронизировать свои репозитории"
log_warning ""
read -p "Продолжить? (yes/no): " -r
echo

if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    log_info "Операция отменена"
    exit 0
fi

log_info "Создание бэкапа текущего состояния..."
BACKUP_BRANCH="backup-before-remove-k8s-config-$(date +%Y%m%d-%H%M%S)"
git branch "$BACKUP_BRANCH" 2>/dev/null || true
log_success "Бэкап создан: $BACKUP_BRANCH"

log_info "Проверка наличия git-filter-repo..."
if command -v git-filter-repo &> /dev/null; then
    log_success "git-filter-repo найден (рекомендуемый метод)"
    METHOD="filter-repo"
elif command -v git-filter-branch &> /dev/null; then
    log_warning "git-filter-repo не найден, используется git-filter-branch (устаревший метод)"
    METHOD="filter-branch"
else
    log_error "Не найден ни git-filter-repo, ни git-filter-branch"
    log_error "Установите git-filter-repo: brew install git-filter-repo"
    exit 1
fi

log_info "Удаление 'infra/timeweb/k8s_config/' из истории git..."

if [ "$METHOD" = "filter-repo" ]; then
    # Используем git-filter-repo (рекомендуемый метод)
    git filter-repo --path infra/timeweb/k8s_config/ --invert-paths --force
    
    log_success "Удаление выполнено с помощью git-filter-repo"
    log_info "Теперь выполните:"
    log_info "  git push origin --force --all"
    log_info "  git push origin --force --tags"
else
    # Используем git-filter-branch (устаревший метод)
    log_warning "Использование git-filter-branch (медленнее, но работает)"
    
    git filter-branch --force --index-filter \
        "git rm -rf --cached --ignore-unmatch infra/timeweb/k8s_config" \
        --prune-empty --tag-name-filter cat -- --all
    
    log_success "Удаление выполнено с помощью git-filter-branch"
    log_info "Теперь выполните:"
    log_info "  git push origin --force --all"
    log_info "  git push origin --force --tags"
fi

log_warning "=========================================="
log_warning "ВАЖНО: Следующие шаги"
log_warning "=========================================="
log_warning "1. Проверьте изменения: git log --oneline"
log_warning "2. Убедитесь, что infra/timeweb/k8s_config больше нет в истории"
log_warning "3. Сделайте force push: git push origin --force --all"
log_warning "4. Уведомите всех разработчиков о необходимости пересинхронизации"
log_warning ""
log_info "Бэкап сохранен в ветке: $BACKUP_BRANCH"
log_info "Если что-то пошло не так, вы можете восстановиться:"
log_info "  git reset --hard $BACKUP_BRANCH"
