import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { D1Adapter } from '@auth/d1-adapter'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: D1Adapter(process.env.D1 as any), // Use your D1 binding
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.AUTH_SECRET ?? 'fallback-secret-for-dev',
  session: {
    strategy: 'database', // ✅ Use database sessions (no JWT expiry issues)
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async session({ session, user }: any) {
      if (user) {
        session.user.id = user.id
      }
      return session
    },
  },
})