import { ForeignKeyInfo } from '../db/types';
import { stripIdSuffixSnake, toCamelCase } from '../utils/naming.util';

export function buildObjectRelationshipNameForFk(
  fk: ForeignKeyInfo,
): string | null {
  if (fk.fk_columns.length !== 1) return null;
  const base = stripIdSuffixSnake(fk.fk_columns[0]);
  return toCamelCase(base);
}
