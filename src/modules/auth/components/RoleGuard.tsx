"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { WithChildren } from "@/types/common.types";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { UserRole } from "@/modules/auth/types/auth.types";

type RoleGuardProps = WithChildren<{
  allowedRoles: readonly UserRole[];
  fallback?: ReactNode;
  loadingFallback?: ReactNode;
  unauthorizedRedirectTo?: string;
}>;

export function RoleGuard({
  allowedRoles,
  children,
  fallback,
  loadingFallback,
  unauthorizedRedirectTo = "/",
}: RoleGuardProps) {
  const router = useRouter();
  const { user, isAuthenticated, isInitialized } = useAuth();

  useEffect(() => {
    if (!isInitialized) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (!user?.role || !allowedRoles.includes(user.role)) {
      router.replace(unauthorizedRedirectTo);
    }
  }, [allowedRoles, isAuthenticated, isInitialized, router, unauthorizedRedirectTo, user?.role]);

  if (!isInitialized) {
    return loadingFallback ?? <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return fallback ?? <div className="flex min-h-screen items-center justify-center">Redirecting to login...</div>;
  }

  if (!user?.role || !allowedRoles.includes(user.role)) {
    return fallback ?? <div className="flex min-h-screen items-center justify-center">Redirecting...</div>;
  }

  return <>{children}</>;
}
