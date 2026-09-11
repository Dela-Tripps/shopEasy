import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

const { handlers } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (
          credentials?.email === 'admin@shopeasy.com' &&
          credentials?.password === 'admin123'
        ) {
          return {
            id: '1',
            name: 'Admin',
            email: 'admin@shopeasy.com',
          }
        }
        return null
      },
    }),
  ],
  secret: process.env.AUTH_SECRET ?? 'fallback-secret-for-dev',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  // ✅ Add explicit cookie settings for local development
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false, // ❗ false for localhost (http)
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.sub = user.id
        token.email = user.email
      }
      const now = Math.floor(Date.now() / 1000)
      token.exp = now + 30 * 24 * 60 * 60
      return token
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.email = token.email as string
      }
      return session
    },
  },
})

export const { GET, POST } = handlers