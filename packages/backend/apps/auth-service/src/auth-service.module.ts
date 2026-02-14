import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import process from 'node:process';
import {
  LoggerModule,
  LoggerService,
  RequestLoggerInterceptor,
} from '@archpad/logger';
import { HealthCheckerModule } from 'archpad/health-checker';
import { VaultConfigModule, VaultConfigService } from '@archpad/vault-config';
import path from 'node:path';
import { AuthController } from './auth.controller';
import { HealthController } from './health.controller';
import { KeycloakService } from './keycloak.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { AuthSession } from './model/entities/auth-session.entity';
import { SessionService } from './session.service';
import { SchemaInitializerModule } from '@archpad/schema-initializer';
import { TenantServiceClient } from './tenant-service.client';
import { InternalTokenGuard } from './internal-token.guard';
import { KeycloakDesiredStateService } from './keycloak-desired-state.service';
import { VerificationEmailService } from './verification-email.service';
import { LeadService } from './lead.service';
import { TenantProvisioningService } from './tenant-provisioning.service';
import { PasswordSetupService } from './setup-password.service';

@Module({
  imports: [
    LoggerModule.forRoot({ format: 'text' }),
    HealthCheckerModule,
    VaultConfigModule.forRoot({
      nodeEnv: process.env.NODE_ENV,
      // In Kubernetes secrets are injected as env vars.
      // In local/development we load required values from Vault API.
      secretsPaths: [
        'kv/data/archpad/demo/backend/auth-service',
        'kv/data/archpad/demo/backend/common',
        'kv/data/archpad/demo/backend/service-token',
        'kv/data/archpad/demo/postgres/connect',
        'kv/data/archpad/demo/keycloak/connect',
        'kv/data/archpad/demo/keycloak/service',
        'kv/data/archpad/demo/keycloak/smtp',
        'kv/data/archpad/demo/oidc/portal',
      ],
      enabled: process.env.NODE_ENV === 'development',
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [path.resolve(process.cwd(), '.env')],
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule, VaultConfigModule],
      useFactory: async (
        configService: ConfigService,
        vaultConfigService: VaultConfigService,
      ) => {
        await vaultConfigService.ensureLoaded();

        const nodeEnv =
          vaultConfigService.get('NODE_ENV') ||
          configService.get<string>('NODE_ENV') ||
          'development';

        const dbName =
          vaultConfigService.get('AUTH_DB') ||
          configService.get<string>('AUTH_DB') ||
          'auth_service';

        const dbUser =
          vaultConfigService.get('PROJECT_DB_USER') ||
          configService.get<string>('PROJECT_DB_USER');
        const dbPass =
          vaultConfigService.get('PROJECT_DB_PASSWORD') ||
          configService.get<string>('PROJECT_DB_PASSWORD');

        const pgHost =
          nodeEnv === 'development'
            ? vaultConfigService.get('POSTGRES_HOST') ||
              configService.get<string>('PG_HOST')
            : vaultConfigService.get('POSTGRES_ENDPOINT') ||
              configService.get<string>('PG_ENDPOINT');

        const pgPort = +(nodeEnv === 'development'
          ? vaultConfigService.get('POSTGRES_HOST_PORT') ||
            configService.get<string>('PG_HOST_PORT') ||
            '5432'
          : vaultConfigService.get('POSTGRES_PORT') ||
            configService.get<string>('PG_ENDPOINT_PORT') ||
            '5432');

        console.log(`[MikroORM Config] dbName: "${dbName}"`);
        console.log(`[MikroORM Config] user: "${dbUser}"`);
        console.log(
          `[MikroORM Config] password: ${dbPass ? '***SET***' : 'NOT SET'}`,
        );
        console.log(`[MikroORM Config] host: "${pgHost}"`);
        console.log(`[MikroORM Config] port: ${pgPort}`);

        return {
          driver: PostgreSqlDriver,
          entities: [
            path.join(
              process.cwd(),
              'dist/apps/auth-service/apps/auth-service/src/model/**/*.entity{.ts,.js}',
            ),
          ],
          host: pgHost,
          port: pgPort,
          dbName,
          user: dbUser,
          password: dbPass,
          debug: nodeEnv !== 'production',
        };
      },
      inject: [ConfigService, VaultConfigService],
    }),
    MikroOrmModule.forFeature([AuthSession]),
    SchemaInitializerModule.forRoot({
      // No extra sequences required for auth-service
      skipSequenceCreation: true,
    }),
  ],
  controllers: [AuthController, HealthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
    KeycloakService,
    VerificationEmailService,
    SessionService,
    TenantServiceClient,
    InternalTokenGuard,
    KeycloakDesiredStateService,
    LeadService,
    TenantProvisioningService,
    PasswordSetupService,
  ],
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
