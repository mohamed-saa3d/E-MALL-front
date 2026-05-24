"use client";

import { useApiMutation } from "@/hooks/useApiMutation";
import { authApi } from "../api/auth.api";

import type { ChangePasswordPayload, ChangePasswordResponse } from "../types/auth.types";

export function useChangePassword() {
  return useApiMutation<ChangePasswordPayload, ChangePasswordResponse>({
    mutationFn: authApi.changePassword,
  });
}
