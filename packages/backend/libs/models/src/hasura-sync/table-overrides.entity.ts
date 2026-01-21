import { Entity, PrimaryKey, Property, Index } from '@mikro-orm/core';

/**
 * Mirrors `hasura_sync.table_overrides`.
 *
 * Used by bootstrap services to materialize Hasura naming overrides.
 */
@Entity({ schema: 'hasura_sync', tableName: 'table_overrides' })
@Index({ name: 'table_overrides_pk', properties: ['tableSchema', 'tableName'] })
export class HasuraSyncTableOverride {
  @PrimaryKey({ type: 'text', fieldName: 'table_schema' })
  tableSchema!: string;

  @PrimaryKey({ type: 'text', fieldName: 'table_name' })
  tableName!: string;

  @Property({ type: 'text', fieldName: 'custom_name' })
  customName!: string;

  @Property({ type: 'boolean', fieldName: 'camel_case', default: true })
  camelCase: boolean = true;

  @Property({
    type: 'timestamptz',
    fieldName: 'updated_at',
    defaultRaw: 'now()',
    onUpdate: () => new Date(),
  })
  updatedAt: Date = new Date();
}
