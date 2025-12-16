export function extractArrayFkUsing(
  using: any,
): { fkSchema: string; fkTable: string; cols: string[] } | null {
  const on = using?.foreign_key_constraint_on;
  const tbl = on?.table;
  const cols = on?.columns;
  if (!tbl?.schema || !tbl?.name || !Array.isArray(cols) || !cols.length) {
    return null;
  }
  return { fkSchema: tbl.schema, fkTable: tbl.name, cols };
}
