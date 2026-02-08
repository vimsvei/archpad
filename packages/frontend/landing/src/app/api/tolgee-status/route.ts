import { NextResponse } from 'next/server';
import { getTolgeeEnvInfo } from '@/tolgee/shared';

/**
 * GET /api/tolgee-status — diagnostic endpoint for Tolgee config.
 * Returns masked status (no secrets). Use: curl https://archpad.pro/api/tolgee-status
 */
export async function GET() {
  const info = getTolgeeEnvInfo();
  return NextResponse.json({
    ok: info.hasApiKey && Boolean(info.apiUrl),
    hasApiKey: info.hasApiKey,
    hasApiUrl: Boolean(info.apiUrl),
    apiUrlKind: info.apiUrl?.includes('svc') ? 'internal' : info.apiUrl ? 'external' : null,
  });
}
