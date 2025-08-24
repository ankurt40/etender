import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
      isVerified?: boolean
      contractor?: {
        id: string
        companyName?: string
      } | null
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string
    isVerified?: boolean
    contractor?: {
      id: string
      companyName?: string
    } | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    isVerified?: boolean
    contractor?: {
      id: string
      companyName?: string
    } | null
  }
}
