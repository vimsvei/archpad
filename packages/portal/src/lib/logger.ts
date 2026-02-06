/**
 * Portal logger — matches backend format (timestamp, level, context).
 * Use in API routes, server components, and client-side handlers.
 */

const LEVEL_PAD = 7
const LEVELS = {
  log: "LOG",
  error: "ERROR",
  warn: "WARN",
  debug: "DEBUG",
  info: "INFO",
} as const

type Level = keyof typeof LEVELS

function formatMessage(message: unknown): string {
  if (typeof message === "string") return message
  if (message instanceof Error) return message.message
  try {
    return JSON.stringify(message, null, 2)
  } catch {
    return String(message)
  }
}

function formatLine(level: Level, context: string | undefined, message: string, trace?: string): string {
  const timestamp = new Date().toISOString()
  const levelStr = LEVELS[level].padEnd(LEVEL_PAD)
  const contextStr = context ? `[${context}]` : ""
  const parts = [timestamp, levelStr, contextStr, message].filter(Boolean)
  const line = parts.join(" ")
  return trace ? `${line}\n${trace}` : line
}

export type PortalLogger = {
  log(message: unknown, context?: string): void
  error(message: unknown, context?: string, trace?: string): void
  warn(message: unknown, context?: string): void
  debug(message: unknown, context?: string): void
  info(message: unknown, context?: string): void
  child(context: string): PortalLogger
}

const createLogger = (defaultContext?: string): PortalLogger => ({
  log(message, context) {
    const msg = formatMessage(message)
    const line = formatLine("log", context ?? defaultContext, msg)
    console.log(line)
  },
  error(message, context, trace?) {
    const msg = formatMessage(message)
    const ctx = context ?? defaultContext
    const err = message instanceof Error ? message.stack : undefined
    const t = trace ?? err
    const line = formatLine("error", ctx, msg, t)
    console.error(line)
  },
  warn(message, context) {
    const msg = formatMessage(message)
    const line = formatLine("warn", context ?? defaultContext, msg)
    console.warn(line)
  },
  debug(message, context) {
    const msg = formatMessage(message)
    const line = formatLine("debug", context ?? defaultContext, msg)
    console.debug(line)
  },
  info(message, context) {
    const msg = formatMessage(message)
    const line = formatLine("info", context ?? defaultContext, msg)
    console.info(line)
  },
  child(context: string) {
    return createLogger(context ?? defaultContext)
  },
})

/** Default logger (no context). */
export const logger = createLogger()

/** Create a logger with a fixed context prefix. */
export function createContextLogger(context: string): PortalLogger {
  return createLogger(context)
}
