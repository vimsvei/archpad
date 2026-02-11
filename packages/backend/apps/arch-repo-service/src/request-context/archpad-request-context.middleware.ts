import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import {
  parseCsvHeader,
  runWithArchpadRequestContext,
} from './archpad-request-context';
import { LoggerService } from '@archpad/logger';

@Injectable()
export class ArchpadRequestContextMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, _res: Response, next: NextFunction) {
    const userId = String(req.header('x-archpad-user-id') ?? '').trim();
    const tenantIds = parseCsvHeader(req.header('x-archpad-tenant-ids'));
    const roles = parseCsvHeader(req.header('x-archpad-roles'));

    // Debug: log tenant header to trace Oathkeeper forwarding (remove when tenant flow is stable)
    if (
      process.env.NODE_ENV !== 'production' ||
      (req.path?.includes('/application-components') && req.method === 'POST')
    ) {
      const raw = req.header('x-archpad-tenant-ids');
      this.logger.log(
        `[archpad-context] path=${req.method} ${req.path} x-archpad-tenant-ids raw=${raw ?? 'undefined'} parsed=[${tenantIds.join(',')}]`,
        ArchpadRequestContextMiddleware.name,
      );
    }

    // Even if headers are missing, we still run ALS to avoid undefined store access.
    // Guards will enforce required headers where needed.
    return runWithArchpadRequestContext({ userId, tenantIds, roles }, () =>
      next(),
    );
  }
}
