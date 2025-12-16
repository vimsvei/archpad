import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';
import {
  parseCsvHeader,
  runWithArchpadRequestContext,
} from './archpad-request-context';

@Injectable()
export class ArchpadRequestContextMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const userId = String(req.header('x-archpad-user-id') ?? '').trim();
    const tenantIds = parseCsvHeader(req.header('x-archpad-tenant-ids'));
    const roles = parseCsvHeader(req.header('x-archpad-roles'));

    // Even if headers are missing, we still run ALS to avoid undefined store access.
    // Guards will enforce required headers where needed.
    return runWithArchpadRequestContext({ userId, tenantIds, roles }, () =>
      next(),
    );
  }
}
