import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  // Only rewrite requests to `/`, as _middleware on the `/pages` root will be executed in every request of the app.
  if (req.nextUrl.pathname === '/') {
    // Parse the cookie
    const isInBeta = JSON.parse(req.cookies['beta'] || 'false')
    const access_token = JSON.parse(req.cookies['access_token'] || 'false')

    const res = NextResponse.rewrite(`/${isInBeta ? 'beta' : 'non-beta'}`)

    if(!access_token) {

      console.log("Clearing access_token")
      res.cookie('access_token', '', {
        expires: new Date(0), // Same above
      });
      console.log(res.headers.get('Set-Cookie'))

      console.log("Clearing refresh_token")
      res.cookie('refresh_token', '', {
        expires: new Date(0), // Same above
      });
      console.log(res.headers.get('Set-Cookie'))

      return res
    }

    // Rewrite to the correct page
    return res
  }
}

// access_token=true; Path=/; Expires=Wed Dec 31 1969 19:00:00 GMT-0500 (Eastern Standard Time), refresh_token=true; Path=/; Expires=Wed Dec 31 1969 19:00:00 GMT-0500 (Eastern Standard Time)
