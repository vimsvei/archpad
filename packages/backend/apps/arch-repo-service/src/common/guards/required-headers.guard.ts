import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import {
  ARCHPAD_HEADERS,
  ArchpadHeaderName,
} from '@/common/const/archpad-headers.const';
import { LoggerService } from '@archpad/logger';
import { Observable } from 'rxjs';

@Injectable()
export class RequiredHeadersGuard implements CanActivate {
  private readonly loggerContext = RequiredHeadersGuard.name;
  private readonly requiredHeaders: ArchpadHeaderName[] = [
    ARCHPAD_HEADERS.USER_ID,
  ];

  constructor(private readonly logger: LoggerService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();
    const headers = req.headers;
    const missing: ArchpadHeaderName[] = [];

    const { method, url } = req;
    if (url.startsWith('/health') || url.startsWith('/healthz')) {
      return true;
    }
    
    // Публичный доступ к Swagger документации
    if (url.startsWith('/api-docs') || url.startsWith('/api-json') || url.startsWith('/swagger')) {
      return true;
    }

    for (const headerName of this.requiredHeaders) {
      const key = headerName.toLowerCase(); // на всякий
      const value = headers[key];

      if (value === undefined || value === null || value === '') {
        missing.push(headerName);
      }
    }

    if (missing.length > 0) {
      const { method, url } = req;
      const msg = `Missing required Archpad header(s): ${missing.join(
        ', ',
      )} for ${method} ${url}`;

      this.logger.error(msg, JSON.stringify(headers), this.loggerContext);

      throw new BadRequestException(msg);
    }

    return true;
  }
}
