import { TokenService } from "@/services/storage/token.service";
import { isBrowser } from "@/utils";

export const FORCE_LOGOUT_EVENT = "force-logout";

interface ForceLogoutOptions {
  redirectTo?: string;
  reason?: string;
}

export function forceLogout(options?: ForceLogoutOptions) {
  TokenService.clearAccessToken();

  if (!isBrowser) return;

  window.dispatchEvent(
    new CustomEvent(FORCE_LOGOUT_EVENT, {
      detail: {
        reason: options?.reason ?? "SESSION_EXPIRED",
      },
    }),
  );

  window.location.replace(options?.redirectTo ?? "/login");
}
