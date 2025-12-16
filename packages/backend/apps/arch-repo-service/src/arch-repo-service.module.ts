import path from 'node:path';
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import * as process from 'node:process';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { NamedObjectAutoRegistry } from './endpoints/archimate/named-object/named-object.autoregistry';
import { ApplicationComponentModule } from './endpoints/archimate/application-component/application-component.module';
import { DirectoriesModule } from './endpoints/directories/directories.module';
import { AuditSubscriber } from './audit/audit.subscriber';
import { ArchimateBootstrapModule } from './archimate-bootstrap/archimate-bootstrap.module';
import {
  LoggerModule,
  LoggerService,
  RequestLoggerInterceptor,
} from '@archpad/logger';
import { HealthCheckerModule } from 'archpad/health-checker';
import { RequiredHeadersGuard } from '@/common/guards/required-headers.guard';

@Module({
  imports: [
    LoggerModule,
    ArchimateBootstrapModule,
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      entities: [
        './dist/**/*.entity{.ts,.js}',
        './dist/**/*.generic{.ts,.js}',
        './dist/**/*.map{.ts,.js}',
        './dist/**/*.directory{.ts,.js}',

        './dist/**/directory-object.abstract{.ts,.js}',
        './dist/**/mapped-solution-object.abstract{.ts,.js}',
        '../../dist/libs/models/**/*.abstract{.ts,.js}',
        '../../dist/libs/models/**/*.embeddable{.ts,.js}',
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
    DirectoriesModule,
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
    AuditSubscriber,
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
