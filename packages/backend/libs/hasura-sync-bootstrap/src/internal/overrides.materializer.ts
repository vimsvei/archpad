import type { EntityManager } from '@mikro-orm/core';
import {
  HasuraSyncArrayRelationshipOverride,
  HasuraSyncColumnOverride,
  HasuraSyncObjectRelationshipOverride,
  HasuraSyncTableOverride,
} from '@archpad/models';
import type { OverridesAccumulator } from './overrides.types';

export async function materializeOverrides(
  tx: EntityManager,
  acc: OverridesAccumulator,
) {
  const rows: any[] = [];
  for (const v of acc.tableOverrides.values()) {
    rows.push(tx.create(HasuraSyncTableOverride, v));
  }
  for (const v of acc.columnOverrides.values()) {
    rows.push(tx.create(HasuraSyncColumnOverride, v));
  }

  if (rows.length) {
    tx.persist(rows);
    await tx.flush();
  }

  // IMPORTANT: `*_relationship_overrides` entities have `text[]` as part of composite PK.
  // Persisting them as regular entities can trip MikroORM identity map (ArrayType PK),
  // so we insert them via `em.insert()` to bypass entity factory/unit-of-work.
  for (const r of acc.objectRelationshipOverrides.values()) {
    await tx.insert(HasuraSyncObjectRelationshipOverride, r as any);
  }
  for (const r of acc.arrayRelationshipOverrides.values()) {
    await tx.insert(HasuraSyncArrayRelationshipOverride, r as any);
  }
}

