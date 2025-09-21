import {notFound} from 'next/navigation';
import {ReactNode} from 'react';
import {NextIntlClientProvider} from 'next-intl';
import type {AbstractIntlMessages} from 'next-intl';
import {setRequestLocale} from 'next-intl/server';

import {locales} from '@/i18n';
import enMessages from '@/public/locales/en.json';
import koMessages from '@/public/locales/ko.json';

type Locale = (typeof locales)[number];

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const messagesMap: Record<Locale, AbstractIntlMessages> = {
  en: enMessages,
  ko: koMessages,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = messagesMap[locale];

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
