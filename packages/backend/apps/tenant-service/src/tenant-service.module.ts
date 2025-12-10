import { Module } from '@nestjs/common';
import { TenantServiceController } from './tenant-service.controller';
import { TenantServiceService } from './tenant-service.service';
import {MikroOrmModule} from "@mikro-orm/nestjs";
import {PostgreSqlDriver} from "@mikro-orm/postgresql";
import process from "node:process";
import {LoggerModule} from "@archpad/logger";

@Module({
  imports: [
    LoggerModule,
    MikroOrmModule.forRoot({
      entities: [
        './dist/**/*.entity{.ts,.js}',
        './dist/**/*.map{.ts,.js}',
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
    })
  ],
  controllers: [TenantServiceController],
  providers: [TenantServiceService],
})
export class TenantServiceModule {}
