import {
  Injectable,
  LoggerService as NestLoggerService,
  LogLevel,
} from '@nestjs/common';

@Injectable()
export class LoggerService implements NestLoggerService {
  private levels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];

  log(message: any, context?: string) {
    this.write('log', message, context);
  }

  error(message: any, trace?: string, context?: string) {
    this.write('error', message, context, trace);
  }

  warn(message: any, context?: string) {
    this.write('warn', message, context);
  }

  debug(message: any, context?: string) {
    this.write('debug', message, context);
  }

  verbose(message: any, context?: string) {
    this.write('verbose', message, context);
  }

  setLogLevels(levels: LogLevel[]) {
    this.levels = levels;
  }

  private write(
    level: LogLevel,
    message: any,
    context?: string,
    trace?: string,
  ) {
    if (!this.levels.includes(level)) {
      return;
    }

    const now = new Date().toISOString();

    const payload: Record<string, any> = {
      timestamp: now,
      level,
      // Keep message structured where possible (avoid "JSON inside JSON" strings).
      message: toJsonSafe(message),
    };

    if (context) payload.context = context;
    if (trace) payload.trace = trace;

    const json = JSON.stringify(payload, null, 2);
    console.log(colorize(level, json));
  }
}

function colorize(level: LogLevel, text: string): string {
  // Keep logs machine-readable by default (plain JSON).
  // Add color only in interactive terminals unless explicitly disabled.
  const enable =
    process.env.LOGGER_COLOR !== 'false' &&
    (process.stdout?.isTTY ?? false) &&
    process.env.NODE_ENV !== 'production';
  if (!enable) return text;

  const reset = '\x1b[0m';
  const color =
    level === 'error'
      ? '\x1b[31m' // red
      : level === 'warn'
        ? '\x1b[33m' // yellow
        : level === 'debug'
          ? '\x1b[36m' // cyan
          : level === 'verbose'
            ? '\x1b[90m' // gray
            : '\x1b[32m'; // log -> green

  return `${color}${text}${reset}`;
}

function toJsonSafe(input: unknown): unknown {
  if (typeof input === 'string') return input;

  // Errors don't stringify well by default (message/stack are not enumerable).
  // Normalize them into a JSON-friendly object.
  if (input instanceof Error) {
    const out: Record<string, unknown> = {
      name: input.name,
      message: input.message,
      stack: input.stack,
    };

    // Node 16+ supports Error.cause
    const anyErr = input as any;
    if (anyErr?.cause instanceof Error) {
      out.cause = {
        name: anyErr.cause.name,
        message: anyErr.cause.message,
        stack: anyErr.cause.stack,
      };
    } else if (anyErr?.cause != null) {
      out.cause = anyErr.cause;
    }

    return out;
  }

  // If it's already JSON-safe, keep it structured.
  try {
    JSON.stringify(input);
    return input;
  } catch {
    // Fallback for circular structures
    return String(input);
  }
}
