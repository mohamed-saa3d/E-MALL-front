"use client";

import { WithChildren } from "@/types/common.types";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute({ children }: WithChildren) {
  const { isAuthenticated, isInitialized } = useAuth();

  if (!isInitialized) return null;

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
