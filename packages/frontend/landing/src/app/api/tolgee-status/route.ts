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
    apiUrlSource: info.apiUrlSource,
    isInternalUrl: info.isInternalUrl,
    apiUrlPrefix: info.apiUrl ? `${info.apiUrl.replace(/\/$/, '').slice(0, 50)}...` : null,
  });
}
