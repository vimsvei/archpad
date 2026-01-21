import { LoggerService } from '@archpad/logger';
import { HasuraClientService } from '../hasura-client/hasura-client.service';
import { DbTableRef, ForeignKeyInfo } from '../db/types';

export type HasuraMetadataOp = { type: string; args: any };

export function opTrackTable(source: string, t: DbTableRef): HasuraMetadataOp {
  return {
    type: 'pg_track_table',
    args: { source, table: { schema: t.schema, name: t.name } },
  };
}

export function opUntrackTable(
  source: string,
  t: DbTableRef,
  options?: { cascade?: boolean },
): HasuraMetadataOp {
  return {
    type: 'pg_untrack_table',
    args: {
      source,
      table: { schema: t.schema, name: t.name },
      cascade: options?.cascade ?? true,
    },
  };
}

export function opCreateSelectPermission(args: {
  source: string;
  table: DbTableRef;
  role: string;
  columns: string[];
  allowAggregations?: boolean;
}): HasuraMetadataOp {
  return {
    type: 'pg_create_select_permission',
    args: {
      source: args.source,
      table: { schema: args.table.schema, name: args.table.name },
      role: args.role,
      permission: {
        columns: args.columns,
        filter: {},
        allow_aggregations: args.allowAggregations ?? true,
      },
    },
  };
}

export function opSetTableCustomization(args: {
  source: string;
  table: DbTableRef;
  configuration: any;
}): HasuraMetadataOp {
  return {
    type: 'pg_set_table_customization',
    args: {
      source: args.source,
      table: { schema: args.table.schema, name: args.table.name },
      configuration: args.configuration,
    },
  };
}

export function opCreateObjectRelationship(args: {
  source: string;
  fk: ForeignKeyInfo;
  name: string;
}): HasuraMetadataOp {
  return {
    type: 'pg_create_object_relationship',
    args: {
      source: args.source,
      table: { schema: args.fk.fk_table_schema, name: args.fk.fk_table_name },
      name: args.name,
      using: { foreign_key_constraint_on: args.fk.fk_columns[0] },
    },
  };
}

export function opCreateArrayRelationship(args: {
  source: string;
  fk: ForeignKeyInfo;
  name: string;
}): HasuraMetadataOp {
  return {
    type: 'pg_create_array_relationship',
    args: {
      source: args.source,
      table: { schema: args.fk.pk_table_schema, name: args.fk.pk_table_name },
      name: args.name,
      using: {
        foreign_key_constraint_on: {
          table: {
            schema: args.fk.fk_table_schema,
            name: args.fk.fk_table_name,
          },
          columns: args.fk.fk_columns,
        },
      },
    },
  };
}

export async function applyMetadataOps(args: {
  hasura: HasuraClientService;
  logger: LoggerService;
  label: string;
  ops: HasuraMetadataOp[];
  chunkSize?: number;
}): Promise<void> {
  const { hasura, logger, label, ops } = args;
  if (ops.length === 0) return;
  logger.log(`Applying ${label}: ops=${ops.length} source=${hasura.source}`);
  await hasura.postMetadataBulkChunked(ops, {
    chunkSize: args.chunkSize ?? 50,
    label,
  });
}
