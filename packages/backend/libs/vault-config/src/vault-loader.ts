/**
 * Utility function to load secrets from Vault before NestJS application initialization
 * This should be called in main.ts before NestFactory.create()
 */
export async function loadVaultSecrets(options?: {
  address?: string;
  token?: string;
  secretsPath?: string;
  secretsPaths?: string[];
  enabled?: boolean;
  nodeEnv?: string;
}): Promise<void> {
  const nodeEnv = options?.nodeEnv || process.env.NODE_ENV || 'development';

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

  // Use token from options, then from environment (VAULT_TOKEN from .env), then fallback to VAULT_TOKEN_ROOT
  const vaultToken =
    options?.token || process.env.VAULT_TOKEN || process.env.VAULT_TOKEN_ROOT;
  const enabled = options?.enabled ?? !!vaultAddr;
  const secretsPaths = (
    options?.secretsPaths?.length
      ? options.secretsPaths
      : options?.secretsPath
        ? [options.secretsPath]
        : (process.env.VAULT_SECRETS_PATHS || '')
            .split(/[\s,]+/)
            .filter(Boolean)
  ).map((p) => p.trim());
  const paths = secretsPaths.length ? secretsPaths : ['kv/data/archpad'];

  console.log(`[Vault] Initializing...`);
  console.log(`[Vault] Address: ${vaultAddr}`);
  if (vaultToken) {
    const tokenPreview =
      vaultToken.length > 13
        ? `${vaultToken.substring(0, 10)}...${vaultToken.substring(vaultToken.length - 3)}`
        : vaultToken;
    console.log(`[Vault] Token: ${tokenPreview}`);
  } else {
    console.log(`[Vault] Token: NOT SET`);
  }
  console.log(`[Vault] Secrets paths: ${paths.join(', ')}`);
  console.log(`[Vault] Enabled: ${enabled}`);

  if (!enabled) {
    console.log('[Vault] Integration is disabled');
    return;
  }

  if (!vaultToken) {
    console.warn(
      '[Vault] Token is not provided, skipping Vault secrets loading',
    );
    console.warn(
      `[Vault] Available env vars: VAULT_ADDR=${process.env.VAULT_ADDR}, VAULT_TOKEN=${process.env.VAULT_TOKEN ? 'SET' : 'NOT SET'}, VAULT_DEV_ROOT_TOKEN_ID=${process.env.VAULT_DEV_ROOT_TOKEN_ID ? 'SET' : 'NOT SET'}`,
    );
    return;
  }

  try {
    let loadedCount = 0;
    let overwrittenCount = 0;

    for (const secretsPath of paths) {
      const url = `${vaultAddr}/v1/${secretsPath}`;
      console.log(`[Vault] Fetching secrets from: ${url}`);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-Vault-Token': vaultToken,
        },
      });

      console.log(
        `[Vault] Response status: ${response.status} ${response.statusText}`,
      );

      if (!response.ok) {
        if (response.status === 404) {
          console.warn(
            `[Vault] Secrets path ${secretsPath} not found in Vault`,
          );
          console.warn(`[Vault] Full URL: ${url}`);
          continue;
        }
        // Try to get error details from response
        let errorDetails = '';
        try {
          const errorData = await response.text();
          errorDetails = ` Response: ${errorData}`;
          console.error(`[Vault] Error response: ${errorData}`);
        } catch {
          // Ignore
        }
        throw new Error(
          `Vault API error: ${response.status} ${response.statusText}${errorDetails}`,
        );
      }

      const data: { data?: { data?: Record<string, string> } } =
        await response.json();
      const secrets = data.data?.data || {};

      for (const [key, value] of Object.entries(secrets)) {
        const wasSet = !!process.env[key];
        process.env[key] = value;
        loadedCount++;
        if (wasSet) overwrittenCount++;
      }
    }

    if (overwrittenCount > 0) {
      console.log(
        `[Vault] Successfully loaded ${loadedCount} secrets from Vault (${overwrittenCount} overwritten)`,
      );
    } else {
      console.log(
        `[Vault] Successfully loaded ${loadedCount} secrets from Vault`,
      );
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[Vault] Failed to load secrets: ${errorMessage}`);
    // Don't throw - allow app to start with fallback to env vars
  }
}
