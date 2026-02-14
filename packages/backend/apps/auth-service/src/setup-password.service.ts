import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';
import { MikroORM } from '@mikro-orm/core';
import { randomUUID } from 'crypto';
import { LoggerService } from '@archpad/logger';
import { KeycloakService } from './keycloak.service';
import { PasswordSetupToken } from './model/entities/password-setup-token.entity';
import { hashPii } from './pii-hash';

const PURPOSE = 'setup-password';
const DEFAULT_LIFESPAN_SEC = 60 * 60;

type TokenPayload = {
  sub: string;
  email: string;
  purpose: typeof PURPOSE;
  jti: string;
  exp: number;
};

@Injectable()
export class PasswordSetupService {
  private transporter: Transporter | null = null;
  private readonly loggerContext = PasswordSetupService.name;

  constructor(
    private readonly orm: MikroORM,
    private readonly keycloak: KeycloakService,
    private readonly logger: LoggerService,
  ) {}

  private getSecret(): string {
    const s = (
      process.env.SETUP_PASSWORD_TOKEN_SECRET ||
      process.env.VERIFICATION_TOKEN_SECRET ||
      process.env.INTERNAL_SERVICE_TOKEN ||
      ''
    ).trim();
    if (!s) {
      throw new Error(
        'SETUP_PASSWORD_TOKEN_SECRET or VERIFICATION_TOKEN_SECRET or INTERNAL_SERVICE_TOKEN must be set',
      );
    }
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
      ignoreTLS: cfg.port === 1025,
    });
    return this.transporter;
  }

  private getPortalBase(): string {
    return (
      (process.env.PORTAL_PUBLIC_URL || '').trim() ||
      (process.env.NODE_ENV === 'production'
        ? 'https://portal.archpad.pro'
        : 'http://localhost:3000')
    );
  }

  async sendSetupEmail(input: {
    userId: string;
    email: string;
    lifespanSeconds?: number;
    requestId?: string;
  }): Promise<boolean> {
    const lifespan = input.lifespanSeconds ?? DEFAULT_LIFESPAN_SEC;
    const tokenId = randomUUID();
    const tokenRecord = new PasswordSetupToken();
    tokenRecord.id = tokenId;
    tokenRecord.keycloakId = input.userId;
    tokenRecord.emailHash = hashPii(input.email.toLowerCase());
    await this.orm.em.persistAndFlush(tokenRecord);

    const payload: Omit<TokenPayload, 'exp'> = {
      sub: input.userId,
      email: input.email.toLowerCase(),
      purpose: PURPOSE,
      jti: tokenId,
    };
    const token = jwt.sign(payload, this.getSecret(), {
      expiresIn: lifespan,
      issuer: 'auth-service',
      audience: 'portal',
    });

    const portalBase = this.getPortalBase();
    const setupUrl = `${portalBase}/set-password?token=${encodeURIComponent(token)}`;

    const transporter = this.getTransporter();
    if (!transporter) {
      this.logger.warn(
        { event: 'setup_email_smtp_missing', requestId: input.requestId },
        this.loggerContext,
      );
      return false;
    }

    const cfg = this.getSmtpConfig();
    if (!cfg) return false;

    await transporter.sendMail({
      from: cfg.from,
      to: input.email,
      subject: 'Set your password - Archpad',
      text: `Please set your password by opening this link:\n\n${setupUrl}\n\nThis link expires in ${Math.floor(lifespan / 3600)} hours.`,
      html: `<p>Please set your password by clicking the link below:</p><p><a href="${setupUrl}">Set password</a></p><p>This link expires in ${Math.floor(lifespan / 3600)} hours.</p>`,
    });

    return true;
  }

  async confirmSetupPassword(input: {
    token: string;
    password: string;
  }): Promise<{ ok: true }> {
    const decoded = jwt.verify(input.token, this.getSecret(), {
      algorithms: ['HS256'],
      issuer: 'auth-service',
      audience: 'portal',
    }) as TokenPayload;

    if (
      decoded.purpose !== PURPOSE ||
      !decoded.sub ||
      !decoded.email ||
      !decoded.jti
    ) {
      throw new Error('invalid_token');
    }

    const em = this.orm.em.fork();
    const record = await em.findOne(PasswordSetupToken, { id: decoded.jti });
    if (!record || record.usedAt) {
      throw new Error('token_used');
    }
    if (record.keycloakId !== decoded.sub) {
      throw new Error('invalid_token');
    }

    await this.keycloak.setUserPassword(decoded.sub, input.password);
    await this.keycloak.markEmailVerified(decoded.sub).catch(() => {});

    record.usedAt = new Date();
    await em.persistAndFlush(record);

    return { ok: true };
  }
}
