import { NextResponse } from 'next/server';

/**
 * GET /api/auth/me
 * Reads the httpOnly `zoiko_token` cookie and proxies to the backend user endpoint.
 * Returns 200 + user JSON on success, 401 on missing/invalid token.
 */
export async function GET(req) {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    // extract zoiko_token cookie
    const match = cookieHeader.match(/(?:^|; )zoiko_token=([^;]+)/);
    const token = match ? decodeURIComponent(match[1]) : null;

    if (!token) {
      return NextResponse.json({ error: 'missing_token' }, { status: 401 });
    }

    const ZMAPI_BASE = process.env.ZMAPI_BASE || 'https://zmus.vercel.app';
    const url = `${ZMAPI_BASE}/api/user`;

    const backendRes = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store'
    });

    if (!backendRes.ok) {
      // In development, allow using zoiko_user cookie as fallback
      if (process.env.NODE_ENV !== 'production') {
        const userCookieMatch = cookieHeader.match(/(?:^|; )zoiko_user=([^;]+)/);
        if (userCookieMatch) {
          try {
            const raw = decodeURIComponent(userCookieMatch[1]);
            const user = JSON.parse(raw);
            return NextResponse.json(user, { status: 200 });
          } catch (e) {
            // fall through to return 401
          }
        }
      }
      return NextResponse.json({ error: 'invalid_token' }, { status: 401 });
    }

    const data = await backendRes.json();
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.error('Error in /api/auth/me', e);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}
