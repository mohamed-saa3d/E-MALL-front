export type LogLevel = "info" | "warn" | "error" | "debug";

export type LogContext = Record<string, unknown>;

export type LogPayload = {
  message: string;
  error?: unknown;
  context?: LogContext;
};