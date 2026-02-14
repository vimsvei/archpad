import { Injectable } from '@nestjs/common';
import { VaultConfigService } from '@archpad/vault-config';
import type { KeycloakHealthResult } from './keycloak.health';

type TokenResponse = {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in?: number;
  refresh_expires_in?: number;
  scope?: string;
  error?: string;
  error_description?: string;
};

type RealmRoleRepresentation = {
  id?: string;
  name: string;
};

@Injectable()
export class KeycloakService {
  constructor(private readonly vault: VaultConfigService) {}

  private getKeycloakBaseUrl(): string {
    const internal = process.env.KEYCLOAK_INTERNAL_URL?.trim();
    const defaultInternal = 'http://keycloak.secure.svc:8080';
    const url = internal || defaultInternal;
    if (!url) throw new Error('KEYCLOAK_INTERNAL_URL must be set');
    return url;
  }

  private getRealm(): string {
    return process.env.KEYCLOAK_REALM?.trim() || 'archpad';
  }

  private getOidcClientId(): string {
    return (
      process.env.OIDC_CLIENT_ID ||
      process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID ||
      ''
    ).trim();
  }

  private getOidcClientSecret(): string {
    const s = (
      process.env.OIDC_CLIENT_SECRET ||
      process.env.KEYCLOAK_CLIENT_SECRET ||
      ''
    ).trim();
    if (!s) throw new Error('OIDC_CLIENT_SECRET must be set');
    return s;
  }

  private getServiceClientId(): string {
    const s = (process.env.KEYCLOAK_SERVICE_CLIENT_ID || '').trim();
    if (!s) throw new Error('KEYCLOAK_SERVICE_CLIENT_ID must be set');
    return s;
  }

  private getServiceClientSecret(): string {
    const s = (process.env.KEYCLOAK_SERVICE_CLIENT_SECRET || '').trim();
    if (!s) throw new Error('KEYCLOAK_SERVICE_CLIENT_SECRET must be set');
    return s;
  }

  private async tokenRequest(body: URLSearchParams): Promise<{
    accessToken: string;
    refreshToken?: string;
    expiresIn?: number;
    refreshExpiresIn?: number;
  }> {
    // Ensure VaultConfigService has loaded in local dev (no-op in prod when injected via env).
    await this.vault.ensureLoaded();

    const base = this.getKeycloakBaseUrl();
    const realm = this.getRealm();
    const tokenUrl = new URL(
      `/realms/${realm}/protocol/openid-connect/token`,
      base,
    );

    const clientId = this.getOidcClientId();
    const clientSecret = this.getOidcClientSecret();
    if (!clientId) throw new Error('OIDC_CLIENT_ID must be set');

    body.set('client_id', clientId);

    const res = await fetch(tokenUrl.toString(), {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: body.toString(),
    });

    const json = (await res.json().catch(() => ({}))) as Partial<TokenResponse>;
    if (!res.ok || !json.access_token) {
      throw new Error(
        json.error_description ??
          json.error ??
          `token_request_failed (${res.status})`,
      );
    }
    return {
      accessToken: json.access_token,
      refreshToken: json.refresh_token,
      expiresIn:
        typeof json.expires_in === 'number' ? json.expires_in : undefined,
      refreshExpiresIn:
        typeof json.refresh_expires_in === 'number'
          ? json.refresh_expires_in
          : undefined,
    };
  }

  async passwordLogin(input: {
    username: string;
    password: string;
    scope?: string;
  }) {
    const body = new URLSearchParams();
    body.set('grant_type', 'password');
    body.set('username', input.username);
    body.set('password', input.password);
    body.set('scope', input.scope ?? 'openid profile email offline_access');
    return this.tokenRequest(body);
  }

  async exchangeRefreshToken(input: { refreshToken: string }) {
    const body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', input.refreshToken);
    return this.tokenRequest(body);
  }

  async logoutRefreshToken(input: { refreshToken: string }): Promise<void> {
    await this.vault.ensureLoaded();

    const base = this.getKeycloakBaseUrl();
    const realm = this.getRealm();
    const clientId = this.getOidcClientId();
    const clientSecret = this.getOidcClientSecret();
    const url = new URL(
      `/realms/${realm}/protocol/openid-connect/logout`,
      base,
    );

    const body = new URLSearchParams();
    body.set('client_id', clientId);
    body.set('refresh_token', input.refreshToken);

    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: body.toString(),
    });

    // Keycloak typically returns 204; 400 if token already invalidated.
    if (!res.ok && res.status !== 400) {
      const text = await res.text().catch(() => '');
      throw new Error(`logout_failed (${res.status}) ${text.slice(0, 200)}`);
    }
  }

  private async getServiceAccessToken(): Promise<string> {
    await this.vault.ensureLoaded();

    const base = this.getKeycloakBaseUrl();
    const realm = this.getRealm();
    const clientId = this.getServiceClientId();
    const clientSecret = this.getServiceClientSecret();

    const tokenUrl = new URL(
      `/realms/${realm}/protocol/openid-connect/token`,
      base,
    );
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', clientId);

    const res = await fetch(tokenUrl.toString(), {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: body.toString(),
    });

    const json = (await res.json().catch(() => ({}))) as Partial<TokenResponse>;
    if (!res.ok || !json.access_token) {
      throw new Error(
        json.error_description ??
          json.error ??
          `service_token_failed (${res.status})`,
      );
    }
    return json.access_token;
  }

  async checkHealth(input?: {
    requiredClients?: string[];
  }): Promise<KeycloakHealthResult> {
    await this.vault.ensureLoaded();

    const base = this.getKeycloakBaseUrl();
    const realm = this.getRealm();

    const out: KeycloakHealthResult = {
      ok: false,
      realm,
      baseUrl: base,
      checks: {
        discovery: { ok: false },
        serviceToken: { ok: false },
      },
    };

    // 1) OIDC discovery (realm existence + issuer correctness)
    try {
      const url = new URL(
        `/realms/${realm}/.well-known/openid-configuration`,
        base,
      );
      const res = await fetch(url.toString(), { method: 'GET' });
      out.checks.discovery.status = res.status;
      if (res.ok) {
        const json = (await res.json().catch(() => null)) as any;
        out.checks.discovery.ok = true;
        out.checks.discovery.issuer =
          typeof json?.issuer === 'string' ? json.issuer : undefined;
      } else {
        const text = await res.text().catch(() => '');
        out.checks.discovery.error = text.slice(0, 200);
      }
    } catch (e: unknown) {
      out.checks.discovery.error = e instanceof Error ? e.message : String(e);
    }

    // 2) Service token (validates admin/service client + secret)
    let serviceToken: string | null = null;
    try {
      serviceToken = await this.getServiceAccessToken();
      out.checks.serviceToken.ok = true;
    } catch (e: unknown) {
      out.checks.serviceToken.error =
        e instanceof Error ? e.message : String(e);
    }

    // 3) Optional: verify client presence via Admin API (requires view-clients permission)
    const required = input?.requiredClients?.length
      ? input.requiredClients
      : ['archpad-portal', 'portal-admin', 'api'];

    if (serviceToken) {
      try {
        const found = new Set<string>();
        for (const clientId of required) {
          const url = new URL(`/admin/realms/${realm}/clients`, base);
          url.searchParams.set('clientId', clientId);
          const res = await fetch(url.toString(), {
            method: 'GET',
            headers: { authorization: `Bearer ${serviceToken}` },
          });
          if (res.status === 403) {
            out.checks.clients = {
              ok: false,
              required,
              error:
                'forbidden: service account lacks permissions to read clients (grant realm-management: view-clients)',
            };
            break;
          }
          if (!res.ok) {
            const text = await res.text().catch(() => '');
            out.checks.clients = {
              ok: false,
              required,
              error: `clients_check_failed (${res.status}) ${text.slice(0, 200)}`,
            };
            break;
          }
          const arr = (await res.json().catch(() => [])) as Array<{
            clientId?: string;
          }>;
          const match = arr.find((c) => c?.clientId === clientId);
          if (match?.clientId) found.add(match.clientId);
        }

        if (!out.checks.clients) {
          const foundArr = Array.from(found.values()).sort();
          const ok = required.every((c) => found.has(c));
          out.checks.clients = { ok, required, found: foundArr };
        }
      } catch (e: unknown) {
        out.checks.clients = {
          ok: false,
          required,
          error: e instanceof Error ? e.message : String(e),
        };
      }
    }

    out.ok =
      out.checks.discovery.ok &&
      out.checks.serviceToken.ok &&
      (out.checks.clients ? out.checks.clients.ok : true);

    return out;
  }

  async findUserIdByEmail(email: string): Promise<string | null> {
    const token = await this.getServiceAccessToken();
    const base = this.getKeycloakBaseUrl();
    const realm = this.getRealm();
    const url = new URL(`/admin/realms/${realm}/users`, base);
    url.searchParams.set('email', email);
    url.searchParams.set('exact', 'true');

    const res = await fetch(url.toString(), {
      headers: { authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    const arr = (await res.json().catch(() => [])) as Array<{
      id?: string;
      email?: string;
    }>;
    const match = arr.find(
      (u) => (u.email || '').toLowerCase() === email.toLowerCase(),
    );
    return match?.id ?? null;
  }

  private async findGroupIdByName(name: string): Promise<string | null> {
    const token = await this.getServiceAccessToken();
    const base = this.getKeycloakBaseUrl();
    const realm = this.getRealm();
    const url = new URL(`/admin/realms/${realm}/groups`, base);
    url.searchParams.set('search', name);

    const res = await fetch(url.toString(), {
      headers: { authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    const arr = (await res.json().catch(() => [])) as Array<{
      id?: string;
      name?: string;
    }>;
    const match = arr.find((g) => (g.name || '') === name);
    return match?.id ?? null;
  }

  private async createGroup(name: string): Promise<void> {
    const token = await this.getServiceAccessToken();
    const base = this.getKeycloakBaseUrl();
    const realm = this.getRealm();
    const url = new URL(`/admin/realms/${realm}/groups`, base);
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    // 201 expected; 409 if exists
    if (!res.ok && res.status !== 409) {
      const text = await res.text().catch(() => '');
      throw new Error(
        `create_group_failed (${res.status}) ${text.slice(0, 200)}`,
      );
    }
  }

  private async addUserToGroup(userId: string, groupId: string): Promise<void> {
    const token = await this.getServiceAccessToken();
    const base = this.getKeycloakBaseUrl();
    const realm = this.getRealm();
    const url = new URL(
      `/admin/realms/${realm}/users/${userId}/groups/${groupId}`,
      base,
    );
    const res = await fetch(url.toString(), {
      method: 'PUT',
      headers: { authorization: `Bearer ${token}` },
    });
    // 204 expected; some proxies may return 409 if already a member
    if (!res.ok && res.status !== 409) {
      const text = await res.text().catch(() => '');
      throw new Error(
        `add_user_to_group_failed (${res.status}) ${text.slice(0, 200)}`,
      );
    }
  }

  private async getRealmRole(name: string): Promise<RealmRoleRepresentation | null> {
    const token = await this.getServiceAccessToken();
    const base = this.getKeycloakBaseUrl();
    const realm = this.getRealm();
    const url = new URL(`/admin/realms/${realm}/roles/${name}`, base);
    const res = await fetch(url.toString(), {
      headers: { authorization: `Bearer ${token}` },
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(
        `get_realm_role_failed (${res.status}) ${text.slice(0, 200)}`,
      );
    }
    const json = (await res.json().catch(() => null)) as any;
    if (!json || typeof json.name !== 'string') return null;
    return json as RealmRoleRepresentation;
  }

  private async createRealmRole(name: string): Promise<void> {
    const token = await this.getServiceAccessToken();
    const base = this.getKeycloakBaseUrl();
    const realm = this.getRealm();
    const url = new URL(`/admin/realms/${realm}/roles`, base);
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    // 201 expected; 409 if exists
    if (!res.ok && res.status !== 409) {
      const text = await res.text().catch(() => '');
      throw new Error(
        `create_realm_role_failed (${res.status}) ${text.slice(0, 200)}`,
      );
    }
  }

  async ensureDesiredRealmRoles(roleNames: string[]): Promise<void> {
    for (const name of roleNames) {
      const n = (name ?? '').trim();
      if (!n) continue;
      const existing = await this.getRealmRole(n);
      if (existing) continue;
      await this.createRealmRole(n);
    }
  }

  async ensureDesiredGroups(groupNames: string[]): Promise<void> {
    for (const name of groupNames) {
      const n = (name ?? '').trim();
      if (!n) continue;
      const existing = await this.findGroupIdByName(n);
      if (existing) continue;
      await this.createGroup(n);
    }
  }

  private async addRealmRolesToUser(
    userId: string,
    roles: RealmRoleRepresentation[],
  ): Promise<void> {
    const token = await this.getServiceAccessToken();
    const base = this.getKeycloakBaseUrl();
    const realm = this.getRealm();
    const url = new URL(
      `/admin/realms/${realm}/users/${userId}/role-mappings/realm`,
      base,
    );
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(roles),
    });
    // 204 expected; 409 possible if role mapping already exists
    if (!res.ok && res.status !== 409) {
      const text = await res.text().catch(() => '');
      throw new Error(
        `add_realm_roles_failed (${res.status}) ${text.slice(0, 200)}`,
      );
    }
  }

  async ensureDefaultAccessForUser(userId: string): Promise<void> {
    // Default group membership (keep existing "USER" group).
    const groupId = await this.findGroupIdByName('USER');
    if (groupId) {
      await this.addUserToGroup(userId, groupId);
    }

    // Default realm role: VIEWER
    const viewer = await this.getRealmRole('VIEWER');
    if (viewer) {
      await this.addRealmRolesToUser(userId, [viewer]);
    }
  }

  private static extractUserIdFromLocation(location: string | null): string | null {
    if (!location) return null;
    // Typically: .../admin/realms/{realm}/users/{id}
    const parts = location.split('/').filter(Boolean);
    const last = parts[parts.length - 1] || '';
    return last.trim() || null;
  }

  async createUser(input: {
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    requireEmailVerification?: boolean;
    requiredActions?: string[];
    attributes?: Record<string, string[] | string | undefined>;
  }): Promise<{ userId: string; created: boolean }> {
    const token = await this.getServiceAccessToken();
    const base = this.getKeycloakBaseUrl();
    const realm = this.getRealm();
    const url = new URL(`/admin/realms/${realm}/users`, base);

    const requiredActions = new Set<string>();
    if (input.requireEmailVerification) requiredActions.add('VERIFY_EMAIL');
    if (input.requiredActions) {
      for (const action of input.requiredActions) {
        if (action) requiredActions.add(action);
      }
    }

    const attributes = input.attributes
      ? Object.fromEntries(
          Object.entries(input.attributes).filter(
            ([, v]) => v !== undefined && v !== null && v !== '',
          ),
        )
      : undefined;

    const payload: Record<string, unknown> = {
      username: input.email,
      email: input.email,
      enabled: true,
      emailVerified: false,
      firstName: input.firstName,
      lastName: input.lastName,
      attributes: {
        ...(input.phone ? { phone: [input.phone] } : {}),
        ...(attributes ?? {}),
      },
      ...(input.password
        ? { credentials: [{ type: 'password', value: input.password, temporary: false }] }
        : {}),
      ...(requiredActions.size > 0
        ? { requiredActions: Array.from(requiredActions) }
        : {}),
    };

    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (res.status === 409) {
      const existingId = await this.findUserIdByEmail(input.email);
      if (!existingId) throw new Error('user_already_exists');
      return { userId: existingId, created: false };
    }
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(
        `create_user_failed (${res.status}) ${text.slice(0, 200)}`,
      );
    }

    const createdId = KeycloakService.extractUserIdFromLocation(
      res.headers.get('location') ?? res.headers.get('Location'),
    );
    if (createdId) return { userId: createdId, created: true };

    // Fallback: Keycloak does not always return Location (depending on proxy).
    const fallback = await this.findUserIdByEmail(input.email);
    if (!fallback) throw new Error('create_user_succeeded_but_id_not_found');
    return { userId: fallback, created: true };
  }

  async sendExecuteActionsEmail(input: {
    email: string;
    actions: string[];
    clientId?: string;
    redirectUri?: string;
    lifespanSeconds?: number;
  }) {
    const userId = await this.findUserIdByEmail(input.email);
    if (!userId) return;

    const token = await this.getServiceAccessToken();
    const base = this.getKeycloakBaseUrl();
    const realm = this.getRealm();
    const url = new URL(
      `/admin/realms/${realm}/users/${userId}/execute-actions-email`,
      base,
    );
    if (input.clientId) url.searchParams.set('client_id', input.clientId);
    if (input.redirectUri)
      url.searchParams.set('redirect_uri', input.redirectUri);
    if (
      typeof input.lifespanSeconds === 'number' &&
      Number.isFinite(input.lifespanSeconds) &&
      input.lifespanSeconds > 0
    ) {
      url.searchParams.set(
        'lifespan',
        String(Math.floor(input.lifespanSeconds)),
      );
    }

    const res = await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(input.actions),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(
        `execute_actions_failed (${res.status}) ${text.slice(0, 200)}`,
      );
    }
  }

  async setUserPassword(
    userId: string,
    password: string,
    temporary = false,
  ): Promise<void> {
    const token = await this.getServiceAccessToken();
    const base = this.getKeycloakBaseUrl();
    const realm = this.getRealm();
    const url = new URL(
      `/admin/realms/${realm}/users/${userId}/reset-password`,
      base,
    );
    const res = await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        type: 'password',
        value: password,
        temporary: Boolean(temporary),
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(
        `set_password_failed (${res.status}) ${text.slice(0, 200)}`,
      );
    }
  }

  /**
   * Mark user's email as verified and remove VERIFY_EMAIL from required actions.
   * Used when verification is completed via Portal link (our own flow).
   */
  async markEmailVerified(userId: string): Promise<void> {
    const token = await this.getServiceAccessToken();
    const base = this.getKeycloakBaseUrl();
    const realm = this.getRealm();
    const getUserUrl = new URL(
      `/admin/realms/${realm}/users/${userId}`,
      base,
    );
    const getRes = await fetch(getUserUrl.toString(), {
      headers: { authorization: `Bearer ${token}` },
    });
    if (!getRes.ok) {
      const text = await getRes.text().catch(() => '');
      throw new Error(
        `get_user_failed (${getRes.status}) ${text.slice(0, 200)}`,
      );
    }
    const user = (await getRes.json()) as {
      requiredActions?: string[];
      [key: string]: unknown;
    };
    const requiredActions = Array.isArray(user.requiredActions)
      ? user.requiredActions.filter((a) => a !== 'VERIFY_EMAIL')
      : [];

    const putUrl = new URL(`/admin/realms/${realm}/users/${userId}`, base);
    const putRes = await fetch(putUrl.toString(), {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...user,
        emailVerified: true,
        requiredActions,
      }),
    });
    if (!putRes.ok) {
      const text = await putRes.text().catch(() => '');
      throw new Error(
        `update_user_failed (${putRes.status}) ${text.slice(0, 200)}`,
      );
    }
  }
}
