import { createHash } from 'crypto';

export function getPiiHashSalt(): string {
  const salt = (
    process.env.PII_HASH_SALT ||
    process.env.INTERNAL_SERVICE_TOKEN ||
    ''
  ).trim();
  if (!salt) {
    throw new Error('PII_HASH_SALT or INTERNAL_SERVICE_TOKEN must be set');
  }
  return salt;
}

export function hashPii(value: string): string {
  return createHash('sha256').update(`${getPiiHashSalt()}:${value}`).digest('hex');
}
