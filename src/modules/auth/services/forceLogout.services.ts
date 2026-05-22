import { TokenService } from "@/services/storage/token.service";

export const FORCE_LOGOUT_EVENT = "force-logout";

interface ForceLogoutOptions {
  redirectTo?: string;
  reason?: string;
}

export function forceLogout(options?: ForceLogoutOptions) {
  TokenService.clearAccessToken();

  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent(FORCE_LOGOUT_EVENT, {
      detail: {
        reason: options?.reason ?? "SESSION_EXPIRED",
      },
    }),
  );

  window.location.replace(options?.redirectTo ?? "/login");
}