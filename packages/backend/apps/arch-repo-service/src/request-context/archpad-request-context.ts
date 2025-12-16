import { AsyncLocalStorage } from 'node:async_hooks';

export type ArchpadRequestContext = {
  userId: string;
  tenantIds: string[];
  roles: string[];
};

const storage = new AsyncLocalStorage<ArchpadRequestContext>();

export function runWithArchpadRequestContext<T>(
  ctx: ArchpadRequestContext,
  fn: () => T,
): T {
  return storage.run(ctx, fn);
}

export function getArchpadRequestContext(): ArchpadRequestContext | null {
  return storage.getStore() ?? null;
}

export function parseCsvHeader(raw: unknown): string[] {
  if (typeof raw !== 'string') return [];
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}
