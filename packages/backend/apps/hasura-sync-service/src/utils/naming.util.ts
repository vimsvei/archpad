export function toCamelCase(input: string): string {
  const lower = input.toLowerCase();
  return lower.replace(/_+([a-z0-9])/g, (_, ch: string) => ch.toUpperCase());
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
