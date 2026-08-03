"use client";

import { useRouter } from "next/navigation";
import { useApiMutation } from "@/hooks/useApiMutation";
import { authApi } from "../api/auth.api";
import type { AuthResponse, RegisterPayload } from "../types/auth.types";
import { TokenService } from "@/services/storage/token.service";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "../store/auth.slice";
import { useResendVerificationCode } from "./useResendVerificationCode";

export function useRegister() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { mutate: sendOTP } = useResendVerificationCode();

  return useApiMutation<RegisterPayload, AuthResponse>({
    mutationFn: authApi.register,

    options: {
      onSuccess: (data) => {
        TokenService.setAccessToken(data.token);
        dispatch(setCredentials(data.data.user));

        sendOTP({ email: data.data.user.email });
        router.push("/verify-email");
      },
    },
  });
}
