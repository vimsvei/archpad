import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    given_name?: string
    family_name?: string
  }
  
  interface Session {
    user: {
      name?: string
      email?: string
      given_name?: string
      family_name?: string
    }
  }
}
