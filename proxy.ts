import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export const proxy = auth((req) => {
  const isLoggedIn = !!req.auth
  const { nextUrl } = req
  const path = nextUrl.pathname

  // Protect admin routes
  if (!isLoggedIn && path.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  // Redirect logged-in users away from login
  if (isLoggedIn && path === '/login') {
    return NextResponse.redirect(new URL('/admin', nextUrl))
  }

  const response = NextResponse.next()

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  const isDev = process.env.NODE_ENV === 'development'
  response.headers.set(
    'Content-Security-Policy',
    isDev
      ? "default-src 'self' 'unsafe-eval'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.paystack.co; style-src 'self' 'unsafe-inline'; img-src 'self' https://*.r2.cloudflarestorage.com https://lh3.googleusercontent.com data:;"
      : "default-src 'self'; script-src 'self' 'unsafe-inline' https://js.paystack.co; style-src 'self' 'unsafe-inline'; img-src 'self' https://*.r2.cloudflarestorage.com https://lh3.googleusercontent.com data:;"
  )

  return response
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}