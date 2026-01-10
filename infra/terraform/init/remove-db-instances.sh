#!/bin/bash
# Скрипт для удаления ресурсов twc_database_instance из state
# Эти ресурсы теперь управляются модулем 04-database

set -e

cd "$(dirname "$0")"

echo "Удаление ресурсов twc_database_instance из state..."

# Список баз данных для удаления
databases=("archpad" "hasura" "hydra" "kratos" "tenant" "tolgee")

for db in "${databases[@]}"; do
  echo "Удаление twc_database_instance.db[\"$db\"]..."
  terraform state rm "twc_database_instance.db[\"$db\"]" || echo "Ресурс не найден или уже удален: $db"
done

echo "Готово!"
