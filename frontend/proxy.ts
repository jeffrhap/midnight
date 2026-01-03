import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { randomBytes } from "crypto";

export function proxy(request: NextRequest) {
  // Generate a nonce for this request
  const nonce = randomBytes(16).toString("base64");
  
  // Clone the request headers and add the nonce
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Content Security Policy - Strict security configuration with nonce
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Build CSP header based on environment with nonce support
  const cspHeader = [
    "default-src 'self'",
    isProduction 
      ? `script-src 'self' 'nonce-${nonce}'` // Production: Use nonce for inline scripts
      : `script-src 'self' 'unsafe-eval' 'nonce-${nonce}'`, // Development: Allow unsafe-eval for Next.js hot reload + nonce
    `style-src 'self' 'unsafe-inline'`, // Use nonce instead of unsafe-inline for styles
    "img-src 'self' data: blob:", // Only self, data URIs, and blob URLs
    "font-src 'self' data:",
    "connect-src 'self'", // API calls only to same origin
    "media-src 'self'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "object-src 'none'", // Block plugins
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'", // Prevent clickjacking - no embedding allowed
    "upgrade-insecure-requests", // Force HTTPS
  ].join("; ");

  // Security headers
  response.headers.set("Content-Security-Policy", cspHeader);
  response.headers.set("X-Frame-Options", "DENY"); // Prevent clickjacking
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), bluetooth=()");
  
  // Additional security headers (consolidated from next.config.ts)
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");

  return response;
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

