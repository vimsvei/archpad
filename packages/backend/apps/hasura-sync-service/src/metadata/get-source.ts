export function getHasuraSource(metadata: any, sourceName: string): any | null {
  const sources: any[] = metadata?.sources ?? [];
  if (!sources.length) return null;

  const byName = sources.find((s) => s?.name === sourceName);
  return byName ?? sources[0] ?? null;
}

