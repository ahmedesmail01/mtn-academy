// middleware.ts
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/settings";

export default createMiddleware({
  locales,
  defaultLocale,
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
