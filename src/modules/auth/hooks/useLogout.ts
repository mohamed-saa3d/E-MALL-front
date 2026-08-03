"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useAppDispatch } from "@/store/hooks";
import { authApi } from "../api/auth.api";
import { UseLogoutOptions } from "@/modules/auth/types/auth.types";
import { clearAuthState } from "../services/clearAuthState.service";

export function useLogout({ redirectToLogin = true }: UseLogoutOptions = {}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useApiMutation<void, void>({
    mutationFn: authApi.logout,

    options: {
      onSettled: () => {
        clearAuthState({ dispatch, queryClient });
        if (redirectToLogin) {
          router.replace("/login");
        }
      },
    },
  });
}
