import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class InternalTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const expected = (process.env.INTERNAL_SERVICE_TOKEN || '').trim();
    if (!expected) return false;

    const req = context.switchToHttp().getRequest<any>();
    const header =
      (req.headers?.['x-internal-token'] as string | undefined) ??
      (req.headers?.['X-Internal-Token'] as string | undefined);
    const provided = (header || '').trim();

    return provided.length > 0 && provided === expected;
  }
}

