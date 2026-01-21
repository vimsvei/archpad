import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { KeycloakService } from './keycloak.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly keycloak: KeycloakService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Password login (ROPC) via Keycloak' })
  async login(@Body() body: Record<string, unknown>) {
    const username = String(body.email ?? body.username ?? '').trim();
    const password = String(body.password ?? '');
    if (!username || !password) {
      return { error: 'Missing email/password' };
    }
    return this.keycloak.passwordLogin({ username, password });
  }

  @Post('refresh')
  @HttpCode(200)
  @ApiOperation({ summary: 'Refresh tokens via Keycloak' })
  async refresh(@Body() body: Record<string, unknown>) {
    const refreshToken = String(body.refreshToken ?? body.refresh_token ?? '');
    if (!refreshToken) return { error: 'Missing refreshToken' };
    return this.keycloak.exchangeRefreshToken({ refreshToken });
  }

  @Post('logout')
  @HttpCode(200)
  @ApiOperation({ summary: 'Logout (invalidate refresh token) via Keycloak' })
  async logout(@Body() body: Record<string, unknown>) {
    const refreshToken = String(body.refreshToken ?? body.refresh_token ?? '');
    if (!refreshToken) return { ok: true };
    await this.keycloak.logoutRefreshToken({ refreshToken });
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
    await this.keycloak.sendExecuteActionsEmail({ email, actions: ['VERIFY_EMAIL'] }).catch(() => {});
    return { ok: true };
  }

  @Post('recovery')
  @HttpCode(200)
  @ApiOperation({ summary: 'Send UPDATE_PASSWORD email via Keycloak Admin API' })
  async recovery(@Body() body: Record<string, unknown>) {
    const email = String(body.email ?? '').trim().toLowerCase();
    // Avoid user enumeration: always ok.
    if (!email) return { ok: true };
    await this.keycloak.sendExecuteActionsEmail({ email, actions: ['UPDATE_PASSWORD'] }).catch(() => {});
    return { ok: true };
  }

  @Post('verify')
  @HttpCode(200)
  @ApiOperation({ summary: 'Send VERIFY_EMAIL via Keycloak Admin API' })
  async verify(@Body() body: Record<string, unknown>) {
    const email = String(body.email ?? '').trim().toLowerCase();
    if (!email) return { ok: true };
    await this.keycloak.sendExecuteActionsEmail({ email, actions: ['VERIFY_EMAIL'] }).catch(() => {});
    return { ok: true };
  }
}

