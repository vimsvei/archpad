# hasura-sync-bootstrap internals

This folder contains the implementation details for materializing `hasura_sync.*` registry tables
from `@archpad/models` decorators.

## Flow

1. `HasuraRelationshipNameInitializer` (service)
   - Ensures registry schema/tables exist (`SchemaGenerator.updateSchema({ safe: true })`)
   - Runs everything in a single DB transaction
   - Clears existing override rows
2. `HasuraSyncOverridesCollector` (`overrides.collector.ts`)
   - Reads decorator usages (`getHasuraReferences/getHasuraTables/getHasuraProperties`)
   - Resolves MikroORM metadata → produces an in-memory accumulator (Maps)
   - Validates collisions (relationship name uniqueness)
3. `materializeOverrides` (`overrides.materializer.ts`)
   - Writes accumulated rows into `hasura_sync` tables

## What is written

- **Table overrides**: `hasura_sync.table_overrides`
- **Column overrides**: `hasura_sync.column_overrides`
- **Object relationship overrides**: `hasura_sync.object_relationship_overrides`
- **Array relationship overrides**: `hasura_sync.array_relationship_overrides`

## Why relationship overrides use `em.insert()` (not `persist()`)

`*_relationship_overrides` entities have a composite primary key that includes a `text[]` column (`fk_columns`).
When those rows are persisted as regular entities, MikroORM’s identity-map/unit-of-work can attempt to treat
the PK value as an entity identifier and runs into `ArrayType` conversion issues (seen in production as:
`Could not convert JS value 'function_id' of type 'string' to type ArrayType`).

Using `EntityManager.insert()` bypasses entity factory + unit-of-work identity handling and performs a plain
insert while still staying within MikroORM’s API (no handwritten SQL).

