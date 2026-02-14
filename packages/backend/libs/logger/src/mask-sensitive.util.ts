/**
 * Keys that should be redacted when logging request/response bodies.
 * Case-insensitive matching.
 */
const SENSITIVE_KEYS = new Set([
  'password',
  'passwordconfirm',
  'currentpassword',
  'newpassword',
  'token',
  'accesstoken',
  'refreshtoken',
  'idtoken',
  'authorization',
  'secret',
  'clientsecret',
  'apikey',
  'apisecret',
  'privatekey',
  'credentials',
  'sessionid',
  'session_id',
  'cookie',
  'internaltoken',
  'email',
  'confirmemail',
  'firstname',
  'lastname',
  'company',
  'role',
  'turnstiletoken',
  'cf-turnstile-response',
  'g-recaptcha-response',
]);

const MASK = '***';

function isSensitiveKey(key: string): boolean {
  const normalized = key.toLowerCase().replace(/[-_\s]/g, '');
  return SENSITIVE_KEYS.has(normalized);
}

/**
 * Recursively masks sensitive fields in an object.
 * Used for safe request/response logging.
 */
export function maskSensitiveData(obj: unknown): unknown {
  if (obj === null || obj === undefined) {
    return obj;
  }
  if (typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => maskSensitiveData(item));
  }
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (isSensitiveKey(k)) {
      out[k] = v != null && String(v).length > 0 ? MASK : v;
    } else {
      out[k] = maskSensitiveData(v);
    }
  }
  return out;
}
