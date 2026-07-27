import { NextRequest, NextResponse } from "next/server";
import { getDashboardPath } from "@/modules/auth/utils/getDashboardPath";

const PROTECTED_PREFIXES = [
  "/protected",
  "/user",
  "/admin",
  "/vendor",
  "/change-password",
  "/profile",
  "/settings",
  "/notifications",
  "/cart",
  "/checkout",
  "/orders",
  "/wishlist",
];

const AUTH_ROUTES = ["/login", "/register", "/auth/login", "/auth/register"];

function isProtectedRoute(pathname: string) {
  return PROTECTED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(`${route}/`));
}

function getRoleFromToken(token: string) {
  try {
    const [, payload] = token.split(".");

    if (!payload) return undefined;

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
    const decoded = JSON.parse(Buffer.from(padded, "base64").toString("utf8"));

    return typeof decoded?.role === "string" ? decoded.role : undefined;
  } catch {
    return undefined;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  if (isProtectedRoute(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute(pathname) && token) {
    const role = getRoleFromToken(token);
    return NextResponse.redirect(new URL(getDashboardPath(role), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
