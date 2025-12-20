import type { CodegenConfig } from "@graphql-codegen/cli"

const endpoint =
  process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT ??
  process.env.HASURA_GRAPHQL_ENDPOINT

if (!endpoint) {
  // eslint-disable-next-line no-console
  console.warn(
    "[codegen] Missing NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT (or HASURA_GRAPHQL_ENDPOINT). " +
      "Set it to your Hasura GraphQL URL to generate types."
  )
}

const adminSecret = process.env.HASURA_GRAPHQL_ADMIN_SECRET

const config: CodegenConfig = {
  schema: endpoint
    ? [
        {
          [endpoint]: {
            headers: {
              ...(adminSecret ? { "x-hasura-admin-secret": adminSecret } : {}),
            },
          },
        },
      ]
    : [],

  /**
   * We keep .gql files as "source of truth".
   * Runtime loads them from `/public/graphql/*` (Turbopack-friendly).
   * Codegen reads the same files to generate operation typings.
   */
  documents: ["public/graphql/**/*.{gql,graphql}"],

  generates: {
    "src/graphql/generated/operations.ts": {
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


