export function extractObjectFkColumns(using: any): string[] | null {
  const on = using?.foreign_key_constraint_on;
  if (!on) return null;
  if (typeof on === 'string') return [on];
  if (Array.isArray(on)) return on;
  return null;
}
