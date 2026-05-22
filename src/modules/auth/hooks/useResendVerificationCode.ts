"use client";

import { useApiMutation } from "@/hooks/useApiMutation";
import { authApi } from "../api/auth.api";

import type {
  SendCodeResponse,
  SendVerificationCodePayload,
} from "../types/auth.types";

export function useResendVerificationCode() {
  return useApiMutation<SendVerificationCodePayload, SendCodeResponse>({
    mutationFn: authApi.resendVerificationCode,
  });
}
