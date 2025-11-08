import NextAuth from "next-auth"
import Keycloak from "next-auth/providers/keycloak"

const issuer = process.env.AUTH_KEYCLOAK_ISSUER!;
const clientId = process.env.AUTH_KEYCLOAK_ID!;
// const clientSecret = process.env.AUTH_SECRET;


export const { handlers, signIn, signOut, auth } = NextAuth(req => {
  if (req) {
    console.log(req)
  }
  return { providers: [Keycloak] }
})
