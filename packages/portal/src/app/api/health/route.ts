import { NextResponse } from 'next/server';

/**
 * Health check endpoint for Kubernetes readiness and liveness probes
 * Returns 200 OK with simple JSON response
 */
export async function GET() {
  return NextResponse.json(
    { status: 'ok', timestamp: new Date().toISOString() },
    { status: 200 }
  );
}
