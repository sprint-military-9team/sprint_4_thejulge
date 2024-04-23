import { NextRequest, NextResponse } from 'next/server';
// import Cookies from 'js-cookie';
import { cookies } from 'next/headers';

const protectedRoutes = ['/profile'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);

  const cookie = cookies().get('userId');
  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
