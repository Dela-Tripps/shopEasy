import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function GET(request: NextRequest) {
  try {
    // ✅ Pass the request object directly to getToken
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
      cookieName: 'next-auth.session-token', // default name
    })

    // ✅ Get cookies from the request
    const allCookies = request.cookies.getAll()

    return NextResponse.json({
      hasToken: !!token,
      token: token || null,
      allCookies: allCookies.map((c) => ({
        name: c.name,
        value: c.value,
        valuePreview: c.value?.slice(0, 20) + '...',
      })),
      envVarsPresent: {
        NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
        AUTH_SECRET: !!process.env.AUTH_SECRET,
      },
      requestUrl: request.url,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Unknown error' },
      { status: 500 }
    )
  }
}