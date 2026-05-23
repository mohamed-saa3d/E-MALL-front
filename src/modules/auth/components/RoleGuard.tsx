"use client";

import { WithChildren } from "@/types/common.types";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { UserRole } from "@/modules/auth/types/auth.types";

type RoleGuardProps = WithChildren<{
  allowedRoles: readonly UserRole[];
}>;

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const { user, isInitialized } = useAuth();

  if (!isInitialized) return null;

  if (!user?.role) return null;

  if (!allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
}