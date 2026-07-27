"use client";

import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import type { AppError } from "@/services/api/api.types";

interface UseApiMutationProps<TPayload, TResponse> {
  mutationFn: (payload: TPayload) => Promise<TResponse>;
  options?: Omit<UseMutationOptions<TResponse, AppError, TPayload>, "mutationFn">;
}

export function useApiMutation<TPayload, TResponse>({
  mutationFn,
  options,
}: UseApiMutationProps<TPayload, TResponse>) {
  return useMutation<TResponse, AppError, TPayload>({
    mutationFn,
    ...options,
  });
}
