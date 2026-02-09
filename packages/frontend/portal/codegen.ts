import type { CodegenConfig } from "@graphql-codegen/cli"

import dotenv from "dotenv"

dotenv.config()
dotenv.config({ path: ".env.local" })

const endpoint = process.env.HASURA_GRAPHQL_ENDPOINT ?? ""
const adminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET

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
        avoidOptionals: false,
        immutableTypes: false,
      },
    },
  },
}

export default config
