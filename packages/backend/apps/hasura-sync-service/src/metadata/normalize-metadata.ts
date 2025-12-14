export function normalizeHasuraMetadata(exportResult: any): any {
  return exportResult?.metadata ?? exportResult;
}

