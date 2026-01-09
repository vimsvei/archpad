# Init - Базовая инфраструктура

Эта папка содержит Terraform конфигурацию для создания базовой инфраструктуры:
- Kubernetes кластер (k0s)
- Node группа для рабочих узлов
- PostgreSQL кластер
- Базы данных

## Использование

1. **Инициализация:**
   ```bash
   terraform init
   ```

2. **Проверка плана:**
   ```bash
   terraform plan
   ```

3. **Создание инфраструктуры:**
   ```bash
   terraform apply
   ```

4. **Получение kubeconfig:**
   После создания кластера kubeconfig будет сохранен в `kubeconfig.yaml` в этой папке.
   Этот файл используется в папке `../deploy` для развертывания сервисов.

## Outputs

- `k8s_cluster` - Информация о Kubernetes кластере
- `k8s_cluster_kubeconfig` - Kubeconfig (sensitive)
- `k8s_cluster_kubeconfig_path` - Путь к сохраненному kubeconfig файлу
- `db_cluster` - Информация о кластере БД
- `db_instances` - Информация о созданных БД