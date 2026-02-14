import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

const MAX_BODY_BYTES = 16 * 1024;
const MAX_NAME_LEN = 100;
const MAX_COMPANY_LEN = 200;
const MAX_ROLE_LEN = 100;

type LeadPayload = {
  formId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  role?: string;
  personalWorkspace?: boolean;
  agreeToNewsletter?: boolean;
  turnstileToken?: string;
};

function getAuthServiceBaseUrl(): string {
  const internal = process.env.AUTH_SERVICE_INTERNAL_URL?.trim();
  const external = process.env.AUTH_SERVICE_PUBLIC_URL?.trim();
  const defaultInternal = 'http://auth-service.platform.svc:3000';
  const defaultExternal = 'https://api.archpad.pro/rest/auth-service';
  const url =
    process.env.NODE_ENV === 'production'
      ? internal || defaultInternal
      : internal || external || defaultExternal;
  if (!url) {
    throw new Error(
      'AUTH_SERVICE_INTERNAL_URL or AUTH_SERVICE_PUBLIC_URL must be set',
    );
  }
  return url;
}

function getClientIp(req: Request): string | null {
  const forwarded = req.headers.get('x-forwarded-for') || '';
  if (forwarded) {
    const ip = forwarded.split(',')[0]?.trim();
    if (ip) return ip;
  }
  const realIp = req.headers.get('x-real-ip');
  return realIp?.trim() || null;
}

function isEmailValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeString(value: unknown, maxLen: number): string | null {
  const str = typeof value === 'string' ? value.trim() : '';
  if (!str) return '';
  if (str.length > maxLen) return null;
  return str;
}

async function verifyTurnstile(input: {
  token: string;
  ip?: string | null;
}): Promise<boolean> {
  const secret = (process.env.TURNSTILE_SECRET_KEY || '').trim();
  if (!secret) {
    throw new Error('TURNSTILE_SECRET_KEY must be set');
  }
  const body = new URLSearchParams();
  body.set('secret', secret);
  body.set('response', input.token);
  if (input.ip) body.set('remoteip', input.ip);

  const res = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    },
  );
  const json = (await res.json().catch(() => null)) as
    | { success?: boolean }
    | null;
  return Boolean(res.ok && json?.success);
}

export async function POST(req: Request) {
  const contentType = req.headers.get('content-type') || '';
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return NextResponse.json({ error: 'invalid_content_type' }, { status: 400 });
  }

  const contentLength = Number(req.headers.get('content-length') || 0);
  if (contentLength && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'payload_too_large' }, { status: 400 });
  }

  const raw = await req.text();
  if (Buffer.byteLength(raw, 'utf8') > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'payload_too_large' }, { status: 400 });
  }

  let payload: LeadPayload | null = null;
  try {
    payload = JSON.parse(raw) as LeadPayload;
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const firstName = normalizeString(payload?.firstName, MAX_NAME_LEN);
  const lastName = normalizeString(payload?.lastName, MAX_NAME_LEN);
  const emailRaw = normalizeString(payload?.email, 200);
  const company = normalizeString(payload?.company, MAX_COMPANY_LEN);
  const role = normalizeString(payload?.role, MAX_ROLE_LEN);
  const formId = normalizeString(payload?.formId, 80) || 'landing-register';
  const turnstileToken = normalizeString(payload?.turnstileToken, 2000);
  const email = emailRaw ? emailRaw.toLowerCase() : emailRaw;
  const personalWorkspace = Boolean(payload?.personalWorkspace);

  if (
    firstName === null ||
    lastName === null ||
    email === null ||
    company === null ||
    role === null ||
    formId === null ||
    turnstileToken === null
  ) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  }

  if (!firstName || !lastName || !email || !role || !turnstileToken) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  }
  if (!isEmailValid(email)) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
  }

  const ip = getClientIp(req);
  const turnstileOk = await verifyTurnstile({ token: turnstileToken, ip });
  if (!turnstileOk) {
    return NextResponse.json({ error: 'turnstile_failed' }, { status: 400 });
  }

  const requestId = req.headers.get('x-request-id') || randomUUID();
  const base = getAuthServiceBaseUrl();
  const baseWithSlash = base.endsWith('/') ? base : `${base}/`;
  const url = new URL('auth/lead', baseWithSlash);
  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-request-id': requestId,
      ...(ip ? { 'x-forwarded-for': ip } : {}),
    },
    body: JSON.stringify({
      formId,
      firstName,
      lastName,
      email,
      company,
      role,
      personalWorkspace,
      agreeToNewsletter: Boolean(payload?.agreeToNewsletter),
    }),
  });

  if (res.status === 429) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  if (!res.ok) {
    return NextResponse.json(
      { ok: true, message: 'accepted' },
      { status: 202 },
    );
  }

  return NextResponse.json({ ok: true, message: 'accepted' }, { status: 202 });
}
