import { ConfigService } from '@nestjs/config';

export function readBool(
  config: ConfigService,
  key: string,
  defaultValue: boolean,
): boolean {
  const raw = config.get<string | boolean | undefined>(key);
  if (raw === undefined || raw === null) return defaultValue;

  if (typeof raw === 'boolean') return raw;

  const norm = String(raw).trim().toLowerCase();
  if (['1', 'true', 'yes', 'on'].includes(norm)) return true;
  if (['0', 'false', 'no', 'off'].includes(norm)) return false;

  return defaultValue;
}
