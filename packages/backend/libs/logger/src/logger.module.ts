import { DynamicModule, Module } from '@nestjs/common';
import { LoggerService, LOGGER_OPTIONS } from './logger.service';
import { RequestLoggerInterceptor } from './request-logger.interceptor';
import { LoggerOptions } from './logger-options.interface';

@Module({
  providers: [
    {
      provide: LOGGER_OPTIONS,
      useValue: {},
    },
    LoggerService,
    RequestLoggerInterceptor,
  ],
  exports: [LoggerService],
})
export class LoggerModule {
  static forRoot(options?: LoggerOptions): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: LOGGER_OPTIONS,
          useValue: options ?? {},
        },
        LoggerService,
        RequestLoggerInterceptor,
      ],
      exports: [LoggerService],
    };
  }
}
