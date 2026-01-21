import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MikroORM, ReferenceKind } from '@mikro-orm/core';
import {
  getHasuraProperties,
  getHasuraReferences,
  getHasuraTables,
  HasuraPropertyUsage,
  HasuraReferenceUsage,
  HasuraTableUsage,
  isHasuraEmbeddable,
} from '@archpad/models';
import { LoggerService } from '@archpad/logger';

type ResolvedHasuraReference = {
  usage: HasuraReferenceUsage;
  fkSchema: string;
  fkTable: string;
  fkColumns: string[];
  pkSchema: string;
  pkTable: string;
  objectName: string;
  collectionName: string;
};

function escapeSqlString(value: string): string {
  return value.replace(/'/g, "''");
}

function toSimpleCamelCase(snake: string): string {
  return snake.replace(/_([a-z0-9])/g, (_, ch: string) => ch.toUpperCase());
}

function upperFirst(s: string): string {
  return s.length ? s[0].toUpperCase() + s.slice(1) : s;
}

@Injectable()
export class HasuraRelationshipNameInitializer
  implements OnApplicationBootstrap
{
  private readonly loggerContext = HasuraRelationshipNameInitializer.name;

  constructor(
    private readonly orm: MikroORM,
    private readonly logger: LoggerService,
  ) {}

  async onApplicationBootstrap() {
    const references = getHasuraReferences();
    const tableUsages = getHasuraTables();
    const hasuraProperties = getHasuraProperties();

    const hasAny =
      references.length || tableUsages.length || hasuraProperties.length;
    if (!hasAny) return;

    const conn = this.orm.em.getConnection();
    await this.ensureRegistry();

    // Clear old overrides to avoid conflicts with stale data
    await this.clearHasuraSyncOverrides(conn);

    // 1) Relationships (object + collection names)
    const resolved = this.resolveHasuraReferenceUsages(references);
    if (resolved.length) {
      const deduped = this.dedupeSameFkRelationship(resolved);
      this.assertUniqueObjectNamesWithinFkTable(deduped);
      this.assertUniqueCollectionNamesWithinPkTable(deduped);
      for (const r of deduped) {
        await this.upsertObjectRelationshipOverride(conn, r);
        await this.upsertArrayRelationshipOverride(conn, r);
      }
    }

    // 2) Table + column naming (via TABLE/COLUMN comments)
    if (tableUsages.length) {
      await this.applyHasuraTableOverrides(conn, tableUsages);
    }
    if (hasuraProperties.length) {
      await this.applyHasuraPropertyOverrides(conn, hasuraProperties);
    }
  }

  private resolveHasuraReferenceUsages(
    usages: HasuraReferenceUsage[],
  ): ResolvedHasuraReference[] {
    const meta = this.orm.getMetadata();
    const defaultSchema =
      (this.orm.config as any).get?.('schema') ??
      (this.orm.config as any).get?.('schemaName') ??
      'public';

    const out: ResolvedHasuraReference[] = [];

    for (const u of usages) {
      if (!u.entity || !u.entity.name) {
        this.logger.warn(
          `Skipping @HasuraReference(${u.objectName},${u.collectionName}) on unknown entity.${String(
            u.propertyKey,
          )}: entity is undefined or has no name`,
          this.loggerContext,
        );
        continue;
      }

      let ownerMeta: any;
      try {
        ownerMeta = meta.get(u.entity.name);
      } catch (error) {
        this.logger.warn(
          `Skipping @HasuraReference(${u.objectName},${u.collectionName}) on ${u.entity.name}.${String(
            u.propertyKey,
          )}: entity metadata not found (entity not discovered?)`,
          this.loggerContext,
        );
        continue;
      }

      if (!ownerMeta) {
        this.logger.warn(
          `Skipping @HasuraReference(${u.objectName},${u.collectionName}) on ${u.entity.name}.${String(
            u.propertyKey,
          )}: entity metadata not found (entity not discovered?)`,
          this.loggerContext,
        );
        continue;
      }

      const propName = String(u.propertyKey);
      const prop: any = ownerMeta.properties?.[propName];
      if (!prop) {
        this.logger.warn(
          `Skipping @HasuraReference(${u.objectName},${u.collectionName}) on ${u.entity.name}.${propName}: property metadata not found`,
          this.loggerContext,
        );
        continue;
      }

      const ref: string | undefined = prop.kind ?? prop.reference;
      if (
        ref !== ReferenceKind.MANY_TO_ONE &&
        ref !== ReferenceKind.ONE_TO_ONE &&
        ref !== ReferenceKind.ONE_TO_MANY
      ) {
        this.logger.warn(
          `Skipping @HasuraReference(${u.objectName},${u.collectionName}) on ${u.entity.name}.${propName}: expected ManyToOne/OneToOne (preferred) or OneToMany, got ${String(
            ref,
          )}`,
          this.loggerContext,
        );
        continue;
      }

      if (ref === ReferenceKind.ONE_TO_MANY) {
        // Inverse-side support (warn): resolve owning side and FK columns.
        this.logger.warn(
          `@HasuraReference(${u.objectName},${u.collectionName}) placed on inverse side ${u.entity.name}.${propName}. Prefer placing it on the owning ManyToOne/OneToOne side.`,
          this.loggerContext,
        );

        const targetName: string | undefined =
          prop.targetMeta?.className ?? prop.type;
        let targetMeta: any = null;
        if (targetName) {
          try {
            targetMeta = meta.get(targetName);
          } catch (error) {
            // will warn below
          }
        }
        if (!targetMeta) {
          this.logger.warn(
            `Skipping inverse-side @HasuraReference(${u.objectName},${u.collectionName}) on ${u.entity.name}.${propName}: target entity metadata not found${targetName ? ` (${targetName})` : ''}`,
            this.loggerContext,
          );
          continue;
        }

        const mappedBy: string | undefined = prop.mappedBy;
        const owningProp: any = mappedBy
          ? targetMeta.properties?.[mappedBy]
          : null;
        const fkColumns: string[] =
          owningProp?.fieldNames ??
          owningProp?.joinColumns ??
          (owningProp?.fieldName ? [owningProp.fieldName] : []);

        if (!fkColumns.length) {
          this.logger.warn(
            `Skipping inverse-side @HasuraReference(${u.objectName},${u.collectionName}) on ${u.entity.name}.${propName}: FK columns not resolved via mappedBy="${mappedBy}"`,
            this.loggerContext,
          );
          continue;
        }

        out.push({
          usage: u,
          fkSchema: targetMeta.schema ?? defaultSchema,
          fkTable: targetMeta.tableName,
          fkColumns,
          pkSchema: ownerMeta.schema ?? defaultSchema,
          pkTable: ownerMeta.tableName,
          objectName: u.objectName,
          collectionName: u.collectionName,
        });
        continue;
      }

      const targetName: string | undefined =
        prop.targetMeta?.className ?? prop.type;
      let targetMeta: any = null;
      if (targetName) {
        try {
          targetMeta = meta.get(targetName);
        } catch (error) {
          // will warn below
        }
      }
      if (!targetMeta) {
        this.logger.warn(
          `Skipping @HasuraReference(${u.objectName},${u.collectionName}) on ${u.entity.name}.${propName}: target entity metadata not found${targetName ? ` (${targetName})` : ''}`,
          this.loggerContext,
        );
        continue;
      }

      const fkSchema = ownerMeta.schema ?? defaultSchema;
      const fkTable = ownerMeta.tableName;
      const pkSchema = targetMeta.schema ?? defaultSchema;
      const pkTable = targetMeta.tableName;

      const fkColumns: string[] =
        prop.fieldNames ??
        prop.joinColumns ??
        (prop.fieldName ? [prop.fieldName] : []);

      if (!fkColumns.length) {
        this.logger.warn(
          `Skipping @HasuraReference(${u.objectName},${u.collectionName}) on ${u.entity.name}.${propName}: FK columns not resolved`,
          this.loggerContext,
        );
        continue;
      }

      out.push({
        usage: u,
        fkSchema,
        fkTable,
        fkColumns,
        pkSchema,
        pkTable,
        objectName: u.objectName,
        collectionName: u.collectionName,
      });
    }

    return out;
  }

  private dedupeSameFkRelationship(
    items: ResolvedHasuraReference[],
  ): ResolvedHasuraReference[] {
    const byKey = new Map<string, ResolvedHasuraReference[]>();
    const keyOf = (r: ResolvedHasuraReference) =>
      `${r.fkSchema}.${r.fkTable}|${r.fkColumns.join(',')}|${r.pkSchema}.${r.pkTable}`;

    for (const r of items) {
      const k = keyOf(r);
      byKey.set(k, [...(byKey.get(k) ?? []), r]);
    }

    const out: ResolvedHasuraReference[] = [];
    for (const [k, list] of byKey.entries()) {
      if (list.length === 1) {
        out.push(list[0]);
        continue;
      }

      const chosen = list[0];
      const variants = list
        .map(
          (x) =>
            `${x.usage.entity.name}.${String(x.usage.propertyKey)}(objectName=${x.objectName}, collectionName=${x.collectionName})`,
        )
        .join('; ');
      this.logger.warn(
        `Multiple @HasuraReference definitions for the same FK relationship (${k}). Using the first one. Definitions: ${variants}`,
        this.loggerContext,
      );
      out.push(chosen);
    }
    return out;
  }

  private assertUniqueObjectNamesWithinFkTable(
    items: ResolvedHasuraReference[],
  ) {
    const byFk = new Map<string, Map<string, ResolvedHasuraReference[]>>();
    for (const i of items) {
      const fkKey = `${i.fkSchema}.${i.fkTable}`;
      const byName =
        byFk.get(fkKey) ?? new Map<string, ResolvedHasuraReference[]>();
      byFk.set(fkKey, byName);
      byName.set(i.objectName, [...(byName.get(i.objectName) ?? []), i]);
    }

    const errors: string[] = [];
    for (const [fkKey, byName] of byFk.entries()) {
      for (const [name, list] of byName.entries()) {
        if (list.length <= 1) continue;
        errors.push(
          `Duplicate Hasura object relationship name "${name}" within FK table ${fkKey}:\n` +
            list
              .map(
                (x) =>
                  `- ${x.usage.entity.name}.${String(
                    x.usage.propertyKey,
                  )} (${x.fkTable}[${x.fkColumns.join(',')}] -> ${x.pkTable})`,
              )
              .join('\n'),
        );
      }
    }

    if (errors.length) {
      throw new Error(
        `Hasura object relationship names must be unique within the same FK table.\n\n${errors.join(
          '\n\n',
        )}`,
      );
    }
  }

  private assertUniqueCollectionNamesWithinPkTable(
    items: ResolvedHasuraReference[],
  ) {
    const byPk = new Map<string, Map<string, ResolvedHasuraReference[]>>();
    for (const i of items) {
      const pkKey = `${i.pkSchema}.${i.pkTable}`;
      const byName =
        byPk.get(pkKey) ?? new Map<string, ResolvedHasuraReference[]>();
      byPk.set(pkKey, byName);
      byName.set(i.collectionName, [
        ...(byName.get(i.collectionName) ?? []),
        i,
      ]);
    }

    const errors: string[] = [];
    for (const [pkKey, byName] of byPk.entries()) {
      for (const [name, list] of byName.entries()) {
        if (list.length <= 1) continue;
        errors.push(
          `Duplicate Hasura collection relationship name "${name}" for referenced table ${pkKey}:\n` +
            list
              .map(
                (x) =>
                  `- ${x.usage.entity.name}.${String(
                    x.usage.propertyKey,
                  )} (${x.fkTable}[${x.fkColumns.join(',')}])`,
              )
              .join('\n'),
        );
      }
    }

    if (errors.length) {
      throw new Error(
        `Hasura collection relationship names must be unique within the same referenced table.\n\n${errors.join(
          '\n\n',
        )}`,
      );
    }
  }

  private async applyHasuraTableOverrides(
    conn: any,
    tables: HasuraTableUsage[],
  ) {
    const meta = this.orm.getMetadata();
    const defaultSchema =
      (this.orm.config as any).get?.('schema') ??
      (this.orm.config as any).get?.('schemaName') ??
      'public';

    for (const t of tables) {
      if (!t.entity || !t.entity.name) {
        this.logger.warn(
          `Skipping @HasuraTable on unknown entity: entity is undefined or has no name`,
          this.loggerContext,
        );
        continue;
      }

      let m: any;
      try {
        m = meta.get(t.entity.name);
      } catch (error) {
        this.logger.warn(
          `Skipping @HasuraTable on ${t.entity.name}: entity metadata not found (entity not discovered?)`,
          this.loggerContext,
        );
        continue;
      }

      if (!m) {
        this.logger.warn(
          `Skipping @HasuraTable on ${t.entity.name}: entity metadata not found (entity not discovered?)`,
          this.loggerContext,
        );
        continue;
      }

      const schema = m.schema ?? defaultSchema;
      const table = m.tableName;

      await this.upsertTableOverride(conn, {
        schema,
        table,
        customName: t.options?.name ?? t.entity.name,
        camelCase: t.options?.camelCase ?? true,
      });

      if (t.options?.camelCase ?? true) {
        // For scalar columns: set column comments to mapped property names.
        const props = Object.entries<any>(m.properties ?? {});
        for (const [propName, prop] of props) {
          if (prop.reference === ReferenceKind.SCALAR) {
            const fieldNames: string[] = prop.fieldNames ?? [];
            for (const col of fieldNames) {
              await this.upsertColumnOverride(conn, {
                schema,
                table,
                column: col,
                customName: propName,
              });
            }
            continue;
          }

          // For embedded objects that are explicitly marked as HasuraEmbeddable:
          // expose underlying scalar columns as `parentChild`.
          //
          // NOTE: Hasura can't expose a real nested object from multiple columns without a view/function.
          if (prop.reference === ReferenceKind.EMBEDDED) {
            const embeddedCtor =
              (typeof prop.type === 'function'
                ? (prop.type as Function)
                : undefined) ??
              (typeof prop.embeddable === 'function'
                ? (prop.embeddable as Function)
                : undefined) ??
              (typeof prop.entity === 'function'
                ? (prop.entity as Function)
                : undefined);

            if (!embeddedCtor || !isHasuraEmbeddable(embeddedCtor)) continue;

            const embeddedProps: Record<string, any> = prop.embeddedProps ?? {};
            for (const [subName, subProp] of Object.entries<any>(
              embeddedProps,
            )) {
              if (
                (subProp.reference ?? ReferenceKind.SCALAR) !==
                ReferenceKind.SCALAR
              )
                continue;
              const cols: string[] = subProp.fieldNames ?? [];
              for (const col of cols) {
                await this.upsertColumnOverride(conn, {
                  schema,
                  table,
                  column: col,
                  customName: `${propName}${upperFirst(subName)}`,
                });
              }
            }
          }
        }
      }

      this.logger.log(
        `Applied @HasuraTable naming comments for ${schema}.${table} -> ${t.options?.name ?? t.entity.name}`,
        this.loggerContext,
      );
    }
  }

  private async applyHasuraPropertyOverrides(
    conn: any,
    fields: HasuraPropertyUsage[],
  ) {
    const meta = this.orm.getMetadata();
    const defaultSchema =
      (this.orm.config as any).get?.('schema') ??
      (this.orm.config as any).get?.('schemaName') ??
      'public';

    for (const f of fields) {
      if (!f.entity || !f.entity.name) {
        this.logger.warn(
          `Skipping @HasuraProperty on unknown entity.${String(
            f.propertyKey,
          )}: entity is undefined or has no name`,
          this.loggerContext,
        );
        continue;
      }

      let m: any;
      try {
        m = meta.get(f.entity.name);
      } catch (error) {
        this.logger.warn(
          `Skipping @HasuraProperty on ${f.entity.name}.${String(
            f.propertyKey,
          )}: entity metadata not found (entity not discovered?)`,
          this.loggerContext,
        );
        continue;
      }

      if (!m) {
        this.logger.warn(
          `Skipping @HasuraProperty on ${f.entity.name}.${String(
            f.propertyKey,
          )}: entity metadata not found (entity not discovered?)`,
          this.loggerContext,
        );
        continue;
      }

      const schema = m.schema ?? defaultSchema;
      const table = m.tableName;
      const propName = String(f.propertyKey);
      const prop: any = m.properties?.[propName];
      if (!prop) {
        this.logger.warn(
          `Skipping @HasuraProperty on ${f.entity.name}.${propName}: property metadata not found`,
          this.loggerContext,
        );
        continue;
      }

      if (prop.reference !== ReferenceKind.SCALAR) {
        this.logger.warn(
          `Skipping @HasuraProperty on ${f.entity.name}.${propName}: expected scalar column`,
          this.loggerContext,
        );
        continue;
      }

      const cols: string[] = prop.fieldNames ?? [];
      if (!cols.length) {
        this.logger.warn(
          `Skipping @HasuraProperty on ${f.entity.name}.${propName}: column name not resolved`,
          this.loggerContext,
        );
        continue;
      }

      const explicitName = f.options?.name;
      const camelCase = f.options?.camelCase ?? true;

      for (const col of cols) {
        // If camelCase is disabled and no explicit custom name is provided,
        // we still write an override equal to DB column name to prevent
        // hasura-sync-service fallback camelCase renaming.
        const custom =
          explicitName ?? (camelCase ? toSimpleCamelCase(col) : col);
        await this.upsertColumnOverride(conn, {
          schema,
          table,
          column: col,
          customName: custom,
        });
      }

      this.logger.log(
        `Applied @HasuraProperty comment for ${schema}.${table}.${cols.join(
          ',',
        )} (property=${propName})`,
        this.loggerContext,
      );
    }
  }

  private async ensureRegistry() {
    // Create `hasura_sync.*` tables via MikroORM metadata (no handwritten SQL).
    // Safe: true, no drops.
    await this.orm
      .getSchemaGenerator()
      .updateSchema({ safe: true, dropTables: false } as any);
  }

  private async clearHasuraSyncOverrides(conn: any) {
    // Clear all override tables to avoid conflicts with stale data
    // noinspection SqlWithoutWhere,SqlResolve,SqlNoDataSourceInspection
    await conn.execute(`DELETE FROM hasura_sync.array_relationship_overrides;`);
    // noinspection SqlWithoutWhere,SqlResolve,SqlNoDataSourceInspection
    await conn.execute(
      `DELETE FROM hasura_sync.object_relationship_overrides;`,
    );
    // noinspection SqlWithoutWhere,SqlResolve,SqlNoDataSourceInspection
    await conn.execute(`DELETE FROM hasura_sync.table_overrides;`);
    // noinspection SqlWithoutWhere,SqlResolve,SqlNoDataSourceInspection
    await conn.execute(`DELETE FROM hasura_sync.column_overrides;`);
    this.logger.log(
      'Cleared all Hasura sync override tables',
      this.loggerContext,
    );
  }

  private async upsertTableOverride(
    conn: any,
    args: {
      schema: string;
      table: string;
      customName: string;
      camelCase: boolean;
    },
  ) {
    // noinspection SqlResolve,SqlNoDataSourceInspection
    await conn.execute(
      `
      INSERT INTO hasura_sync.table_overrides (table_schema, table_name, custom_name, camel_case)
      VALUES ('${escapeSqlString(args.schema)}', '${escapeSqlString(
        args.table,
      )}', '${escapeSqlString(args.customName)}', ${args.camelCase ? 'true' : 'false'})
      ON CONFLICT (table_schema, table_name)
      DO UPDATE SET custom_name = EXCLUDED.custom_name, camel_case = EXCLUDED.camel_case, updated_at = now();
      `,
    );
  }

  private async upsertColumnOverride(
    conn: any,
    args: {
      schema: string;
      table: string;
      column: string;
      customName: string;
    },
  ) {
    // noinspection SqlResolve,SqlNoDataSourceInspection
    await conn.execute(
      `
      INSERT INTO hasura_sync.column_overrides (table_schema, table_name, column_name, custom_name)
      VALUES ('${escapeSqlString(args.schema)}', '${escapeSqlString(
        args.table,
      )}', '${escapeSqlString(args.column)}', '${escapeSqlString(
        args.customName,
      )}')
      ON CONFLICT (table_schema, table_name, column_name)
      DO UPDATE SET custom_name = EXCLUDED.custom_name, updated_at = now();
      `,
    );
  }

  private async upsertObjectRelationshipOverride(
    conn: any,
    r: ResolvedHasuraReference,
  ) {
    const cols = r.fkColumns.map((c) => `'${escapeSqlString(c)}'`).join(', ');
    const fkSchema = escapeSqlString(r.fkSchema);
    const fkTable = escapeSqlString(r.fkTable);
    const name = escapeSqlString(r.objectName);

    // noinspection SqlResolve,SqlNoDataSourceInspection
    await conn.execute(
      `
      INSERT INTO hasura_sync.object_relationship_overrides (
        fk_table_schema, fk_table_name,
        fk_columns,
        name
      )
      VALUES (
        '${fkSchema}', '${fkTable}',
        ARRAY[${cols}]::text[],
        '${name}'
      )
      ON CONFLICT (fk_table_schema, fk_table_name, fk_columns)
      DO UPDATE SET name = EXCLUDED.name, updated_at = now();
      `,
    );
    this.logger.log(
      `Upserted Hasura object relationship override for ${r.fkSchema}.${r.fkTable}[${r.fkColumns.join(
        ',',
      )}] -> ${r.objectName}`,
      this.loggerContext,
    );
  }

  private async upsertArrayRelationshipOverride(
    conn: any,
    r: ResolvedHasuraReference,
  ) {
    const cols = r.fkColumns.map((c) => `'${escapeSqlString(c)}'`).join(', ');
    const pkSchema = escapeSqlString(r.pkSchema);
    const pkTable = escapeSqlString(r.pkTable);
    const fkSchema = escapeSqlString(r.fkSchema);
    const fkTable = escapeSqlString(r.fkTable);
    const finalName = r.collectionName;
    // noinspection SqlResolve,SqlNoDataSourceInspection
    await conn.execute(
      `
      INSERT INTO hasura_sync.array_relationship_overrides (
        pk_table_schema, pk_table_name,
        fk_table_schema, fk_table_name,
        fk_columns,
        name
      )
      VALUES (
        '${pkSchema}', '${pkTable}',
        '${fkSchema}', '${fkTable}',
        ARRAY[${cols}]::text[],
        '${escapeSqlString(finalName)}'
      )
      ON CONFLICT (pk_table_schema, pk_table_name, fk_table_schema, fk_table_name, fk_columns)
      DO UPDATE SET name = EXCLUDED.name, updated_at = now();
      `,
    );
    this.logger.log(
      `Upserted Hasura collection relationship override for ${r.pkSchema}.${r.pkTable} via FK ${r.fkTable}[${r.fkColumns.join(
        ',',
      )}] -> ${r.collectionName}`,
      this.loggerContext,
    );
  }
}
