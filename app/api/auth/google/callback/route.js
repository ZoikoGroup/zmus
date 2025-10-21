import { NextResponse } from 'next/server';

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT || `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google/callback`;

  // Determine origin to build absolute redirect URLs
  const origin = process.env.NEXT_PUBLIC_BASE_URL || new URL(request.url).origin;
  const makeRedirect = (path) => new URL(path, origin).toString();

  if (!code) return NextResponse.redirect(makeRedirect('/login'));

  try {
    // Verify state nonce against cookie to prevent CSRF
    if (!state) return NextResponse.redirect('/login');
    let parsedState;
    try {
      parsedState = JSON.parse(Buffer.from(decodeURIComponent(state), 'base64').toString('utf8'));
    } catch (e) {
      console.error('Invalid state encoding', e);
      return NextResponse.redirect(makeRedirect('/login'));
    }

    const nonce = parsedState && parsedState.nonce;
    const oauthCookie = request.cookies.get && request.cookies.get('oauth_state');
    const cookieNonce = oauthCookie ? oauthCookie.value : null;
    if (!nonce || !cookieNonce || nonce !== cookieNonce) {
      console.error('OAuth state nonce mismatch', { nonce, cookieNonce });
      return NextResponse.redirect(makeRedirect('/login'));
    }
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    });

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) return NextResponse.redirect(makeRedirect('/login'));

    const profileRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });

    const profile = await profileRes.json();

    // Call backend to create/find the user and obtain app token
    try {
      const backendBase = process.env.ZMAPI_BASE || 'https://zmus.vercel.app';
      const socialRes = await fetch(`${backendBase}/api/v1/social-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: 'google',
          email: profile.email,
          name: profile.name,
          access_token: tokenData.access_token,
          id_token: tokenData.id_token
        })
      });
      // Backend may return non-JSON (HTML error page); handle gracefully
      const contentType = socialRes.headers.get('content-type') || '';
      let socialData;
      if (contentType.includes('application/json')) {
        socialData = await socialRes.json();
      } else {
        const text = await socialRes.text();
        console.error('Non-JSON response from social-login', { url: `${backendBase}/api/v1/social-login`, status: socialRes.status, bodySnippet: text.slice(0, 1000) });
        // In development, allow a fallback so local testing can continue even if backend endpoint is missing
        const isProd = process.env.NODE_ENV === 'production';
        if (!isProd) {
          console.warn('social-login endpoint returned non-JSON; using development fallback to continue login.');
          const devToken = tokenData.id_token || `dev-token-${profile.email}`;
          const targetPathDev = (parsedState && parsedState.redirect) || '/dashboard';
          const targetDev = new URL(targetPathDev, origin).toString();
          const responseDev = NextResponse.redirect(targetDev);
          const secureCookie = false; // local dev
          responseDev.cookies.set('oauth_state', '', { httpOnly: true, secure: secureCookie, path: '/', maxAge: 0 });
          responseDev.cookies.set('zoiko_token', devToken, { httpOnly: true, secure: secureCookie, path: '/', maxAge: 60 * 60 * 24 * 30 });
          responseDev.cookies.set('zoiko_user', JSON.stringify({ email: profile.email, name: profile.name }), { httpOnly: false, secure: secureCookie, path: '/', maxAge: 60 * 60 * 24 * 30 });
          return responseDev;
        }
        // Surface the error code to the client via redirect query so it's easier to debug
        return NextResponse.redirect(makeRedirect(`/login?error=social_login_nonjson&status=${socialRes.status}`));
      }
      if (socialRes.ok && socialData.success && socialData.token) {
        const targetPath = (parsedState && parsedState.redirect) || '/dashboard';
        const target = new URL(targetPath, origin).toString();
        const response = NextResponse.redirect(target);
        const secureCookie = process.env.NODE_ENV === 'production';
        // Clear oauth_state cookie and set HTTP-only cookie for app token
        response.cookies.set('oauth_state', '', { httpOnly: true, secure: secureCookie, path: '/', maxAge: 0 });
        response.cookies.set('zoiko_token', socialData.token, { httpOnly: true, secure: secureCookie, path: '/', maxAge: 60 * 60 * 24 * 30 });
        // Optionally set non-sensitive user info in a readable cookie
        response.cookies.set('zoiko_user', JSON.stringify(socialData.user || { email: profile.email, name: profile.name }), { httpOnly: false, secure: secureCookie, path: '/', maxAge: 60 * 60 * 24 * 30 });
        return response;
      } else {
        console.error('Social login failed', { url: `${backendBase}/api/v1/social-login`, status: socialRes.status, socialData });
        // Development fallback: allow login to proceed with a dev token if backend returns 4xx/5xx
        const isProd = process.env.NODE_ENV === 'production';
        if (!isProd) {
          console.warn('social-login returned non-ok; using development fallback to continue login.');
          const devToken = tokenData.id_token || `dev-token-${profile.email}`;
          const targetPathDev = (parsedState && parsedState.redirect) || '/dashboard';
          const targetDev = new URL(targetPathDev, origin).toString();
          const responseDev = NextResponse.redirect(targetDev);
          const secureCookie = false;
          responseDev.cookies.set('oauth_state', '', { httpOnly: true, secure: secureCookie, path: '/', maxAge: 0 });
          responseDev.cookies.set('zoiko_token', devToken, { httpOnly: true, secure: secureCookie, path: '/', maxAge: 60 * 60 * 24 * 30 });
          responseDev.cookies.set('zoiko_user', JSON.stringify({ email: profile.email, name: profile.name }), { httpOnly: false, secure: secureCookie, path: '/', maxAge: 60 * 60 * 24 * 30 });
          return responseDev;
        }
        return NextResponse.redirect(makeRedirect(`/login?error=social_login_failed&status=${socialRes.status}`));
      }
    } catch (errInner) {
      console.error('Error calling backend social-login', errInner);
      return NextResponse.redirect(makeRedirect(`/login?error=social_login_exception`));
    }
  } catch (err) {
    console.error('OAuth callback error', err);
    return NextResponse.redirect(makeRedirect('/login'));
  }
}
