import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthCheckerController } from 'archpad/health-checker/health-checker.controller';
import { LoggerService } from '@archpad/logger';

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
