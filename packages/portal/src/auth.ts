import NextAuth from "next-auth"
import Keycloak from "next-auth/providers/keycloak"

export const { handlers, signIn, signOut, auth } = NextAuth(req => {
  if (req) {
    console.log(req)
  }
  return {
    providers: [Keycloak]
  }
})
