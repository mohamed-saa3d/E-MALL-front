import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { env } from "@/config/env";
import apiClient from "./client";
import { TokenService } from "@/services/storage/token.service";
import { logger } from "@/services/logger/logger";
import { forceLogout } from "@/modules/auth/services/forceLogout.services";
import { RefreshResponse } from "@/modules/auth/types/auth.types";

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  _retryCount?: number;
};

const MAX_RETRY_COUNT = 1;

const refreshApi = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

let refreshPromise: Promise<string> | null = null;

function isRefreshRequest(url?: string) {
  return url?.includes("/auth/refresh");
}

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = TokenService.getAccessToken();

    if (token) {
      config.headers.set?.("Authorization", `Bearer ${token}`);
    }

    return config;
  },

  (error) => {
    logger.error("Request interceptor error", error);
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (isRefreshRequest(originalRequest.url)) {
      TokenService.clearAccessToken();
      return Promise.reject(error);
    }

    originalRequest._retryCount = originalRequest._retryCount ?? 0;

    if (
      originalRequest._retry ||
      originalRequest._retryCount >= MAX_RETRY_COUNT
    ) {
      logger.warn("Maximum token refresh retry reached");
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    originalRequest._retryCount += 1;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshApi
          .post<RefreshResponse>("/auth/refresh")

          .then((res) => {
            const newAccessToken = res.data.token;

            if (!newAccessToken) {
              throw new Error("No access token returned from refresh endpoint");
            }

            return newAccessToken;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccessToken = await refreshPromise;

      TokenService.setAccessToken(newAccessToken);

      originalRequest.headers.set?.(
        "Authorization",
        `Bearer ${newAccessToken}`,
      );

      return apiClient(originalRequest);
    } catch (refreshError) {
      logger.error("Refresh token failed", refreshError);

      forceLogout({
        redirectTo: "/login",
        reason: "REFRESH_TOKEN_FAILED",
      });

      return Promise.reject(refreshError);
    }
  },
);
