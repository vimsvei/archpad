import path from 'node:path';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import * as process from 'node:process';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule } from '@nestjs/config';
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
import { RequiredHeadersGuard } from '@/common/guards/required-headers.guard';
import { ArchpadRequestContextMiddleware } from '@/request-context/archpad-request-context.middleware';

@Module({
  imports: [
    LoggerModule.forRoot({ format: 'text' }),
    ArchimateBootstrapModule,
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      entities: [
        // Only arch-repo-service entities - use absolute paths to prevent scanning tenant-service
        // Structure: dist/apps/arch-repo-service/apps/arch-repo-service/src/...
        path.join(process.cwd(), 'dist/apps/arch-repo-service/apps/arch-repo-service/src/**/*.entity{.ts,.js}'),
        path.join(process.cwd(), 'dist/apps/arch-repo-service/apps/arch-repo-service/src/**/*.generic{.ts,.js}'),
        path.join(process.cwd(), 'dist/apps/arch-repo-service/apps/arch-repo-service/src/**/*.map{.ts,.js}'),
        path.join(process.cwd(), 'dist/apps/arch-repo-service/apps/arch-repo-service/src/**/*.directory{.ts,.js}'),
        path.join(process.cwd(), 'dist/apps/arch-repo-service/apps/arch-repo-service/src/**/directories{.ts,.js}'),
        path.join(process.cwd(), 'dist/apps/arch-repo-service/apps/arch-repo-service/src/**/directory-object.abstract{.ts,.js}'),
        path.join(process.cwd(), 'dist/apps/arch-repo-service/apps/arch-repo-service/src/**/mapped-solution-object.abstract{.ts,.js}'),
        // Shared models from libs (only those compiled in arch-repo-service dist)
        path.join(process.cwd(), 'dist/libs/models/src/**/*.abstract{.ts,.js}'),
        path.join(process.cwd(), 'dist/libs/models/src/**/*.embeddable{.ts,.js}'),
      ],
      driver: PostgreSqlDriver,
      host:
        process.env.NODE_ENV === 'local'
          ? process.env.PG_HOST
          : process.env.PG_ENDPOINT,
      port: +(process.env.PG_PORT ?? '5432'),
      dbName: process.env.PROJECT_DB,
      user: process.env.PROJECT_DB_USER,
      password: process.env.PROJECT_DB_PASS,
      debug: process.env.NODE_ENV !== 'production',
      driverOptions:
        process.env.NODE_ENV === 'local'
          ? {
              pgSsl: {
                pgSslCertFile: path.join(
                  path.resolve(process.cwd(), '../../infra/traefik/certs'),
                  'local.crt',
                ),
                pgSslKeyFile: path.join(
                  path.resolve(process.cwd(), '../../infra/traefik/certs'),
                  'local.key',
                ),
              },
            }
          : {},
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
export class ArchRepoServiceModule {
  private readonly loggerContext = ArchRepoServiceModule.name;

  constructor(private readonly logger: LoggerService) {}

  async onModuleInit() {
    const mode = process.env.NODE_ENV;

    this.logger.log(`NODE_ENV=${mode}`, this.loggerContext);
  }
}
