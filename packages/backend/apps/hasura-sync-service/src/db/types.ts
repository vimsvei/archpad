export interface DbTableRef {
  schema: string;
  name: string;
}

export interface ForeignKeyInfo {
  fk_table_schema: string;
  fk_table_name: string;
  pk_table_schema: string;
  pk_table_name: string;
  fk_columns: string[];
  constraint_name: string;
}
