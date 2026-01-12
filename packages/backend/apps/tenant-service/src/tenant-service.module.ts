import { Module } from '@nestjs/common';
import { TenantServiceController } from './tenant-service.controller';
import { TenantServiceService } from './tenant-service.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import process from 'node:process';
import { LoggerModule } from '@archpad/logger';
import { VaultConfigModule, VaultConfigService } from '@archpad/vault-config';
import path from "node:path";
import { BootstrapModule } from './bootstrap.module';

@Module({
  imports: [
    LoggerModule.forRoot({ format: 'text' }),
    VaultConfigModule.forRoot({
      nodeEnv: process.env.NODE_ENV,
      // В Kubernetes секреты уже загружены через Vault Agent Injector
      // В local development загружаем из Vault API
      secretsPath: process.env.NODE_ENV === 'local' 
        ? 'kv/data/archpad/demo/backend/tenant-service'
        : undefined, // В production не загружаем из Vault API, используем переменные окружения
      enabled: process.env.NODE_ENV === 'local', // Включаем только для local
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule, VaultConfigModule],
      useFactory: (configService: ConfigService, vaultConfigService: VaultConfigService) => {
        // VaultConfigService.get() reads from cache (secrets loaded in main.ts via loadVaultSecrets)
        // or from process.env as fallback
        const nodeEnv = vaultConfigService.get('NODE_ENV') || configService.get<string>('NODE_ENV') || process.env.NODE_ENV;
        const dbName = vaultConfigService.get('TENANT_DB') || configService.get<string>('TENANT_DB') || process.env.TENANT_DB || 'tenant';
        const dbUser = vaultConfigService.get('PROJECT_DB_USER') || configService.get<string>('PROJECT_DB_USER') || process.env.PROJECT_DB_USER;
        const dbPass = vaultConfigService.get('PROJECT_DB_PASSWORD') || configService.get<string>('PROJECT_DB_PASSWORD') || process.env.PROJECT_DB_PASSWORD;
        const pgHost = nodeEnv === 'local'
          ? (vaultConfigService.get('PG_HOST') || configService.get<string>('PG_HOST') || process.env.PG_HOST || 'postgres')
          : (vaultConfigService.get('POSTGRES_ENDPOINT') || configService.get<string>('POSTGRES_ENDPOINT') || process.env.POSTGRES_ENDPOINT || 'postgres');
        const pgPort = +(vaultConfigService.get('POSTGRES_PORT') || configService.get<string>('POSTGRES_PORT') || process.env.POSTGRES_PORT || '5432');

        console.log(`[TenantService MikroORM Config] dbName: "${dbName}"`);
        console.log(`[TenantService MikroORM Config] user: "${dbUser}"`);
        console.log(`[TenantService MikroORM Config] password: ${dbPass ? '***SET***' : 'NOT SET'}`);
        console.log(`[TenantService MikroORM Config] host: "${pgHost}"`);
        console.log(`[TenantService MikroORM Config] port: ${pgPort}`);

        // Resolve paths relative to the backend package root (process.cwd() should be packages/backend when running)
        const backendRoot = process.cwd();
        const tenantServiceDist = path.join(backendRoot, 'dist/apps/tenant-service');
        
        return {
          driver: PostgreSqlDriver,
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
          host: pgHost,
          port: pgPort,
          dbName,
          user: dbUser,
          password: dbPass,
          debug: nodeEnv !== 'production',
          driverOptions:
            nodeEnv === 'local'
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
      inject: [ConfigService, VaultConfigService],
    }),
    BootstrapModule,
  ],
  controllers: [TenantServiceController],
  providers: [TenantServiceService],
})
export class TenantServiceModule {}
