import { Module } from '@nestjs/common';
import { TenantServiceController } from './tenant-service.controller';
import { TenantServiceService } from './tenant-service.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import process from 'node:process';
import { LoggerModule } from '@archpad/logger';
import path from "node:path";
import { BootstrapModule } from './bootstrap.module';

@Module({
  imports: [
    LoggerModule.forRoot({ format: 'text' }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // Resolve paths relative to the backend package root (process.cwd() should be packages/backend when running)
        const backendRoot = process.cwd();
        const tenantServiceDist = path.join(backendRoot, 'dist/apps/tenant-service');
        
        return {
          entities: [
            // Only tenant-service entities - use absolute paths to prevent scanning arch-repo-service
            path.join(tenantServiceDist, 'apps/tenant-service/src/**/*.entity{.ts,.js}'),
            path.join(tenantServiceDist, 'apps/tenant-service/src/**/*.map{.ts,.js}'),
            // Shared models from libs (only those compiled in tenant-service dist)
            path.join(tenantServiceDist, 'libs/models/src/**/*.abstract{.ts,.js}'),
            path.join(tenantServiceDist, 'libs/models/src/**/*.embeddable{.ts,.js}'),
          ],
          // Disable auto-discovery to prevent scanning wrong directories
          discoverEntities: false,
          driver: PostgreSqlDriver,
        host:
          process.env.NODE_ENV === 'local'
            ? configService.get<string>('PG_HOST')
            : configService.get<string>('PG_ENDPOINT'),
        port: +(configService.get<string>('PG_PORT') ?? '5432'),
        dbName: configService.get<string>('TENANT_DB') ?? 'tenant',
        user: configService.get<string>('PROJECT_DB_USER'),
        password: configService.get<string>('PROJECT_DB_PASS'),
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
        };
      },
      inject: [ConfigService],
    }),
    BootstrapModule,
  ],
  controllers: [TenantServiceController],
  providers: [TenantServiceService],
})
export class TenantServiceModule {}
