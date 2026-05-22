"use client";

import { useAppSelector } from "@/store/hooks";
import {
  selectAuthUser,
  selectIsAuthenticated,
  selectIsAuthInitialized,
  selectUserRole,
} from "../store/auth.selectors";

export function useAuth() {
  const user = useAppSelector(selectAuthUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitialized = useAppSelector(selectIsAuthInitialized);
  const role = useAppSelector(selectUserRole);
  return {
    user,
    role,
    isAuthenticated,
    isInitialized,
    isAdmin: role === "admin",
    isVendor: role === "vendor",
    isUser: role === "user",
  };
}