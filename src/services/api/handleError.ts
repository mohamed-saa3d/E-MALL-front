import axios from "axios";
import { logger } from "../logger/logger";

type ApiErrorResponse = {
  message?: string;
  error?: string;
  code?: string | number;
};

export type AppError = {
  name: "AppError";
  message: string;
  status?: number;
  code?: string | number;
};

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
  const isExpectedRefreshError =
    status === 401 && url?.includes("/auth/refresh");

  const isExpectedClientError =
    status !== undefined && [400, 401, 403, 404, 409, 422].includes(status);

  return !isExpectedRefreshError && !isExpectedClientError;
}

export function handleError(error: unknown): never {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    if (error.code === "ECONNABORTED") {
      console.log(error.code);
      throw createAppError(
        "Request timeout. Please try again.",
        408,
        error.code,
      );
    }

    const status = error.response?.status;
    const url = error.config?.url;

    if (shouldLogError(status, url)) {
      logger.error("API Error", error);
    }

    if (!error.response) {
      throw createAppError("Network error. Please check your connection.");
    }

    const data = error.response.data;

    const message =
      data?.message || data?.error || error.message || "Something went wrong";

    throw createAppError(message, status, data?.code);
  }

  if (error instanceof Error) {
    logger.error("Unexpected Error", error);
    throw createAppError(error.message);
  }

  logger.error("Unknown Error", error);
  throw createAppError("Unknown error");
}
