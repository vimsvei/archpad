import { LoggerService } from '@archpad/logger';
import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { ForeignKeyInfo } from '../db/types';
import { getHasuraSyncArrayRelationshipOverrides } from '../db/get-hasura-sync-array-relationship-overrides';
import { getHasuraSyncObjectRelationshipOverrides } from '../db/get-hasura-sync-object-relationship-overrides';
import { arrayRelationshipKey } from './array-relationship-key';
import { objectRelationshipKey } from './object-relationship-key';
import { buildObjectRelationshipNameForFk } from './build-object-relationship-name';
import {
  applyMetadataOps,
  opCreateArrayRelationship,
  opCreateObjectRelationship,
} from '../utils/metadata-ops';

export async function syncForeignKeyRelationships(args: {
  hasura: HasuraClientService;
  logger: LoggerService;
  foreignKeys: ForeignKeyInfo[];
}): Promise<void> {
  const { hasura, logger, foreignKeys } = args;

  logger.log(`Syncing FK relationships (count=${foreignKeys.length})...`);

  const overrides = await getHasuraSyncArrayRelationshipOverrides(hasura).catch(
    () => [],
  );
  const overrideByKey = new Map<string, string>();
  for (const o of overrides) {
    overrideByKey.set(
      arrayRelationshipKey({
        schema: o.pk_table_schema,
        table: o.pk_table_name,
        fkSchema: o.fk_table_schema,
        fkTable: o.fk_table_name,
        cols: o.fk_columns,
      }),
      o.name,
    );
  }

  const objectOverrides = await getHasuraSyncObjectRelationshipOverrides(
    hasura,
  ).catch(() => []);
  const objectOverrideByKey = new Map<string, string>();
  for (const o of objectOverrides) {
    objectOverrideByKey.set(
      objectRelationshipKey({
        schema: o.fk_table_schema,
        table: o.fk_table_name,
        cols: o.fk_columns,
      }),
      o.name,
    );
  }

  const fkId = (fk: ForeignKeyInfo) =>
    `${fk.fk_table_schema}.${fk.fk_table_name}|${fk.constraint_name}`;

  // Collision guards (rare but possible): ensure uniqueness within each table.
  const usedObjectNamesByTable = new Map<string, Set<string>>();
  const usedArrayNamesByTable = new Map<string, Set<string>>();

  const reserveName = (
    usedByTable: Map<string, Set<string>>,
    tableKey: string,
    desired: string,
    opts?: { strict?: boolean },
  ): string => {
    const used = usedByTable.get(tableKey) ?? new Set<string>();
    usedByTable.set(tableKey, used);

    if (!used.has(desired)) {
      used.add(desired);
      return desired;
    }

    if (opts?.strict) {
      throw new Error(
        `Hasura relationship name collision within table ${tableKey}: "${desired}"`,
      );
    }

    let n = 2;
    while (used.has(`${desired}${n}`)) n++;
    const finalName = `${desired}${n}`;
    used.add(finalName);
    return finalName;
  };

  const ops: any[] = [];

  const orderedFks = foreignKeys
    .slice()
    .sort((a, b) => fkId(a).localeCompare(fkId(b)));
  for (const fk of orderedFks) {
    const oKeyLookup = objectRelationshipKey({
      schema: fk.fk_table_schema,
      table: fk.fk_table_name,
      cols: fk.fk_columns,
    });
    const objectNameOverride = objectOverrideByKey.get(oKeyLookup);
    const objectNameRaw =
      objectNameOverride ?? buildObjectRelationshipNameForFk(fk);
    const aKeyLookup = arrayRelationshipKey({
      schema: fk.pk_table_schema,
      table: fk.pk_table_name,
      fkSchema: fk.fk_table_schema,
      fkTable: fk.fk_table_name,
      cols: fk.fk_columns,
    });
    const arrayNameOverride = overrideByKey.get(aKeyLookup);
    // IMPORTANT:
    // We intentionally do NOT generate relationship names here (especially for map_* tables).
    // Names must come from decorator materialization (hasura_sync.array_relationship_overrides),
    // otherwise we leave Hasura's defaults untouched.
    const arrayNameRaw = arrayNameOverride;

    // object rel (many -> one)
    if (fk.fk_columns.length === 1) {
      const objectName = reserveName(
        usedObjectNamesByTable,
        `${fk.fk_table_schema}.${fk.fk_table_name}`,
        objectNameRaw!,
        objectNameOverride ? { strict: true } : undefined,
      );
      const oKey = oKeyLookup;
      ops.push(
        opCreateObjectRelationship({ source: hasura.source, fk, name: objectName }),
      );
    } else {
      logger.warn(
        `Skipping object relationship for composite FK ${fk.constraint_name} (${fk.fk_table_name} -> ${fk.pk_table_name})`,
      );
    }

    // array rel (one -> many)
    if (!arrayNameRaw) continue;
    const arrayName = reserveName(
      usedArrayNamesByTable,
      `${fk.pk_table_schema}.${fk.pk_table_name}`,
      arrayNameRaw,
      arrayNameOverride ? { strict: true } : undefined,
    );
    const aKey = arrayRelationshipKey({
      schema: fk.pk_table_schema,
      table: fk.pk_table_name,
      fkSchema: fk.fk_table_schema,
      fkTable: fk.fk_table_name,
      cols: fk.fk_columns,
    });
    ops.push(
      opCreateArrayRelationship({ source: hasura.source, fk, name: arrayName }),
    );
  }

  await applyMetadataOps({
    hasura,
    logger,
    label: 'pg_create_relationships',
    chunkSize: 50,
    ops,
  });
}
