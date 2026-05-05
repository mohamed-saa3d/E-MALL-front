import axios from "axios";
import { logger } from "../logger/logger";

type ApiErrorResponse = {
  message?: string;
  error?: string;
  code?: string | number;
};

export class AppError extends Error {
  status?: number;
  code?: string | number;

  constructor(message: string, status?: number, code?: string | number) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.code = code;
  }
}

export function handleError(error: unknown): never {
  logger.error("API Error", error);

  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    if (error.code === "ECONNABORTED") {
      throw new AppError("Request timeout. Please try again.", 408, error.code);
    }

    if (!error.response) {
      throw new AppError("Network error. Please check your connection.");
    }

    const status = error.response.status;
    const data = error.response.data;

    const message =
      data?.message ||
      data?.error ||
      error.message ||
      "Something went wrong";

    throw new AppError(message, status, data?.code);
  }

  if (error instanceof Error) {
    throw new AppError(error.message);
  }

  throw new AppError("Unknown error");
}