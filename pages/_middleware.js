import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
export async function middleware(req) {
  //Token will exist if user is loggedin
  const token = await getToken({ req, secret: process.env.JWT_SECRET })
  const { pathname } = req.nextUrl
  //Token exits
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login')
  }
}
