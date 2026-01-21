import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import type { VaultConfigOptions } from './vault-config.interface';

interface VaultSecretData {
  data?: {
    data?: Record<string, string>;
  };
}

@Injectable()
export class VaultConfigService implements OnModuleInit {
  private readonly logger = new Logger(VaultConfigService.name);
  private readonly options: Required<Omit<VaultConfigOptions, 'secretsPath' | 'secretsPaths'>> & {
    secretsPaths: string[];
  };
  private secrets: Record<string, string> = {};
  private loaded = false;
  private loadSummary:
    | {
        startedAtIso: string;
        totalMs: number;
        paths: Array<{
          path: string;
          fetchedKeys: number;
          appliedKeys: number;
          skippedKeys: number;
          ms: number;
          appliedKeyNames: string[];
        }>;
      }
    | undefined;

  constructor(options?: VaultConfigOptions) {
    const nodeEnv = options?.nodeEnv || process.env.NODE_ENV || 'development';
    const vaultToken =
      process.env.VAULT_TOKEN || process.env.VAULT_DEV_ROOT_TOKEN_ID;

    // Determine Vault address based on environment
    let vaultAddr: string;
    if (options?.address) {
      vaultAddr = options.address;
    } else if (process.env.VAULT_ADDR) {
      vaultAddr = process.env.VAULT_ADDR;
    } else if (nodeEnv === 'local') {
      // Local development: use HTTPS endpoint
      vaultAddr = 'https://vault.192-168-1-119.sslip.io';
    } else {
      // Docker/Production: use internal service name
      vaultAddr = 'http://vault:8200';
    }

    const enabled = options?.enabled ?? !!vaultAddr;

    const secretsPathsRaw = Array.isArray(options?.secretsPaths)
      ? options!.secretsPaths!
      : options?.secretsPath
        ? [options.secretsPath]
        : ['kv/data/archpad'];
    const secretsPaths = secretsPathsRaw
      .map((p) => (p ?? '').trim())
      .filter(Boolean);

    this.options = {
      address: vaultAddr,
      token: options?.token || vaultToken || '',
      secretsPaths,
      enabled,
      nodeEnv,
    };

    this.logger.log(
      `Vault configuration: address=${vaultAddr}, nodeEnv=${nodeEnv}, enabled=${enabled}, secretsPaths=${secretsPaths.length}`,
    );
  }

  async onModuleInit() {
    await this.ensureLoaded();
  }

  /**
   * Ensure secrets are loaded (safe to call multiple times).
   * Intended to be called from early bootstrap paths (e.g. before MikroORM config).
   */
  async ensureLoaded(): Promise<void> {
    if (this.loaded) return;
    if (!this.options.enabled) {
      this.loaded = true;
      return;
    }

    // In Kubernetes, secrets are typically injected as env vars via Vault Agent Injector.
    // IMPORTANT: don't skip Vault API just because *some* env vars exist (e.g. PROJECT_DB);
    // we only skip when DB credentials and connection info are already present.
    const hasDbCreds = !!(
      process.env.PROJECT_DB_USER && process.env.PROJECT_DB_PASSWORD
    );
    const hasDbConnInfo = !!(
      process.env.POSTGRES_ENDPOINT ||
      process.env.POSTGRES_HOST ||
      process.env.PG_ENDPOINT ||
      process.env.PG_HOST
    );
    if (hasDbCreds && hasDbConnInfo && this.options.nodeEnv !== 'local') {
      this.loaded = true;
      return;
    }

    if (!this.options.token) {
      this.logger.warn('Vault token is not provided, skipping Vault API loading');
      this.loaded = true;
      return;
    }

    const startedAtIso = new Date().toISOString();
    const startedAtMs = Date.now();
    const perPath: Array<{
      path: string;
      fetchedKeys: number;
      appliedKeys: number;
      skippedKeys: number;
      ms: number;
      appliedKeyNames: string[];
    }> = [];

    try {
      for (const secretsPath of this.options.secretsPaths) {
        const stats = await this.loadSecretsFromPath(secretsPath);
        perPath.push(stats);
      }
      this.loaded = true;
      const totalMs = Date.now() - startedAtMs;
      this.loadSummary = { startedAtIso, totalMs, paths: perPath };

      const totalFetched = perPath.reduce((acc, p) => acc + p.fetchedKeys, 0);
      const totalApplied = perPath.reduce((acc, p) => acc + p.appliedKeys, 0);
      const totalSkipped = perPath.reduce((acc, p) => acc + p.skippedKeys, 0);

      this.logger.log(
        `Vault secrets loaded: paths=${this.options.secretsPaths.length}, fetchedKeys=${totalFetched}, appliedKeys=${totalApplied}, skippedKeys=${totalSkipped}, totalMs=${totalMs}, startedAt=${startedAtIso}`,
      );
      for (const p of perPath) {
        this.logger.debug(
          `Vault path loaded: path=${p.path}, fetchedKeys=${p.fetchedKeys}, appliedKeys=${p.appliedKeys}, skippedKeys=${p.skippedKeys}, ms=${p.ms}, appliedKeys=[${p.appliedKeyNames.join(
            ', ',
          )}]`,
        );
      }
    } catch (error) {
      this.loaded = true; // do not block service startup
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      const errorStack = error instanceof Error ? error.stack : undefined;
      this.logger.error(
        `Failed to load secrets from Vault: ${errorMessage}`,
        errorStack,
      );
    }
  }

  private async loadSecretsFromPath(secretsPath: string): Promise<{
    path: string;
    fetchedKeys: number;
    appliedKeys: number;
    skippedKeys: number;
    ms: number;
    appliedKeyNames: string[];
  }> {
    const startedAtMs = Date.now();
    const url = `${this.options.address}/v1/${secretsPath}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Vault-Token': this.options.token,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        this.logger.warn(
          `Secrets path ${secretsPath} not found in Vault`,
        );
        return {
          path: secretsPath,
          fetchedKeys: 0,
          appliedKeys: 0,
          skippedKeys: 0,
          ms: Date.now() - startedAtMs,
          appliedKeyNames: [],
        };
      }
      throw new Error(
        `Vault API error: ${response.status} ${response.statusText}`,
      );
    }

    const data: VaultSecretData = await response.json();
    const secrets = data.data?.data || {};
    const fetchedKeys = Object.keys(secrets).length;
    let appliedKeys = 0;
    let skippedKeys = 0;
    const appliedKeyNames: string[] = [];

    // Set environment variables from Vault secrets (do not overwrite existing keys).
    for (const [key, value] of Object.entries(secrets)) {
      if (!process.env[key]) {
        process.env[key] = value;
        this.secrets[key] = value;
        appliedKeys += 1;
        appliedKeyNames.push(key);
      } else {
        skippedKeys += 1;
      }
    }

    const ms = Date.now() - startedAtMs;
    this.logger.log(
      `Loaded secrets from Vault path=${secretsPath} fetchedKeys=${fetchedKeys} appliedKeys=${appliedKeys} skippedKeys=${skippedKeys} ms=${ms}`,
    );

    return {
      path: secretsPath,
      fetchedKeys,
      appliedKeys,
      skippedKeys,
      ms,
      appliedKeyNames: appliedKeyNames.sort(),
    };
  }

  /**
   * Get a secret value (from cache or env)
   */
  get(key: string): string | undefined {
    return this.secrets[key] || process.env[key];
  }

  /**
   * Get all loaded secrets
   */
  getAll(): Record<string, string> {
    return { ...this.secrets };
  }
}
