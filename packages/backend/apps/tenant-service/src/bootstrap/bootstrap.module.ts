import { Module } from '@nestjs/common';
import { LoggerModule } from '@archpad/logger';
import { SchemaInitializerModule } from '@archpad/schema-initializer';
import { HasuraRelationshipNameInitializer } from '@archpad/hasura-sync-bootstrap';
import { DefaultTenantWorkspaceInitializer } from './default-tenant-workspace-initializer.service';

@Module({
  imports: [
    LoggerModule,
    SchemaInitializerModule.forRoot({
      additionalSequences: ['tenant_code_seq', 'user_code_seq', 'space_code_seq'],
      skipSequenceCreation: true, // Let updateSchema handle sequences due to permissions
      customMigrations: async (conn) => {
        // We keep auth-identifying fields (email/firstName/lastName/phone) exclusively in Keycloak.
        // Therefore, tenant-service must not store them in `user_profiles` table.
        //
        // NOTE: updateSchema({ safe: true }) won't drop columns, so we do it explicitly here.
        await conn.execute(
          'ALTER TABLE IF EXISTS "public"."user_profiles" DROP COLUMN IF EXISTS "first_name";',
        );
        await conn.execute(
          'ALTER TABLE IF EXISTS "public"."user_profiles" DROP COLUMN IF EXISTS "last_name";',
        );
        await conn.execute(
          'ALTER TABLE IF EXISTS "public"."user_profiles" DROP COLUMN IF EXISTS "email";',
        );
        await conn.execute(
          'ALTER TABLE IF EXISTS "public"."user_profiles" DROP COLUMN IF EXISTS "phone";',
        );
      },
    }),
  ],
  providers: [
    HasuraRelationshipNameInitializer,
    DefaultTenantWorkspaceInitializer,
  ],
})
export class BootstrapModule {}
