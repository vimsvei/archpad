export function formatHasuraError(e: unknown): string {
  const anyErr = e as any;
  const status = anyErr?.response?.status;
  const data = anyErr?.response?.data;
  const message = anyErr?.message;

  if (data !== undefined) {
    try {
      return `status=${status ?? '-'} ${JSON.stringify(data)}`;
    } catch {
      return `status=${status ?? '-'} ${String(data)}`;
    }
  }

  return String(message ?? e);
}

