import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import {
  DiskHealthIndicator,
  MemoryHealthIndicator,
  MikroOrmHealthIndicator,
  TerminusModule,
} from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [MikroOrmHealthIndicator, DiskHealthIndicator, MemoryHealthIndicator],
})
export class HealthModule {}
