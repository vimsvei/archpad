const KEY_SEP = '\u0000';
const LIST_SEP = '\u0001';

export function fkColumnsKeyPart(fkColumns: string[]) {
  return fkColumns.join(LIST_SEP);
}

export function tableKey(schema: string, table: string) {
  return `${schema}${KEY_SEP}${table}`;
}

export function columnKey(schema: string, table: string, column: string) {
  return `${schema}${KEY_SEP}${table}${KEY_SEP}${column}`;
}

export function now() {
  return new Date();
}

export function toSimpleCamelCase(snake: string): string {
  return snake.replace(/_([a-z0-9])/g, (_, ch: string) => ch.toUpperCase());
}

export function upperFirst(s: string): string {
  return s.length ? s[0].toUpperCase() + s.slice(1) : s;
}

export function normalizeTextArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((v) => String(v)).filter((v) => v.length > 0);
  }
  if (typeof value === 'string') {
    const v = value.trim();
    return v ? [v] : [];
  }
  return [];
}

