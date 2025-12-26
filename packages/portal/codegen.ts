import type { CodegenConfig } from "@graphql-codegen/cli"

import fs from "node:fs"
import path from "node:path"

/**
 * Local dev uses a custom root CA (mkcert / traefik) stored in infra.
 * Next.js dev script already sets NODE_EXTRA_CA_CERTS, but codegen is a separate process.
 */
const defaultCaPath = path.resolve(__dirname, "../../infra/traefik/certs/rootCA.pem")
if (!process.env.NODE_EXTRA_CA_CERTS && fs.existsSync(defaultCaPath)) {
  process.env.NODE_EXTRA_CA_CERTS = defaultCaPath
}

/**
 * Last-resort escape hatch for self-signed certs if you don't have the CA file.
 * Enable with: CODEGEN_INSECURE_TLS=1 pnpm run gql:codegen
 */
if (process.env.CODEGEN_INSECURE_TLS === "1") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
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


