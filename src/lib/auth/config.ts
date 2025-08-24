/**
 * Simplified Authentication configuration using NextAuth.js
 * Removed Firebase complexity to keep authentication simple and working
 */

import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// Demo accounts for testing
const demoAccounts = {
  contractor: {
    email: 'demo@tendergenix.com',
    password: 'demo123',
    role: 'CONTRACTOR'
  },
  admin: {
    email: 'admin@tendergenix.com',
    password: 'admin123',
    role: 'ADMIN'
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Demo contractor account
        if (credentials.email === demoAccounts.contractor.email &&
            credentials.password === demoAccounts.contractor.password) {
          return {
            id: "demo-contractor",
            email: demoAccounts.contractor.email,
            name: "Demo Contractor",
            role: "CONTRACTOR",
            isVerified: true,
            contractor: {
              id: "demo-contractor",
              companyName: "Demo Construction Ltd"
            }
          }
        }

        // Admin account
        if (credentials.email === demoAccounts.admin.email &&
            credentials.password === demoAccounts.admin.password) {
          return {
            id: "admin-user",
            email: demoAccounts.admin.email,
            name: "Admin User",
            role: "ADMIN",
            isVerified: true,
            contractor: null
          }
        }

        return null
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.isVerified = user.isVerified
        token.contractor = user.contractor
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.isVerified = token.isVerified as boolean
        session.user.contractor = token.contractor as { id: string; companyName?: string } | null
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin"
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development"
}
