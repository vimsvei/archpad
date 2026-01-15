#!/bin/bash

# Скрипт для удаления Vault Root Token из всей истории git
# 
# ВНИМАНИЕ: Этот скрипт перезаписывает историю git!
# Используйте только если вы уверены, что делаете.

set -euo pipefail

VAULT_TOKEN_PATTERN="<your-vault-root-token>"
REPLACEMENT="<your-vault-root-token>"

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
log_warning "ВНИМАНИЕ: УДАЛЕНИЕ СЕКРЕТА ИЗ ИСТОРИИ GIT"
log_warning "=========================================="
log_warning "Этот скрипт заменит '$VAULT_TOKEN_PATTERN' на '$REPLACEMENT' во всей истории git."
log_warning "Это потребует перезаписи истории и force push."
log_warning ""
read -p "Продолжить? (yes/no): " -r
echo

if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    log_info "Операция отменена"
    exit 0
fi

log_info "Создание бэкапа текущего состояния..."
BACKUP_BRANCH="backup-before-remove-token-$(date +%Y%m%d-%H%M%S)"
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

log_info "Поиск вхождений токена в истории..."
TOKEN_COUNT=$(git log --all -p --source --all | grep -c "$VAULT_TOKEN_PATTERN" || echo "0")
log_info "Найдено вхождений: $TOKEN_COUNT"

if [ "$TOKEN_COUNT" -eq 0 ]; then
    log_warning "Токен не найден в истории. Возможно, он уже удален."
    exit 0
fi

log_info "Замена токена во всей истории git..."

if [ "$METHOD" = "filter-repo" ]; then
    # Используем git-filter-repo (рекомендуемый метод)
    git filter-repo --replace-text <(echo "$VAULT_TOKEN_PATTERN==>$REPLACEMENT") --force
    
    log_success "Замена выполнена с помощью git-filter-repo"
else
    # Используем git-filter-branch (устаревший метод)
    log_warning "Использование git-filter-branch (медленнее, но работает)"
    
    git filter-branch --force --tree-filter \
        "find . -type f -name '*.md' -exec sed -i '' 's|$VAULT_TOKEN_PATTERN|$REPLACEMENT|g' {} +" \
        --prune-empty --tag-name-filter cat -- --all
    
    log_success "Замена выполнена с помощью git-filter-branch"
fi

log_info "Проверка результата..."
NEW_COUNT=$(git log --all -p --source --all | grep -c "$VAULT_TOKEN_PATTERN" || echo "0")
if [ "$NEW_COUNT" -eq 0 ]; then
    log_success "Токен успешно удален из истории"
else
    log_warning "Осталось вхождений: $NEW_COUNT"
fi

log_warning "=========================================="
log_warning "ВАЖНО: Следующие шаги"
log_warning "=========================================="
log_warning "1. Проверьте изменения: git log --oneline"
log_warning "2. Убедитесь, что токен больше нет в истории"
log_warning "3. Сделайте force push: git push <remote> main --force"
log_warning "4. Уведомите всех разработчиков о необходимости пересинхронизации"
log_warning ""
log_info "Бэкап сохранен в ветке: $BACKUP_BRANCH"
log_info "Если что-то пошло не так, вы можете восстановиться:"
log_info "  git reset --hard $BACKUP_BRANCH"
