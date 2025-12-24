import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { randomUUID } from 'crypto';
import { LoggerService } from './logger.service';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpCtx = context.switchToHttp();
    const req = httpCtx.getRequest<Request & { id?: string }>();

    const method = (req as any).method;
    const url = (req as any).url;

    // Skip noisy health checks completely.
    // HealthCheckerController exposes /health and /healthz (and may be probed very frequently).
    if (
      typeof url === 'string' &&
      (url === '/health' ||
        url === '/healthz' ||
        url.startsWith('/health/') ||
        url.startsWith('/healthz/'))
    ) {
      return next.handle();
    }

    // correlation / request id
    const requestId =
      (req as any).headers?.['x-request-id'] ?? (req as any).id ?? randomUUID();

    const startedAt = Date.now();

    this.logger.log(
      {
        event: 'request_started',
        method,
        url,
        requestId,
      },
      'HTTP',
    );

    return next.handle().pipe(
      tap({
        next: (body) => {
          const res = httpCtx.getResponse<any>();
          const statusCode = res.statusCode;

          this.logger.log(
            {
              event: 'request_completed',
              method,
              url,
              statusCode,
              durationMs: Date.now() - startedAt,
              requestId,
            },
            'HTTP',
          );
        },
        error: (err) => {
          const res = httpCtx.getResponse<any>();
          const statusCode = res?.statusCode ?? 500;

          this.logger.error(
            {
              event: 'request_error',
              method,
              url,
              statusCode,
              durationMs: Date.now() - startedAt,
              requestId,
              errorName: err?.name,
              errorMessage: err?.message,
            },
            err?.stack,
            'HTTP',
          );
        },
      }),
    );
  }
}
