import { Module } from '@nestjs/common';
import { HasuraRelationshipNameInitializer } from '@archpad/hasura-sync-bootstrap';
import { LoggerModule } from '@archpad/logger';
import { SchemaInitializerModule } from '@archpad/schema-initializer';

// Custom migration for enum type changes
async function migrateSolutionItemStateEnum(conn: any) {
  // Check if the table exists
  const tableExists = await conn.execute(
    `SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = 'map_solution_application_component'
    )`,
  );

  if (!tableExists[0]?.exists) return;

  // Check if column exists with old enum type
  const columnInfo = await conn.execute(
    `SELECT 
      column_name, 
      udt_name,
      data_type,
      column_default
    FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'map_solution_application_component' 
    AND column_name = 'state'`,
  );

  if (columnInfo.length === 0) return;

  const currentType = columnInfo[0]?.udt_name;
  const columnDefault = columnInfo[0]?.column_default;

  // Only migrate if it's the old enum type
  if (currentType === 'solution_item_state') {
    // Step 1: Remove old default value if exists
    try {
      await conn.execute(
        `ALTER TABLE "map_solution_application_component" 
         ALTER COLUMN state DROP DEFAULT`,
      );
    } catch (error: any) {
      // Ignore error if default doesn't exist (code 42704) or other non-critical errors
      if (
        error.code !== '42704' &&
        !error.message?.includes('does not have a default')
      ) {
        throw error;
      }
    }

    // Step 2: Convert enum to text
    await conn.execute(
      `ALTER TABLE "map_solution_application_component" 
       ALTER COLUMN state TYPE text USING state::text`,
    );

    // Step 3: Map old enum values to new enum values
    // ADD -> introduces, USE -> depends-on, CHANGE -> modifies, REMOVE -> deprecates
    await conn.execute(`
      UPDATE "map_solution_application_component" 
      SET state = CASE state
        WHEN 'ADD' THEN 'solution.item.impact-type.introduces'
        WHEN 'USE' THEN 'solution.item.impact-type.depends-on'
        WHEN 'CHANGE' THEN 'solution.item.impact-type.modifies'
        WHEN 'REMOVE' THEN 'solution.item.impact-type.deprecates'
        ELSE 'solution.item.impact-type.depends-on'
      END
      WHERE state IN ('ADD', 'USE', 'CHANGE', 'REMOVE')
    `);
  }

  // Also handle if column is already text (from previous migration run)
  // This happens if migration was run before but updateSchema hasn't changed type to enum yet
  if (currentType === 'text') {
    // Just ensure data is mapped correctly (idempotent)
    await conn.execute(`
      UPDATE "map_solution_application_component" 
      SET state = CASE state
        WHEN 'ADD' THEN 'solution.item.impact-type.introduces'
        WHEN 'USE' THEN 'solution.item.impact-type.depends-on'
        WHEN 'CHANGE' THEN 'solution.item.impact-type.modifies'
        WHEN 'REMOVE' THEN 'solution.item.impact-type.deprecates'
        ELSE state
      END
      WHERE state IN ('ADD', 'USE', 'CHANGE', 'REMOVE')
    `);

    // Remove any old default if exists (critical before changing type to enum)
    // Always try to drop default to avoid PostgreSQL trying to cast old default value
    try {
      await conn.execute(
        `ALTER TABLE "map_solution_application_component" 
         ALTER COLUMN state DROP DEFAULT`,
      );
    } catch (error: any) {
      // Ignore error if default doesn't exist (code 42704) or column doesn't have a default
      if (
        error.code !== '42704' &&
        !error.message?.includes('does not have a default')
      ) {
        throw error;
      }
    }
  }
}

// Custom migration for tenant_id columns
async function migrateTenantIdColumns(conn: any) {
  // Tables that need tenant_id column migration
  const tables = [
    'roles',
    'products',
    'capabilities',
    'data_objects',
    'events',
    'functions',
    'interfaces',
    'motivations',
    'components',
    'solutions',
    'stakeholders',
    'system_software',
    'technology_networks',
    'technology_nodes',
    'flows',
  ];

  // Get or use a default tenant ID
  // Note: tenants table is in tenant_db, not in archpad database
  // So we use a hardcoded UUID for migration
  // This will be replaced when a real tenant is created
  let defaultTenantId: string = '00000000-0000-0000-0000-000000000000';

  // Try to get an existing tenant from tenant_db (if cross-database query is possible)
  // In production, tenants are in a separate database, so we skip this
  try {
    const tenants = await conn.execute(`SELECT id FROM tenants LIMIT 1`);
    if (tenants.length > 0) {
      defaultTenantId = tenants[0].id;
    }
  } catch (error: any) {
    // Table "tenants" does not exist in archpad database (it's in tenant_db)
    // This is expected - use hardcoded UUID
    if (error.code === '42P01' || error.message?.includes('does not exist')) {
      // Expected error - tenants table is in tenant_db, not archpad
      // Use hardcoded UUID as fallback
    } else {
      // Unexpected error - rethrow
      throw error;
    }
  }

  for (const table of tables) {
    // Check if table exists (using string interpolation since table name comes from controlled array)
    const tableExists = await conn.execute(
      `SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = '${table}'
      )`,
    );

    if (!tableExists[0]?.exists) continue;

    const columnExists = await conn.execute(
      `SELECT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = '${table}' 
        AND column_name = 'tenant_id'
      )`,
    );

    if (columnExists[0]?.exists) {
      // Check if column is nullable
      const columnInfo = await conn.execute(
        `SELECT is_nullable 
         FROM information_schema.columns 
         WHERE table_schema = 'public' 
         AND table_name = '${table}' 
         AND column_name = 'tenant_id'`,
      );

      if (columnInfo[0]?.is_nullable === 'YES') {
        // Count rows with NULL tenant_id
        const nullCount = await conn.execute(
          `SELECT COUNT(*)::bigint as count FROM "${table}" WHERE tenant_id IS NULL`,
        );

        const countValue = parseInt(String(nullCount[0]?.count ?? '0'), 10);
        if (countValue > 0) {
          // Fill NULL values with default tenant
          await conn.execute(
            `UPDATE "${table}" SET tenant_id = '${defaultTenantId}' WHERE tenant_id IS NULL`,
          );
        }

        // Make column NOT NULL
        await conn.execute(
          `ALTER TABLE "${table}" ALTER COLUMN tenant_id SET NOT NULL`,
        );
      }
    }
  }
}

@Module({
  imports: [
    LoggerModule,
    SchemaInitializerModule.forRoot({
      additionalSequences: ['tenant_code_seq'],
      preUpdateMigrations: async (conn: any) => {
        // Run enum migration first
        await migrateSolutionItemStateEnum(conn);
        // Then run tenant_id migration
        await migrateTenantIdColumns(conn);
      },
    }),
  ],
  providers: [HasuraRelationshipNameInitializer],
})
export class ArchimateBootstrapModule {}
