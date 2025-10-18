import { NextResponse } from 'next/server';

export async function POST(request) {
  const origin = process.env.NEXT_PUBLIC_BASE_URL || new URL(request.url).origin;
  const response = NextResponse.redirect(new URL('/login', origin).toString());
  const secure = process.env.NODE_ENV === 'production';
  response.cookies.set('zoiko_token', '', { httpOnly: true, secure, path: '/', maxAge: 0 });
  response.cookies.set('zoiko_user', '', { httpOnly: false, secure, path: '/', maxAge: 0 });
  return response;
}
