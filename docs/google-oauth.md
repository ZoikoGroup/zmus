intekk# Google OAuth Setup for Zoiko

This document explains required environment variables and how to test the Google Sign-In integration added to the project.

## Environment variables
Add the following to your `.env.local` (local dev) or your hosting platform's environment settings:

- NEXT_PUBLIC_BASE_URL — e.g. `http://localhost:3000` (used as default redirect base)
- NEXT_PUBLIC_GOOGLE_CLIENT_ID — Google Client ID (public)
- GOOGLE_CLIENT_ID — Google Client ID (server-side)
- GOOGLE_CLIENT_SECRET — Google Client Secret (server-side)
- GOOGLE_OAUTH_REDIRECT — Full redirect URI registered in Google Console, e.g. `http://localhost:3000/api/auth/google/callback`

Example `.env.local`:

NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_OAUTH_REDIRECT=http://localhost:3000/api/auth/google/callback

## How it works

- The login page (`/login`) contains a "Sign in with Google" link that points to `/api/auth/google`.
- `GET /api/auth/google` redirects the user to the Google OAuth 2.0 consent screen.
- After approval, Google redirects to `/api/auth/google/callback` with a code.
- The callback exchanges the code for tokens and fetches the user's profile.
- The callback then sets a cookie with profile info and redirects to `/dashboard`.

## Testing locally

1. Add the `.env.local` values and restart the dev server.
2. Visit `http://localhost:3000/login` and click "Sign in with Google".
3. Complete the Google auth consent screen and confirm you get redirected to `/dashboard`.

## Security notes

- The current implementation sets a non-HTTP-only cookie with profile data for demonstration purposes. For production:
  - Use your backend to create or find user accounts and return a secure server-side session token.
  - Set HTTP-only, Secure cookies.
  - Implement state parameter generation and storage (e.g., via server session or encrypted cookie) to prevent CSRF.

## Optional improvements

- Integrate with the existing backend login endpoint to exchange Google profile info for an app token.
- Persist the `state` value and validate it in the callback.
- Use HTTP-only cookies for sessions.

If you'd like, I can implement backend integration with your existing API (e.g., call `https://zmapi.zoikomobile.co.uk/api/v1/social-login`), create a secure server-side cookie, and add state handling.