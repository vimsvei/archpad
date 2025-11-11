import NextAuth from "next-auth"
import Keycloak from "next-auth/providers/keycloak"

export const { handlers, signIn, signOut, auth } = NextAuth(req => {
  if (req) {
    console.log(req)
  }
  return {
    providers: [
      Keycloak({
        clientId: process.env.AUTH_KEYCLOAK_ID,
        clientSecret: process.env.AUTH_KEYCLOAK_SECRET,
        issuer: process.env.AUTH_KEYCLOAK_ISSUER,
        authorization: {
          params: { scope: "openid profile email" }
        },
        profile(profile) {
          return {
            id: profile.sub,
            email: profile.email,
            name: profile.name || `${profile.given_name} ${profile.family_name}`,
            given_name: profile.given_name,
            family_name: profile.family_name,
          }
        }
      })
    ],
    session: {
      strategy: "jwt"
    }
  }
})
