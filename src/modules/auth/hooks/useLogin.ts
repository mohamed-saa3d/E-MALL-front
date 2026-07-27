"use client";

import { useRouter } from "next/navigation";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useAppDispatch } from "@/store/hooks";
import { TokenService } from "@/services/storage/token.service";
import { authApi } from "../api/auth.api";
import { setCredentials } from "../store/auth.slice";
import type { AuthResponse, LoginPayload } from "../types/auth.types";
import { getDashboardPath } from "../utils/getDashboardPath";

export function useLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useApiMutation<LoginPayload, AuthResponse>({
    mutationFn: authApi.login,

    options: {
      onSuccess: (data) => {
        TokenService.setAuthTokens({
          token: data.token,
          refreshToken: data.refreshToken,
          expiresAt: data.expiresAt,
        });
        dispatch(setCredentials(data.user));
        router.push(getDashboardPath(data.user.role));
      },
    },
  });
}
