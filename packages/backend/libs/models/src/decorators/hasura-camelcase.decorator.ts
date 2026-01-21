/**
 * @deprecated Use `HasuraProperty()` instead.
 *
 * Backwards-compatible re-export to avoid breaking older imports.
 */
export {
  HasuraProperty as HasuraCamelCase,
  getHasuraProperties as getHasuraCamelCaseFields,
  type HasuraPropertyUsage as HasuraCamelCaseUsage,
} from './hasura-property.decorator';
