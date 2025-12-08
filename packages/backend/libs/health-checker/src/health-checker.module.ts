import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { LoggerService } from '@/logger/logger.service';
import { HealthCheckerController } from 'archpad/health-checker/health-checker.controller';

@Module({
  imports: [
    TerminusModule.forRoot({
      logger: LoggerService,
    }),
  ],
  controllers: [HealthCheckerController],
  providers: [],
  exports: [],
})
export class HealthCheckerModule {}
