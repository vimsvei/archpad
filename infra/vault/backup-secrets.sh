#!/bin/bash

# Скрипт для создания бэкапа секретов из HashiCorp Vault
# 
# Использование:
#   ./backup-secrets.sh [vault_addr] [vault_token] [output_dir]
#
# Примеры:
#   # Через kubectl (Kubernetes)
#   ./backup-secrets.sh http://vault.vault.svc:8200 hvs.xxxxxxxxxxxx ./backups/vault-$(date +%Y%m%d-%H%M%S)
#
#   # Через Vault CLI (локально)
#   export VAULT_ADDR=http://localhost:8200
#   export VAULT_TOKEN=hvs.xxxxxxxxxxxx
#   ./backup-secrets.sh
#
# Бэкап создается в виде JSON файлов, сохраняя структуру путей Vault

set -euo pipefail

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Параметры
VAULT_ADDR="${1:-${VAULT_ADDR:-http://vault.vault.svc:8200}}"
VAULT_TOKEN="${2:-${VAULT_TOKEN:-}}"
OUTPUT_DIR="${3:-./backups/vault-$(date +%Y%m%d-%H%M%S)}"

# Функции для вывода
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

# Проверка зависимостей
check_dependencies() {
    local missing_deps=()
    
    if ! command -v vault &> /dev/null && ! command -v kubectl &> /dev/null; then
        log_error "Необходим либо 'vault', либо 'kubectl' для доступа к Vault"
        exit 1
    fi
    
    if ! command -v jq &> /dev/null; then
        log_warning "jq не установлен. Бэкап будет создан в формате текста без форматирования JSON"
    fi
}

# Получить доступ к Vault
get_vault_client() {
    if command -v kubectl &> /dev/null; then
        # Проверяем, доступен ли Vault через kubectl
        if kubectl get pod -n vault vault-0 &>/dev/null; then
            log_info "Используется kubectl для доступа к Vault через pod"
            echo "kubectl"
            return
        fi
    fi
    
    if command -v vault &> /dev/null; then
        export VAULT_TOKEN
        export VAULT_ADDR
        log_info "Используется локальный Vault CLI"
        echo "vault"
        return
    fi
    
    log_error "Не удалось получить доступ к Vault"
    exit 1
}

# Выполнить команду Vault
vault_exec() {
    local cmd="$1"
    
    if [ "$VAULT_CLIENT" = "kubectl" ]; then
        kubectl exec -n vault vault-0 -- sh -c "export VAULT_TOKEN=\"$VAULT_TOKEN\" && export VAULT_ADDR=\"$VAULT_ADDR\" && vault $cmd"
    else
        export VAULT_TOKEN
        export VAULT_ADDR
        vault $cmd
    fi
}

# Получить список всех путей в KV store (рекурсивно)
list_kv_paths() {
    local base_path="$1"
    
    log_info "Сканирование пути: $base_path"
    
    # Получаем список элементов на текущем уровне
    local items
    items=$(vault_exec "kv list $base_path 2>/dev/null" || echo "")
    
    if [ -z "$items" ]; then
        # Если список пуст, проверяем, является ли это секретом
        if vault_exec "kv get $base_path 2>/dev/null" &>/dev/null; then
            echo "$base_path"
        fi
        return
    fi
    
    # Обрабатываем каждый элемент
    while IFS= read -r item; do
        # Пропускаем пустые строки
        if [ -z "$item" ]; then
            continue
        fi
        
        # Убираем завершающий слэш, если есть
        item="${item%/}"
        
        local full_path="${base_path}/${item}"
        
        # Рекурсивно проверяем, является ли это директорией или секретом
        local sub_items
        sub_items=$(vault_exec "kv list $full_path 2>/dev/null" || echo "")
        
        if [ -z "$sub_items" ]; then
            # Это секрет, добавляем в список
            echo "$full_path"
        else
            # Это директория, рекурсивно сканируем
            list_kv_paths "$full_path"
        fi
    done <<< "$items"
}

# Бэкап одного секрета
backup_secret() {
    local secret_path="$1"
    local output_file="$2"
    
    log_info "Бэкап секрета: $secret_path"
    
    # Получаем секрет
    local secret_data
    secret_data=$(vault_exec "kv get -format=json $secret_path 2>/dev/null" || echo "")
    
    if [ -z "$secret_data" ]; then
        log_warning "Не удалось получить секрет: $secret_path"
        return 1
    fi
    
    # Создаем директорию для файла
    local file_dir
    file_dir=$(dirname "$output_file")
    mkdir -p "$file_dir"
    
    # Сохраняем секрет
    if command -v jq &> /dev/null; then
        echo "$secret_data" | jq '.' > "$output_file"
    else
        echo "$secret_data" > "$output_file"
    fi
    
    log_success "Сохранено: $output_file"
}

# Основная функция бэкапа
main() {
    log_info "Начало бэкапа секретов Vault"
    log_info "Vault адрес: $VAULT_ADDR"
    log_info "Выходная директория: $OUTPUT_DIR"
    
    # Проверка токена
    if [ -z "$VAULT_TOKEN" ]; then
        log_error "Не указан Vault токен."
        log_error "Использование: $0 [vault_addr] [vault_token] [output_dir]"
        log_error "Или установите переменные окружения: VAULT_ADDR и VAULT_TOKEN"
        exit 1
    fi
    
    # Убеждаемся, что VAULT_ADDR начинается с http:// или https://
    if [[ ! "$VAULT_ADDR" =~ ^https?:// ]]; then
        VAULT_ADDR="http://${VAULT_ADDR}"
    fi
    
    # Проверка зависимостей
    check_dependencies
    
    # Определяем способ доступа к Vault
    VAULT_CLIENT=$(get_vault_client)
    
    # Проверяем доступность Vault
    log_info "Проверка доступности Vault..."
    if ! vault_exec "status" &>/dev/null; then
        log_error "Не удалось подключиться к Vault по адресу: $VAULT_ADDR"
        exit 1
    fi
    log_success "Vault доступен"
    
    # Создаем выходную директорию
    mkdir -p "$OUTPUT_DIR"
    
    # Сохраняем метаинформацию
    cat > "$OUTPUT_DIR/metadata.json" <<EOF
{
  "backup_date": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "vault_addr": "$VAULT_ADDR",
  "backup_type": "kv_secrets",
  "vault_client": "$VAULT_CLIENT"
}
EOF
    
    log_info "Метаинформация сохранена: $OUTPUT_DIR/metadata.json"
    
    # Список базовых путей для бэкапа (можно настроить)
    BASE_PATHS=(
        "kv/data/archpad"
    )
    
    local total_secrets=0
    local success_count=0
    local failed_paths=()
    
    # Бэкап каждого базового пути
    for base_path in "${BASE_PATHS[@]}"; do
        log_info "Обработка базового пути: $base_path"
        
        # Получаем все пути секретов
        local all_paths
        all_paths=$(list_kv_paths "$base_path" || echo "")
        
        if [ -z "$all_paths" ]; then
            log_warning "Путь не найден или пуст: $base_path"
            continue
        fi
        
        # Бэкапим каждый секрет
        while IFS= read -r secret_path; do
            if [ -z "$secret_path" ]; then
                continue
            fi
            
            ((total_secrets++))
            
            # Преобразуем путь в имя файла
            # kv/data/archpad/demo/grafana/admin -> kv/data/archpad/demo/grafana/admin.json
            local relative_path="${secret_path#kv/data/}"
            local output_file="${OUTPUT_DIR}/${relative_path}.json"
            
            if backup_secret "$secret_path" "$output_file"; then
                ((success_count++))
            else
                failed_paths+=("$secret_path")
            fi
        done <<< "$all_paths"
    done
    
    # Создаем индекс всех бэкапированных секретов
    local index_file="${OUTPUT_DIR}/secrets-index.txt"
    find "$OUTPUT_DIR" -name "*.json" -not -name "metadata.json" | sort > "$index_file"
    
    # Итоговая статистика
    log_info ""
    log_success "=== Бэкап завершен ==="
    log_info "Всего секретов: $total_secrets"
    log_info "Успешно: $success_count"
    log_info "Ошибок: ${#failed_paths[@]}"
    log_info "Директория: $OUTPUT_DIR"
    log_info "Индекс: $index_file"
    
    if [ ${#failed_paths[@]} -gt 0 ]; then
        log_warning "Секреты с ошибками:"
        for path in "${failed_paths[@]}"; do
            log_warning "  - $path"
        done
        echo "${failed_paths[@]}" > "${OUTPUT_DIR}/failed-paths.txt"
    fi
    
    # Создаем архив (опционально)
    if command -v tar &> /dev/null && command -v gzip &> /dev/null; then
        local archive_name="${OUTPUT_DIR}.tar.gz"
        log_info "Создание архива: $archive_name"
        tar -czf "$archive_name" -C "$(dirname "$OUTPUT_DIR")" "$(basename "$OUTPUT_DIR")" 2>/dev/null || true
        if [ -f "$archive_name" ]; then
            log_success "Архив создан: $archive_name"
            log_info "Размер архива: $(du -h "$archive_name" | cut -f1)"
        fi
    fi
    
    log_success "Бэкап успешно создан!"
}

# Запуск
main "$@"
