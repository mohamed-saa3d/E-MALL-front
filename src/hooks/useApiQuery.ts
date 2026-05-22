"use client";

import {
  useQuery,
  type QueryKey,
  type UseQueryOptions,
} from "@tanstack/react-query";

interface UseApiQueryProps<TResponse> {
  queryKey: QueryKey;
  queryFn: () => Promise<TResponse>;
  options?: Omit<
    UseQueryOptions<TResponse, Error, TResponse, QueryKey>,
    "queryKey" | "queryFn"
  >;
}

export function useApiQuery<TResponse>({
  queryKey,
  queryFn,
  options,
}: UseApiQueryProps<TResponse>) {
  return useQuery<TResponse, Error>({
    queryKey,
    queryFn,
    ...options,
  });
}