import { Module, OnModuleInit } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import process from 'node:process';
import {
  LoggerModule,
  LoggerService,
  RequestLoggerInterceptor,
} from '@archpad/logger';
import { HealthCheckerModule } from 'archpad/health-checker';
import { VaultConfigModule, VaultConfigService } from '@archpad/vault-config';
import path from 'node:path';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { InternalUserProfilesController } from './internal/internal-user-profiles.controller';
import { InternalUserProfilesService } from './internal/internal-user-profiles.service';
import { InternalTokenGuard } from './internal/internal-token.guard';

@Module({
  imports: [
    LoggerModule.forRoot({ format: 'text' }),
    HealthCheckerModule,
    VaultConfigModule.forRoot({
      nodeEnv: process.env.NODE_ENV,
      // В Kubernetes секреты приходят через Vault Agent Injector (env).
      // В local/development нужно прочитать несколько путей из Vault API.
      secretsPaths: [
        'kv/data/archpad/demo/backend/tenant-service',
        'kv/data/archpad/demo/backend/common',
        'kv/data/archpad/demo/backend/service-token',
        'kv/data/archpad/demo/postgres/connect',
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
        // IMPORTANT: load Vault secrets BEFORE building MikroORM config.
        await vaultConfigService.ensureLoaded();

        // VaultConfigService.get() reads from cache or from process.env as fallback
        const nodeEnv =
          vaultConfigService.get('NODE_ENV') ||
          configService.get<string>('NODE_ENV') ||
          'development';
        const dbName =
          vaultConfigService.get('TENANT_DB') ||
          configService.get<string>('TENANT_DB') ||
          'tenant_db';
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

        console.log(`[TenantService MikroORM Config] dbName: "${dbName}"`);
        console.log(`[TenantService MikroORM Config] user: "${dbUser}"`);
        console.log(
          `[TenantService MikroORM Config] password: ${dbPass ? '***SET***' : 'NOT SET'}`,
        );
        console.log(`[TenantService MikroORM Config] host: "${pgHost}"`);
        console.log(`[TenantService MikroORM Config] port: ${pgPort}`);

        // Resolve paths relative to the backend package root (process.cwd() should be packages/backend when running)
        const backendRoot = process.cwd();
        const tenantServiceDist = path.join(
          backendRoot,
          'dist/apps/tenant-service',
        );

        return {
          driver: PostgreSqlDriver,
          entities: [
            // Only tenant-service entities - use absolute paths to prevent scanning arch-repo-service
            path.join(
              tenantServiceDist,
              'apps/tenant-service/src/**/*.entity{.ts,.js}',
            ),
            path.join(
              tenantServiceDist,
              'apps/tenant-service/src/**/*.map{.ts,.js}',
            ),
            // Shared models from libs (only those compiled in tenant-service dist)
            path.join(
              tenantServiceDist,
              'libs/models/src/**/*.abstract{.ts,.js}',
            ),
            path.join(
              tenantServiceDist,
              'libs/models/src/**/*.embeddable{.ts,.js}',
            ),
            path.join(
              tenantServiceDist,
              'libs/models/src/**/*.entity{.ts,.js}',
            ),
          ],
          // Disable auto-discovery to prevent scanning wrong directories
          discoverEntities: false,
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
    BootstrapModule,
  ],
  controllers: [InternalUserProfilesController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
    InternalUserProfilesService,
    InternalTokenGuard,
  ],
})
export class TenantServiceModule implements OnModuleInit {
  private readonly loggerContext = TenantServiceModule.name;

  constructor(private readonly logger: LoggerService) {}

  async onModuleInit() {
    const mode = process.env.NODE_ENV;
    const buildCommitSha = process.env.BUILD_COMMIT_SHA || 'unknown';
    const buildVersion = process.env.BUILD_VERSION || 'unknown';
    const buildBranch = process.env.BUILD_BRANCH || 'unknown';

    this.logger.log('='.repeat(40), this.loggerContext);
    this.logger.log('🚀 Tenant Service Starting', this.loggerContext);
    this.logger.log(`📦 Build Commit: ${buildCommitSha}`, this.loggerContext);
    this.logger.log(`🏷️  Build Version: ${buildVersion}`, this.loggerContext);
    this.logger.log(`🌿 Build Branch: ${buildBranch}`, this.loggerContext);
    this.logger.log(`🔧 NODE_ENV: ${mode}`, this.loggerContext);
    this.logger.log('='.repeat(40), this.loggerContext);
  }
}
