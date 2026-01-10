# 2nd Step - Остальные сервисы

Второй и финальный шаг развертывания: установка всех остальных сервисов.

## Что развертывается

- Cert-Manager (автоматические TLS сертификаты)
- ClusterIssuer для Let's Encrypt
- Wildcard сертификат для домена
- TLSStore для Traefik
- Hasura (GraphQL Engine)
- Hasura IngressRoute
- Container Registry secrets для оставшихся namespace

## Предварительные требования

**ВАЖНО:** Перед развертыванием нужно завершить предыдущий шаг:

1. **1st-step (Traefik и Vault):**
   ```bash
   cd ../1st-step
   terraform apply
   terraform output traefik_lb_ip
   ```

## Использование

1. **Инициализация:**
   ```bash
   terraform init
   ```

2. **Настройка переменных:**
   
   Отредактируйте `terraform.tfvars`:
   - `hasura_database_url` - URL для подключения к БД Hasura
   - `hasura_metadata_database_url` - URL для метаданных Hasura
   - `timeweb_dns01_group_name` - GroupName для cert-manager webhook
   - `timeweb_dns01_solver_name` - SolverName для cert-manager webhook

3. **Проверка плана:**
   ```bash
   terraform plan
   ```

4. **Развертывание:**
   ```bash
   terraform apply
   ```

5. **Проверка доступности:**
   После развертывания сервисы должны быть доступны:
   - `https://hasura.archpad.pro` (Hasura)
   - `https://vault.archpad.pro` (Vault, уже развернут на шаге 1)

**ВАЖНО:** После развертывания все сервисы должны быть полностью настроены и доступны.