function normCols(cols: string[]): string {
  return cols.join(',');
}

export function objectRelationshipKey(args: {
  schema: string;
  table: string;
  cols: string[];
}): string {
  return `object|${args.schema}.${args.table}|${normCols(args.cols)}`;
}
