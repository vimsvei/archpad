# ============================================================================
# PostgreSQL Database Roles (Users)
# ============================================================================
# Примечание: Если используется port-forward, убедитесь, что null_resource.postgres_port_forward
# выполнен перед созданием ресурсов PostgreSQL

# PROJECT_DB_USER - используется для PROJECT_DB и TENANT_DB
# Примечание: Если используется port-forward, зависит от null_resource.postgres_port_forward
# Если используется Traefik routing, маршрутизация создается в модуле 01-traefik и будет готова до запуска этого модуля
resource "postgresql_role" "project_user" {
  depends_on = var.use_kubectl_port_forward ? [null_resource.postgres_port_forward[0]] : []

  name            = local.db_users_config.project.user_name
  password        = local.db_passwords.project
  login           = true
  create_database = false
  create_role     = false
  superuser       = false
}

# HASURA_DB_USER
resource "postgresql_role" "hasura_user" {
  depends_on = var.use_kubectl_port_forward ? [null_resource.postgres_port_forward[0]] : []

  name            = local.db_users_config.hasura.user_name
  password        = local.db_passwords.hasura
  login           = true
  create_database = false
  create_role     = false
  superuser       = false
}

# KRATOS_DB_USER
resource "postgresql_role" "kratos_user" {
  depends_on = var.use_kubectl_port_forward ? [null_resource.postgres_port_forward[0]] : []

  name            = local.db_users_config.kratos.user_name
  password        = local.db_passwords.kratos
  login           = true
  create_database = false
  create_role     = false
  superuser       = false
}

# HYDRA_DB_USER
resource "postgresql_role" "hydra_user" {
  depends_on = var.use_kubectl_port_forward ? [null_resource.postgres_port_forward[0]] : []

  name            = local.db_users_config.hydra.user_name
  password        = local.db_passwords.hydra
  login           = true
  create_database = false
  create_role     = false
  superuser       = false
}

# TOLGEE_DB_USER
resource "postgresql_role" "tolgee_user" {
  depends_on = var.use_kubectl_port_forward ? [null_resource.postgres_port_forward[0]] : []

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
# Базы данных создаются с owner = пользователь, что автоматически дает
# все необходимые права на создание и управление объектами внутри БД

# PROJECT_DB
resource "postgresql_database" "project_db" {
  name            = local.db_users_config.project.db_name
  owner           = postgresql_role.project_user.name
  encoding        = "UTF8"
  lc_collate      = "C"
  lc_ctype        = "C"
  connection_limit = -1
}

# TENANT_DB
resource "postgresql_database" "tenant_db" {
  name            = local.db_users_config.tenant.db_name
  owner           = postgresql_role.project_user.name
  encoding        = "UTF8"
  lc_collate      = "C"
  lc_ctype        = "C"
  connection_limit = -1
}

# HASURA_DB
resource "postgresql_database" "hasura_db" {
  name            = local.db_users_config.hasura.db_name
  owner           = postgresql_role.hasura_user.name
  encoding        = "UTF8"
  lc_collate      = "C"
  lc_ctype        = "C"
  connection_limit = -1
}

# KRATOS_DB
resource "postgresql_database" "kratos_db" {
  name            = local.db_users_config.kratos.db_name
  owner           = postgresql_role.kratos_user.name
  encoding        = "UTF8"
  lc_collate      = "C"
  lc_ctype        = "C"
  connection_limit = -1
}

# HYDRA_DB
resource "postgresql_database" "hydra_db" {
  name            = local.db_users_config.hydra.db_name
  owner           = postgresql_role.hydra_user.name
  encoding        = "UTF8"
  lc_collate      = "C"
  lc_ctype        = "C"
  connection_limit = -1
}

# TOLGEE_DB
resource "postgresql_database" "tolgee_db" {
  name            = local.db_users_config.tolgee.db_name
  owner           = postgresql_role.tolgee_user.name
  encoding        = "UTF8"
  lc_collate      = "C"
  lc_ctype        = "C"
  connection_limit = -1
}

# ============================================================================
# PostgreSQL Extensions
# ============================================================================
# Примечание: Создание расширений требует superuser прав
# Если текущий пользователь не superuser, используйте null_resource с Python скриптом

# PROJECT_DB extensions
resource "postgresql_extension" "project_db_pgcrypto" {
  depends_on = [postgresql_database.project_db]
  database   = postgresql_database.project_db.name
  name       = "pgcrypto"
}

resource "postgresql_extension" "project_db_uuid_ossp" {
  depends_on = [postgresql_database.project_db]
  database   = postgresql_database.project_db.name
  name       = "uuid-ossp"
}

# TENANT_DB extensions
resource "postgresql_extension" "tenant_db_pgcrypto" {
  depends_on = [postgresql_database.tenant_db]
  database   = postgresql_database.tenant_db.name
  name       = "pgcrypto"
}

resource "postgresql_extension" "tenant_db_uuid_ossp" {
  depends_on = [postgresql_database.tenant_db]
  database   = postgresql_database.tenant_db.name
  name       = "uuid-ossp"
}

# HASURA_DB extensions
resource "postgresql_extension" "hasura_db_pgcrypto" {
  depends_on = [postgresql_database.hasura_db]
  database   = postgresql_database.hasura_db.name
  name       = "pgcrypto"
}

resource "postgresql_extension" "hasura_db_uuid_ossp" {
  depends_on = [postgresql_database.hasura_db]
  database   = postgresql_database.hasura_db.name
  name       = "uuid-ossp"
}

# KRATOS_DB extensions
resource "postgresql_extension" "kratos_db_pgcrypto" {
  depends_on = [postgresql_database.kratos_db]
  database   = postgresql_database.kratos_db.name
  name       = "pgcrypto"
}

resource "postgresql_extension" "kratos_db_uuid_ossp" {
  depends_on = [postgresql_database.kratos_db]
  database   = postgresql_database.kratos_db.name
  name       = "uuid-ossp"
}

resource "postgresql_extension" "kratos_db_pg_trgm" {
  depends_on = [postgresql_database.kratos_db]
  database   = postgresql_database.kratos_db.name
  name       = "pg_trgm"
}

resource "postgresql_extension" "kratos_db_btree_gin" {
  depends_on = [postgresql_database.kratos_db]
  database   = postgresql_database.kratos_db.name
  name       = "btree_gin"
}

# HYDRA_DB extensions
resource "postgresql_extension" "hydra_db_pgcrypto" {
  depends_on = [postgresql_database.hydra_db]
  database   = postgresql_database.hydra_db.name
  name       = "pgcrypto"
}

resource "postgresql_extension" "hydra_db_uuid_ossp" {
  depends_on = [postgresql_database.hydra_db]
  database   = postgresql_database.hydra_db.name
  name       = "uuid-ossp"
}
