import { applyCamelCaseCustomization } from './apply-camelcase-customization';

import { getHasuraSyncTableOverrides } from '../db/get-hasura-sync-table-overrides';
import { getHasuraSyncColumnOverrides } from '../db/get-hasura-sync-column-overrides';
import { getSchemaTableColumns } from '../db/get-schema-table-columns';

jest.mock('../db/get-hasura-sync-table-overrides', () => ({
  getHasuraSyncTableOverrides: jest.fn(),
}));
jest.mock('../db/get-hasura-sync-column-overrides', () => ({
  getHasuraSyncColumnOverrides: jest.fn(),
}));
jest.mock('../db/get-schema-table-columns', () => ({
  getSchemaTableColumns: jest.fn(),
}));

type FakeHasura = {
  source: string;
  schema: string;
  postMetadataBulkAtomicChunked: jest.Mock<Promise<void>, [any[], any]>;
};

describe('applyCamelCaseCustomization', () => {
  it('does not apply fallback camelCase for columns when table override camel_case=false and no column overrides', async () => {
    const hasura: FakeHasura = {
      source: 'default',
      schema: 'public',
      postMetadataBulkAtomicChunked: jest.fn(async () => undefined),
    };
    const logger = { log: jest.fn() } as any;

    (getHasuraSyncTableOverrides as jest.Mock).mockResolvedValue([
      {
        table_schema: 'public',
        table_name: 'foo_table',
        custom_name: 'FooTable',
        camel_case: false,
      },
    ]);
    (getHasuraSyncColumnOverrides as jest.Mock).mockResolvedValue([]);
    (getSchemaTableColumns as jest.Mock).mockResolvedValue(
      new Map([['foo_table', ['created_at', 'some_value']]]),
    );

    await applyCamelCaseCustomization({
      hasura: hasura as any,
      logger,
      tables: [{ schema: 'public', name: 'foo_table' }],
      fallbackCamelCase: true,
    });

    expect(hasura.postMetadataBulkAtomicChunked).toHaveBeenCalledTimes(1);
    const [ops] = hasura.postMetadataBulkAtomicChunked.mock.calls[0]!;
    expect(Array.isArray(ops)).toBe(true);
    expect(ops).toHaveLength(1);

    const op = ops[0];
    expect(op.type).toBe('pg_set_table_customization');
    const cfg = op.args?.configuration ?? {};

    // Table custom_name is still applied (from registry)
    expect(cfg.custom_name).toBe('FooTable');
    expect(cfg.identifier).toBe('FooTable');

    // But column fallback camelCase must NOT be applied
    expect(cfg.custom_column_names).toBeUndefined();
    expect(cfg.column_config).toBeUndefined();
  });

  it('applies fallback camelCase when no table override exists', async () => {
    const hasura: FakeHasura = {
      source: 'default',
      schema: 'public',
      postMetadataBulkAtomicChunked: jest.fn(async () => undefined),
    };
    const logger = { log: jest.fn() } as any;

    (getHasuraSyncTableOverrides as jest.Mock).mockResolvedValue([]);
    (getHasuraSyncColumnOverrides as jest.Mock).mockResolvedValue([]);
    (getSchemaTableColumns as jest.Mock).mockResolvedValue(
      new Map([['bar_table', ['created_at']]]),
    );

    await applyCamelCaseCustomization({
      hasura: hasura as any,
      logger,
      tables: [{ schema: 'public', name: 'bar_table' }],
      fallbackCamelCase: true,
    });

    expect(hasura.postMetadataBulkAtomicChunked).toHaveBeenCalledTimes(1);
    const [ops] = hasura.postMetadataBulkAtomicChunked.mock.calls[0]!;
    expect(ops).toHaveLength(1);

    const cfg = ops[0].args?.configuration ?? {};
    expect(cfg.custom_column_names).toEqual({ created_at: 'createdAt' });
    expect(cfg.column_config).toEqual({ created_at: { custom_name: 'createdAt' } });
  });
});

