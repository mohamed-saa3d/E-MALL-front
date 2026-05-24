import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "@/modules/auth/types/auth.types";
import { getDashboardPath } from "@/modules/auth/utils/getDashboardPath";
import {
  GUEST_ONLY_ROUTES,
  VERIFICATION_ROUTES,
  AUTHENTICATED_ROUTES,
  USER_ROUTES,
  VENDOR_ROUTES,
  ADMIN_ROUTES,
} from "@/constants/routes";

function matchesRoute(pathname: string, routes: string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function proxy(request: NextRequest) {
  console.log("PROXY RUNNING:", request.nextUrl.pathname);

  const { pathname } = request.nextUrl;

  const refreshToken = request.cookies.get("refreshToken")?.value;
  const role = request.cookies.get("role")?.value as UserRole | undefined;

  const verificationSession = request.cookies.get("verificationSession")?.value;
  const isVerified = request.cookies.get("isVerified")?.value === "true";

  const isGuestOnlyRoute = matchesRoute(pathname, GUEST_ONLY_ROUTES);
  const isVerificationRoute = matchesRoute(pathname, VERIFICATION_ROUTES);
  const isAuthenticatedRoute = matchesRoute(pathname, AUTHENTICATED_ROUTES);

  const isUserRoute = matchesRoute(pathname, USER_ROUTES);
  const isVendorRoute = matchesRoute(pathname, VENDOR_ROUTES);
  const isAdminRoute = matchesRoute(pathname, ADMIN_ROUTES);

  const isProtectedRoute =
    isAuthenticatedRoute || isUserRoute || isVendorRoute || isAdminRoute;

  if (isProtectedRoute && !refreshToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isGuestOnlyRoute && refreshToken) {
    return NextResponse.redirect(new URL(getDashboardPath(role), request.url));
  }

  if (isVerificationRoute && (isVerified || refreshToken)) {
    return NextResponse.redirect(new URL(getDashboardPath(role), request.url));
  }

  if (isVerificationRoute && !verificationSession) {
    return NextResponse.redirect(new URL("/register", request.url));
  }

  if (isAdminRoute && role && role !== "admin") {
    return NextResponse.redirect(new URL(getDashboardPath(role), request.url));
  }

  if (isVendorRoute && role && role !== "vendor") {
    return NextResponse.redirect(new URL(getDashboardPath(role), request.url));
  }

  if (isUserRoute && role && role !== "user") {
    return NextResponse.redirect(new URL(getDashboardPath(role), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password/:path*",
    "/verify-email",
    "/change-password",
    "/profile/:path*",
    "/cart/:path*",
    "/wishlist/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/settings/:path*",
    "/admin/:path*",
    "/vendor/:path*",
    "/notifications/:path*",
  ],
};
