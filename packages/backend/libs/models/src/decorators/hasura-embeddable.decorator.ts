export type HasuraEmbeddableUsage = {
  embeddable: Function;
  options: {
    /**
     * When true (default), embedded scalar columns are exposed as `parentChild`:
     * e.g. `accepted_at` + `accepted_by` -> `acceptedAt` + `acceptedBy`.
     */
    camelCase: boolean;
  };
};

const HASURA_EMBEDDABLES: HasuraEmbeddableUsage[] = [];

export function HasuraEmbeddable(
  options: { camelCase?: boolean } = {},
): ClassDecorator {
  return (target: Function) => {
    HASURA_EMBEDDABLES.push({
      embeddable: target,
      options: {
        camelCase: options.camelCase ?? true,
      },
    });
  };
}

export function isHasuraEmbeddable(target: Function): HasuraEmbeddableUsage | undefined {
  return HASURA_EMBEDDABLES.find((x) => x.embeddable === target);
}

