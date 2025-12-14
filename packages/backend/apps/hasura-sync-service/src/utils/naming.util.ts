export function toCamelCase(input: string): string {
  // Only normalize snake_case (and similar) identifiers.
  // If it doesn't look like snake_case, keep as-is.
  if (!/[_-]/.test(input)) return input;

  const lower = input.toLowerCase();
  return lower
    .replace(/-+/g, '_')
    .replace(/_+([a-z0-9])/g, (_, ch: string) => ch.toUpperCase());
}

export function toPlural(name: string): string {
  // Очень наивный pluralizer, но для тех. имён ок
  if (/(s|x|z|ch|sh)$/i.test(name)) {
    return `${name}es`;
  }
  if (/[a-zA-Z]y$/.test(name) && !/[aeiou]y$/i.test(name)) {
    return `${name.slice(0, -1)}ies`;
  }
  return `${name}s`;
}

export function toSingular(name: string): string {
  // Очень наивный singularizer, но для тех. имён ок
  if (/(us|ss|is)$/i.test(name)) {
    return name;
  }
  if (/ies$/i.test(name) && name.length > 3) {
    return `${name.slice(0, -3)}y`;
  }
  if (/(s|x|z|ch|sh)es$/i.test(name)) {
    return name.replace(/es$/i, '');
  }
  if (/s$/i.test(name) && !/ss$/i.test(name)) {
    return name.slice(0, -1);
  }
  return name;
}

export function stripIdSuffixSnake(name: string): string {
  return name.endsWith('_id') ? name.slice(0, -3) : name;
}

export function upperFirst(input: string): string {
  if (!input) return input;
  return input[0].toUpperCase() + input.slice(1);
}

export function isMapTableName(tableName: string): boolean {
  return tableName.startsWith('map_');
}

export function splitMapTableEntities(
  mapTableName: string,
  allTableNames: Set<string>,
): { first: string; second: string } | null {
  if (!isMapTableName(mapTableName)) return null;

  const rest = mapTableName.slice('map_'.length);
  const tokens = rest.split('_').filter(Boolean);
  if (tokens.length < 2) return null;

  // Try all token splits: left/right parts must both exist as real tables.
  for (let i = 1; i < tokens.length; i++) {
    const first = tokens.slice(0, i).join('_');
    const second = tokens.slice(i).join('_');
    if (allTableNames.has(first) && allTableNames.has(second)) {
      return { first, second };
    }
  }

  return null;
}
