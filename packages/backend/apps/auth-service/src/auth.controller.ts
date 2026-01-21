import { BadRequestException, Body, Controller, HttpCode, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { KeycloakService } from './keycloak.service';
import { SessionService } from './session.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly keycloak: KeycloakService,
    private readonly sessions: SessionService,
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
      return await this.sessions.createSessionFromPasswordLogin({ username, password });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      throw new UnauthorizedException(message || 'login_failed');
    }
  }

  @Post('session/access')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get access token for session (server-side refresh)' })
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
  @ApiOperation({ summary: 'Logout (revoke server-side session + best-effort KC logout)' })
  async logout(@Body() body: Record<string, unknown>) {
    const sessionId = String(body.sessionId ?? '').trim();
    if (!sessionId) return { ok: true };
    await this.sessions.revokeSession(sessionId).catch(() => {});
    return { ok: true };
  }

  @Post('register')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create user via Keycloak Admin API (service account)' })
  async register(@Body() body: Record<string, unknown>) {
    const email = String(body.email ?? '').trim().toLowerCase();
    const password = String(body.password ?? '');
    const firstName = String(body.firstName ?? '').trim();
    const lastName = String(body.lastName ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    if (!email || !password) return { error: 'Missing email/password' };
    await this.keycloak.createUser({
      email,
      password,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      phone: phone || undefined,
    });
    // optional: send verify email if SMTP configured
    const clientId =
      (process.env.OIDC_CLIENT_ID || process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || 'archpad-portal').trim();
    const portalBase =
      (process.env.PORTAL_PUBLIC_URL || '').trim() ||
      (process.env.NODE_ENV === 'production' ? 'https://portal.archpad.pro' : 'http://localhost:3000');
    const redirectUri = `${portalBase}/sign-in?verified=1`;
    await this.keycloak
      .sendExecuteActionsEmail({
        email,
        actions: ['VERIFY_EMAIL'],
        clientId,
        redirectUri,
        lifespanSeconds: 60 * 60 * 24, // 24h
      })
      .catch(() => {});
    return { ok: true };
  }

  @Post('recovery')
  @HttpCode(200)
  @ApiOperation({ summary: 'Send UPDATE_PASSWORD email via Keycloak Admin API' })
  async recovery(@Body() body: Record<string, unknown>) {
    const email = String(body.email ?? '').trim().toLowerCase();
    // Avoid user enumeration: always ok.
    if (!email) return { ok: true };
    const clientId =
      (process.env.OIDC_CLIENT_ID || process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || 'archpad-portal').trim();
    const portalBase =
      (process.env.PORTAL_PUBLIC_URL || '').trim() ||
      (process.env.NODE_ENV === 'production' ? 'https://portal.archpad.pro' : 'http://localhost:3000');
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
  @ApiOperation({ summary: 'Send VERIFY_EMAIL via Keycloak Admin API' })
  async verify(@Body() body: Record<string, unknown>) {
    const email = String(body.email ?? '').trim().toLowerCase();
    if (!email) return { ok: true };
    const clientId =
      (process.env.OIDC_CLIENT_ID || process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || 'archpad-portal').trim();
    const portalBase =
      (process.env.PORTAL_PUBLIC_URL || '').trim() ||
      (process.env.NODE_ENV === 'production' ? 'https://portal.archpad.pro' : 'http://localhost:3000');
    const redirectUri = `${portalBase}/sign-in?verified=1`;
    await this.keycloak
      .sendExecuteActionsEmail({
        email,
        actions: ['VERIFY_EMAIL'],
        clientId,
        redirectUri,
        lifespanSeconds: 60 * 60 * 24, // 24h
      })
      .catch(() => {});
    return { ok: true };
  }
}

