"use client";

import {
  useMutation,
  type UseMutationOptions,
} from "@tanstack/react-query";

interface UseApiMutationProps<TPayload, TResponse> {
  mutationFn: (payload: TPayload) => Promise<TResponse>;
  options?: Omit<
    UseMutationOptions<TResponse, Error, TPayload>,
    "mutationFn"
  >;
}

export function useApiMutation<TPayload, TResponse>({
  mutationFn,
  options,
}: UseApiMutationProps<TPayload, TResponse>) {
  return useMutation<TResponse, Error, TPayload>({
    mutationFn,
    ...options,
  });
}