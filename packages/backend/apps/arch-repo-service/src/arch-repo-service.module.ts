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

function readTextFileOrUndefined(filePath: string): string | undefined {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return undefined;
  }
}

// When running locally (outside docker), we may connect to postgres via Traefik TCP entrypoint with TLS enabled.
// In containers we connect directly to postgres over plain TCP (no TLS) inside the docker network.
const appMode = process.env.APP_MODE ?? 'docker';
const usePgTls = appMode === 'local' && process.env.NODE_ENV !== 'production';

// Defaults assume repo root:
// - cwd: packages/backend
// - certs: infra/traefik/certs
const defaultCertsDir = path.resolve(process.cwd(), '../../infra/traefik/certs');
const pgSslCaFile = process.env.PG_SSL_CA_FILE ?? path.join(defaultCertsDir, 'rootCA.pem');
const pgSslCertFile = process.env.PG_SSL_CERT_FILE ?? path.join(defaultCertsDir, 'local.crt');
const pgSslKeyFile = process.env.PG_SSL_KEY_FILE ?? path.join(defaultCertsDir, 'local.key');

const pgSslCa = readTextFileOrUndefined(pgSslCaFile);
const pgSslCert = readTextFileOrUndefined(pgSslCertFile);
const pgSslKey = readTextFileOrUndefined(pgSslKeyFile);

const pgSsl = usePgTls
  ? {
      // If we have a CA file, verify the server certificate.
      // If not, still allow encrypted connection (local-only convenience).
      rejectUnauthorized: Boolean(pgSslCa),
      ca: pgSslCa,
      // Client certs are usually NOT required, but we provide them if present.
      cert: pgSslCert,
      key: pgSslKey,
    }
  : undefined;

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
