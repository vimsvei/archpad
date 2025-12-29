import type { CodegenConfig } from "@graphql-codegen/cli"

import fs from "node:fs"
import path from "node:path"

/**
 * Local dev uses a custom root CA (mkcert / traefik) stored in infra.
 * Next.js dev script already sets NODE_EXTRA_CA_CERTS, but codegen is a separate process.
 * 
 * Only configure TLS when running codegen (not in Next.js runtime).
 * We check multiple conditions to ensure this code only runs during codegen execution.
 */
const isCodegenProcess = (() => {
  // Check if we're in Next.js context - if so, don't run this code
  if (typeof window !== "undefined") return false // Browser
  if (process.env.NEXT_PHASE) return false // Next.js build/runtime
  if (process.env.__NEXT_PRIVATE_PREBUNDLED_REACT) return false // Next.js internal
  if (process.env.NEXT_RUNTIME) return false // Next.js runtime
  
  // Check if we're running codegen
  const isCodegen = 
    process.argv.some(arg => 
      arg.includes("codegen") || 
      arg.includes("graphql-codegen") ||
      arg.includes("--config")
    )
  
  return isCodegen
})()

// Only configure TLS when running codegen
if (isCodegenProcess) {
  const defaultCaPath = path.resolve(__dirname, "../../infra/traefik/certs/rootCA.pem")
  if (!process.env.NODE_EXTRA_CA_CERTS && fs.existsSync(defaultCaPath)) {
    process.env.NODE_EXTRA_CA_CERTS = defaultCaPath
  }

  /**
   * Last-resort escape hatch for self-signed certs if you don't have the CA file.
   * Enable with: CODEGEN_INSECURE_TLS=1 pnpm run gql:codegen
   * 
   * WARNING: Only use this in development with trusted self-signed certificates!
   * This should NEVER be enabled in production!
   */
  if (process.env.CODEGEN_INSECURE_TLS === "1") {
    // Temporarily suppress the warning for codegen process only
    const originalEmit = process.emitWarning
    process.emitWarning = () => {}
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
    // Restore immediately after setting
    process.emitWarning = originalEmit
  }
}

const endpoint =
  process.env.HASURA_GRAPHQL_ENDPOINT ?? "https://apim.192-168-1-119.sslip.io/v1/graphql"
const adminSecret =
  process.env.HASURA_GRAPHQL_ADMIN_SECRET ?? "lvtrX69YsvhQhlsYYEq1IkIWl0csKw0oSzXe"

const config: CodegenConfig = {
  schema: [
    {
      [endpoint]: {
        headers: {
          ...(adminSecret ? { "x-hasura-admin-secret": adminSecret } : {}),
        },
      },
    },
  ],
  
  documents: ["src/**/*.{gql,graphql}"],

  generates: {
    "src/generated/operations.ts": {
      plugins: ["typescript", "typescript-operations"],
      config: {
        // keep operation types simple / predictable
        avoidOptionals: false,
        immutableTypes: false,
      },
    },
  },
}

export default config


