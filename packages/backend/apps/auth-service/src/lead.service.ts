import { Injectable, BadRequestException } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { randomUUID } from 'crypto';
import { LoggerService } from '@archpad/logger';
import { KeycloakService } from './keycloak.service';
import { LeadAttempt } from './model/entities/lead-attempt.entity';
import { LeadDedup } from './model/entities/lead-dedup.entity';
import { TenantProvisioningService } from './tenant-provisioning.service';
import { PasswordSetupService } from './setup-password.service';
import { hashPii } from './pii-hash';

const MAX_NAME_LEN = 100;
const MAX_COMPANY_LEN = 200;
const MAX_ROLE_LEN = 100;

const DEDUP_WINDOW_MS = 24 * 60 * 60 * 1000;
const EMAIL_LIMIT_10_MIN = 1;
const EMAIL_LIMIT_24_HOURS = 3;

function normalizeString(value: unknown, maxLen: number): string | null {
  const str = typeof value === 'string' ? value.trim() : '';
  if (!str) return '';
  if (str.length > maxLen) return null;
  return str;
}

function isEmailValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

@Injectable()
export class LeadService {
  private readonly loggerContext = LeadService.name;

  constructor(
    private readonly orm: MikroORM,
    private readonly keycloak: KeycloakService,
    private readonly tenantProvisioning: TenantProvisioningService,
    private readonly passwordSetup: PasswordSetupService,
    private readonly logger: LoggerService,
  ) {}

  private getIpLimit(): number {
    const raw = (process.env.LEAD_IP_LIMIT_10_MIN || '').trim();
    const parsed = Number(raw);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 20;
  }

  private async recordAttempt(input: {
    emailHash?: string | null;
    ipHash?: string | null;
    formId?: string | null;
    emailSent: boolean;
    reason?: string;
  }) {
    const em = this.orm.em.fork();
    const attempt = new LeadAttempt();
    attempt.id = randomUUID();
    attempt.emailHash = input.emailHash ?? null;
    attempt.ipHash = input.ipHash ?? null;
    attempt.formId = input.formId ?? null;
    attempt.emailSent = input.emailSent;
    attempt.reason = input.reason ?? null;
    await em.persistAndFlush(attempt);
  }

  private async ensureDedupRecord(input: {
    emailHash: string;
    formId: string;
  }) {
    const em = this.orm.em.fork();
    const dedup = new LeadDedup();
    dedup.id = randomUUID();
    dedup.emailHash = input.emailHash;
    dedup.formId = input.formId;
    await em.persistAndFlush(dedup);
  }

  async processLead(input: {
    body: Record<string, unknown>;
    ip?: string | null;
    requestId?: string;
  }): Promise<{ ok: true }> {
    const firstName = normalizeString(input.body.firstName, MAX_NAME_LEN);
    const lastName = normalizeString(input.body.lastName, MAX_NAME_LEN);
    const emailRaw = normalizeString(input.body.email, 200);
    const company = normalizeString(input.body.company, MAX_COMPANY_LEN);
    const role = normalizeString(input.body.role, MAX_ROLE_LEN);
    const formId = normalizeString(input.body.formId, 80) || 'landing-register';
    const email = emailRaw ? emailRaw.toLowerCase() : emailRaw;
    const personalWorkspace =
      typeof input.body.personalWorkspace === 'boolean'
        ? input.body.personalWorkspace
        : Boolean(input.body.personalWorkspace);

    if (
      firstName === null ||
      lastName === null ||
      email === null ||
      company === null ||
      role === null ||
      formId === null
    ) {
      throw new BadRequestException('invalid_payload');
    }
    if (!firstName || !lastName || !email || !role) {
      throw new BadRequestException('invalid_payload');
    }
    if (!isEmailValid(email)) {
      throw new BadRequestException('invalid_email');
    }

    const emailHash = hashPii(email);
    const ipHash = input.ip ? hashPii(input.ip) : null;
    const now = new Date();

    try {
      // IP rate limit (attempts window)
      if (ipHash) {
        const since = new Date(now.getTime() - 10 * 60 * 1000);
        const ipAttempts = await this.orm.em.count(LeadAttempt, {
          ipHash,
          createdAt: { $gte: since },
        });
        if (ipAttempts >= this.getIpLimit()) {
          await this.recordAttempt({
            emailHash,
            ipHash,
            formId,
            emailSent: false,
            reason: 'ip_limit',
          });
          this.logger.warn(
            {
              event: 'lead_ip_rate_limited',
              requestId: input.requestId,
              ipHash,
            },
            this.loggerContext,
          );
          return { ok: true };
        }
      }

      // Dedup check (email + formId window)
      const dedupSince = new Date(now.getTime() - DEDUP_WINDOW_MS);
      const dedup = await this.orm.em.findOne(LeadDedup, {
        emailHash,
        formId,
        createdAt: { $gte: dedupSince },
      });
      if (dedup) {
        await this.recordAttempt({
          emailHash,
          ipHash,
          formId,
          emailSent: false,
          reason: 'dedup',
        });
        this.logger.log(
          {
            event: 'lead_dedup_hit',
            requestId: input.requestId,
            emailHash,
            formId,
          },
          this.loggerContext,
        );
        return { ok: true };
      }

      // Anti email-bombing: email send limits
      const since10 = new Date(now.getTime() - 10 * 60 * 1000);
      const since24 = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const sent10 = await this.orm.em.count(LeadAttempt, {
        emailHash,
        emailSent: true,
        createdAt: { $gte: since10 },
      });
      const sent24 = await this.orm.em.count(LeadAttempt, {
        emailHash,
        emailSent: true,
        createdAt: { $gte: since24 },
      });
      if (sent10 >= EMAIL_LIMIT_10_MIN || sent24 >= EMAIL_LIMIT_24_HOURS) {
        await this.recordAttempt({
          emailHash,
          ipHash,
          formId,
          emailSent: false,
          reason: 'email_limit',
        });
        this.logger.warn(
          {
            event: 'lead_email_rate_limited',
            requestId: input.requestId,
            emailHash,
          },
          this.loggerContext,
        );
        return { ok: true };
      }

      const { userId: keycloakId } = await this.keycloak.createUser({
        email,
        password: undefined,
        firstName,
        lastName,
        requireEmailVerification: false,
        attributes: {
          company: company ? [company] : undefined,
          role: role ? [role] : undefined,
        },
      });

      await this.keycloak.ensureDefaultAccessForUser(keycloakId).catch(() => {});

      await this.tenantProvisioning.ensureProfile({
        keycloakId,
        personalWorkspace,
        requestId: input.requestId,
      });

      let emailSent = false;
      try {
        emailSent = await this.passwordSetup.sendSetupEmail({
          userId: keycloakId,
          email,
          requestId: input.requestId,
        });
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : String(e);
        this.logger.warn(
          {
            event: 'lead_email_send_failed',
            requestId: input.requestId,
            emailHash,
            error: message,
          },
          this.loggerContext,
        );
      }

      await this.recordAttempt({
        emailHash,
        ipHash,
        formId,
        emailSent,
        reason: emailSent ? 'email_sent' : 'email_send_failed',
      });

      await this.ensureDedupRecord({ emailHash, formId });

      return { ok: true };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      await this.recordAttempt({
        emailHash,
        ipHash,
        formId,
        emailSent: false,
        reason: 'processing_failed',
      }).catch(() => {});
      this.logger.error(
        {
          event: 'lead_processing_failed',
          requestId: input.requestId,
          emailHash,
          error: message,
        },
        undefined,
        this.loggerContext,
      );
      return { ok: true };
    }
  }
}
