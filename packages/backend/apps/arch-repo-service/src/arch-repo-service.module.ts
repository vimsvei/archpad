import path from 'node:path';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { LoggerModule, RequestLoggerInterceptor } from '@archpad/logger';
import { HealthCheckerModule } from 'archpad/health-checker';
import { ArchpadRequestContextMiddleware } from './request-context/archpad-request-context.middleware';

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
      host: envNonEmpty('PG_HOST') ?? 'postgres',
      port: +(process.env.PG_PORT ?? '5432'),
      dbName: process.env.PROJECT_DB,
      user: process.env.PROJECT_DB_USER,
      password: process.env.PROJECT_DB_PASS,
      debug: process.env.NODE_ENV !== 'production',
      ...getPgDriverOptions(),
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
    AuditSubscriber,
  ],
})
export class ArchRepoServiceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ArchpadRequestContextMiddleware).forRoutes('*');
  }
}

function getPgDriverOptions():
  | { driverOptions: Record<string, unknown> }
  | Record<string, never> {
  // Default to disable SSL for in-docker Postgres (plain tcp).
  // Enable explicitly when connecting to a managed Postgres that requires TLS.
  const sslMode = (process.env.PG_SSLMODE ?? 'disable').toLowerCase();
  if (sslMode === 'disable' || sslMode === 'false' || sslMode === '0') {
    return {};
  }

  // Knex/pg expects `ssl` (either boolean or object). We provide both shapes to be robust
  // across MikroORM/knex/pg versions.
  const ssl = sslMode === 'require' ? { rejectUnauthorized: false } : true;

  // Keep old path-based approach behind explicit opt-in to avoid container breakage.
  // If you really need client cert auth, pass PG_SSL_CERT_FILE/PG_SSL_KEY_FILE and mount them.
  const certFile = process.env.PG_SSL_CERT_FILE;
  const keyFile = process.env.PG_SSL_KEY_FILE;
  const caFile = process.env.PG_SSL_CA_FILE;

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.info(
      `[arch-repo.db] sslMode=${sslMode} certFile=${certFile ?? 'none'} keyFile=${
        keyFile ?? 'none'
      } caFile=${caFile ?? 'none'}`,
    );
  }

  // If files are provided, we just pass their paths via env (reading is handled by pg if needed),
  // or by mounting them and switching to a custom loader later.
  // For now, keep it simple to unblock local dev.
  return {
    driverOptions: {
      ssl,
      connection: { ssl },
      ...(certFile || keyFile || caFile
        ? {
            sslCertFile: certFile,
            sslKeyFile: keyFile,
            sslCaFile: caFile,
          }
        : {}),
    },
  };
}

function envNonEmpty(name: string): string | null {
  const v = process.env[name];
  const s = typeof v === 'string' ? v.trim() : '';
  return s.length ? s : null;
}
