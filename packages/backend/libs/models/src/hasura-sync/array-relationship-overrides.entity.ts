import { Entity, PrimaryKey, Property, Index, Unique } from '@mikro-orm/core';

/**
 * Mirrors `hasura_sync.array_relationship_overrides`.
 */
@Entity({ schema: 'hasura_sync', tableName: 'array_relationship_overrides' })
@Index({
  name: 'array_relationship_overrides_pk',
  properties: ['pkTableSchema', 'pkTableName', 'fkTableSchema', 'fkTableName', 'fkColumns'],
})
@Unique({
  name: 'array_relationship_overrides_unique_name_per_pk',
  properties: ['pkTableSchema', 'pkTableName', 'name'],
})
export class HasuraSyncArrayRelationshipOverride {
  @PrimaryKey({ type: 'text', fieldName: 'pk_table_schema' })
  pkTableSchema!: string;

  @PrimaryKey({ type: 'text', fieldName: 'pk_table_name' })
  pkTableName!: string;

  @PrimaryKey({ type: 'text', fieldName: 'fk_table_schema' })
  fkTableSchema!: string;

  @PrimaryKey({ type: 'text', fieldName: 'fk_table_name' })
  fkTableName!: string;

  // Postgres text[].
  @PrimaryKey({ type: 'text[]', fieldName: 'fk_columns' })
  fkColumns!: string[];

  @Property({ type: 'text' })
  name!: string;

  @Property({
    type: 'timestamptz',
    fieldName: 'updated_at',
    defaultRaw: 'now()',
    onUpdate: () => new Date(),
  })
  updatedAt: Date = new Date();
}

