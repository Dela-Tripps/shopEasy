import { NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname

  const publicRoutes = ['/', '/products', '/products/:path*', '/login', '/api/webhooks']
  const adminRoutes = ['/admin', '/admin/:path*']

  const isPublicRoute = publicRoutes.some(route => {
    if (route.includes(':path*')) {
      const base = route.replace(':path*', '')
      return path.startsWith(base)
    }
    return path === route
  })

  const isAdminRoute = adminRoutes.some(route => {
    if (route.includes(':path*')) {
      const base = route.replace(':path*', '')
      return path.startsWith(base)
    }
    return path === route
  })

  const response = NextResponse.next()
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // ✅ Fix: Allow 'unsafe-eval' in development for React devtools
  const isDev = process.env.NODE_ENV === 'development'
  response.headers.set(
    'Content-Security-Policy',
    isDev
      ? "default-src 'self' 'unsafe-eval'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.paystack.co; style-src 'self' 'unsafe-inline'; img-src 'self' https://*.r2.cloudflarestorage.com https://lh3.googleusercontent.com data:;"
      : "default-src 'self'; script-src 'self' 'unsafe-inline' https://js.paystack.co; style-src 'self' 'unsafe-inline'; img-src 'self' https://*.r2.cloudflarestorage.com https://lh3.googleusercontent.com data:;"
  )

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}