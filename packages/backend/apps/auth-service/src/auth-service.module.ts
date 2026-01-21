import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import process from 'node:process';
import { LoggerModule, LoggerService } from '@archpad/logger';
import { HealthCheckerModule } from 'archpad/health-checker';
import { VaultConfigModule } from '@archpad/vault-config';
import path from 'node:path';
import { AuthController } from './auth.controller';
import { KeycloakService } from './keycloak.service';

@Module({
  imports: [
    LoggerModule.forRoot({ format: 'text' }),
    HealthCheckerModule,
    VaultConfigModule.forRoot({
      nodeEnv: process.env.NODE_ENV,
      // In Kubernetes secrets are injected as env vars.
      // In local/development we load required values from Vault API.
      secretsPaths: [
        'kv/data/archpad/demo/keycloak/connect',
        'kv/data/archpad/demo/keycloak/service',
        'kv/data/archpad/demo/oidc/portal',
      ],
      enabled: process.env.NODE_ENV === 'development',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [path.resolve(process.cwd(), '.env')],
    }),
  ],
  controllers: [AuthController],
  providers: [KeycloakService],
})
export class AuthServiceModule implements OnModuleInit {
  private readonly loggerContext = AuthServiceModule.name;

  constructor(private readonly logger: LoggerService) {}

  async onModuleInit() {
    const mode = process.env.NODE_ENV;
    const buildCommitSha = process.env.BUILD_COMMIT_SHA || 'unknown';
    const buildVersion = process.env.BUILD_VERSION || 'unknown';
    const buildBranch = process.env.BUILD_BRANCH || 'unknown';

    this.logger.log('='.repeat(40), this.loggerContext);
    this.logger.log('🚀 Auth Service Starting', this.loggerContext);
    this.logger.log(`📦 Build Commit: ${buildCommitSha}`, this.loggerContext);
    this.logger.log(`🏷️  Build Version: ${buildVersion}`, this.loggerContext);
    this.logger.log(`🌿 Build Branch: ${buildBranch}`, this.loggerContext);
    this.logger.log(`🔧 NODE_ENV: ${mode}`, this.loggerContext);
    this.logger.log('='.repeat(40), this.loggerContext);
  }
}

