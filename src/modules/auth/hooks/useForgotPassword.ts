"use client";

import { useApiMutation } from "@/hooks/useApiMutation";
import { authApi } from "../api/auth.api";

import type {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
} from "../types/auth.types";

export function useForgotPassword() {
  return useApiMutation<ForgotPasswordPayload, ForgotPasswordResponse>({
    mutationFn: authApi.forgotPassword,
  });
}
