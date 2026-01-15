#!/bin/bash

# Скрипт для решения проблемы push после перезаписи истории git
# 
# Использование:
#   ./scripts/fix-push-after-history-rewrite.sh [remote_name]
#
# По умолчанию используется remote 'Aleksandr-Zelentsov'

set -euo pipefail

REMOTE="${1:-Aleksandr-Zelentsov}"
BRANCH="${2:-main}"

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

log_info "Проверка состояния репозитория..."
log_info "Remote: $REMOTE"
log_info "Branch: $BRANCH"

# Проверка существования remote
if ! git remote | grep -q "^${REMOTE}$"; then
    log_error "Remote '$REMOTE' не найден"
    log_info "Доступные remotes:"
    git remote -v
    exit 1
fi

# Получаем последние изменения
log_info "Получение изменений из удаленного репозитория..."
if ! git fetch "$REMOTE" 2>&1; then
    log_warning "Не удалось получить изменения из $REMOTE (возможно, проблемы с доступом)"
    log_info "Попробуйте выполнить вручную: git fetch $REMOTE"
fi

# Проверяем, есть ли различия
log_info "Проверка различий между локальной и удаленной ветками..."

REMOTE_REF="${REMOTE}/${BRANCH}"

if ! git rev-parse --verify "$REMOTE_REF" >/dev/null 2>&1; then
    log_warning "Удаленная ветка $REMOTE_REF не найдена (возможно, первый push)"
    log_info "Выполните: git push $REMOTE $BRANCH --set-upstream"
    exit 0
fi

# Коммиты, которые есть на удаленной, но нет локально
REMOTE_COMMITS=$(git log --oneline HEAD.."$REMOTE_REF" 2>/dev/null | wc -l | tr -d ' ')

# Коммиты, которые есть локально, но нет на удаленной
LOCAL_COMMITS=$(git log --oneline "$REMOTE_REF"..HEAD 2>/dev/null | wc -l | tr -d ' ')

log_info "Коммитов на удаленной (отсутствуют локально): $REMOTE_COMMITS"
log_info "Коммитов локально (отсутствуют на удаленной): $LOCAL_COMMITS"

if [ "$REMOTE_COMMITS" -gt 0 ]; then
    log_warning "На удаленной ветке есть новые коммиты, которых нет локально:"
    git log --oneline HEAD.."$REMOTE_REF" 2>&1 | head -10
    
    log_warning ""
    log_warning "У вас есть два варианта:"
    log_warning "1. Сохранить новые коммиты из удаленной ветки и объединить их:"
    log_info "   git pull $REMOTE $BRANCH --rebase"
    log_warning ""
    log_warning "2. Перезаписать удаленную ветку вашей локальной (УДАЛИТ новые коммиты на удаленной):"
    log_info "   git push $REMOTE $BRANCH --force"
    log_warning ""
    read -p "Выберите вариант (1/2) или 'cancel' для отмены: " -r
    echo
    
    if [[ "$REPLY" =~ ^[Cc]ancel$ ]]; then
        log_info "Операция отменена"
        exit 0
    elif [[ "$REPLY" =~ ^1$ ]]; then
        log_info "Объединение изменений..."
        if git pull "$REMOTE" "$BRANCH" --rebase; then
            log_success "Изменения объединены"
            log_info "Теперь можно сделать push: git push $REMOTE $BRANCH"
        else
            log_error "Не удалось объединить изменения"
            log_info "Разрешите конфликты вручную и выполните: git rebase --continue"
            exit 1
        fi
    elif [[ "$REPLY" =~ ^2$ ]]; then
        log_warning "Вы уверены, что хотите ПЕРЕЗАПИСАТЬ удаленную ветку? (yes/no)"
        read -p "> " -r
        echo
        if [[ "$REPLY" =~ ^[Yy][Ee][Ss]$ ]]; then
            log_warning "Выполнение force push..."
            if git push "$REMOTE" "$BRANCH" --force; then
                log_success "Force push выполнен успешно"
            else
                log_error "Force push не удался"
                exit 1
            fi
        else
            log_info "Операция отменена"
            exit 0
        fi
    fi
else
    # Нет новых коммитов на удаленной - можно делать force push
    log_info "На удаленной ветке нет новых коммитов"
    log_warning "Это означает, что история была перезаписана локально (например, после удаления файлов из истории)"
    log_warning ""
    log_warning "Для отправки потребуется force push"
    log_info "Выполняется: git push $REMOTE $BRANCH --force"
    
    if git push "$REMOTE" "$BRANCH" --force; then
        log_success "Push выполнен успешно!"
    else
        log_error "Push не удался"
        exit 1
    fi
fi

log_success "Готово!"
