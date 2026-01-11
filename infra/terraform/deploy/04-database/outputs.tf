output "database_users" {
  description = "Created database users (roles)"
  value = {
    project = {
      name = postgresql_role.project_user.name
    }
    hasura = {
      name = postgresql_role.hasura_user.name
    }
    kratos = {
      name = postgresql_role.kratos_user.name
    }
    hydra = {
      name = postgresql_role.hydra_user.name
    }
    tolgee = {
      name = postgresql_role.tolgee_user.name
    }
  }
  sensitive = false
}

output "databases" {
  description = "Created databases (owner is gen_user from Vault for all databases)"
  value = {
    project = {
      name = postgresql_database.project_db.name
      # owner всегда gen_user (postgres_admin_user_from_vault), но не выводим его как sensitive
      owner = "gen_user"  # Все базы принадлежат gen_user
    }
    tenant = {
      name = postgresql_database.tenant_db.name
      owner = "gen_user"
    }
    hasura = {
      name = postgresql_database.hasura_db.name
      owner = "gen_user"
    }
    kratos = {
      name = postgresql_database.kratos_db.name
      owner = "gen_user"
    }
    hydra = {
      name = postgresql_database.hydra_db.name
      owner = "gen_user"
    }
    tolgee = {
      name = postgresql_database.tolgee_db.name
      owner = "gen_user"
    }
  }
  sensitive = false
}

output "extensions" {
  description = "Installed PostgreSQL extensions (created via null_resource with psql)"
  value = {
    project = {
      pgcrypto  = try(null_resource.project_db_extensions.id != null ? "pgcrypto" : null, "pgcrypto")
      uuid_ossp = try(null_resource.project_db_extensions.id != null ? "uuid-ossp" : null, "uuid-ossp")
    }
    tenant = {
      pgcrypto  = try(null_resource.tenant_db_extensions.id != null ? "pgcrypto" : null, "pgcrypto")
      uuid_ossp = try(null_resource.tenant_db_extensions.id != null ? "uuid-ossp" : null, "uuid-ossp")
    }
    hasura = {
      pgcrypto  = try(null_resource.hasura_db_extensions.id != null ? "pgcrypto" : null, "pgcrypto")
      uuid_ossp = try(null_resource.hasura_db_extensions.id != null ? "uuid-ossp" : null, "uuid-ossp")
    }
    kratos = {
      pgcrypto   = try(null_resource.kratos_db_extensions.id != null ? "pgcrypto" : null, "pgcrypto")
      uuid_ossp  = try(null_resource.kratos_db_extensions.id != null ? "uuid-ossp" : null, "uuid-ossp")
      pg_trgm    = try(null_resource.kratos_db_extensions.id != null ? "pg_trgm" : null, "pg_trgm")
      btree_gin  = try(null_resource.kratos_db_extensions.id != null ? "btree_gin" : null, "btree_gin")
    }
    hydra = {
      pgcrypto  = try(null_resource.hydra_db_extensions.id != null ? "pgcrypto" : null, "pgcrypto")
      uuid_ossp = try(null_resource.hydra_db_extensions.id != null ? "uuid-ossp" : null, "uuid-ossp")
    }
  }
  sensitive = false
}
