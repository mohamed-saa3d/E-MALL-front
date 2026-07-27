export type ApiErrorResponse = {
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
