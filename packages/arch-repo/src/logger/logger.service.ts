import {
  Injectable,
  LoggerService as NestLoggerService,
  LogLevel,
} from '@nestjs/common';

@Injectable()
export class LoggerService implements NestLoggerService {
  private levels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];
  
  log(message: any, context?: string) {
    this.write('log', message, context);
  }
  
  error(message: any, trace?: string, context?: string) {
    this.write('error', message, context, trace);
  }
  
  warn(message: any, context?: string) {
    this.write('warn', message, context);
  }
  
  debug(message: any, context?: string) {
    this.write('debug', message, context);
  }
  
  verbose(message: any, context?: string) {
    this.write('verbose', message, context);
  }
  
  setLogLevels(levels: LogLevel[]) {
    this.levels = levels;
  }
  
  private write(
    level: LogLevel,
    message: any,
    context?: string,
    trace?: string,
  ) {
    if (!this.levels.includes(level)) {
      return;
    }
    
    const now = new Date().toISOString();
    
    const payload: Record<string, any> = {
      timestamp: now,
      level,
      message: typeof message === 'string' ? message : JSON.stringify(message),
    };
    
    if (context) payload.context = context;
    if (trace) payload.trace = trace;
    
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(payload));
  }
  
}
