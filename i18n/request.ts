import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale;

  return {
    locale,
    messages: (await import(`../public/locales/${locale}.json`)).default,
  };
});
