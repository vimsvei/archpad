import { Logger } from '@nestjs/common';
import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { ForeignKeyInfo } from '../db/types';
import { HasuraRelationshipRef } from '../metadata/types';
import { arrayRelationshipKey } from './array-relationship-key';
import { extractArrayFkUsing } from './extract-array-fk-using';
import { extractObjectFkColumns } from './extract-object-fk-columns';
import { objectRelationshipKey } from './object-relationship-key';
import { buildArrayRelationshipNameForFk } from './build-array-relationship-name';
import { buildObjectRelationshipNameForFk } from './build-object-relationship-name';

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

  const fkId = (fk: ForeignKeyInfo) =>
    `${fk.fk_table_schema}.${fk.fk_table_name}|${fk.constraint_name}`;

  // Map-table context: for each FK in a map_* table, determine "the other" referenced table.
  const mapOtherPkByFkId = new Map<string, string>();
  const mapGroups = new Map<string, ForeignKeyInfo[]>();
  for (const fk of foreignKeys) {
    if (!fk.fk_table_name.startsWith('map_')) continue;
    mapGroups.set(fk.fk_table_name, [...(mapGroups.get(fk.fk_table_name) ?? []), fk]);
  }
  for (const [mapTable, fks] of mapGroups.entries()) {
    const pkTables = [...new Set(fks.map((x) => x.pk_table_name))].sort();
    for (const fk of fks) {
      const other = pkTables.find((t) => t !== fk.pk_table_name);
      if (other) {
        mapOtherPkByFkId.set(fkId(fk), other);
      }
    }
  }

  // Collision guards (rare but possible): ensure uniqueness within each table.
  const usedObjectNamesByTable = new Map<string, Set<string>>();
  const usedArrayNamesByTable = new Map<string, Set<string>>();

  const reserveName = (
    usedByTable: Map<string, Set<string>>,
    tableKey: string,
    desired: string,
  ): string => {
    const used = usedByTable.get(tableKey) ?? new Set<string>();
    usedByTable.set(tableKey, used);

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

  const orderedFks = foreignKeys.slice().sort((a, b) => fkId(a).localeCompare(fkId(b)));
  for (const fk of orderedFks) {
    const objectNameRaw = buildObjectRelationshipNameForFk(fk);
    const arrayNameRaw = buildArrayRelationshipNameForFk({
      fk,
      mapOtherPkTableName: mapOtherPkByFkId.get(fkId(fk)),
    });

    // object rel (many -> one)
    if (fk.fk_columns.length === 1) {
      const objectName = reserveName(
        usedObjectNamesByTable,
        `${fk.fk_table_schema}.${fk.fk_table_name}`,
        objectNameRaw!,
      );
      const oKey = objectRelationshipKey({
        schema: fk.fk_table_schema,
        table: fk.fk_table_name,
        cols: fk.fk_columns,
      });
      desiredObjectKeys.add(oKey);

      const existing = existingObjectByKey.get(oKey);
      if (existing && existing.name !== objectName) {
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
            name: objectName,
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
    if (!arrayNameRaw) {
      continue;
    }
    const arrayName = reserveName(
      usedArrayNamesByTable,
      `${fk.pk_table_schema}.${fk.pk_table_name}`,
      arrayNameRaw,
    );
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

