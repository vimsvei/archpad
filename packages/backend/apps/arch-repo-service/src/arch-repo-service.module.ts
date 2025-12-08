import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import * as process from 'node:process';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestLoggerInterceptor } from './logger/request-logger.interceptor';
import { HealthModule } from './health/health.module';
import {NamedObjectAutoRegistry} from "./endpoints/archimate/named-object/named-object.autoregistry";
import {ApplicationComponentModule} from "./endpoints/archimate/application-component/application-component.module";
import {DirectoriesModule} from "./endpoints/directories/directories.module";
import {AuditSubscriber} from "./audit/audit.subscriber";
import {ArchimateBootstrapModule} from "./archimate-bootstrap/archimate-bootstrap.module";

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
        './dist/**/*.abstract{.ts,.js}',
      ],
      entitiesTs: [
        './src/model/**/*.entity{.ts}',
        './src/model/**/*.generic{.ts}',
        './src/model/**/*.map{.ts}',
        './src/model/**/*.directory{.ts}',
        './src/model/**/*.abstract{.ts}',
      ],
      driver: PostgreSqlDriver,
      host: process.env.PG_HOST,
      port: +(process.env.PG_PORT ?? '5432'),
      dbName: process.env.PROJECT_DB,
      user: process.env.PROJECT_DB_USER,
      password: process.env.PROJECT_DB_PASS,
      debug: process.env.NODE_ENV !== 'production',
    }),
    NamedObjectAutoRegistry.registerAll(),
    ApplicationComponentModule,
    DirectoriesModule,
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
    AuditSubscriber,
  ],
})
export class AppModule {}
