import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { randomUUID } from 'node:crypto';
import { AuthSession } from './model/entities/auth-session.entity';
import { KeycloakService } from './keycloak.service';
import { decodeJwtPayload } from './jwt';

type SessionUser = {
  ok: true;
  email: string | null;
  name: string | null;
  given_name: string | null;
  family_name: string | null;
  preferred_username: string | null;
  roles: string[] | null;
  groups: string[] | null;
};

@Injectable()
export class SessionService {
  constructor(
    private readonly em: EntityManager,
    private readonly keycloak: KeycloakService,
  ) {}

  private static nowPlusSeconds(
    sec: number | undefined,
    fallbackSeconds: number,
  ): Date {
    const s =
      typeof sec === 'number' && Number.isFinite(sec) && sec > 0
        ? sec
        : fallbackSeconds;
    return new Date(Date.now() + s * 1000);
  }

  private static extractEmailFromClaims(
    claims: Record<string, unknown> | null,
  ): string | null {
    if (!claims) return null;
    const email = typeof claims.email === 'string' ? claims.email : null;
    const preferred =
      typeof claims.preferred_username === 'string'
        ? claims.preferred_username
        : null;
    return email || preferred;
  }

  private static normalizeMe(
    claims: Record<string, unknown> | null,
  ): SessionUser {
    const email = SessionService.extractEmailFromClaims(claims);
    const roles =
      claims && typeof claims.realm_access === 'object' && claims.realm_access
        ? (() => {
            const ra = claims.realm_access as Record<string, unknown>;
            const r = ra.roles;
            return Array.isArray(r)
              ? r.filter((x): x is string => typeof x === 'string')
              : null;
          })()
        : null;
    const groups = claims
      ? (() => {
          const g = (claims as Record<string, unknown>).groups;
          return Array.isArray(g)
            ? g.filter((x): x is string => typeof x === 'string')
            : null;
        })()
      : null;

    return {
      ok: true,
      email,
      name: claims && typeof claims.name === 'string' ? claims.name : null,
      given_name:
        claims && typeof claims.given_name === 'string'
          ? claims.given_name
          : null,
      family_name:
        claims && typeof claims.family_name === 'string'
          ? claims.family_name
          : null,
      preferred_username:
        claims && typeof claims.preferred_username === 'string'
          ? claims.preferred_username
          : null,
      roles,
      groups,
    };
  }

  async createSessionFromPasswordLogin(input: {
    username: string;
    password: string;
  }): Promise<{ sessionId: string }> {
    const tokens = await this.keycloak.passwordLogin({
      username: input.username,
      password: input.password,
    });
    if (!tokens.refreshToken) {
      // We require refresh token because session is server-side and must refresh silently.
      throw new Error('missing_refresh_token');
    }

    const claims = decodeJwtPayload(tokens.accessToken);
    const email = SessionService.extractEmailFromClaims(claims);
    const sessionId = randomUUID();

    const s = new AuthSession();
    s.id = sessionId;
    s.email = email;
    s.accessToken = tokens.accessToken;
    s.refreshToken = tokens.refreshToken;
    s.accessExpiresAt = SessionService.nowPlusSeconds(
      tokens.expiresIn,
      15 * 60,
    );
    s.refreshExpiresAt = tokens.refreshExpiresIn
      ? SessionService.nowPlusSeconds(
          tokens.refreshExpiresIn,
          30 * 24 * 60 * 60,
        )
      : null;

    await this.em.persistAndFlush(s);
    return { sessionId };
  }

  private async findSession(sessionId: string): Promise<AuthSession | null> {
    const s = await this.em.findOne(AuthSession, { id: sessionId });
    if (!s) return null;
    if (s.revokedAt) return null;
    return s;
  }

  async revokeSession(sessionId: string): Promise<void> {
    const s = await this.em.findOne(AuthSession, { id: sessionId });
    if (!s) return;
    if (!s.revokedAt) {
      s.revokedAt = new Date();
      await this.em.persistAndFlush(s);
    }
    // best-effort upstream logout
    await this.keycloak
      .logoutRefreshToken({ refreshToken: s.refreshToken })
      .catch(() => {});
  }

  async getAccessTokenForSession(
    sessionId: string,
  ): Promise<{ accessToken: string }> {
    const s = await this.findSession(sessionId);
    if (!s) throw new Error('unauthorized');

    // Refresh access token slightly before expiry to avoid edge 401s.
    const refreshSkewMs = 30_000;
    const isAccessValid =
      s.accessExpiresAt.getTime() - Date.now() > refreshSkewMs;
    if (isAccessValid) return { accessToken: s.accessToken };

    // If refresh token is expired (best-effort), revoke.
    if (s.refreshExpiresAt && s.refreshExpiresAt.getTime() <= Date.now()) {
      await this.revokeSession(sessionId);
      throw new Error('unauthorized');
    }

    const tokens = await this.keycloak.exchangeRefreshToken({
      refreshToken: s.refreshToken,
    });
    if (!tokens.refreshToken) {
      // Some KC setups may omit refresh_token on refresh; keep existing refresh token.
      s.accessToken = tokens.accessToken;
      s.accessExpiresAt = SessionService.nowPlusSeconds(
        tokens.expiresIn,
        15 * 60,
      );
    } else {
      s.accessToken = tokens.accessToken;
      s.refreshToken = tokens.refreshToken;
      s.accessExpiresAt = SessionService.nowPlusSeconds(
        tokens.expiresIn,
        15 * 60,
      );
      s.refreshExpiresAt = tokens.refreshExpiresIn
        ? SessionService.nowPlusSeconds(
            tokens.refreshExpiresIn,
            30 * 24 * 60 * 60,
          )
        : (s.refreshExpiresAt ?? null);
    }

    await this.em.persistAndFlush(s);
    return { accessToken: s.accessToken };
  }

  async getMeForSession(sessionId: string): Promise<SessionUser> {
    const { accessToken } = await this.getAccessTokenForSession(sessionId);
    const claims = decodeJwtPayload(accessToken);
    if (!claims) throw new Error('unauthorized');
    return SessionService.normalizeMe(claims);
  }
}
