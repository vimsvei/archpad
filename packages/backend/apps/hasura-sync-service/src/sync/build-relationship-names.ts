import { ForeignKeyInfo } from '../db/types';
import {
  isMapTableName,
  splitMapTableEntities,
  stripIdSuffixSnake,
  toCamelCase,
  toPlural,
  toSingular,
  upperFirst,
} from '../utils/naming.util';

export function buildRelationshipNamesForFk(args: {
  fk: ForeignKeyInfo;
  allTableNames: Set<string>;
}): {
  baseObjectName: string;
  arrayName: string;
  disambiguator: { fkColumnBaseCamel: string; fkColumnCamel: string };
} {
  const { fk, allTableNames } = args;

  const mapSplit = isMapTableName(fk.fk_table_name)
    ? splitMapTableEntities(fk.fk_table_name, allTableNames)
    : null;

  const fkColBase =
    fk.fk_columns.length === 1 ? stripIdSuffixSnake(fk.fk_columns[0]) : null;
  const fkColCamel =
    fk.fk_columns.length === 1 ? toCamelCase(fk.fk_columns[0]) : null;
  const fkColBaseCamel =
    fkColBase !== null ? toCamelCase(fkColBase) : fkColCamel;

  // "one"-side naming: referenced entity (singular)
  const pkEntitySingular = toCamelCase(toSingular(fk.pk_table_name));

  // "many"-side naming: from FK field name (without _id) -> plural -> camelCase
  const arrayName =
    fkColBase !== null
      ? toCamelCase(toPlural(fkColBase))
      : toCamelCase(toPlural(fk.fk_table_name));

  // Special for map_* tables: relationship to "second" entity becomes mapWith<Object>
  if (mapSplit && fk.pk_table_name === mapSplit.second) {
    const mapWith = `mapWith${upperFirst(pkEntitySingular)}`;
    return {
      baseObjectName: mapWith,
      arrayName,
      disambiguator: {
        fkColumnBaseCamel: fkColBaseCamel ?? pkEntitySingular,
        fkColumnCamel: fkColCamel ?? pkEntitySingular,
      },
    };
  }

  return {
    baseObjectName: pkEntitySingular,
    arrayName,
    disambiguator: {
      fkColumnBaseCamel: fkColBaseCamel ?? pkEntitySingular,
      fkColumnCamel: fkColCamel ?? pkEntitySingular,
    },
  };
}

