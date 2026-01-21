export async function sleep(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function retry<T>(args: {
  /** Total number of attempts (>=1). */
  retries: number;
  /** Default delay between retries (ms). Used when getDelayMs is not provided. */
  delayMs?: number;
  fn: (attempt: number) => Promise<T>;
  /** Retry while this returns true for successful results. */
  shouldRetry?: (result: T) => boolean;
  /** Retry only when this returns true for thrown errors. */
  retryOnError?: (error: unknown) => boolean;
  /** Compute delay for the next retry. */
  getDelayMs?: (attempt: number, info: { result?: T; error?: unknown }) => number;
  /** Hook before sleeping/retrying. */
  onRetry?: (args: {
    attempt: number;
    nextDelayMs: number;
    result?: T;
    error?: unknown;
  }) => void | Promise<void>;
}): Promise<T> {
  const total = Math.max(1, args.retries);
  const shouldRetry = args.shouldRetry ?? (() => false);
  const retryOnError = args.retryOnError ?? (() => false);

  for (let attempt = 1; attempt <= total; attempt++) {
    try {
      const result = await args.fn(attempt);
      const needRetry = shouldRetry(result);
      if (!needRetry) return result;
      if (attempt >= total) return result;

      const nextDelayMs =
        args.getDelayMs?.(attempt, { result }) ?? (args.delayMs ?? 0);
      await args.onRetry?.({ attempt, nextDelayMs, result });
      if (nextDelayMs > 0) await sleep(nextDelayMs);
    } catch (error: unknown) {
      const needRetry = retryOnError(error);
      if (!needRetry || attempt >= total) throw error;

      const nextDelayMs =
        args.getDelayMs?.(attempt, { error }) ?? (args.delayMs ?? 0);
      await args.onRetry?.({ attempt, nextDelayMs, error });
      if (nextDelayMs > 0) await sleep(nextDelayMs);
    }
  }

  // Unreachable, but TypeScript wants a return.
  throw new Error('retry(): unreachable');
}

