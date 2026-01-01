export function formatDateTime(iso?: string | null): string | null {
  if (!iso) return null
  try {
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(iso))
  } catch {
    return iso
  }
}


