# Получение секретов из Vault
# Секреты хранятся в формате: /v1/kv/data/archpad/{environment}/database
# Ключи: PROJECT_DB_PASSWORD, HASURA_DB_PASSWORD, KRATOS_DB_PASSWORD, HYDRA_DB_PASSWORD, TOLGEE_DB_PASSWORD

data "vault_kv_secret_v2" "database" {
  mount = var.kv_secrets_engine_path
  name  = "archpad/${var.vault_environment}/database"
}

# Получение секретов кластера БД из Vault
# Секреты хранятся в формате: /v1/kv/data/archpad/{environment}/database-cluster
# Ключи: POSTGRES_USERNAME (имя пользователя администратора PostgreSQL), POSTGRES_PASSWORD (пароль администратора PostgreSQL)

data "vault_kv_secret_v2" "database_cluster" {
  mount = var.kv_secrets_engine_path
  name  = "archpad/${var.vault_environment}/database-cluster"
}

locals {
  # Маппинг конфигурации баз данных
  # Имена пользователей могут быть получены из Vault, переменных или иметь значения по умолчанию
  # Значения по умолчанию соответствуют именам переменных окружения из init.sh
  db_user_names = {
    project = coalesce(
      try(data.vault_kv_secret_v2.database.data["ARCHPAD_DB_USER"], null),
      var.archpad_db_user_name
    )
    tenant = coalesce(
      try(data.vault_kv_secret_v2.database.data["TENANT_DB_USER"], null),
      var.tenant_db_user_name
    )
    hasura = coalesce(
      try(data.vault_kv_secret_v2.database.data["HASURA_DB_USER"], null),
      var.hasura_db_user_name
    )
    kratos = coalesce(
      try(data.vault_kv_secret_v2.database.data["KRATOS_DB_USER"], null),
      var.kratos_db_user_name
    )
    hydra = coalesce(
      try(data.vault_kv_secret_v2.database.data["HYDRA_DB_USER"], null),
      var.hydra_db_user_name
    )
    tolgee = coalesce(
      try(data.vault_kv_secret_v2.database.data["TOLGEE_DB_USER"], null),
      var.tolgee_db_user_name
    )
  }

  # Имена БД из init state (outputs.db_instances), если доступны
  # Иначе используем ключи из databases конфигурации как имена БД
  db_names_from_init = {
    project = try(data.terraform_remote_state.init.outputs.db_instances.archpad.name, "archpad")
    tenant  = try(data.terraform_remote_state.init.outputs.db_instances.tenant.name, "tenant")
    hasura  = try(data.terraform_remote_state.init.outputs.db_instances.hasura.name, "hasura")
    kratos  = try(data.terraform_remote_state.init.outputs.db_instances.kratos.name, "kratos")
    hydra   = try(data.terraform_remote_state.init.outputs.db_instances.hydra.name, "hydra")
    tolgee  = try(data.terraform_remote_state.init.outputs.db_instances.tolgee.name, "tolgee")
  }

  # Конфигурация баз данных
  db_users_config = {
    project = {
      user_name   = local.db_user_names.project
      password_key = "PROJECT_DB_PASSWORD"
      db_name     = local.db_names_from_init.project
    }
    tenant = {
      user_name   = local.db_user_names.project
      password_key = "PROJECT_DB_PASSWORD"
      db_name     = local.db_names_from_init.tenant
    }
    hasura = {
      user_name   = local.db_user_names.hasura
      password_key = "HASURA_DB_PASSWORD"
      db_name     = local.db_names_from_init.hasura
    }
    kratos = {
      user_name   = local.db_user_names.kratos
      password_key = "KRATOS_DB_PASSWORD"
      db_name     = local.db_names_from_init.kratos
    }
    hydra = {
      user_name   = local.db_user_names.hydra
      password_key = "HYDRA_DB_PASSWORD"
      db_name     = local.db_names_from_init.hydra
    }
    tolgee = {
      user_name   = local.db_user_names.tolgee
      password_key = "TOLGEE_DB_PASSWORD"
      db_name     = local.db_names_from_init.tolgee
    }
  }

  # Получаем пароли из Vault, используя ключи с суффиксом _PASSWORD
  # Значения должны быть заданы в Vault, иначе будет ошибка при создании пользователей
  db_passwords = {
    for db_key, config in local.db_users_config :
    db_key => try(
      data.vault_kv_secret_v2.database.data[config.password_key],
      null
    )
  }

  # Получаем имя пользователя администратора PostgreSQL из Vault (секрет database-cluster)
  # Путь: /v1/kv/data/archpad/{environment}/database-cluster
  # Ключ: POSTGRES_USERNAME
  postgres_admin_user_from_vault = coalesce(
    try(data.vault_kv_secret_v2.database_cluster.data["POSTGRES_USERNAME"], null),
    var.postgres_admin_user
  )

  # Получаем пароль администратора PostgreSQL из Vault (секрет database-cluster)
  # Путь: /v1/kv/data/archpad/{environment}/database-cluster
  # Ключ: POSTGRES_PASSWORD
  postgres_admin_password_from_vault = coalesce(
    try(data.vault_kv_secret_v2.database_cluster.data["POSTGRES_PASSWORD"], null),
    var.postgres_admin_password
  )

  # Проверка наличия паролей (для валидации)
  passwords_check = {
    for db_key, password in local.db_passwords :
    db_key => password != null
  }

  # Отдельные локальные переменные для debug output (без sensitive данных)
  # Эти значения используются только для вывода и не содержат sensitive информации
  debug_connection_host = local.postgres_connection_host
  debug_connection_port = local.postgres_connection_port
}
