"use client";

import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";

import type { AppError } from "@/services/api/api.types";

interface UseApiQueryProps<TResponse> {
  queryKey: QueryKey;
  queryFn: () => Promise<TResponse>;
  options?: Omit<
    UseQueryOptions<TResponse, AppError, TResponse, QueryKey>,
    "queryKey" | "queryFn"
  >;
}

export function useApiQuery<TResponse>({
  queryKey,
  queryFn,
  options,
}: UseApiQueryProps<TResponse>) {
  return useQuery<TResponse, AppError, TResponse, QueryKey>({
    queryKey,
    queryFn,
    ...options,
  });
}
