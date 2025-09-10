import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getToken } from "next-auth/jwt";

const publicPages = ["/", "/register"];

const handleI18nRouting = createMiddleware(routing);

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  function onSuccess(req) {
    return handleI18nRouting(req);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to homepage if user is authenticated
        if (token && req.nextUrl.pathname.includes("/homepage")) {
          return true;
        }
        return token != null;
      },
    },
    pages: {
      signIn: "/",
    },
  }
);

export default async function middleware(req: NextRequest) {
  const { locales, defaultLocale } = routing;
  const pathname = req.nextUrl.pathname;

  // Check if pathname has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If no locale is present, redirect to default locale (Arabic)
  if (!pathnameHasLocale) {
    const newUrl = new URL(`/${defaultLocale}${pathname}`, req.nextUrl.origin);
    newUrl.search = req.nextUrl.search;
    return Response.redirect(newUrl);
  }

  // Check if user has a token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Check if user is on login page (root) with any locale
  const isLoginPage =
    locales.some(
      (locale) => pathname === `/${locale}` || pathname === `/${locale}/`
    ) || pathname === "/";

  // If user is authenticated and trying to access login page, redirect to homepage
  if (token && isLoginPage) {
    // Extract current locale from pathname
    let currentLocale = defaultLocale;
    for (const locale of locales) {
      if (pathname.startsWith(`/${locale}`)) {
        currentLocale = locale;
        break;
      }
    }

    const homepageUrl = new URL(
      `/${currentLocale}/homepage`,
      req.nextUrl.origin
    );
    homepageUrl.search = req.nextUrl.search;
    return NextResponse.redirect(homepageUrl);
  }

  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(pathname);

  if (isPublicPage) {
    return handleI18nRouting(req);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
