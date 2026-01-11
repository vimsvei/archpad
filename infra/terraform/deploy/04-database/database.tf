# ============================================================================
# PostgreSQL Database Roles (Users)
# ============================================================================
# Примечание: Если используется port-forward, убедитесь, что null_resource.postgres_port_forward
# выполнен перед созданием ресурсов PostgreSQL

# Выдаем CREATEROLE пользователю перед созданием ролей
# Для managed database в TimeWeb Cloud пользователь может не иметь CREATEROLE по умолчанию
# Если это не сработает (требуется superuser), нужно выдать CREATEROLE вручную через панель управления или API
resource "null_resource" "grant_createrole" {
  depends_on = [null_resource.postgres_connection_ready]

  provisioner "local-exec" {
    command = <<-EOT
      # Пытаемся выдать CREATEROLE пользователю
      # Если это не сработает (требуется superuser), нужно сделать это вручную
      PGPASSWORD="${local.postgres_admin_password_from_vault}" psql \
        -h "${local.postgres_connection_host}" \
        -p "${local.postgres_connection_port}" \
        -U "${local.postgres_admin_user_from_vault}" \
        -d "${var.postgres_admin_database}" \
        -c "ALTER ROLE ${local.postgres_admin_user_from_vault} CREATEROLE;" \
        2>&1 || echo "Warning: Could not grant CREATEROLE. You may need to do this manually or through TimeWeb Cloud panel."
    EOT
  }

  triggers = {
    username = local.postgres_admin_user_from_vault
    host     = local.postgres_connection_host
    port     = local.postgres_connection_port
  }
}

# PROJECT_DB_USER - используется для PROJECT_DB и TENANT_DB
# Примечание: Если используется Traefik routing, маршрутизация создается в модуле 01-traefik и будет готова до запуска этого модуля
# Если используется port-forward, порт-форвард создается через null_resource.postgres_port_forward
# Зависим от маркерного ресурса postgres_connection_ready и выдачи CREATEROLE
resource "postgresql_role" "project_user" {
  depends_on = [
    null_resource.postgres_connection_ready,
    null_resource.grant_createrole
  ]

  name            = local.db_users_config.project.user_name
  password        = local.db_passwords.project
  login           = true
  create_database = false
  create_role     = false
  superuser       = false
}

# HASURA_DB_USER
resource "postgresql_role" "hasura_user" {
  depends_on = [
    null_resource.postgres_connection_ready,
    null_resource.grant_createrole
  ]

  name            = local.db_users_config.hasura.user_name
  password        = local.db_passwords.hasura
  login           = true
  create_database = false
  create_role     = false
  superuser       = false
}

# KRATOS_DB_USER
resource "postgresql_role" "kratos_user" {
  depends_on = [
    null_resource.postgres_connection_ready,
    null_resource.grant_createrole
  ]

  name            = local.db_users_config.kratos.user_name
  password        = local.db_passwords.kratos
  login           = true
  create_database = false
  create_role     = false
  superuser       = false
}

# HYDRA_DB_USER
resource "postgresql_role" "hydra_user" {
  depends_on = [
    null_resource.postgres_connection_ready,
    null_resource.grant_createrole
  ]

  name            = local.db_users_config.hydra.user_name
  password        = local.db_passwords.hydra
  login           = true
  create_database = false
  create_role     = false
  superuser       = false
}

# TOLGEE_DB_USER
resource "postgresql_role" "tolgee_user" {
  depends_on = [
    null_resource.postgres_connection_ready,
    null_resource.grant_createrole
  ]

  name            = local.db_users_config.tolgee.user_name
  password        = local.db_passwords.tolgee
  login           = true
  create_database = false
  create_role     = false
  superuser       = false
}

# ============================================================================
# PostgreSQL Databases
# ============================================================================
# Базы данных создаются с owner = gen_user (postgres_admin_user_from_vault)
# Это позволяет gen_user создавать расширения в базах
# Затем пользователям приложений выдаются права на использование баз

# Удаляем существующие базы перед созданием (если они существуют с неправильным owner)
# Это необходимо, так как Terraform не может изменить owner существующих баз
# ВАЖНО: gen_user может не иметь прав на удаление баз, если он не является их владельцем
# В этом случае нужно удалить базы вручную через SQL от имени текущего владельца или superuser
resource "null_resource" "drop_existing_databases" {
  depends_on = [null_resource.postgres_connection_ready]

  provisioner "local-exec" {
    command = <<-EOT
      # Пытаемся удалить существующие базы, если они существуют
      # Используем FORCE для принудительного удаления (PostgreSQL 13+)
      # Если gen_user не имеет прав, команда завершится с ошибкой, но это нормально
      echo "Attempting to drop existing databases..."
      
      for db in "${local.db_users_config.project.db_name}" "${local.db_users_config.tenant.db_name}" "${local.db_users_config.hasura.db_name}" "${local.db_users_config.kratos.db_name}" "${local.db_users_config.hydra.db_name}" "${local.db_users_config.tolgee.db_name}"; do
        echo "Dropping database: $db"
        PGPASSWORD="${local.postgres_admin_password_from_vault}" psql \
          -h "${local.postgres_connection_host}" \
          -p "${local.postgres_connection_port}" \
          -U "${local.postgres_admin_user_from_vault}" \
          -d "postgres" \
          -c "DROP DATABASE IF EXISTS \"$db\" WITH (FORCE);" 2>&1 || \
        PGPASSWORD="${local.postgres_admin_password_from_vault}" psql \
          -h "${local.postgres_connection_host}" \
          -p "${local.postgres_connection_port}" \
          -U "${local.postgres_admin_user_from_vault}" \
          -d "postgres" \
          -c "DROP DATABASE IF EXISTS \"$db\";" 2>&1 || \
        echo "Warning: Could not drop database $db (may require superuser or owner rights)"
      done
      
      echo "Finished attempting to drop databases"
    EOT
  }

  triggers = {
    # Запускаем только один раз при изменении имен баз
    project_db = local.db_users_config.project.db_name
    tenant_db = local.db_users_config.tenant.db_name
    hasura_db = local.db_users_config.hasura.db_name
    kratos_db = local.db_users_config.kratos.db_name
    hydra_db = local.db_users_config.hydra.db_name
    tolgee_db = local.db_users_config.tolgee.db_name
    # Принудительно пересоздаем ресурс при каждом apply (удаляем старые базы)
    force_recreate = timestamp()
  }
}

# PROJECT_DB
resource "postgresql_database" "project_db" {
  depends_on = [null_resource.drop_existing_databases]
  
  name            = local.db_users_config.project.db_name
  owner           = local.postgres_admin_user_from_vault
  encoding        = "UTF8"
  lc_collate      = "C"
  lc_ctype        = "C"
  connection_limit = -1
}

# TENANT_DB
resource "postgresql_database" "tenant_db" {
  depends_on = [null_resource.drop_existing_databases]
  
  name            = local.db_users_config.tenant.db_name
  owner           = local.postgres_admin_user_from_vault
  encoding        = "UTF8"
  lc_collate      = "C"
  lc_ctype        = "C"
  connection_limit = -1
}

# HASURA_DB
resource "postgresql_database" "hasura_db" {
  depends_on = [null_resource.drop_existing_databases]
  
  name            = local.db_users_config.hasura.db_name
  owner           = local.postgres_admin_user_from_vault
  encoding        = "UTF8"
  lc_collate      = "C"
  lc_ctype        = "C"
  connection_limit = -1
}

# KRATOS_DB
resource "postgresql_database" "kratos_db" {
  depends_on = [null_resource.drop_existing_databases]
  
  name            = local.db_users_config.kratos.db_name
  owner           = local.postgres_admin_user_from_vault
  encoding        = "UTF8"
  lc_collate      = "C"
  lc_ctype        = "C"
  connection_limit = -1
}

# HYDRA_DB
resource "postgresql_database" "hydra_db" {
  depends_on = [null_resource.drop_existing_databases]
  
  name            = local.db_users_config.hydra.db_name
  owner           = local.postgres_admin_user_from_vault
  encoding        = "UTF8"
  lc_collate      = "C"
  lc_ctype        = "C"
  connection_limit = -1
}

# TOLGEE_DB
resource "postgresql_database" "tolgee_db" {
  depends_on = [null_resource.drop_existing_databases]
  
  name            = local.db_users_config.tolgee.db_name
  owner           = local.postgres_admin_user_from_vault
  encoding        = "UTF8"
  lc_collate      = "C"
  lc_ctype        = "C"
  connection_limit = -1
}

# ============================================================================
# PostgreSQL Extensions
# ============================================================================
# Расширения создаются от имени gen_user (владельца баз)
# gen_user владеет базами, поэтому может создавать расширения в них

# PROJECT_DB extensions
resource "null_resource" "project_db_extensions" {
  depends_on = [postgresql_database.project_db]

  provisioner "local-exec" {
    command = <<-EOT
      PGPASSWORD="${local.postgres_admin_password_from_vault}" psql \
        -h "${local.postgres_connection_host}" \
        -p "${local.postgres_connection_port}" \
        -U "${local.postgres_admin_user_from_vault}" \
        -d "${postgresql_database.project_db.name}" \
        -c "CREATE EXTENSION IF NOT EXISTS pgcrypto;" \
        -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"
    EOT
  }

  triggers = {
    db_name = postgresql_database.project_db.name
  }
}

# TENANT_DB extensions
resource "null_resource" "tenant_db_extensions" {
  depends_on = [postgresql_database.tenant_db]

  provisioner "local-exec" {
    command = <<-EOT
      PGPASSWORD="${local.postgres_admin_password_from_vault}" psql \
        -h "${local.postgres_connection_host}" \
        -p "${local.postgres_connection_port}" \
        -U "${local.postgres_admin_user_from_vault}" \
        -d "${postgresql_database.tenant_db.name}" \
        -c "CREATE EXTENSION IF NOT EXISTS pgcrypto;" \
        -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"
    EOT
  }

  triggers = {
    db_name = postgresql_database.tenant_db.name
  }
}

# HASURA_DB extensions
resource "null_resource" "hasura_db_extensions" {
  depends_on = [postgresql_database.hasura_db]

  provisioner "local-exec" {
    command = <<-EOT
      PGPASSWORD="${local.postgres_admin_password_from_vault}" psql \
        -h "${local.postgres_connection_host}" \
        -p "${local.postgres_connection_port}" \
        -U "${local.postgres_admin_user_from_vault}" \
        -d "${postgresql_database.hasura_db.name}" \
        -c "CREATE EXTENSION IF NOT EXISTS pgcrypto;" \
        -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"
    EOT
  }

  triggers = {
    db_name = postgresql_database.hasura_db.name
  }
}

# KRATOS_DB extensions
resource "null_resource" "kratos_db_extensions" {
  depends_on = [postgresql_database.kratos_db]

  provisioner "local-exec" {
    command = <<-EOT
      PGPASSWORD="${local.postgres_admin_password_from_vault}" psql \
        -h "${local.postgres_connection_host}" \
        -p "${local.postgres_connection_port}" \
        -U "${local.postgres_admin_user_from_vault}" \
        -d "${postgresql_database.kratos_db.name}" \
        -c "CREATE EXTENSION IF NOT EXISTS pgcrypto;" \
        -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";" \
        -c "CREATE EXTENSION IF NOT EXISTS pg_trgm;" \
        -c "CREATE EXTENSION IF NOT EXISTS btree_gin;"
    EOT
  }

  triggers = {
    db_name = postgresql_database.kratos_db.name
  }
}

# HYDRA_DB extensions
resource "null_resource" "hydra_db_extensions" {
  depends_on = [postgresql_database.hydra_db]

  provisioner "local-exec" {
    command = <<-EOT
      PGPASSWORD="${local.postgres_admin_password_from_vault}" psql \
        -h "${local.postgres_connection_host}" \
        -p "${local.postgres_connection_port}" \
        -U "${local.postgres_admin_user_from_vault}" \
        -d "${postgresql_database.hydra_db.name}" \
        -c "CREATE EXTENSION IF NOT EXISTS pgcrypto;" \
        -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"
    EOT
  }

  triggers = {
    db_name = postgresql_database.hydra_db.name
  }
}

# ============================================================================
# PostgreSQL Database Grants (права пользователям приложений)
# ============================================================================
# Выдаем права пользователям приложений на использование их баз данных
# После создания расширений и баз

# PROJECT_DB grants
resource "null_resource" "project_db_grants" {
  depends_on = [
    postgresql_database.project_db,
    postgresql_role.project_user,
    null_resource.project_db_extensions
  ]

  provisioner "local-exec" {
    command = <<-EOT
      PGPASSWORD="${local.postgres_admin_password_from_vault}" psql \
        -h "${local.postgres_connection_host}" \
        -p "${local.postgres_connection_port}" \
        -U "${local.postgres_admin_user_from_vault}" \
        -d "${postgresql_database.project_db.name}" \
        -c "GRANT CONNECT ON DATABASE ${postgresql_database.project_db.name} TO ${postgresql_role.project_user.name};" \
        -c "GRANT CREATE ON DATABASE ${postgresql_database.project_db.name} TO ${postgresql_role.project_user.name};" \
        -c "GRANT USAGE ON SCHEMA public TO ${postgresql_role.project_user.name};" \
        -c "GRANT CREATE ON SCHEMA public TO ${postgresql_role.project_user.name};" \
        -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE, REFERENCES ON TABLES TO ${postgresql_role.project_user.name};" \
        -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO ${postgresql_role.project_user.name};" \
        -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO ${postgresql_role.project_user.name};"
    EOT
  }

  triggers = {
    db_name = postgresql_database.project_db.name
    user_name = postgresql_role.project_user.name
  }
}

# TENANT_DB grants (использует того же пользователя, что и project_db)
resource "null_resource" "tenant_db_grants" {
  depends_on = [
    postgresql_database.tenant_db,
    postgresql_role.project_user,
    null_resource.tenant_db_extensions
  ]

  provisioner "local-exec" {
    command = <<-EOT
      PGPASSWORD="${local.postgres_admin_password_from_vault}" psql \
        -h "${local.postgres_connection_host}" \
        -p "${local.postgres_connection_port}" \
        -U "${local.postgres_admin_user_from_vault}" \
        -d "${postgresql_database.tenant_db.name}" \
        -c "GRANT CONNECT ON DATABASE ${postgresql_database.tenant_db.name} TO ${postgresql_role.project_user.name};" \
        -c "GRANT CREATE ON DATABASE ${postgresql_database.tenant_db.name} TO ${postgresql_role.project_user.name};" \
        -c "GRANT USAGE ON SCHEMA public TO ${postgresql_role.project_user.name};" \
        -c "GRANT CREATE ON SCHEMA public TO ${postgresql_role.project_user.name};" \
        -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE, REFERENCES ON TABLES TO ${postgresql_role.project_user.name};" \
        -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO ${postgresql_role.project_user.name};" \
        -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO ${postgresql_role.project_user.name};"
    EOT
  }

  triggers = {
    db_name = postgresql_database.tenant_db.name
    user_name = postgresql_role.project_user.name
  }
}

# HASURA_DB grants
resource "null_resource" "hasura_db_grants" {
  depends_on = [
    postgresql_database.hasura_db,
    postgresql_role.hasura_user,
    null_resource.hasura_db_extensions
  ]

  provisioner "local-exec" {
    command = <<-EOT
      PGPASSWORD="${local.postgres_admin_password_from_vault}" psql \
        -h "${local.postgres_connection_host}" \
        -p "${local.postgres_connection_port}" \
        -U "${local.postgres_admin_user_from_vault}" \
        -d "${postgresql_database.hasura_db.name}" \
        -c "GRANT CONNECT ON DATABASE ${postgresql_database.hasura_db.name} TO ${postgresql_role.hasura_user.name};" \
        -c "GRANT CREATE ON DATABASE ${postgresql_database.hasura_db.name} TO ${postgresql_role.hasura_user.name};" \
        -c "GRANT USAGE ON SCHEMA public TO ${postgresql_role.hasura_user.name};" \
        -c "GRANT CREATE ON SCHEMA public TO ${postgresql_role.hasura_user.name};" \
        -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE, REFERENCES ON TABLES TO ${postgresql_role.hasura_user.name};" \
        -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO ${postgresql_role.hasura_user.name};" \
        -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO ${postgresql_role.hasura_user.name};"
    EOT
  }

  triggers = {
    db_name = postgresql_database.hasura_db.name
    user_name = postgresql_role.hasura_user.name
  }
}

# KRATOS_DB grants
resource "null_resource" "kratos_db_grants" {
  depends_on = [
    postgresql_database.kratos_db,
    postgresql_role.kratos_user,
    null_resource.kratos_db_extensions
  ]

  provisioner "local-exec" {
    command = <<-EOT
      PGPASSWORD="${local.postgres_admin_password_from_vault}" psql \
        -h "${local.postgres_connection_host}" \
        -p "${local.postgres_connection_port}" \
        -U "${local.postgres_admin_user_from_vault}" \
        -d "${postgresql_database.kratos_db.name}" \
        -c "GRANT CONNECT ON DATABASE ${postgresql_database.kratos_db.name} TO ${postgresql_role.kratos_user.name};" \
        -c "GRANT CREATE ON DATABASE ${postgresql_database.kratos_db.name} TO ${postgresql_role.kratos_user.name};" \
        -c "GRANT USAGE ON SCHEMA public TO ${postgresql_role.kratos_user.name};" \
        -c "GRANT CREATE ON SCHEMA public TO ${postgresql_role.kratos_user.name};" \
        -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE, REFERENCES ON TABLES TO ${postgresql_role.kratos_user.name};" \
        -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO ${postgresql_role.kratos_user.name};" \
        -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO ${postgresql_role.kratos_user.name};"
    EOT
  }

  triggers = {
    db_name = postgresql_database.kratos_db.name
    user_name = postgresql_role.kratos_user.name
  }
}

# HYDRA_DB grants
resource "null_resource" "hydra_db_grants" {
  depends_on = [
    postgresql_database.hydra_db,
    postgresql_role.hydra_user,
    null_resource.hydra_db_extensions
  ]

  provisioner "local-exec" {
    command = <<-EOT
      PGPASSWORD="${local.postgres_admin_password_from_vault}" psql \
        -h "${local.postgres_connection_host}" \
        -p "${local.postgres_connection_port}" \
        -U "${local.postgres_admin_user_from_vault}" \
        -d "${postgresql_database.hydra_db.name}" \
        -c "GRANT CONNECT ON DATABASE ${postgresql_database.hydra_db.name} TO ${postgresql_role.hydra_user.name};" \
        -c "GRANT CREATE ON DATABASE ${postgresql_database.hydra_db.name} TO ${postgresql_role.hydra_user.name};" \
        -c "GRANT USAGE ON SCHEMA public TO ${postgresql_role.hydra_user.name};" \
        -c "GRANT CREATE ON SCHEMA public TO ${postgresql_role.hydra_user.name};" \
        -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE, REFERENCES ON TABLES TO ${postgresql_role.hydra_user.name};" \
        -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO ${postgresql_role.hydra_user.name};" \
        -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO ${postgresql_role.hydra_user.name};"
    EOT
  }

  triggers = {
    db_name = postgresql_database.hydra_db.name
    user_name = postgresql_role.hydra_user.name
  }
}

# TOLGEE_DB grants (нет расширений, только права)
resource "null_resource" "tolgee_db_grants" {
  depends_on = [
    postgresql_database.tolgee_db,
    postgresql_role.tolgee_user
  ]

  provisioner "local-exec" {
    command = <<-EOT
      PGPASSWORD="${local.postgres_admin_password_from_vault}" psql \
        -h "${local.postgres_connection_host}" \
        -p "${local.postgres_connection_port}" \
        -U "${local.postgres_admin_user_from_vault}" \
        -d "${postgresql_database.tolgee_db.name}" \
        -c "GRANT CONNECT ON DATABASE ${postgresql_database.tolgee_db.name} TO ${postgresql_role.tolgee_user.name};" \
        -c "GRANT CREATE ON DATABASE ${postgresql_database.tolgee_db.name} TO ${postgresql_role.tolgee_user.name};" \
        -c "GRANT USAGE ON SCHEMA public TO ${postgresql_role.tolgee_user.name};" \
        -c "GRANT CREATE ON SCHEMA public TO ${postgresql_role.tolgee_user.name};" \
        -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE, REFERENCES ON TABLES TO ${postgresql_role.tolgee_user.name};" \
        -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT, UPDATE ON SEQUENCES TO ${postgresql_role.tolgee_user.name};" \
        -c "ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT EXECUTE ON FUNCTIONS TO ${postgresql_role.tolgee_user.name};"
    EOT
  }

  triggers = {
    db_name = postgresql_database.tolgee_db.name
    user_name = postgresql_role.tolgee_user.name
  }
}
