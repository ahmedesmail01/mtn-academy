// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Localization Middleware
const intlMiddleware = createMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "en",
});

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const pathname = req.nextUrl.pathname;

  // Step 1: Extract Locale from Path
  const locale = pathname.split("/")[1];
  const supportedLocales = ["en", "ar"];
  const isLocaleValid = supportedLocales.includes(locale);

  // Step 2: Define Public Routes
  const publicRoutes = [
    "login",
    "register",
    "forgot-password",
    "reset-password",
  ];

  // Check if current route is public
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(`/${locale}/${route}`)
  );

  // Handle unauthenticated users trying to access protected routes
  if (!accessToken && !isPublicRoute && isLocaleValid) {
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, "");

    // Create redirect URL with callback
    const redirectURL =
      req.nextUrl.pathname == `/${locale}`
        ? `/${locale}/login`
        : `/login?redirect=${pathnameWithoutLocale}`;

    const response = NextResponse.redirect(new URL(redirectURL, req.url));

    // Clear any existing auth cookies
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    // Update cookie deletion to match actual cookie names
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");

    response.cookies.delete("user");
    return response;
  }

  // Handle authenticated users trying to access login/register pages
  if (
    accessToken &&
    (pathname === `/${locale}/login` || pathname === `/${locale}/register`)
  ) {
    const dashboardUrl = new URL(`/${locale}/`, req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Step 3: Apply Localization Middleware
  const intlResponse = intlMiddleware(req);
  if (intlResponse) {
    return intlResponse;
  }

  // Step 4: Proceed to Next Response if no redirects are needed
  return NextResponse.next();
}

export default createMiddleware(routing);

// Update config to match your routes
export const config = {
  matcher: [
    "/",
    "/(ar|en)/:path*",
    "/((?!api|_next/static|_next/image|images|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
