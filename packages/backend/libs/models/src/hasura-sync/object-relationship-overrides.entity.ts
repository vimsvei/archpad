import { Entity, PrimaryKey, Property, Index, Unique } from '@mikro-orm/core';

/**
 * Mirrors `hasura_sync.object_relationship_overrides`.
 */
@Entity({ schema: 'hasura_sync', tableName: 'object_relationship_overrides' })
@Index({
  name: 'object_relationship_overrides_pk',
  properties: ['fkTableSchema', 'fkTableName', 'fkColumns'],
})
@Unique({
  name: 'object_relationship_overrides_unique_name_per_fk',
  properties: ['fkTableSchema', 'fkTableName', 'name'],
})
export class HasuraSyncObjectRelationshipOverride {
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

