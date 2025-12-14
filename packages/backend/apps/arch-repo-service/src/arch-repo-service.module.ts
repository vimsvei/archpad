import fs from 'node:fs';
import path from 'node:path';
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import * as process from 'node:process';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { NamedObjectAutoRegistry } from './endpoints/archimate/named-object/named-object.autoregistry';
import { ApplicationComponentModule } from './endpoints/archimate/application-component/application-component.module';
import { DirectoriesModule } from './endpoints/directories/directories.module';
import { AuditSubscriber } from './audit/audit.subscriber';
import { ArchimateBootstrapModule } from './archimate-bootstrap/archimate-bootstrap.module';
import { LoggerModule } from '@archpad/logger';
import { HealthCheckerModule } from 'archpad/health-checker';

@Module({
  imports: [
    LoggerModule,
    ArchimateBootstrapModule,
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      // autoLoadEntities: true,
      entities: [
        './dist/**/*.entity{.ts,.js}',
        './dist/**/*.generic{.ts,.js}',
        './dist/**/*.map{.ts,.js}',
        './dist/**/*.directory{.ts,.js}',
        // NOTE: do NOT include all "*.abstract" files here.
        // This app has backward-compat re-export stubs (BaseObject/IdentifiedObject/MappedObject/NamedObject)
        // that re-export from @archpad/models, which causes MikroORM duplicate entity names if we glob all abstracts.
        './dist/**/directory-object.abstract{.ts,.js}',
        './dist/**/mapped-solution-object.abstract{.ts,.js}',
        '../../dist/libs/models/**/*.abstract{.ts,.js}',
        '../../dist/libs/models/**/*.embeddable{.ts,.js}',
      ],
      driver: PostgreSqlDriver,
      host: process.env.PG_HOST,
      port: +(process.env.PG_PORT ?? '5432'),
      dbName: process.env.PROJECT_DB,
      user: process.env.PROJECT_DB_USER,
      password: process.env.PROJECT_DB_PASS,
      debug: process.env.NODE_ENV !== 'production',
      driverOptions: {
        pgSsl: {
          pgSslCertFile: path.join(path.resolve(process.cwd(), '../../infra/traefik/certs'), 'local.crt'),
          pgSslKeyFile: path.join(path.resolve(process.cwd(), '../../infra/traefik/certs'), 'local.key'),
        }
      }
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
      useClass: LoggerModule,
    },
    AuditSubscriber,
  ],
})
export class ArchRepoServiceModule {}
