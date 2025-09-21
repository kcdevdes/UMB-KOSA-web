import createMiddleware from 'next-intl/middleware';
import {defaultLocale, localePrefix, locales} from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)', '/'],
};
