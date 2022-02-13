import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // Only rewrite requests to `/`, as _middleware on the `/pages` root will be executed in every request of the app.
  if (req.nextUrl.pathname === '/') {
    // Parse the cookie
    const isInBeta = JSON.parse(req.cookies['beta'] || 'false')
    const access_token = JSON.parse(req.cookies['access_token'] || 'false')

    const res = NextResponse.rewrite(`/${isInBeta ? 'beta' : 'non-beta'}`)

    if(!access_token) {
      return res.clearCookie('access_token').clearCookie('refresh_token');
    }

    // Rewrite to the correct page
    return res
  }
}
