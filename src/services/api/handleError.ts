import axios from "axios";
import { logger } from "@/services/logger/logger";

import type { ApiErrorResponse, AppError } from "./api.types";

function createAppError(
  message: string,
  status?: number,
  code?: string | number,
): AppError {
  return {
    name: "AppError",
    message,
    status,
    code,
  };
}

function shouldLogError(status?: number, url?: string) {
  const isRefreshRequest = url?.includes("/auth/refresh");

  const isExpectedClientError =
    status !== undefined && [400, 401, 403, 404, 409, 422].includes(status);

  return !isRefreshRequest && !isExpectedClientError;
}

export function handleError(error: unknown): never {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const status = error.response?.status;
    const url = error.config?.url;
    const method = error.config?.method;

    if (error.code === "ECONNABORTED") {
      logger.warn("Request timeout", {
        url,
        method,
        code: error.code,
      });

      throw createAppError("Request timeout. Please try again.", 408, error.code);
    }

    if (!error.response) {
      logger.error("Network Error", error, {
        url,
        method,
      });

      throw createAppError("Network error. Please check your connection.");
    }

    const data = error.response.data;

    if (shouldLogError(status, url)) {
      logger.error("API Error", error, {
        status,
        url,
        method,
        code: data?.code ?? error.code,
      });
    }

    const message =
      data?.message || data?.error || error.message || "Something went wrong";

    throw createAppError(message, status, data?.code ?? error.code);
  }

  if (error instanceof Error) {
    logger.error("Unexpected Error", error);

    throw createAppError(error.message);
  }

  logger.error("Unknown Error", error);

  throw createAppError("Unknown error");
}
