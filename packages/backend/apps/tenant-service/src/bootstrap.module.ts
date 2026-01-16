import { Module } from '@nestjs/common';
import { LoggerModule } from '@archpad/logger';
import { SchemaInitializerModule } from '@archpad/schema-initializer';
import { HasuraRelationshipNameInitializer } from './hasura-relationship-name-initializer.service';

@Module({
  imports: [
    LoggerModule,
    SchemaInitializerModule.forRoot({
      additionalSequences: ['tenant_code_seq', 'user_code_seq'],
      skipSequenceCreation: true, // Let updateSchema handle sequences due to permissions
    }),
  ],
  providers: [HasuraRelationshipNameInitializer],
})
export class BootstrapModule {}
