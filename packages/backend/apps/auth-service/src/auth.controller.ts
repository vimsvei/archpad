import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { KeycloakService } from './keycloak.service';
import { SessionService } from './session.service';
import { TenantServiceClient } from './tenant-service.client';
import { InternalTokenGuard } from './internal-token.guard';
import { VerificationEmailService } from './verification-email.service';
import { LeadService } from './lead.service';
import { PasswordSetupService } from './setup-password.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly keycloak: KeycloakService,
    private readonly sessions: SessionService,
    private readonly tenant: TenantServiceClient,
    private readonly verificationEmail: VerificationEmailService,
    private readonly leads: LeadService,
    private readonly passwordSetup: PasswordSetupService,
  ) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Password login (ROPC) -> server-side session' })
  async login(@Body() body: Record<string, unknown>) {
    const username = String(body.email ?? body.username ?? '').trim();
    const password = String(body.password ?? '');
    if (!username || !password) {
      throw new BadRequestException('Missing email/password');
    }
    try {
      return await this.sessions.createSessionFromPasswordLogin({
        username,
        password,
      });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      throw new UnauthorizedException(message || 'login_failed');
    }
  }

  @Post('session/access')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get access token for session (server-side refresh)',
  })
  @UseGuards(InternalTokenGuard)
  async sessionAccess(@Body() body: Record<string, unknown>) {
    const sessionId = String(body.sessionId ?? '').trim();
    if (!sessionId) throw new BadRequestException('Missing sessionId');
    try {
      return await this.sessions.getAccessTokenForSession(sessionId);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      throw new UnauthorizedException(message || 'unauthorized');
    }
  }

  @Post('me')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get current user profile from session' })
  async me(@Body() body: Record<string, unknown>) {
    const sessionId = String(body.sessionId ?? '').trim();
    if (!sessionId) throw new BadRequestException('Missing sessionId');
    try {
      return await this.sessions.getMeForSession(sessionId);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      throw new UnauthorizedException(message || 'unauthorized');
    }
  }

  @Post('logout')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Logout (revoke server-side session + best-effort KC logout)',
  })
  async logout(@Body() body: Record<string, unknown>) {
    const sessionId = String(body.sessionId ?? '').trim();
    if (!sessionId) return { ok: true };
    await this.sessions.revokeSession(sessionId).catch(() => {});
    return { ok: true };
  }

  @Post('register')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Create user via Keycloak Admin API (service account)',
  })
  async register(@Body() body: Record<string, unknown>) {
    const email = String(body.email ?? '')
      .trim()
      .toLowerCase();
    const password = String(body.password ?? '');
    const firstName = String(body.firstName ?? '').trim();
    const lastName = String(body.lastName ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    if (!email || !password) return { error: 'Missing email/password' };
    const sendVerifyEmail =
      (process.env.REGISTER_SEND_VERIFY_EMAIL ?? 'true').toLowerCase() !==
      'false';

    const { userId: keycloakId } = await this.keycloak.createUser({
      email,
      password,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      phone: phone || undefined,
      requireEmailVerification: sendVerifyEmail,
    });

    // Default authorization in Keycloak (idempotent)
    await this.keycloak.ensureDefaultAccessForUser(keycloakId).catch(() => {});

    await this.tenant.ensureUserProfile({
      keycloakId,
    });
    // Optional: send verify email via Portal link (portal/verify-email?token=...).
    // When enabled, user has VERIFY_EMAIL required action and cannot login until verified.
    // Set REGISTER_SEND_VERIFY_EMAIL=false to allow immediate login (e.g. dev/demo without SMTP).
    if (sendVerifyEmail) {
      await this.verificationEmail
        .sendVerificationEmail({
          userId: keycloakId,
          email,
          lifespanSeconds: 60 * 60 * 24, // 24h
        })
        .catch(() => {});
    }
    return { ok: true };
  }

  @Post('lead')
  @HttpCode(202)
  @ApiOperation({
    summary: 'Register lead from landing (no password, async provisioning)',
  })
  async lead(@Body() body: Record<string, unknown>, @Req() req: any) {
    const requestId =
      req?.headers?.['x-request-id'] ||
      req?.headers?.['x-correlation-id'] ||
      undefined;
    const ip = AuthController.getClientIp(req);
    return this.leads.processLead({ body, ip, requestId });
  }

  private static getClientIp(req: any): string | null {
    const forwarded = String(req?.headers?.['x-forwarded-for'] || '').trim();
    if (forwarded) {
      const ip = forwarded.split(',')[0]?.trim();
      if (ip) return ip;
    }
    const realIp = String(req?.headers?.['x-real-ip'] || '').trim();
    return realIp || null;
  }

  @Post('recovery')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Send UPDATE_PASSWORD email via Keycloak Admin API',
  })
  async recovery(@Body() body: Record<string, unknown>) {
    const email = String(body.email ?? '')
      .trim()
      .toLowerCase();
    // Avoid user enumeration: always ok.
    if (!email) return { ok: true };
    const clientId = (
      process.env.OIDC_CLIENT_ID ||
      process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID ||
      'archpad-portal'
    ).trim();
    const portalBase =
      (process.env.PORTAL_PUBLIC_URL || '').trim() ||
      (process.env.NODE_ENV === 'production'
        ? 'https://portal.archpad.pro'
        : 'http://localhost:3000');
    const redirectUri = `${portalBase}/sign-in?recovered=1`;
    await this.keycloak
      .sendExecuteActionsEmail({
        email,
        actions: ['UPDATE_PASSWORD'],
        clientId,
        redirectUri,
        lifespanSeconds: 60 * 60, // 1h
      })
      .catch(() => {});
    return { ok: true };
  }

  @Post('verify')
  @HttpCode(200)
  @ApiOperation({ summary: 'Resend verification email (Portal link)' })
  async verify(@Body() body: Record<string, unknown>) {
    const email = String(body.email ?? '')
      .trim()
      .toLowerCase();
    if (!email) return { ok: true };
    const userId = await this.keycloak.findUserIdByEmail(email);
    if (!userId) return { ok: true };
    await this.verificationEmail
      .sendVerificationEmail({
        userId,
        email,
        lifespanSeconds: 60 * 60 * 24, // 24h
      })
      .catch(() => {});
    return { ok: true };
  }

  @Post('verify-email/confirm')
  @HttpCode(200)
  @ApiOperation({ summary: 'Confirm email via token from verification link' })
  async verifyEmailConfirm(@Body() body: Record<string, unknown>) {
    const token = String(body.token ?? '').trim();
    if (!token) throw new BadRequestException('Missing token');
    try {
      await this.verificationEmail.confirmVerificationToken(token);
      return { ok: true };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      throw new UnauthorizedException(message || 'invalid_token');
    }
  }

  @Post('setup-password/confirm')
  @HttpCode(200)
  @ApiOperation({ summary: 'Confirm password setup via token from email link' })
  async setupPasswordConfirm(@Body() body: Record<string, unknown>) {
    const token = String(body.token ?? '').trim();
    const password = String(body.password ?? '');
    if (!token || !password) {
      throw new BadRequestException('Missing token/password');
    }
    try {
      await this.passwordSetup.confirmSetupPassword({ token, password });
      return { ok: true };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      throw new UnauthorizedException(message || 'invalid_token');
    }
  }
}
