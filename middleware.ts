import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Basic Security Headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), interest-cohort=()"
  );

  // --- FIXED & OPTIMIZED CONTENT SECURITY POLICY ---
  const csp = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval'
      https://pagead2.googlesyndication.com
      https://www.googletagmanager.com
      https://www.google-analytics.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob:
      https://www.google-analytics.com
      https://pagead2.googlesyndication.com;
    font-src 'self' data:;
    connect-src 'self'
      https://api.exchangerate.host
      https://pagead2.googlesyndication.com
      https://www.googletagmanager.com
      https://www.google-analytics.com
      https://stats.g.doubleclick.net;
    frame-src
      https://googleads.g.doubleclick.net
      https://www.googletagmanager.com
      https://pagead2.googlesyndication.com;
  `.replace(/\s{2,}/g, " ").trim();

  response.headers.set("Content-Security-Policy", csp);

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|icon-192.png|icon-512.png).*)",
  ],
};
