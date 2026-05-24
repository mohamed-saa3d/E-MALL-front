import { UserRole } from "@/modules/auth/types/auth.types";
export function getDashboardPath(role?: UserRole) {
  if (role === "admin") return "/admin/dashboard";
  if (role === "vendor") return "/vendor/dashboard";

  return "/";
}
