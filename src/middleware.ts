import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const type = request.cookies.get('type')?.value;
  const shopId = request.cookies.get('shopId')?.value;
  const path = request.nextUrl.pathname;
  if ((path === '/signin' || path === '/signup') && token) {
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.set('redirectStatus', 'alreadyLogin');
    return response;
  }

  if (path.startsWith('/ownerNoticeDetail')) {
    const mainResponse = NextResponse.redirect(new URL('/', request.url));
    const loginResponse = NextResponse.redirect(new URL('/signin', request.url));
    if (!token) {
      loginResponse.cookies.set('redirectStatus', 'needLogin');
      return loginResponse;
    }

    if (type !== 'employee') {
      mainResponse.cookies.set('redirectStatus', 'invalidAuthority');
      return mainResponse;
    }

    if (!shopId) {
      mainResponse.cookies.set('redirectStatus', 'invalidAuthority');
      return mainResponse;
    }
  }

  if (path.startsWith('/profile')) {
    const mainResponse = NextResponse.redirect(new URL('/', request.url));
    const loginResponse = NextResponse.redirect(new URL('/signin', request.url));
    if (!token) {
      loginResponse.cookies.set('redirectStatus', 'needLogin');
      return loginResponse;
    }

    if (type !== 'employee') {
      mainResponse.cookies.set('redirectStatus', 'invalidAuthority');
      return mainResponse;
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/signin', '/signup', '/ownerNoticeDetail/:path*', '/profile'],
};
