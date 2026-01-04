import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { MikroORM, ReferenceKind } from '@mikro-orm/core';
import {
  HASURA_SYNC_REGISTRY_SQL,
  getHasuraCamelCaseFields,
  getHasuraRefCollections,
  getHasuraRefNames,
  getHasuraTables,
  HasuraCamelCaseUsage,
  HasuraRefCollectionUsage,
  HasuraRefNameUsage,
  HasuraTableUsage,
} from '@archpad/models';
import { LoggerService } from '@archpad/logger';

type ResolvedHasuraName = {
  usage: HasuraRefNameUsage | HasuraRefCollectionUsage;
  fkSchema: string;
  fkTable: string;
  fkColumns: string[];
  pkSchema: string;
  pkTable: string;
  desiredArrayName: string;
  explicit: boolean;
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
    const refNames = getHasuraRefNames();
    const refCollections = getHasuraRefCollections();
    const tableUsages = getHasuraTables();
    const camelCaseFields = getHasuraCamelCaseFields();

    const hasAny =
      refNames.length ||
      refCollections.length ||
      tableUsages.length ||
      camelCaseFields.length;
    if (!hasAny) return;

    const conn = this.orm.em.getConnection();
    await this.ensureRegistry(conn);

    // 1) Relationships (array names via FK constraint comments)
    const resolved = [
      ...this.resolveRefNameUsages(refNames),
      ...this.resolveRefCollectionUsages(refCollections),
    ];
    if (resolved.length) {
      this.assertUniqueWithinPkTable(resolved);
      for (const r of resolved) {
        await this.upsertArrayRelationshipOverride(conn, r);
        this.logger.log(
          `Upserted Hasura array relationship override for ${r.pkTable} via FK ${r.fkTable}[${r.fkColumns.join(
            ',',
          )}] -> ${r.desiredArrayName}`,
          this.loggerContext,
        );
      }
    }

    // 2) Table + column naming (via TABLE/COLUMN comments)
    if (tableUsages.length) {
      await this.applyHasuraTableOverrides(conn, tableUsages);
    }
    if (camelCaseFields.length) {
      await this.applyHasuraCamelCaseColumnOverrides(conn, camelCaseFields);
    }
  }

  private resolveRefNameUsages(
    usages: HasuraRefNameUsage[],
  ): ResolvedHasuraName[] {
    return this.resolveManyToOneUsages(usages);
  }

  private resolveRefCollectionUsages(
    usages: HasuraRefCollectionUsage[],
  ): ResolvedHasuraName[] {
    const meta = this.orm.getMetadata();
    const defaultSchema =
      (this.orm.config as any).get?.('schema') ??
      (this.orm.config as any).get?.('schemaName') ??
      'public';

    const out: ResolvedHasuraName[] = [];
    for (const u of usages) {
      const ownerMeta: any = (meta as any).get?.(u.entity.name);
      if (!ownerMeta) {
        this.logger.warn(
          `Skipping @HasuraRefCollection(${u.name}) on ${u.entity.name}.${String(
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
          `Skipping @HasuraRefCollection(${u.name}) on ${u.entity.name}.${propName}: property metadata not found`,
          this.loggerContext,
        );
        continue;
      }

      const propKind: string | undefined = prop.kind ?? prop.reference;
      if (propKind !== ReferenceKind.ONE_TO_MANY) {
        this.logger.warn(
          `Skipping @HasuraRefCollection(${u.name}) on ${u.entity.name}.${propName}: expected OneToMany, got ${String(
            propKind,
          )}`,
          this.loggerContext,
        );
        continue;
      }

      const targetName: string | undefined =
        prop.targetMeta?.className ?? prop.type;
      const targetMeta: any = targetName
        ? (meta as any).get?.(targetName)
        : null;
      if (!targetMeta) {
        this.logger.warn(
          `Skipping @HasuraRefCollection(${u.name}) on ${u.entity.name}.${propName}: target entity metadata not found`,
          this.loggerContext,
        );
        continue;
      }

      const mappedBy: string | undefined = prop.mappedBy;
      const owningProp: any = mappedBy
        ? targetMeta.properties?.[mappedBy]
        : null;
      if (!owningProp) {
        this.logger.warn(
          `Skipping @HasuraRefCollection(${u.name}) on ${u.entity.name}.${propName}: can't resolve owning side via mappedBy="${mappedBy}"`,
          this.loggerContext,
        );
        continue;
      }

      const owningKind: string | undefined =
        owningProp.kind ?? owningProp.reference;
      if (
        owningKind !== ReferenceKind.MANY_TO_ONE &&
        owningKind !== ReferenceKind.ONE_TO_ONE
      ) {
        this.logger.warn(
          `Skipping @HasuraRefCollection(${u.name}) on ${u.entity.name}.${propName}: owning side is not ManyToOne/OneToOne (got ${String(
            owningKind,
          )})`,
          this.loggerContext,
        );
        continue;
      }

      const fkSchema = targetMeta.schema ?? defaultSchema;
      const fkTable = targetMeta.tableName;
      const pkSchema = ownerMeta.schema ?? defaultSchema;
      const pkTable = ownerMeta.tableName;

      const fkColumns: string[] =
        owningProp.fieldNames ??
        owningProp.joinColumns ??
        (owningProp.fieldName ? [owningProp.fieldName] : []);

      if (!fkColumns.length) {
        this.logger.warn(
          `Skipping @HasuraRefCollection(${u.name}) on ${u.entity.name}.${propName}: FK columns not resolved`,
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
        desiredArrayName: u.name,
        explicit: u.explicit,
      });
    }

    return out;
  }

  private resolveManyToOneUsages(
    usages: HasuraRefNameUsage[],
  ): ResolvedHasuraName[] {
    const meta = this.orm.getMetadata();
    const defaultSchema =
      (this.orm.config as any).get?.('schema') ??
      (this.orm.config as any).get?.('schemaName') ??
      'public';

    const out: ResolvedHasuraName[] = [];

    for (const u of usages) {
      const ownerMeta: any = (meta as any).get?.(u.entity.name);
      if (!ownerMeta) {
        this.logger.warn(
          `Skipping @HasuraRefName(${u.name}) on ${u.entity.name}.${String(
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
          `Skipping @HasuraRefName(${u.name}) on ${u.entity.name}.${propName}: property metadata not found`,
          this.loggerContext,
        );
        continue;
      }

      const ref: string | undefined = prop.kind ?? prop.reference;
      if (
        ref !== ReferenceKind.MANY_TO_ONE &&
        ref !== ReferenceKind.ONE_TO_ONE
      ) {
        this.logger.warn(
          `Skipping @HasuraRefName(${u.name}) on ${u.entity.name}.${propName}: expected ManyToOne/OneToOne relation, got ${String(
            ref,
          )}`,
          this.loggerContext,
        );
        continue;
      }

      const targetName: string | undefined =
        prop.targetMeta?.className ?? prop.type;
      const targetMeta: any = targetName
        ? (meta as any).get?.(targetName)
        : null;
      if (!targetMeta) {
        this.logger.warn(
          `Skipping @HasuraRefName(${u.name}) on ${u.entity.name}.${propName}: target entity metadata not found`,
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
          `Skipping @HasuraRefName(${u.name}) on ${u.entity.name}.${propName}: FK columns not resolved`,
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
        desiredArrayName: u.name,
        explicit: u.explicit,
      });
    }

    return out;
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
      const m: any = (meta as any).get?.(t.entity.name);
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
        customName: t.entity.name,
      });

      // For scalar columns: set column comments to mapped property names.
      const props = Object.entries<any>(m.properties ?? {});
      for (const [propName, prop] of props) {
        if (prop.reference !== ReferenceKind.SCALAR) continue;
        const fieldNames: string[] = prop.fieldNames ?? [];
        for (const col of fieldNames) {
          await this.upsertColumnOverride(conn, {
            schema,
            table,
            column: col,
            customName: propName,
          });
        }
      }

      this.logger.log(
        `Applied @HasuraTable naming comments for ${schema}.${table} -> ${t.entity.name}`,
        this.loggerContext,
      );
    }
  }

  private async applyHasuraCamelCaseColumnOverrides(
    conn: any,
    fields: HasuraCamelCaseUsage[],
  ) {
    const meta = this.orm.getMetadata();
    const defaultSchema =
      (this.orm.config as any).get?.('schema') ??
      (this.orm.config as any).get?.('schemaName') ??
      'public';

    for (const f of fields) {
      const m: any = (meta as any).get?.(f.entity.name);
      if (!m) {
        this.logger.warn(
          `Skipping @HasuraCamelCase on ${f.entity.name}.${String(
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
          `Skipping @HasuraCamelCase on ${f.entity.name}.${propName}: property metadata not found`,
          this.loggerContext,
        );
        continue;
      }

      if (prop.reference !== ReferenceKind.SCALAR) {
        this.logger.warn(
          `Skipping @HasuraCamelCase on ${f.entity.name}.${propName}: expected scalar column`,
          this.loggerContext,
        );
        continue;
      }

      const cols: string[] = prop.fieldNames ?? [];
      if (!cols.length) {
        this.logger.warn(
          `Skipping @HasuraCamelCase on ${f.entity.name}.${propName}: column name not resolved`,
          this.loggerContext,
        );
        continue;
      }

      for (const col of cols) {
        const camel = toSimpleCamelCase(col);
        await this.upsertColumnOverride(conn, {
          schema,
          table,
          column: col,
          customName: camel,
        });
      }

      this.logger.log(
        `Applied @HasuraCamelCase comment for ${schema}.${table}.${cols.join(
          ',',
        )} (property=${propName})`,
        this.loggerContext,
      );
    }
  }

  private async ensureRegistry(conn: any) {
    // contains multiple statements
    await conn.execute(HASURA_SYNC_REGISTRY_SQL);
  }

  private async upsertTableOverride(
    conn: any,
    args: { schema: string; table: string; customName: string },
  ) {
    await conn.execute(
      `
      INSERT INTO hasura_sync.table_overrides (table_schema, table_name, custom_name)
      VALUES ('${escapeSqlString(args.schema)}', '${escapeSqlString(
        args.table,
      )}', '${escapeSqlString(args.customName)}')
      ON CONFLICT (table_schema, table_name)
      DO UPDATE SET custom_name = EXCLUDED.custom_name, updated_at = now();
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

  private async upsertArrayRelationshipOverride(
    conn: any,
    r: ResolvedHasuraName,
  ) {
    const cols = r.fkColumns.map((c) => `'${escapeSqlString(c)}'`).join(', ');
    const pkSchema = escapeSqlString(r.pkSchema);
    const pkTable = escapeSqlString(r.pkTable);
    const fkSchema = escapeSqlString(r.fkSchema);
    const fkTable = escapeSqlString(r.fkTable);

    const sameKeyWhere = `
      pk_table_schema='${pkSchema}' AND pk_table_name='${pkTable}'
      AND fk_table_schema='${fkSchema}' AND fk_table_name='${fkTable}'
      AND fk_columns = ARRAY[${cols}]::text[]
    `;

    const nameTakenByOtherKey = async (name: string): Promise<boolean> => {
      const rows = (await conn.execute(
        `
        SELECT true as ok
        FROM hasura_sync.array_relationship_overrides
        WHERE pk_table_schema='${pkSchema}'
          AND pk_table_name='${pkTable}'
          AND name='${escapeSqlString(name)}'
          AND NOT (${sameKeyWhere})
        LIMIT 1;
        `,
      )) as Array<{ ok: boolean }>;
      return !!rows?.[0]?.ok;
    };

    let finalName = r.desiredArrayName;

    if (await nameTakenByOtherKey(finalName)) {
      if (r.explicit) {
        throw new Error(
          `Duplicate explicit Hasura relationship name "${finalName}" for referenced table ${r.pkSchema}.${r.pkTable}. ` +
            `Please make @HasuraRefName/@HasuraRefCollection names unique.`,
        );
      }

      // Auto-disambiguate by adding FK table suffix (stable across runs).
      const suffix = upperFirst(toSimpleCamelCase(r.fkTable));
      let candidate = `${finalName}${suffix}`;
      let n = 2;
      while (await nameTakenByOtherKey(candidate)) {
        candidate = `${finalName}${suffix}${n}`;
        n++;
      }
      finalName = candidate;
    }

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
  }

  private assertUniqueWithinPkTable(items: ResolvedHasuraName[]) {
    // Strict uniqueness is enforced only for explicitly named relationships.
    // Auto-named ones (e.g. @HasuraRefName() with no param) may collide and will be disambiguated
    // during upsert (by adding fkTable suffix) to keep the system usable.
    const explicitOnly = items.filter((x) => x.explicit);

    const byPk = new Map<string, Map<string, ResolvedHasuraName[]>>();
    for (const i of explicitOnly) {
      const pkKey = `${i.pkSchema}.${i.pkTable}`;
      const byName = byPk.get(pkKey) ?? new Map<string, ResolvedHasuraName[]>();
      byPk.set(pkKey, byName);
      byName.set(i.desiredArrayName, [
        ...(byName.get(i.desiredArrayName) ?? []),
        i,
      ]);
    }

    const errors: string[] = [];
    for (const [pkKey, byName] of byPk.entries()) {
      for (const [name, list] of byName.entries()) {
        if (list.length <= 1) continue;
        errors.push(
          `Duplicate explicit Hasura relationship name "${name}" for referenced table ${pkKey}:\n` +
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
        `Explicit Hasura relationship names must be unique within the same referenced table.\n\n${errors.join(
          '\n\n',
        )}`,
      );
    }
  }

  private findConstraintSql(r: ResolvedHasuraName): string {
    const colsArray = r.fkColumns
      .map((c) => `'${escapeSqlString(c)}'`)
      .join(', ');

    // Identify the FK constraint by (fk schema/table, pk schema/table, fk columns).
    // We return also the current constraint comment to avoid needless writes.
    return `
      SELECT
        kcu.constraint_name AS constraint_name,
        obj_description(pc.oid, 'pg_constraint') AS comment
      FROM information_schema.table_constraints tco
      JOIN information_schema.key_column_usage kcu
        ON tco.constraint_schema = kcu.constraint_schema
       AND tco.constraint_name   = kcu.constraint_name
      JOIN information_schema.referential_constraints rco
        ON tco.constraint_schema = rco.constraint_schema
       AND tco.constraint_name   = rco.constraint_name
      JOIN information_schema.table_constraints rel_tco
        ON rco.unique_constraint_schema = rel_tco.constraint_schema
       AND rco.unique_constraint_name   = rel_tco.constraint_name
      JOIN pg_catalog.pg_constraint pc
        ON pc.conname = kcu.constraint_name
      JOIN pg_catalog.pg_class c
        ON c.oid = pc.conrelid
      JOIN pg_catalog.pg_namespace n
        ON n.oid = c.relnamespace
       AND n.nspname = kcu.table_schema
       AND c.relname = kcu.table_name
      WHERE tco.constraint_type = 'FOREIGN KEY'
        AND kcu.table_schema = '${escapeSqlString(r.fkSchema)}'
        AND kcu.table_name   = '${escapeSqlString(r.fkTable)}'
        AND rel_tco.table_schema = '${escapeSqlString(r.pkSchema)}'
        AND rel_tco.table_name   = '${escapeSqlString(r.pkTable)}'
      GROUP BY kcu.constraint_name, pc.oid
      HAVING array_agg(kcu.column_name ORDER BY kcu.ordinal_position) = ARRAY[${colsArray}]::text[]
      LIMIT 1;
    `;
  }
}
