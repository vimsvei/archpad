import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { ARCHPAD_HEADERS } from '@/common/const/archpad-headers.const';

export interface ArchpadRequestContext {
  userId: string;
  tenantIds?: string[]; // список tenant-ов (через запятую в заголовке)
  roles?: string[]; // список ролей
}

function getHeader(req: Request, headerName: string): string | undefined {
  // В express заголовки приводятся к lower-case
  const key = headerName.toLowerCase();
  const raw = req.headers[key];

  if (Array.isArray(raw)) {
    return raw[0];
  }

  if (typeof raw === 'string') {
    return raw;
  }

  return undefined;
}

function parseCommaSeparated(value?: string): string[] | undefined {
  if (!value) return undefined;
  const items = value
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);
  return items.length ? items : undefined;
}

export const ArchpadContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ArchpadRequestContext => {
    const req = ctx.switchToHttp().getRequest<Request>();

    const userId = getHeader(req, ARCHPAD_HEADERS.USER_ID);
    // const tenantIdsRaw = getHeader(req, ARCHPAD_HEADERS.TENANT_IDS);
    // const rolesRaw = getHeader(req, ARCHPAD_HEADERS.ROLES);

    return {
      userId: userId!, // если Guard обязательный — можно считать, что точно есть
      // tenantIds: parseCommaSeparated(tenantIdsRaw),
      // roles: parseCommaSeparated(rolesRaw),
    };
  },
);
