import { Module } from '@nestjs/common';
import { LoggerModule } from '@archpad/logger';
import { SchemaInitializerModule } from '@archpad/schema-initializer';

@Module({
  imports: [
    LoggerModule,
    SchemaInitializerModule.forRoot({
      additionalSequences: ['tenant_code_seq', 'user_code_seq'],
      skipSequenceCreation: true, // Let updateSchema handle sequences due to permissions
    }),
  ],
})
export class BootstrapModule {}
