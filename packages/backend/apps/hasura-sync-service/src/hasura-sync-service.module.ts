import { Module, OnModuleInit } from '@nestjs/common';
import { HasuraSyncService } from './hasura-sync-service.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { HasuraClientService } from './hasura-client/hasura-client.service';
import { LoggerModule, LoggerService } from '@archpad/logger';

@Module({
  imports: [
    LoggerModule.forRoot({ format: 'text' }),
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
  ],
  controllers: [],
  providers: [HasuraClientService, HasuraSyncService],
})
export class HasuraSyncServiceModule implements OnModuleInit {
  private readonly loggerContext = HasuraSyncServiceModule.name;

  constructor(private readonly logger: LoggerService) {}

  async onModuleInit() {
    const mode = process.env.NODE_ENV;
    const buildCommitSha = process.env.BUILD_COMMIT_SHA || 'unknown';
    const buildVersion = process.env.BUILD_VERSION || 'unknown';
    const buildBranch = process.env.BUILD_BRANCH || 'unknown';

    this.logger.log(
      '========================================',
      this.loggerContext,
    );
    this.logger.log('🚀 Hasura Sync Service Starting', this.loggerContext);
    this.logger.log(`📦 Build Commit: ${buildCommitSha}`, this.loggerContext);
    this.logger.log(`🏷️  Build Version: ${buildVersion}`, this.loggerContext);
    this.logger.log(`🌿 Build Branch: ${buildBranch}`, this.loggerContext);
    this.logger.log(`🔧 NODE_ENV: ${mode}`, this.loggerContext);
    this.logger.log(
      '========================================',
      this.loggerContext,
    );
  }
}
