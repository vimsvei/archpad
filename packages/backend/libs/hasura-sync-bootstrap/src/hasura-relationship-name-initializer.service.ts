import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MikroORM, ReferenceKind, type EntityManager } from '@mikro-orm/core';
import {
  HasuraSyncArrayRelationshipOverride,
  HasuraSyncColumnOverride,
  HasuraSyncObjectRelationshipOverride,
  HasuraSyncTableOverride,
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

function toSimpleCamelCase(snake: string): string {
  return snake.replace(/_([a-z0-9])/g, (_, ch: string) => ch.toUpperCase());
}

function upperFirst(s: string): string {
  return s.length ? s[0].toUpperCase() + s.slice(1) : s;
}

/**
 * Creates and materializes `hasura_sync.*` registry tables from @archpad/models decorators.
 *
 * This is needed for Hasura metadata sync (custom table/column names and relationship overrides).
 * Tenant DB previously missed this, so `hasura_sync` schema did not exist.
 */
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

    await this.ensureRegistry();

    const em = this.orm.em.fork();

    await em.transactional(async (tx) => {
      // Clear old overrides to avoid conflicts with stale data
      await this.clearHasuraSyncOverrides(tx);

      // Accumulate rows with "last write wins" semantics (like SQL upsert).
      const tableOverrides = new Map<
        string,
        Pick<
          HasuraSyncTableOverride,
          'tableSchema' | 'tableName' | 'customName' | 'camelCase' | 'updatedAt'
        >
      >();
      const columnOverrides = new Map<
        string,
        Pick<
          HasuraSyncColumnOverride,
          | 'tableSchema'
          | 'tableName'
          | 'columnName'
          | 'customName'
          | 'updatedAt'
        >
      >();
      const objectRelationshipOverrides = new Map<
        string,
        Pick<
          HasuraSyncObjectRelationshipOverride,
          | 'fkTableSchema'
          | 'fkTableName'
          | 'fkColumns'
          | 'name'
          | 'updatedAt'
        >
      >();
      const arrayRelationshipOverrides = new Map<
        string,
        Pick<
          HasuraSyncArrayRelationshipOverride,
          | 'pkTableSchema'
          | 'pkTableName'
          | 'fkTableSchema'
          | 'fkTableName'
          | 'fkColumns'
          | 'name'
          | 'updatedAt'
        >
      >();

      // 1) Relationships (object + collection names)
      const resolved = this.resolveHasuraReferenceUsages(references);
      if (resolved.length) {
        const deduped = this.dedupeSameFkRelationship(resolved);
        this.assertUniqueObjectNamesWithinFkTable(deduped);
        this.assertUniqueCollectionNamesWithinPkTable(deduped);

        for (const r of deduped) {
          const objKey = `${r.fkSchema}\u0000${r.fkTable}\u0000${r.fkColumns.join(
            '\u0001',
          )}`;
          objectRelationshipOverrides.set(objKey, {
            fkTableSchema: r.fkSchema,
            fkTableName: r.fkTable,
            fkColumns: r.fkColumns,
            name: r.objectName,
            updatedAt: new Date(),
          });

          const arrKey = `${r.pkSchema}\u0000${r.pkTable}\u0000${r.fkSchema}\u0000${r.fkTable}\u0000${r.fkColumns.join(
            '\u0001',
          )}`;
          arrayRelationshipOverrides.set(arrKey, {
            pkTableSchema: r.pkSchema,
            pkTableName: r.pkTable,
            fkTableSchema: r.fkSchema,
            fkTableName: r.fkTable,
            fkColumns: r.fkColumns,
            name: r.collectionName,
            updatedAt: new Date(),
          });
        }
      }

      // 2) Table + column naming (via TABLE/COLUMN comments)
      if (tableUsages.length) {
        await this.applyHasuraTableOverrides(tx, tableUsages, {
          tableOverrides,
          columnOverrides,
        });
      }
      if (hasuraProperties.length) {
        await this.applyHasuraPropertyOverrides(tx, hasuraProperties, {
          columnOverrides,
        });
      }

      const rows: any[] = [];
      for (const v of tableOverrides.values()) {
        rows.push(tx.create(HasuraSyncTableOverride, v));
      }
      for (const v of columnOverrides.values()) {
        rows.push(tx.create(HasuraSyncColumnOverride, v));
      }
      for (const v of objectRelationshipOverrides.values()) {
        rows.push(tx.create(HasuraSyncObjectRelationshipOverride, v));
      }
      for (const v of arrayRelationshipOverrides.values()) {
        rows.push(tx.create(HasuraSyncArrayRelationshipOverride, v));
      }

      if (rows.length) {
        tx.persist(rows);
        await tx.flush();
      }

      this.logger.log(
        `Materialized Hasura sync overrides: tables=${tableOverrides.size}, columns=${columnOverrides.size}, objectRels=${objectRelationshipOverrides.size}, arrayRels=${arrayRelationshipOverrides.size}`,
        this.loggerContext,
      );
    });
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
      } catch {
        this.logger.warn(
          `Skipping @HasuraReference(${u.objectName},${u.collectionName}) on ${u.entity.name}.${String(
            u.propertyKey,
          )}: entity metadata not found (entity not discovered?)`,
          this.loggerContext,
        );
        continue;
      }

      if (!ownerMeta) continue;

      const propName = String(u.propertyKey);
      const prop: any = ownerMeta.properties?.[propName];
      if (!prop) continue;

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
          } catch {
            // will warn below
          }
        }
        if (!targetMeta) continue;

        const mappedBy: string | undefined = prop.mappedBy;
        const owningProp: any = mappedBy
          ? targetMeta.properties?.[mappedBy]
          : null;
        const fkColumns: string[] =
          owningProp?.fieldNames ??
          owningProp?.joinColumns ??
          (owningProp?.fieldName ? [owningProp.fieldName] : []);
        if (!fkColumns.length) continue;

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
        } catch {
          // will warn below
        }
      }
      if (!targetMeta) continue;

      const fkSchema = ownerMeta.schema ?? defaultSchema;
      const fkTable = ownerMeta.tableName;
      const pkSchema = targetMeta.schema ?? defaultSchema;
      const pkTable = targetMeta.tableName;
      const fkColumns: string[] =
        prop.fieldNames ??
        prop.joinColumns ??
        (prop.fieldName ? [prop.fieldName] : []);
      if (!fkColumns.length) continue;

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
      this.logger.warn(
        `Multiple @HasuraReference definitions for the same FK relationship (${k}). Using the first one.`,
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
    for (const [fkKey, byName] of byFk.entries()) {
      for (const [name, list] of byName.entries()) {
        if (list.length <= 1) continue;
        throw new Error(
          `Hasura object relationship name collision within FK table ${fkKey}: "${name}"`,
        );
      }
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
    for (const [pkKey, byName] of byPk.entries()) {
      for (const [name, list] of byName.entries()) {
        if (list.length <= 1) continue;
        throw new Error(
          `Hasura collection relationship name collision within PK table ${pkKey}: "${name}"`,
        );
      }
    }
  }

  private async applyHasuraTableOverrides(
    _em: EntityManager,
    tables: HasuraTableUsage[],
    acc: {
      tableOverrides: Map<
        string,
        Pick<
          HasuraSyncTableOverride,
          'tableSchema' | 'tableName' | 'customName' | 'camelCase' | 'updatedAt'
        >
      >;
      columnOverrides: Map<
        string,
        Pick<
          HasuraSyncColumnOverride,
          | 'tableSchema'
          | 'tableName'
          | 'columnName'
          | 'customName'
          | 'updatedAt'
        >
      >;
    },
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

      const tableKey = `${schema}\u0000${table}`;
      acc.tableOverrides.set(tableKey, {
        tableSchema: schema,
        tableName: table,
        customName: t.options?.name ?? t.entity.name,
        camelCase: t.options?.camelCase ?? true,
        updatedAt: new Date(),
      });

      if (t.options?.camelCase ?? true) {
        // For scalar columns: set column comments to mapped property names.
        const props = Object.entries<any>(m.properties ?? {});
        for (const [propName, prop] of props) {
          if (prop.reference === ReferenceKind.SCALAR) {
            const fieldNames: string[] = prop.fieldNames ?? [];
            for (const col of fieldNames) {
              const colKey = `${schema}\u0000${table}\u0000${col}`;
              acc.columnOverrides.set(colKey, {
                tableSchema: schema,
                tableName: table,
                columnName: col,
                customName: propName,
                updatedAt: new Date(),
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
                const colKey = `${schema}\u0000${table}\u0000${col}`;
                acc.columnOverrides.set(colKey, {
                  tableSchema: schema,
                  tableName: table,
                  columnName: col,
                  customName: `${propName}${upperFirst(subName)}`,
                  updatedAt: new Date(),
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
    _em: EntityManager,
    fields: HasuraPropertyUsage[],
    acc: {
      columnOverrides: Map<
        string,
        Pick<
          HasuraSyncColumnOverride,
          | 'tableSchema'
          | 'tableName'
          | 'columnName'
          | 'customName'
          | 'updatedAt'
        >
      >;
    },
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
        const colKey = `${schema}\u0000${table}\u0000${col}`;
        acc.columnOverrides.set(colKey, {
          tableSchema: schema,
          tableName: table,
          columnName: col,
          customName: custom,
          updatedAt: new Date(),
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

  private async clearHasuraSyncOverrides(em: EntityManager) {
    // Clear all override tables to avoid conflicts with stale data
    const deletedArray = await em.nativeDelete(
      HasuraSyncArrayRelationshipOverride,
      {},
    );
    const deletedObject = await em.nativeDelete(
      HasuraSyncObjectRelationshipOverride,
      {},
    );
    const deletedTables = await em.nativeDelete(HasuraSyncTableOverride, {});
    const deletedColumns = await em.nativeDelete(HasuraSyncColumnOverride, {});

    this.logger.log(
      `Cleared Hasura sync override tables: array=${String(
        deletedArray,
      )}, object=${String(deletedObject)}, tables=${String(
        deletedTables,
      )}, columns=${String(deletedColumns)}`,
      this.loggerContext,
    );
  }
}

