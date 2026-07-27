"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { WithChildren } from "@/types/common.types";
import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = WithChildren<{
  fallback?: ReactNode;
}>;

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isInitialized, router]);

  if (!isInitialized) {
    return fallback ?? <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (isAuthenticated) return <>{children}</>;

  return fallback ?? <div className="flex min-h-screen items-center justify-center">Redirecting...</div>;
}