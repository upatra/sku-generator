import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(req: NextRequest) {
  // Clone the request url
  const url = req.nextUrl.clone()

  // Get pathname of request (e.g. /blog-slug)
  const { pathname } = req.nextUrl

  // Get hostname of request (e.g. demo.vercel.pub)
  const hostname = req.headers.get('host')
  if (!hostname)
    return new Response(null, {
      status: 400,
      statusText: 'No hostname found in request headers',
    })
}
