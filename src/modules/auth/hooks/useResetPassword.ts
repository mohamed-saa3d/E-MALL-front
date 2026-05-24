"use client";

import { useApiMutation } from "@/hooks/useApiMutation";

import { authApi } from "../api/auth.api";

import type { ResetPasswordInput, ResetPasswordResponse } from "../types/auth.types";
import { useRouter } from "next/navigation";

export function useResetPassword() {
  const router = useRouter();

  return useApiMutation<ResetPasswordInput, ResetPasswordResponse>({
    mutationFn: ({ token, payload }) => authApi.resetPassword(token, payload),
    options: {
      onSuccess: () => {
        router.replace("/login");
      },
    },
  });
}
