export function getDashboardPath(role?: string) {
  if (role === "admin") return "/admin/dashboard";
  if (role === "vendor") return "/vendor/dashboard";

  return "/";
}