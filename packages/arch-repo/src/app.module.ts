import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import * as process from 'node:process';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestLoggerInterceptor } from './logger/request-logger.interceptor';
import { ArchimateBootstrapModule } from '@/archimate-bootstrap/archimate-bootstrap.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      entities: ['./dist/**/*.entity{.ts,.js}'],
      entitiesTs: ['./src/model/**/*.entity{.ts}'],
      driver: PostgreSqlDriver,
      host: process.env.PG_HOST,
      port: +(process.env.PG_PORT ?? '5432'),
      dbName: process.env.PROJECT_DB,
      user: process.env.PROJECT_DB_USER,
      password: process.env.PROJECT_DB_PASS,
      debug: process.env.NODE_ENV !== 'production',
    }),
    ArchimateBootstrapModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
  ],
})
export class AppModule {}
