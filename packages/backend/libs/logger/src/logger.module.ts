import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { RequestLoggerInterceptor } from './request-logger.interceptor';

@Module({
  providers: [LoggerService, RequestLoggerInterceptor],
  exports: [LoggerService],
})
export class LoggerModule {}
