function normCols(cols: string[]): string {
  return cols.join(',');
}

export function arrayRelationshipKey(args: {
  schema: string;
  table: string;
  fkSchema: string;
  fkTable: string;
  cols: string[];
}): string {
  return `array|${args.schema}.${args.table}|${args.fkSchema}.${args.fkTable}|${normCols(
    args.cols,
  )}`;
}
