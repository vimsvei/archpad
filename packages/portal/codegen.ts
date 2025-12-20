import type { CodegenConfig } from "@graphql-codegen/cli"

const endpoint = 'https://apim.192-168-1-119.sslip.io/v1/graphql'
const adminSecret = 'lvtrX69YsvhQhlsYYEq1IkIWl0csKw0oSzXe'

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
  
  documents: ["public/graphql/**/*.{gql,graphql}"],

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


