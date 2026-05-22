"use client";

import { useRouter } from "next/navigation";
import { useApiMutation } from "@/hooks/useApiMutation";
import { authApi } from "../api/auth.api";
import type {
  VerifyEmailPayload,
  VerifyEmailResponse,
} from "../types/auth.types";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { getDashboardPath } from "../utils/getDashboardPath";

export function useVerifyEmail({
  onVerified,
}: { onVerified?: () => void } = {}) {
  const { user } = useAuth();
  const router = useRouter();

  return useApiMutation<VerifyEmailPayload, VerifyEmailResponse>({
    mutationFn: authApi.verifyEmail,

    options: {
      onSuccess: () => {
        onVerified?.();
        router.push(getDashboardPath(user?.role))
        
      },
    },
  });
}
