import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const { handlers: { GET, POST } } = NextAuth({
  providers: [
    KeycloakProvider({
      issuer: process.env.KEYCLOAK_ISSUER,
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: "",
      authorization: { params: { scope: "openid profile email" } },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) { if (account?.access_token) (token as any).accessToken = account.access_token; return token as any; },
    async session({ session, token }) { (session as any).accessToken = (token as any).accessToken; return session as any; },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
