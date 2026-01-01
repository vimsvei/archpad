/**
 * DDL for Hasura sync registry schema/tables.
 *
 * Stored in @archpad/models so multiple services (arch-repo-service, tenant-service, etc.)
 * can create/read the same registry without duplicating SQL files and without relying on
 * copying .sql assets into dist.
 */
export const HASURA_SYNC_REGISTRY_SQL = `
-- Registry schema for Hasura sync overrides (materialized from decorators)
CREATE SCHEMA IF NOT EXISTS hasura_sync;

CREATE TABLE IF NOT EXISTS hasura_sync.table_overrides (
  table_schema text NOT NULL,
  table_name   text NOT NULL,
  custom_name  text NOT NULL,
  updated_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (table_schema, table_name)
);

CREATE TABLE IF NOT EXISTS hasura_sync.column_overrides (
  table_schema text NOT NULL,
  table_name   text NOT NULL,
  column_name  text NOT NULL,
  custom_name  text NOT NULL,
  updated_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (table_schema, table_name, column_name)
);

-- Overrides for Hasura array relationships (reverse side of FK).
-- Uniqueness requirement: within one PK table, relationship names must be unique.
CREATE TABLE IF NOT EXISTS hasura_sync.array_relationship_overrides (
  pk_table_schema text NOT NULL,
  pk_table_name   text NOT NULL,
  fk_table_schema text NOT NULL,
  fk_table_name   text NOT NULL,
  fk_columns      text[] NOT NULL,
  name            text NOT NULL,
  updated_at      timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (pk_table_schema, pk_table_name, fk_table_schema, fk_table_name, fk_columns)
);

CREATE UNIQUE INDEX IF NOT EXISTS array_relationship_overrides_unique_name_per_pk
  ON hasura_sync.array_relationship_overrides (pk_table_schema, pk_table_name, name);
`;


