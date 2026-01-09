locals {
  # Флаг включения контейнерного реестра
  registry_enabled = var.registry_url != null && var.registry_token != null
}
