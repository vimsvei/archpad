export interface VaultConfigOptions {
  /**
   * Vault server address (default: determined by nodeEnv or http://localhost:8200)
   */
  address?: string;

  /**
   * Vault token for authentication
   */
  token?: string;

  /**
   * Path to secrets in KV v2 engine (default: kv/data/archpad)
   */
  secretsPath?: string;

  /**
   * Multiple paths to secrets in KV v2 engine.
   * If provided, will be loaded in order and merged into process.env (without overwriting existing keys).
   * Back-compat: if only `secretsPath` is provided, it is treated as a single-element list.
   */
  secretsPaths?: string[];

  /**
   * Whether to enable Vault integration (default: true if VAULT_ADDR is set)
   */
  enabled?: boolean;

  /**
   * Node environment (local, development, production, etc.)
   * If 'local', uses https://vault.192-168-1-119.sslip.io
   * Otherwise uses http://vault:8200 or VAULT_ADDR
   */
  nodeEnv?: string;
}
