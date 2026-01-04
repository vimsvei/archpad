import {
  Injectable,
  LoggerService as NestLoggerService,
  LogLevel,
  Optional,
  Inject,
} from '@nestjs/common';
import type { LoggerFormat, LoggerOptions } from './logger-options.interface';

export const LOGGER_OPTIONS = 'LOGGER_OPTIONS';

@Injectable()
export class LoggerService implements NestLoggerService {
  private levels: LogLevel[] = ['log', 'error', 'warn', 'debug', 'verbose'];
  private format: LoggerFormat;

  constructor(@Optional() @Inject(LOGGER_OPTIONS) options?: LoggerOptions) {
    this.format = options?.format ?? 'text';
  }

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

    if (this.format === 'json') {
      this.writeJson(level, message, context, trace);
    } else {
      this.writeText(level, message, context, trace);
    }
  }

  private writeJson(
    level: LogLevel,
    message: any,
    context?: string,
    trace?: string,
  ) {
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

  private writeText(
    level: LogLevel,
    message: any,
    context?: string,
    trace?: string,
  ) {
    const timestamp = new Date().toISOString();
    const levelStr = level.toUpperCase().padEnd(7);
    const contextStr = context ? `[${context}]` : '';

    let messageStr: string;
    if (typeof message === 'string') {
      messageStr = message;
    } else if (message instanceof Error) {
      messageStr = message.message;
    } else {
      messageStr = JSON.stringify(toJsonSafe(message), null, 2);
    }

    const parts = [timestamp, levelStr, contextStr, messageStr].filter(Boolean);
    const logLine = parts.join(' ');

    console.log(colorize(level, logLine));

    if (trace) {
      console.log(colorize(level, trace));
    }
  }
}

function colorize(level: LogLevel, text: string): string {
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
