"use client";

import { ReactNode, useEffect } from "react";
import "@/services/api/interceptors";

import { useQueryClient } from "@tanstack/react-query";
import { refreshSession } from "@/modules/auth/api/auth.api";
import { setCredentials, setAuthInitialized } from "@/modules/auth/store/auth.slice";
import { TokenService } from "@/services/storage/token.service";
import { useAppDispatch } from "@/store/hooks";
import { FORCE_LOGOUT_EVENT } from "@/modules/auth/services/forceLogout.services";
import { clearAuthState } from "@/modules/auth/services/clearAuthState.service";

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleForceLogout = () => {
      clearAuthState({ dispatch, queryClient });
    };

    window.addEventListener(FORCE_LOGOUT_EVENT, handleForceLogout);

    return () => {
      window.removeEventListener(FORCE_LOGOUT_EVENT, handleForceLogout);
    };
  }, [dispatch, queryClient]);

  useEffect(() => {
    let isMounted = true;

    async function initializeAuth() {
      try {
        const data = await refreshSession();

        if (!isMounted) return;

        TokenService.setAuthTokens({
          token: data.token,
          refreshToken: data.refreshToken,
          expiresAt: data.expiresAt,
        });
        dispatch(setCredentials(data.user));
      } catch {
        if (!isMounted) return;
        clearAuthState({ dispatch, queryClient });
      } finally {
        if (isMounted) {
          dispatch(setAuthInitialized());
        }
      }
    }

    initializeAuth();

    return () => {
      isMounted = false;
    };
  }, [dispatch, queryClient]);

  return <>{children}</>;
}
