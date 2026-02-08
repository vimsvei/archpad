/**
 * Runs once when the Next.js server starts.
 * Logs startup info to help diagnose empty pod logs (stdout/stderr).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const ts = new Date().toISOString();
    const hasApiUrl = Boolean(
      process.env.TOLGEE_API_URL ?? process.env.NEXT_PUBLIC_TOLGEE_API_URL
    );
    const hasApiKey = Boolean(process.env.NEXT_PUBLIC_TOLGEE_API_KEY);
    process.stdout.write(
      `${ts} [instrumentation] Landing server started. Tolgee: apiUrl=${hasApiUrl ? 'SET' : 'MISSING'}, apiKey=${hasApiKey ? 'SET' : 'MISSING'}\n`
    );
  }
}
