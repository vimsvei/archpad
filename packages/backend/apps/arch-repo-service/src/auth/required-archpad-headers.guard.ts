import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';

function headerValue(req: any, name: string): string {
  // express lowercases all header keys
  const v = req?.headers?.[name.toLowerCase()];
  if (Array.isArray(v)) return String(v[0] ?? '').trim();
  return String(v ?? '').trim();
}

@Injectable()
export class RequiredArchpadHeadersGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();

    // Oathkeeper sets these headers. If someone bypasses the gateway, we want a hard fail.
    const userId = headerValue(req, 'x-archpad-user-id');
    // TEMPORARY: allow missing tenant/roles headers while Oathkeeper templates/claims are being aligned.
    // Keep User-Id as the minimum required signal that the request passed through the gateway.
    // const tenantIds = headerValue(req, 'x-archpad-tenant-ids');
    // const roles = headerValue(req, 'x-archpad-roles');

    if (!userId) throw new UnauthorizedException('Missing X-Archpad-User-Id');
    // if (!tenantIds) throw new UnauthorizedException('Missing X-Archpad-Tenant-Ids');
    // if (!roles) throw new UnauthorizedException('Missing X-Archpad-Roles');

    return true;
  }
}
