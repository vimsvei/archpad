import { ForeignKeyInfo } from '../db/types';
import {
  stripIdSuffixSnake,
  toCamelCase,
  toPlural,
  toSingular,
  upperFirst,
} from '../utils/naming.util';

export function buildArrayRelationshipNameForFk(args: {
  fk: ForeignKeyInfo;
  mapOtherPkTableName?: string | null;
}): string | null {
  const { fk, mapOtherPkTableName } = args;

  // Directories are special: they are "universal directories" and we don't expose reverse arrays.
  if (fk.pk_table_name === 'directories') return null;

  // Map tables: on the referenced side expose `map<OtherPlural>`, e.g. Actor -> mapRoles
  if (mapOtherPkTableName) {
    const otherPlural = toPlural(toSingular(mapOtherPkTableName));
    return `map${upperFirst(toCamelCase(otherPlural))}`;
  }

  // If multiple FKs point to the same PK table from the same FK table,
  // we prefer role-based naming: <role><FkTablePlural>, where role is extracted
  // from fk column base ending with _<pkEntity>.
  if (fk.fk_columns.length === 1) {
    const fkColBase = stripIdSuffixSnake(fk.fk_columns[0]);
    const pkEntity = toSingular(fk.pk_table_name); // snake_case
    const suffix = `_${pkEntity}`;

    if (fkColBase.endsWith(suffix) && fkColBase.length > suffix.length) {
      const roleBaseSnake = fkColBase.slice(0, -suffix.length);
      const fkPluralSnake = toPlural(toSingular(fk.fk_table_name));
      return toCamelCase(`${roleBaseSnake}_${fkPluralSnake}`);
    }
  }

  // Default case: pkTable gets pluralized FK-table name, e.g. technology_networks -> technologyNodes
  const fkPluralSnake = toPlural(toSingular(fk.fk_table_name));
  return toCamelCase(fkPluralSnake);
}

