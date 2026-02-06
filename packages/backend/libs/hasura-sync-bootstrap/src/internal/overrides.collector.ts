import { MikroORM, ReferenceKind } from '@mikro-orm/core';
import type { LoggerService } from '@archpad/logger';
import {
  type HasuraPropertyUsage,
  type HasuraReferenceUsage,
  type HasuraTableUsage,
  isHasuraEmbeddable,
} from '@archpad/models';
import {
  columnKey,
  fkColumnsKeyPart,
  normalizeTextArray,
  now,
  tableKey,
  toSimpleCamelCase,
  upperFirst,
} from './overrides.keys';
import type {
  OverridesAccumulator,
  ResolvedHasuraReference,
} from './overrides.types';
import { createOverridesAccumulator } from './overrides.types';

export class HasuraSyncOverridesCollector {
  constructor(
    private readonly orm: MikroORM,
    private readonly logger: LoggerService,
    private readonly loggerContext: string,
  ) {}

  collect(input: {
    references: HasuraReferenceUsage[];
    tableUsages: HasuraTableUsage[];
    hasuraProperties: HasuraPropertyUsage[];
  }): OverridesAccumulator {
    const acc = createOverridesAccumulator();

    this.collectRelationshipOverrides(acc, input.references);
    this.collectTableAndColumnOverrides(acc, input.tableUsages);
    this.collectExplicitPropertyOverrides(acc, input.hasuraProperties);

    return acc;
  }

  private collectRelationshipOverrides(
    acc: OverridesAccumulator,
    references: HasuraReferenceUsage[],
  ) {
    const resolved = this.resolveHasuraReferenceUsages(references);
    if (!resolved.length) return;

    const deduped = this.dedupeSameFkRelationship(resolved);
    this.assertUniqueObjectNamesWithinFkTable(deduped);
    this.assertUniqueCollectionNamesWithinPkTable(deduped);

    for (const r of deduped) {
      const objKey = `${r.fkSchema}\u0000${r.fkTable}\u0000${fkColumnsKeyPart(
        r.fkColumns,
      )}`;
      acc.objectRelationshipOverrides.set(objKey, {
        fkTableSchema: r.fkSchema,
        fkTableName: r.fkTable,
        fkColumns: r.fkColumns,
        name: r.objectName,
        updatedAt: now(),
      });

      const arrKey = `${r.pkSchema}\u0000${r.pkTable}\u0000${r.fkSchema}\u0000${r.fkTable}\u0000${fkColumnsKeyPart(
        r.fkColumns,
      )}`;
      acc.arrayRelationshipOverrides.set(arrKey, {
        pkTableSchema: r.pkSchema,
        pkTableName: r.pkTable,
        fkTableSchema: r.fkSchema,
        fkTableName: r.fkTable,
        fkColumns: r.fkColumns,
        name: r.collectionName,
        updatedAt: now(),
      });
    }
  }

  private collectTableAndColumnOverrides(
    acc: OverridesAccumulator,
    tableUsages: HasuraTableUsage[],
  ) {
    if (!tableUsages.length) return;

    const defaultSchema = this.getDefaultSchema();

    for (const t of tableUsages) {
      if (!t.entity || !t.entity.name) {
        this.logger.warn(
          `Skipping @HasuraTable on unknown entity: entity is undefined or has no name`,
          this.loggerContext,
        );
        continue;
      }

      const m: any = this.getEntityMetadata(
        t.entity.name,
        'Skipping @HasuraTable',
      );
      if (!m) continue;

      const schema = m.schema ?? defaultSchema;
      const table = m.tableName;

      acc.tableOverrides.set(tableKey(schema, table), {
        tableSchema: schema,
        tableName: table,
        customName: t.options?.name ?? t.entity.name,
        camelCase: t.options?.camelCase ?? true,
        updatedAt: now(),
      });

      if (t.options?.camelCase ?? true) {
        const props = Object.entries<any>(m.properties ?? {});
        for (const [propName, prop] of props) {
          if (prop.reference === ReferenceKind.SCALAR) {
            const fieldNames: string[] = prop.fieldNames ?? [];
            for (const col of fieldNames) {
              acc.columnOverrides.set(columnKey(schema, table, col), {
                tableSchema: schema,
                tableName: table,
                columnName: col,
                customName: propName,
                updatedAt: now(),
              });
            }
            continue;
          }

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
                acc.columnOverrides.set(columnKey(schema, table, col), {
                  tableSchema: schema,
                  tableName: table,
                  columnName: col,
                  customName: `${propName}${upperFirst(subName)}`,
                  updatedAt: now(),
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

  private collectExplicitPropertyOverrides(
    acc: OverridesAccumulator,
    fields: HasuraPropertyUsage[],
  ) {
    if (!fields.length) return;

    const meta = this.orm.getMetadata();
    const defaultSchema = this.getDefaultSchema();

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

      const m: any = this.getEntityMetadata(
        f.entity.name,
        `Skipping @HasuraProperty on ${f.entity.name}.${String(f.propertyKey)}`,
      );
      if (!m) continue;

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
        const custom =
          explicitName ?? (camelCase ? toSimpleCamelCase(col) : col);
        acc.columnOverrides.set(columnKey(schema, table, col), {
          tableSchema: schema,
          tableName: table,
          columnName: col,
          customName: custom,
          updatedAt: now(),
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

  private resolveHasuraReferenceUsages(
    usages: HasuraReferenceUsage[],
  ): ResolvedHasuraReference[] {
    const meta = this.orm.getMetadata();
    const defaultSchema = this.getDefaultSchema();

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
        const fkColumns = normalizeTextArray(
          owningProp?.fieldNames ??
            owningProp?.joinColumns ??
            (owningProp?.fieldName ? [owningProp.fieldName] : []),
        );
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
      const fkColumns = normalizeTextArray(
        prop.fieldNames ??
          prop.joinColumns ??
          (prop.fieldName ? [prop.fieldName] : []),
      );
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

  private assertUniqueObjectNamesWithinFkTable(items: ResolvedHasuraReference[]) {
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

  private getDefaultSchema(): string {
    return (
      (this.orm.config as any).get?.('schema') ??
      (this.orm.config as any).get?.('schemaName') ??
      'public'
    );
  }

  private getEntityMetadata(entityName: string, ctx: string): any | null {
    const meta = this.orm.getMetadata();
    try {
      return meta.get(entityName);
    } catch {
      this.logger.warn(
        `${ctx}: entity metadata not found for ${entityName} (entity not discovered?)`,
        this.loggerContext,
      );
      return null;
    }
  }
}

