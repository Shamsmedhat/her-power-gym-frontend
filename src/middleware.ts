import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

// Pages that don't require authentication
const publicPages = ["/", "/login", "/register"];

// Pages that require authentication
const protectedPages = [
  "/homepage",
  "/homepage/clients",
  "/homepage/subscriptions",
  "/homepage/users",
];

const handleI18nRouting = createMiddleware(routing);

// We'll handle auth manually for better control over routing

export default async function middleware(req: NextRequest) {
  // Variables
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;

  // Check if the pathname has a locale
  const pathnameHasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If no locale is present, redirect to Arabic (default) with the same path
  if (!pathnameHasLocale) {
    const newUrl = new URL(`/ar${pathname}`, req.nextUrl.origin);
    newUrl.search = req.nextUrl.search;
    return NextResponse.redirect(newUrl);
  }

  // Extract locale and path without locale
  const locale = pathnameHasLocale ? pathname.split("/")[1] : "ar";
  const pathWithoutLocale = pathnameHasLocale
    ? pathname.substring(3)
    : pathname;

  // Check if it's a public page
  const isPublicPage = publicPages.some(
    (page) =>
      pathWithoutLocale === page || pathWithoutLocale.startsWith(page + "/")
  );

  // Check if it's a protected page
  const isProtectedPage = protectedPages.some(
    (page) =>
      pathWithoutLocale === page || pathWithoutLocale.startsWith(page + "/")
  );

  // If it's a public page (login, register, root)
  if (isPublicPage) {
    // If user is authenticated and trying to access login/register, redirect to homepage
    if (
      token &&
      (pathWithoutLocale === "/login" || pathWithoutLocale === "/register")
    ) {
      const redirectUrl = new URL(`/${locale}/homepage`, req.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }

    // If user is authenticated and trying to access root, redirect to homepage
    if (token && pathWithoutLocale === "/") {
      const redirectUrl = new URL(`/${locale}/homepage`, req.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }

    return handleI18nRouting(req);
  }

  // If it's a protected page, check authentication
  if (isProtectedPage) {
    if (!token) {
      // Redirect to login page with the same locale
      const redirectUrl = new URL(`/${locale}/login`, req.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }

    return handleI18nRouting(req);
  }

  // For any other pages, check authentication and handle routing
  if (!token) {
    const redirectUrl = new URL(`/${locale}/login`, req.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  return handleI18nRouting(req);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
