import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import * as process from 'node:process';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      entities: ['./dist/**/*.entity{.ts,.js}'],
      entitiesTs: ['./src/**/*.entity{.ts}'],
      driver: PostgreSqlDriver,
      host: process.env.PG_HOST,
      dbName: process.env.PROJECT_DB,
      username: process.env.PROJECT_DB_USER,
      password: process.env.PROJECT_DB_PASS,
      debug: process.env.NODE_ENV !== 'production'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
