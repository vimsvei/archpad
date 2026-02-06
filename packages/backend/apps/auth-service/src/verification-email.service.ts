import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { KeycloakService } from './keycloak.service';

const PURPOSE = 'verify-email';
const DEFAULT_LIFESPAN_SEC = 60 * 60 * 24; // 24h

type TokenPayload = {
  sub: string; // userId
  email: string;
  purpose: typeof PURPOSE;
  exp: number;
};

@Injectable()
export class VerificationEmailService {
  private transporter: Transporter | null = null;

  constructor(private readonly keycloak: KeycloakService) {}

  private getSecret(): string {
    const s = (process.env.VERIFICATION_TOKEN_SECRET || process.env.INTERNAL_SERVICE_TOKEN || '').trim();
    if (!s) throw new Error('VERIFICATION_TOKEN_SECRET or INTERNAL_SERVICE_TOKEN must be set');
    return s;
  }

  private getSmtpConfig(): {
    host: string;
    port: number;
    secure: boolean;
    auth?: { user: string; pass: string };
    from: string;
  } | null {
    const host = (process.env.SMTP_HOST || process.env.SMTP_INTERNAL_URL || '').trim();
    const port = parseInt(process.env.SMTP_PORT || '1025', 10);
    const user = (process.env.SMTP_USER || '').trim();
    const pass = (process.env.SMTP_PASSWORD || '').trim();
    const from =
      (process.env.SMTP_FROM_ADDRESS || process.env.SMTP_FROM || 'noreply@archpad.pro').trim();
    if (!host) return null;
    return {
      host,
      port: Number.isFinite(port) ? port : 1025,
      secure: port === 465,
      auth: user && pass ? { user, pass } : undefined,
      from,
    };
  }

  private getTransporter(): Transporter | null {
    if (this.transporter !== null) return this.transporter;
    const cfg = this.getSmtpConfig();
    if (!cfg) return null;
    this.transporter = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.secure,
      auth: cfg.auth,
      // Mailpit and dev SMTP often need this
      ignoreTLS: cfg.port === 1025,
    });
    return this.transporter;
  }

  private getPortalBase(): string {
    return (
      (process.env.PORTAL_PUBLIC_URL || '').trim() ||
      (process.env.NODE_ENV === 'production' ? 'https://portal.archpad.pro' : 'http://localhost:3000')
    );
  }

  async sendVerificationEmail(input: {
    userId: string;
    email: string;
    lifespanSeconds?: number;
  }): Promise<void> {
    const lifespan = input.lifespanSeconds ?? DEFAULT_LIFESPAN_SEC;
    const payload: Omit<TokenPayload, 'exp'> = {
      sub: input.userId,
      email: input.email.toLowerCase(),
      purpose: PURPOSE,
    };
    const token = jwt.sign(payload, this.getSecret(), {
      expiresIn: lifespan,
      issuer: 'auth-service',
      audience: 'portal',
    });

    const portalBase = this.getPortalBase();
    const verifyUrl = `${portalBase}/verify-email?token=${encodeURIComponent(token)}`;

    const transporter = this.getTransporter();
    if (!transporter) {
      // SMTP not configured - log and skip (dev mode)
      console.warn('[VerificationEmailService] SMTP not configured, verification link:', verifyUrl);
      return;
    }

    const cfg = this.getSmtpConfig();
    if (!cfg) return;

    await transporter.sendMail({
      from: cfg.from,
      to: input.email,
      subject: 'Confirm your email - Archpad',
      text: `Please confirm your email by opening this link:\n\n${verifyUrl}\n\nThis link expires in ${Math.floor(lifespan / 3600)} hours.`,
      html: `<p>Please confirm your email by clicking the link below:</p><p><a href="${verifyUrl}">Confirm email</a></p><p>This link expires in ${Math.floor(lifespan / 3600)} hours.</p>`,
    });
  }

  async confirmVerificationToken(token: string): Promise<{ userId: string; email: string }> {
    const secret = this.getSecret();
    const decoded = jwt.verify(token, secret, {
      algorithms: ['HS256'],
      issuer: 'auth-service',
      audience: 'portal',
    }) as TokenPayload;

    if (decoded.purpose !== PURPOSE || !decoded.sub || !decoded.email) {
      throw new Error('invalid_token');
    }

    await this.keycloak.markEmailVerified(decoded.sub);
    return { userId: decoded.sub, email: decoded.email };
  }
}
