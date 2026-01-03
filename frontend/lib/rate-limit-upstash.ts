// Production-ready rate limiting using Upstash Redis
// Free tier: 10,000 commands/day - perfect for rate limiting
// 
// Setup:
// 1. Sign up at https://upstash.com (free)
// 2. Create a Redis database
// 3. Copy REST URL and REST TOKEN
// 4. Add to .env.local:
//    UPSTASH_REDIS_REST_URL=your_url
//    UPSTASH_REDIS_REST_TOKEN=your_token

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Check if Upstash is configured
const isUpstashConfigured = 
  process.env.UPSTASH_REDIS_REST_URL && 
  process.env.UPSTASH_REDIS_REST_TOKEN;

// Initialize Redis client (only if configured)
let redis: Redis | null = null;
let rateLimiter: Ratelimit | null = null;

if (isUpstashConfigured) {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });

  // Create rate limiter: 5 requests per 15 minutes
  rateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '15 m'), // 5 requests per 15 minutes
    analytics: true,
    prefix: '@midnight/subscribe', // Optional prefix for keys
  });
} else if (process.env.NODE_ENV === 'production') {
  // In production, rate limiting is required - but don't throw here
  // Let the API route handle the validation to provide better error messages
  console.error('⚠️ CRITICAL: Upstash Redis not configured. Rate limiting will not work in production!');
} else {
  console.warn('⚠️ Upstash Redis not configured. Using fallback (no rate limiting in development).');
}

export { rateLimiter };

export async function getClientIdentifier(request: Request): Promise<string> {
  // Try to get IP from various headers (for proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip'); // Cloudflare/Vercel
  
  const ip = forwarded?.split(',')[0]?.trim() || 
             realIp || 
             cfConnectingIp || 
             'unknown';
  
  return ip;
}

