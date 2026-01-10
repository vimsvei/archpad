# 1st Step - Traefik и Vault

Первый шаг развертывания: установка Traefik как Ingress Controller с LoadBalancer и Vault для хранения секретов.

## Что развертывается

- Traefik (Ingress Controller)
- LoadBalancer Service (для публичного доступа)
- Vault (HashiCorp Vault для хранения секретов)
- Vault IngressRoute для Traefik
- Container Registry secrets (опционально)

## Использование

1. **Убедитесь, что init завершен:**
   ```bash
   cd ../../init
   terraform output
   ```

2. **Инициализация:**
   ```bash
   cd ../deploy/1st-step
   terraform init
   ```

3. **Проверка плана:**
   ```bash
   terraform plan
   ```

4. **Развертывание:**
   ```bash
   terraform apply
   ```

5. **Получение публичного IP:**
   ```bash
   terraform output traefik_lb_ip
   ```

6. **Настройка DNS (после получения IP):**
   - `vault.archpad.pro` → IP Traefik (для Vault UI)
   - `hasura.archpad.pro` → IP Traefik
   - `*.archpad.pro` → IP Traefik (wildcard)

7. **Проверка доступа к Vault UI:**
   После настройки DNS, Vault UI должен быть доступен по адресу:
   - `https://vault.archpad.pro`

**ВАЖНО:** После развертывания Traefik и Vault, можно переходить к следующему шагу (2nd-step).