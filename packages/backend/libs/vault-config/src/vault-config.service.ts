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
  private readonly options: Required<VaultConfigOptions>;
  private secrets: Record<string, string> = {};

  constructor(options?: VaultConfigOptions) {
    const nodeEnv = options?.nodeEnv || process.env.NODE_ENV || 'development';
    const vaultToken = process.env.VAULT_TOKEN || process.env.VAULT_DEV_ROOT_TOKEN_ID;
    
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

    this.options = {
      address: vaultAddr,
      token: options?.token || vaultToken || '',
      secretsPath: options?.secretsPath || 'kv/data/archpad',
      enabled,
      nodeEnv,
    };

    this.logger.log(`Vault configuration: address=${vaultAddr}, nodeEnv=${nodeEnv}, enabled=${enabled}`);
  }

  async onModuleInit() {
    if (!this.options.enabled) {
      this.logger.log('Vault integration is disabled (using environment variables from Vault Agent Injector)');
      return;
    }

    // В Kubernetes секреты уже загружены через Vault Agent Injector в переменные окружения
    // Проверяем, есть ли уже секреты в переменных окружения
    const hasEnvSecrets = process.env.PROJECT_DB || process.env.TENANT_DB || process.env.HASURA_ENDPOINT;
    if (hasEnvSecrets && this.options.nodeEnv !== 'local') {
      this.logger.log('Secrets already loaded from Vault Agent Injector (using environment variables)');
      return;
    }

    if (!this.options.token) {
      this.logger.warn('Vault token is not provided, skipping Vault secrets loading');
      return;
    }

    try {
      await this.loadSecrets();
      this.logger.log('Successfully loaded secrets from Vault API');
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            const errorStack = error instanceof Error ? error.stack : undefined;
            this.logger.error(`Failed to load secrets from Vault: ${errorMessage}`, errorStack);
            // Don't throw - allow app to start with fallback to env vars
          }
  }

  private async loadSecrets(): Promise<void> {
    const url = `${this.options.address}/v1/${this.options.secretsPath}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Vault-Token': this.options.token,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        this.logger.warn(`Secrets path ${this.options.secretsPath} not found in Vault`);
        return;
      }
      throw new Error(`Vault API error: ${response.status} ${response.statusText}`);
    }

    const data: VaultSecretData = await response.json();
    const secrets = data.data?.data || {};

    // Set environment variables from Vault secrets
    for (const [key, value] of Object.entries(secrets)) {
      if (!process.env[key]) {
        process.env[key] = value;
        this.secrets[key] = value;
      }
    }

    this.logger.log(`Loaded ${Object.keys(this.secrets).length} secrets from Vault`);
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
