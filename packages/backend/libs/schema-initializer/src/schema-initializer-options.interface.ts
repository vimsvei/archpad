export const SCHEMA_INITIALIZER_OPTIONS = Symbol('SCHEMA_INITIALIZER_OPTIONS');

export interface SchemaInitializerOptions {
  /**
   * Additional sequence names to create (besides ones from @ArchimateCode decorators)
   */
  additionalSequences?: string[];

  /**
   * Custom migration function to run before schema update.
   * Use this for data migrations that must happen before schema changes
   * (e.g., filling NULL values before setting a column to NOT NULL).
   */
  preUpdateMigrations?: (connection: any) => Promise<void>;

  /**
   * Custom migration function to run after schema update
   */
  customMigrations?: (connection: any) => Promise<void>;

  /**
   * Whether to skip sequence creation (sequences will be created by updateSchema)
   * Useful if you don't have CREATE privileges but updateSchema does
   */
  skipSequenceCreation?: boolean;

  /**
   * Schema name (defaults to 'public')
   */
  schema?: string;
}
