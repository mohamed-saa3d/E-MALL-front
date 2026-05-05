export const isDev = process.env.NODE_ENV === "development";

export const logger = {
  error(message: string, error?: unknown) {
    if (isDev) {
      console.error(message, error);
    }

    // Future:
    // Send to Sentry / LogRocket / Datadog
  },

  warn(message: string, data?: unknown) {
    if (isDev) {
      console.warn(message, data);
    }
  },

  info(message: string, data?: unknown) {
    if (isDev) {
      console.info(message, data);
    }
  },

  debug(message: string, data?: unknown) {
    if (isDev) {
      console.debug(message, data);
    }
  },
};
