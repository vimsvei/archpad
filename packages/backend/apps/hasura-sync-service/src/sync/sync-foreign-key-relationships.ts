import { Logger } from '@nestjs/common';
import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { ForeignKeyInfo } from '../db/types';
import { HasuraRelationshipRef } from '../metadata/types';
import { arrayRelationshipKey } from './array-relationship-key';
import { buildRelationshipNamesForFk } from './build-relationship-names';
import { extractArrayFkUsing } from './extract-array-fk-using';
import { extractObjectFkColumns } from './extract-object-fk-columns';
import { objectRelationshipKey } from './object-relationship-key';
import { upperFirst } from '../utils/naming.util';

export async function syncForeignKeyRelationships(args: {
  hasura: HasuraClientService;
  logger: Logger;
  foreignKeys: ForeignKeyInfo[];
  existingRelationships: HasuraRelationshipRef[];
  allTableNames: Set<string>;
}): Promise<void> {
  const { hasura, logger, foreignKeys, existingRelationships, allTableNames } =
    args;

  logger.log(`Syncing FK relationships (count=${foreignKeys.length})...`);

  // Precompute desired relationship names with collision resolution.
  const fkId = (fk: ForeignKeyInfo) =>
    `${fk.fk_table_schema}.${fk.fk_table_name}|${fk.constraint_name}`;

  const objectNameByFkId = new Map<string, string>();
  const arrayNameByFkId = new Map<string, string>();

  // Group object rels by (fk-table + baseObjectName) to disambiguate multiple FKs to same entity.
  const groups = new Map<string, ForeignKeyInfo[]>();
  const namePartsByFkId = new Map<
    string,
    ReturnType<typeof buildRelationshipNamesForFk>
  >();

  for (const fk of foreignKeys) {
    const parts = buildRelationshipNamesForFk({ fk, allTableNames });
    namePartsByFkId.set(fkId(fk), parts);

    if (fk.fk_columns.length !== 1) continue; // we skip object rels for composite FKs

    const groupKey = `${fk.fk_table_schema}.${fk.fk_table_name}|${parts.baseObjectName}`;
    groups.set(groupKey, [...(groups.get(groupKey) ?? []), fk]);
  }

  // Resolve object relationship collisions per table.
  const usedObjectNamesByTable = new Map<string, Set<string>>();
  const reserveObjectName = (tableKey: string, desired: string): string => {
    const used = usedObjectNamesByTable.get(tableKey) ?? new Set<string>();
    usedObjectNamesByTable.set(tableKey, used);

    if (!used.has(desired)) {
      used.add(desired);
      return desired;
    }

    let n = 2;
    while (used.has(`${desired}${n}`)) n++;
    const finalName = `${desired}${n}`;
    used.add(finalName);
    return finalName;
  };

  const sortedGroupKeys = [...groups.keys()].sort();
  for (const groupKey of sortedGroupKeys) {
    const fks = (groups.get(groupKey) ?? []).slice().sort((a, b) => {
      const ak = `${a.constraint_name}|${a.fk_columns.join(',')}`;
      const bk = `${b.constraint_name}|${b.fk_columns.join(',')}`;
      return ak.localeCompare(bk);
    });

    for (const fk of fks) {
      const parts = namePartsByFkId.get(fkId(fk))!;
      const tableKey = `${fk.fk_table_schema}.${fk.fk_table_name}`;

      let desired = parts.baseObjectName;
      if (fks.length > 1) {
        // Strict rule: base is always entity name; disambiguate with FK column.
        const base = parts.baseObjectName;
        const dis =
          parts.disambiguator.fkColumnBaseCamel !== base
            ? parts.disambiguator.fkColumnBaseCamel
            : parts.disambiguator.fkColumnCamel; // e.g. userId
        desired = `${base}By${upperFirst(dis)}`;
      }

      objectNameByFkId.set(
        fkId(fk),
        reserveObjectName(tableKey, desired),
      );
    }
  }

  // Resolve array relationship collisions per PK table.
  const usedArrayNamesByTable = new Map<string, Set<string>>();
  const reserveArrayName = (tableKey: string, desired: string): string => {
    const used = usedArrayNamesByTable.get(tableKey) ?? new Set<string>();
    usedArrayNamesByTable.set(tableKey, used);

    if (!used.has(desired)) {
      used.add(desired);
      return desired;
    }

    let n = 2;
    while (used.has(`${desired}${n}`)) n++;
    const finalName = `${desired}${n}`;
    used.add(finalName);
    return finalName;
  };

  // Deterministic ordering for stable names
  const sortedFks = foreignKeys.slice().sort((a, b) => {
    const ak = `${a.pk_table_schema}.${a.pk_table_name}|${a.fk_table_schema}.${a.fk_table_name}|${a.constraint_name}`;
    const bk = `${b.pk_table_schema}.${b.pk_table_name}|${b.fk_table_schema}.${b.fk_table_name}|${b.constraint_name}`;
    return ak.localeCompare(bk);
  });
  for (const fk of sortedFks) {
    const parts = namePartsByFkId.get(fkId(fk))!;
    const pkKey = `${fk.pk_table_schema}.${fk.pk_table_name}`;
    arrayNameByFkId.set(fkId(fk), reserveArrayName(pkKey, parts.arrayName));
  }

  const existingObjectByKey = new Map<string, HasuraRelationshipRef>();
  const existingArrayByKey = new Map<string, HasuraRelationshipRef>();

  for (const r of existingRelationships) {
    if (r.kind === 'object') {
      const cols = extractObjectFkColumns(r.using);
      if (!cols) continue;
      existingObjectByKey.set(
        objectRelationshipKey({
          schema: r.table.schema,
          table: r.table.name,
          cols,
        }),
        r,
      );
    }
    if (r.kind === 'array') {
      const u = extractArrayFkUsing(r.using);
      if (!u) continue;
      existingArrayByKey.set(
        arrayRelationshipKey({
          schema: r.table.schema,
          table: r.table.name,
          fkSchema: u.fkSchema,
          fkTable: u.fkTable,
          cols: u.cols,
        }),
        r,
      );
    }
  }

  const desiredObjectKeys = new Set<string>();
  const desiredArrayKeys = new Set<string>();

  for (const fk of foreignKeys) {
    const objectName = objectNameByFkId.get(fkId(fk));
    const arrayName = arrayNameByFkId.get(fkId(fk))!;

    // object rel (many -> one)
    if (fk.fk_columns.length === 1) {
      const oKey = objectRelationshipKey({
        schema: fk.fk_table_schema,
        table: fk.fk_table_name,
        cols: fk.fk_columns,
      });
      desiredObjectKeys.add(oKey);

      const existing = existingObjectByKey.get(oKey);
      if (existing && objectName && existing.name !== objectName) {
        logger.log(
          `Renaming object relationship ${fk.fk_table_name}.${existing.name} -> ${objectName}`,
        );
        try {
          await hasura.postMetadata({
            type: 'pg_drop_relationship',
            args: {
              source: hasura.source,
              table: { schema: fk.fk_table_schema, name: fk.fk_table_name },
              relationship: existing.name,
            },
          });
        } catch (e) {
          logger.warn(
            `Failed to drop old object relationship ${fk.fk_table_schema}.${fk.fk_table_name}.${existing.name}: ${e}`,
          );
        }
      }

      try {
        await hasura.postMetadata({
          type: 'pg_create_object_relationship',
          args: {
            source: hasura.source,
            table: { schema: fk.fk_table_schema, name: fk.fk_table_name },
            name: objectName!,
            using: { foreign_key_constraint_on: fk.fk_columns[0] },
          },
        });
      } catch (e) {
        // Usually "already exists" - safe to ignore.
        logger.debug(
          `Skip create object relationship ${fk.fk_table_name}.${objectName}: ${e}`,
        );
      }
    } else {
      logger.warn(
        `Skipping object relationship for composite FK ${fk.constraint_name} (${fk.fk_table_name} -> ${fk.pk_table_name})`,
      );
    }

    // array rel (one -> many)
    const aKey = arrayRelationshipKey({
      schema: fk.pk_table_schema,
      table: fk.pk_table_name,
      fkSchema: fk.fk_table_schema,
      fkTable: fk.fk_table_name,
      cols: fk.fk_columns,
    });
    desiredArrayKeys.add(aKey);

    const existingArray = existingArrayByKey.get(aKey);
    if (existingArray && existingArray.name !== arrayName) {
      logger.log(
        `Renaming array relationship ${fk.pk_table_name}.${existingArray.name} -> ${arrayName}`,
      );
      try {
        await hasura.postMetadata({
          type: 'pg_drop_relationship',
          args: {
            source: hasura.source,
            table: { schema: fk.pk_table_schema, name: fk.pk_table_name },
            relationship: existingArray.name,
          },
        });
      } catch (e) {
        logger.warn(
          `Failed to drop old array relationship ${fk.pk_table_schema}.${fk.pk_table_name}.${existingArray.name}: ${e}`,
        );
      }
    }

    try {
      await hasura.postMetadata({
        type: 'pg_create_array_relationship',
        args: {
          source: hasura.source,
          table: { schema: fk.pk_table_schema, name: fk.pk_table_name },
          name: arrayName,
          using: {
            foreign_key_constraint_on: {
              table: { schema: fk.fk_table_schema, name: fk.fk_table_name },
              columns: fk.fk_columns,
            },
          },
        },
      });
    } catch (e) {
      logger.debug(
        `Skip create array relationship ${fk.pk_table_name}.${arrayName}: ${e}`,
      );
    }
  }

  // Cleanup: drop FK-based relationships that reference non-existent FKs
  // (but only if they look auto-generated: fk*).
  for (const r of existingRelationships) {
    if (!/^fk/i.test(r.name)) continue;

    if (r.kind === 'object') {
      const cols = extractObjectFkColumns(r.using);
      if (!cols) continue;
      const k = objectRelationshipKey({
        schema: r.table.schema,
        table: r.table.name,
        cols,
      });
      if (desiredObjectKeys.has(k)) continue;

      logger.log(`Dropping stale object relationship ${r.table.name}.${r.name}...`);
      try {
        await hasura.postMetadata({
          type: 'pg_drop_relationship',
          args: {
            source: hasura.source,
            table: { schema: r.table.schema, name: r.table.name },
            relationship: r.name,
          },
        });
      } catch (e) {
        logger.warn(`Failed to drop relationship ${r.table.name}.${r.name}: ${e}`);
      }
    }

    if (r.kind === 'array') {
      const u = extractArrayFkUsing(r.using);
      if (!u) continue;
      const k = arrayRelationshipKey({
        schema: r.table.schema,
        table: r.table.name,
        fkSchema: u.fkSchema,
        fkTable: u.fkTable,
        cols: u.cols,
      });
      if (desiredArrayKeys.has(k)) continue;

      logger.log(`Dropping stale array relationship ${r.table.name}.${r.name}...`);
      try {
        await hasura.postMetadata({
          type: 'pg_drop_relationship',
          args: {
            source: hasura.source,
            table: { schema: r.table.schema, name: r.table.name },
            relationship: r.name,
          },
        });
      } catch (e) {
        logger.warn(`Failed to drop relationship ${r.table.name}.${r.name}: ${e}`);
      }
    }
  }
}

