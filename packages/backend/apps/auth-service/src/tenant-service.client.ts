import { Injectable } from '@nestjs/common';

type EnsureUserProfileResponse = {
  id: string;
  keycloakId: string;
};

@Injectable()
export class TenantServiceClient {
  private getBaseUrl(): string {
    return (
      (process.env.TENANT_SERVICE_INTERNAL_URL || '').trim() ||
      'http://tenant-service:3000'
    );
  }

  private getInternalToken(): string {
    const t = (process.env.INTERNAL_SERVICE_TOKEN || '').trim();
    if (!t) throw new Error('INTERNAL_SERVICE_TOKEN must be set');
    return t;
  }

  async ensureUserProfile(input: {
    keycloakId: string;
    middleName?: string;
  }): Promise<EnsureUserProfileResponse> {
    const url = new URL('/internal/user-profiles/ensure', this.getBaseUrl());
    const res = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-internal-token': this.getInternalToken(),
      },
      body: JSON.stringify(input),
    });
    const json = (await res.json().catch(() => null)) as any;
    if (!res.ok) {
      const msg =
        (json && (json.message || json.error)) ||
        `tenant_service_error (${res.status})`;
      throw new Error(String(msg));
    }
    return json as EnsureUserProfileResponse;
  }

  async getUserProfileByKeycloakId(keycloakId: string): Promise<any | null> {
    const kc = String(keycloakId ?? '').trim();
    if (!kc) return null;
    const url = new URL(
      `/internal/user-profiles/by-keycloak-id/${encodeURIComponent(kc)}`,
      this.getBaseUrl(),
    );
    const res = await fetch(url.toString(), {
      headers: {
        'x-internal-token': this.getInternalToken(),
      },
    });
    if (res.status === 404) return null;
    const json = (await res.json().catch(() => null)) as any;
    if (!res.ok) {
      const msg =
        (json && (json.message || json.error)) ||
        `tenant_service_error (${res.status})`;
      throw new Error(String(msg));
    }
    return json;
  }
}

