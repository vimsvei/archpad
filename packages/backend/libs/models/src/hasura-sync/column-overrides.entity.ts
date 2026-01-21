import { Entity, PrimaryKey, Property, Index } from '@mikro-orm/core';

/**
 * Mirrors `hasura_sync.column_overrides`.
 */
@Entity({ schema: 'hasura_sync', tableName: 'column_overrides' })
@Index({
  name: 'column_overrides_pk',
  properties: ['tableSchema', 'tableName', 'columnName'],
})
export class HasuraSyncColumnOverride {
  @PrimaryKey({ type: 'text', fieldName: 'table_schema' })
  tableSchema!: string;

  @PrimaryKey({ type: 'text', fieldName: 'table_name' })
  tableName!: string;

  @PrimaryKey({ type: 'text', fieldName: 'column_name' })
  columnName!: string;

  @Property({ type: 'text', fieldName: 'custom_name' })
  customName!: string;

  @Property({
    type: 'timestamptz',
    fieldName: 'updated_at',
    defaultRaw: 'now()',
    onUpdate: () => new Date(),
  })
  updatedAt: Date = new Date();
}
