import { Module } from '@nestjs/common';
import { HasuraSyncService } from './hasura-sync-service.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { HasuraClientService } from './hasura-client/hasura-client.service';
import { LoggerModule } from '@archpad/logger';

@Module({
  imports: [LoggerModule, ConfigModule.forRoot({ isGlobal: true }), HttpModule],
  controllers: [],
  providers: [HasuraClientService, HasuraSyncService],
})
export class HasuraSyncServiceModule {}
