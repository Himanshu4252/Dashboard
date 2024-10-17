import { NextRequest, NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export default async function authMiddleware(req: NextRequest) {
  const token = req.cookies.get('sb-access-token')?.value; // Get token from cookies
  const urlPath = req.nextUrl.pathname; // Current path

  // Logic for users with a token
  if (token) {
    // Allow access to homepage and dashboard
    if (urlPath === '/login' || urlPath === '/signup') {
      // Redirect logged-in users from login or signup to dashboard
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next(); // Allow access to homepage and dashboard
  }

  // Logic for users without a token
  if (!token) {
    // Allow access to login, signup, and homepage
    if (['/', '/login', '/signup'].includes(urlPath)) {
      return NextResponse.next();
    }
    // Redirect to login if trying to access the dashboard
    if (urlPath === '/dashboard') {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    return NextResponse.next(); // Allow access to any other paths
  }
}

export const config = {
  matcher: ['/', '/login', '/signup', '/dashboard/:path*'],
};
