export function toCamelCase(input: string): string {
  // Only normalize snake_case (and similar) identifiers.
  // If it doesn't look like snake_case, keep as-is.
  if (!/[_-]/.test(input)) return input;

  const lower = input.toLowerCase();
  return lower
    .replace(/-+/g, '_')
    .replace(/_+([a-z0-9])/g, (_, ch: string) => ch.toUpperCase());
}

export function stripIdSuffixSnake(name: string): string {
  return name.endsWith('_id') ? name.slice(0, -3) : name;
}
