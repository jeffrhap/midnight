import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Note: All security headers (including CSP, HSTS, etc.) are now handled in middleware.ts
  // Enable compression
  compress: true,
  // Production optimizations
  poweredByHeader: false, // Remove X-Powered-By header for security
};

export default nextConfig;
