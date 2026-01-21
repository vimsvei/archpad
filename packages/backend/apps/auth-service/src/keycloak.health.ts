export type KeycloakHealthResult = {
  ok: boolean;
  realm: string;
  baseUrl: string;
  checks: {
    discovery: {
      ok: boolean;
      status?: number;
      issuer?: string;
      error?: string;
    };
    serviceToken: { ok: boolean; error?: string };
    clients?: {
      ok: boolean;
      required: string[];
      found?: string[];
      error?: string;
    };
  };
};
