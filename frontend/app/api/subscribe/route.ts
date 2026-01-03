import { NextResponse } from 'next/server';
import { subscribeSchema } from '@/lib/validations';
import { rateLimiter, getClientIdentifier } from '@/lib/rate-limit-upstash';
import MailerLite from '@mailerlite/mailerlite-nodejs';

// Validate required environment variables at module load
if (!process.env.MAILERLITE_API_KEY) {
  throw new Error('MAILERLITE_API_KEY environment variable is required');
}

const mailerLite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY,
});

// Request size limit: 1KB (more than enough for email)
const MAX_REQUEST_SIZE = 1024;

export async function POST(request: Request) {
  // Rate limiting: 5 requests per 15 minutes per IP
  // Uses Upstash Redis for distributed rate limiting
  const identifier = await getClientIdentifier(request);
  
  let rateLimitResult;
  
  if (rateLimiter) {
    // Upstash is configured - use it
    try {
      rateLimitResult = await rateLimiter.limit(identifier);
    } catch (error) {
      // In production, fail closed for security
      if (process.env.NODE_ENV === 'production') {
        console.error('Rate limit check failed in production:', error);
        return NextResponse.json(
          { error: 'Service temporarily unavailable. Please try again later.' },
          { status: 503 }
        );
      }
      // In development, fail open for easier testing
      console.error('Rate limit check failed:', error);
    }
  }

  // If rate limit check failed or Upstash not configured, create a default result
  // In production, require rate limiting to be configured
  if (!rateLimitResult) {
    if (process.env.NODE_ENV === 'production') {
      // In production, rate limiting must be configured
      console.error('Rate limiting not configured in production');
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }
    // Development fallback
    rateLimitResult = {
      success: true,
      limit: 5,
      remaining: 4,
      reset: Date.now() + 15 * 60 * 1000,
    };
  }

  if (!rateLimitResult.success) {
    const resetTime = rateLimitResult.reset;
    const retryAfter = Math.ceil((resetTime - Date.now()) / 1000);
    
    return NextResponse.json(
      { 
        error: 'Too many requests. Please try again later.',
        retryAfter,
      },
      { 
        status: 429,
        headers: {
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(resetTime).toISOString(),
        },
      }
    );
  }

  // Validate request size
  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > MAX_REQUEST_SIZE) {
    return NextResponse.json(
      { error: 'Request too large' },
      { status: 413 }
    );
  }

  // CSRF protection: Verify Origin header for same-origin requests
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const host = request.headers.get('host');
  
  // In production, enforce strict origin validation
  if (process.env.NODE_ENV === 'production') {
    // Allow requests with no origin (same-origin POST) or matching origin
    if (origin && host) {
      const originHost = new URL(origin).hostname;
      const requestHost = host.split(':')[0]; // Remove port if present
      
      // Reject if origin doesn't match host (excluding localhost for development)
      if (originHost !== requestHost && 
          !originHost.includes('localhost') && 
          !originHost.includes('127.0.0.1')) {
        console.warn('CSRF protection: Origin mismatch', { origin, host });
        return NextResponse.json(
          { error: 'Invalid request origin' },
          { status: 403 }
        );
      }
    } else if (!origin && !referer) {
      // Require either origin or referer header
      console.warn('CSRF protection: Missing origin and referer headers');
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 403 }
      );
    }
  }

  try {
    // Read and validate request body size
    const text = await request.text();
    if (text.length > MAX_REQUEST_SIZE) {
      return NextResponse.json(
        { error: 'Request too large' },
        { status: 413 }
      );
    }

    let body;
    try {
      body = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON' },
        { status: 400 }
      );
    }

    // Validate with Zod
    const validationResult = subscribeSchema.safeParse(body);

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return NextResponse.json(
        { error: firstError.message },
        { status: 400 }
      );
    }

    const { email } = validationResult.data;

    // Add subscriber to MailerLite
    // This will add the email to your default group/list
    const result = await mailerLite.subscribers.createOrUpdate({
      email,
      status: 'active',
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully added to mailing list',
      },
      { 
        status: 200,
        headers: {
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
        },
      }
    );
  } catch (error: any) {
    // Handle duplicate email error (subscriber already exists)
    // MailerLite's createOrUpdate handles duplicates gracefully, but check for other errors
    if (error?.response?.status === 422 || error?.message?.includes('already exists')) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Email already on the list' 
        },
        { status: 200 }
      );
    }

    // Sanitize error logging - don't expose internal details
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStatus = error?.response?.status || error?.statusCode || 500;
    
    // Only log detailed errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('MailerLite API error:', {
        status: errorStatus,
        message: errorMessage,
        // Don't log full error object in production
      });
    } else {
      // In production, log minimal info
      console.error('MailerLite API error:', errorStatus);
    }
    
    return NextResponse.json(
      { error: 'Failed to add email to mailing list' },
      { 
        status: 500,
        headers: rateLimitResult ? {
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': new Date(rateLimitResult.reset).toISOString(),
        } : {},
      }
    );
  }
}

