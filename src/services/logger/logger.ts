import type { LogContext, LogLevel, LogPayload } from "./logger.types";

const isProduction = process.env.NODE_ENV === "production";
const consoleMethods = {
  error: console.error,
  warn: console.warn,
  info: console.info,
  debug: console.debug,
};
function log(level: LogLevel, payload: LogPayload) {
  if (!isProduction) {
    consoleMethods[level](`[${level.toUpperCase()}] ${payload.message}`, {
      error: payload.error,
      context: payload.context,
    });
  }

  // Production monitoring later:
  // Sentry / LogRocket / Datadog
}

export const logger = {
  error(message: string, error?: unknown, context?: LogContext) {
    log("error", { message, error, context });
  },

  warn(message: string, context?: LogContext) {
    log("warn", { message, context });
  },

  info(message: string, context?: LogContext) {
    log("info", { message, context });
  },

  debug(message: string, context?: LogContext) {
    log("debug", { message, context });
  },
};
