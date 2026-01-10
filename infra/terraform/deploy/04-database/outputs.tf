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
  description = "Created databases"
  value = {
    project = {
      name = postgresql_database.project_db.name
      owner = postgresql_database.project_db.owner
    }
    tenant = {
      name = postgresql_database.tenant_db.name
      owner = postgresql_database.tenant_db.owner
    }
    hasura = {
      name = postgresql_database.hasura_db.name
      owner = postgresql_database.hasura_db.owner
    }
    kratos = {
      name = postgresql_database.kratos_db.name
      owner = postgresql_database.kratos_db.owner
    }
    hydra = {
      name = postgresql_database.hydra_db.name
      owner = postgresql_database.hydra_db.owner
    }
    tolgee = {
      name = postgresql_database.tolgee_db.name
      owner = postgresql_database.tolgee_db.owner
    }
  }
  sensitive = false
}

output "extensions" {
  description = "Installed PostgreSQL extensions"
  value = {
    project = {
      pgcrypto  = try(postgresql_extension.project_db_pgcrypto.name, null)
      uuid_ossp = try(postgresql_extension.project_db_uuid_ossp.name, null)
    }
    tenant = {
      pgcrypto  = try(postgresql_extension.tenant_db_pgcrypto.name, null)
      uuid_ossp = try(postgresql_extension.tenant_db_uuid_ossp.name, null)
    }
    hasura = {
      pgcrypto  = try(postgresql_extension.hasura_db_pgcrypto.name, null)
      uuid_ossp = try(postgresql_extension.hasura_db_uuid_ossp.name, null)
    }
    kratos = {
      pgcrypto   = try(postgresql_extension.kratos_db_pgcrypto.name, null)
      uuid_ossp  = try(postgresql_extension.kratos_db_uuid_ossp.name, null)
      pg_trgm    = try(postgresql_extension.kratos_db_pg_trgm.name, null)
      btree_gin  = try(postgresql_extension.kratos_db_btree_gin.name, null)
    }
    hydra = {
      pgcrypto  = try(postgresql_extension.hydra_db_pgcrypto.name, null)
      uuid_ossp = try(postgresql_extension.hydra_db_uuid_ossp.name, null)
    }
  }
  sensitive = false
}
