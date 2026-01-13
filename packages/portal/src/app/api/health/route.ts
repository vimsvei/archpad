import { NextResponse } from 'next/server';

/**
 * Health check endpoint for Kubernetes readiness and liveness probes
 * Returns 200 OK with simple JSON response
 * 
 * This endpoint should never redirect and always return 200 OK
 * to satisfy Kubernetes health checks
 */
export async function GET() {
  // Explicitly set headers to prevent any redirects or caching issues
  return NextResponse.json(
    { 
      status: 'ok', 
      service: 'portal',
      timestamp: new Date().toISOString() 
    },
    { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      }
    }
  );
}
