import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import {
  DiskHealthIndicator,
  MemoryHealthIndicator,
  MikroOrmHealthIndicator,
  TerminusModule,
} from '@nestjs/terminus';
import checkDiskSpace from 'check-disk-space';
import { CHECK_DISK_SPACE_LIB } from '@nestjs/terminus/dist/terminus.constants';
import {LoggerService} from "@archpad/logger";

@Module({
  imports: [
    TerminusModule.forRoot({
      logger: LoggerService,
    }),
  ],
  controllers: [HealthController],
  providers: [
    MikroOrmHealthIndicator,
    DiskHealthIndicator,
    MemoryHealthIndicator,
    { provide: CHECK_DISK_SPACE_LIB, useValue: checkDiskSpace },
  ],
})
export class HealthModule {}
