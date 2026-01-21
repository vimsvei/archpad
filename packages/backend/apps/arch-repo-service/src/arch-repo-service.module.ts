import path from 'node:path';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import * as process from 'node:process';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { NamedObjectAutoRegistry } from './endpoints/archimate/named-object/named-object.autoregistry';
import { ApplicationComponentModule } from './endpoints/archimate/application-component/application-component.module';
import { SystemSoftwareModule } from './endpoints/archimate/system-software/system-software.module';
import { DirectoriesModule } from './endpoints/directories/directories.module';
import { ArchimateBootstrapModule } from './archimate-bootstrap/archimate-bootstrap.module';
import { ApplicationInterfaceModule } from './endpoints/archimate/application-interface/application-interface.module';
import { SolutionModule } from './endpoints/solution/solution.module';
import { OpenExchangeImportModule } from '@/endpoints/import/open-exchange/open-exchange-import.module';
import {
  LoggerModule,
  LoggerService,
  RequestLoggerInterceptor,
} from '@archpad/logger';
import { HealthCheckerModule } from 'archpad/health-checker';
import { VaultConfigModule, VaultConfigService } from '@archpad/vault-config';
import { RequiredHeadersGuard } from '@/common/guards/required-headers.guard';
import { ArchpadRequestContextMiddleware } from '@/request-context/archpad-request-context.middleware';

@Module({
  imports: [
    LoggerModule.forRoot({ format: 'text' }),
    ArchimateBootstrapModule,
    VaultConfigModule.forRoot({
      nodeEnv: process.env.NODE_ENV,
      // В Kubernetes секреты приходят через Vault Agent Injector (env).
      // В local/development нужно прочитать несколько путей из Vault API.
      secretsPaths: [
        'kv/data/archpad/demo/backend/arch-repo-service',
        'kv/data/archpad/demo/backend/common',
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
          vaultConfigService.get('PROJECT_DB') ||
          configService.get<string>('PROJECT_DB') ||
          'archpad';
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
              'dist/apps/arch-repo-service/apps/arch-repo-service/src/**/*.entity{.ts,.js}',
            ),
            path.join(
              process.cwd(),
              'dist/apps/arch-repo-service/apps/arch-repo-service/src/**/*.generic{.ts,.js}',
            ),
            path.join(
              process.cwd(),
              'dist/apps/arch-repo-service/apps/arch-repo-service/src/**/*.map{.ts,.js}',
            ),
            path.join(
              process.cwd(),
              'dist/apps/arch-repo-service/apps/arch-repo-service/src/**/*.directory{.ts,.js}',
            ),
            path.join(
              process.cwd(),
              'dist/apps/arch-repo-service/apps/arch-repo-service/src/**/directories{.ts,.js}',
            ),
            path.join(
              process.cwd(),
              'dist/apps/arch-repo-service/apps/arch-repo-service/src/**/directory-object.abstract{.ts,.js}',
            ),
            path.join(
              process.cwd(),
              'dist/apps/arch-repo-service/apps/arch-repo-service/src/**/mapped-solution-object.abstract{.ts,.js}',
            ),
            // Shared models from libs (only those compiled in arch-repo-service dist)
            path.join(
              process.cwd(),
              'dist/libs/models/src/**/*.abstract{.ts,.js}',
            ),
            path.join(
              process.cwd(),
              'dist/libs/models/src/**/*.embeddable{.ts,.js}',
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
    NamedObjectAutoRegistry.registerAll(),
    ApplicationComponentModule,
    ApplicationInterfaceModule,
    SolutionModule,
    SystemSoftwareModule,
    DirectoriesModule,
    OpenExchangeImportModule,
    HealthCheckerModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: RequiredHeadersGuard,
    },
  ],
})
export class ArchRepoServiceModule implements OnModuleInit {
  private readonly loggerContext = ArchRepoServiceModule.name;

  constructor(private readonly logger: LoggerService) {}

  async onModuleInit() {
    const mode = process.env.NODE_ENV;
    const buildCommitSha = process.env.BUILD_COMMIT_SHA || 'unknown';
    const buildVersion = process.env.BUILD_VERSION || 'unknown';
    const buildBranch = process.env.BUILD_BRANCH || 'unknown';

    this.logger.log('='.repeat(40), this.loggerContext);
    this.logger.log('🚀 Arch Repo Service Starting', this.loggerContext);
    this.logger.log(`📦 Build Commit: ${buildCommitSha}`, this.loggerContext);
    this.logger.log(`🏷️  Build Version: ${buildVersion}`, this.loggerContext);
    this.logger.log(`🌿 Build Branch: ${buildBranch}`, this.loggerContext);
    this.logger.log(`🔧 NODE_ENV: ${mode}`, this.loggerContext);
    this.logger.log('='.repeat(40), this.loggerContext);
  }
}
