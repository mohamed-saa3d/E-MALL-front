import { AxiosRequestConfig, Method } from "axios";
import apiClient from "./client";
import { handleError } from "./handleError";

async function request<T, D = unknown>(
  method: Method,
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    const res = await apiClient.request<T>({
      method,
      url,
      data,
      ...config,
    });

    return res.data;
  } catch (error) {
    return Promise.reject(handleError(error));
  }
}

export const api = {
  get<T>(url: string, config?: AxiosRequestConfig) {
    return request<T>("GET", url, undefined, config);
  },

  post<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) {
    return request<T, D>("POST", url, data, config);
  },

  put<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) {
    return request<T, D>("PUT", url, data, config);
  },

  patch<T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) {
    return request<T, D>("PATCH", url, data, config);
  },

  delete<T>(url: string, config?: AxiosRequestConfig) {
    return request<T>("DELETE", url, undefined, config);
  },
};
