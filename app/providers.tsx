/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { AuthProvider } from '@/lib/hook/useAuth';
import { NextIntlClientProvider } from 'next-intl';
import { useLocaleStore } from '@/lib/store/useLocaleStore';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: any;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
  const { locale: clientLocale, setLocale } = useLocaleStore();
  const [currentMessages, setCurrentMessages] = useState(messages);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLocale = Cookies.get('locale') || locale;
    setLocale(savedLocale);
  }, [setLocale, locale]);

  useEffect(() => {
    async function loadMessages() {
      try {
        const res = await fetch(`/locales/${clientLocale}.json`);
        if (!res.ok) {
          throw new Error(
            `Failed to load messages for locale: ${clientLocale}`
          );
        }
        const data = await res.json();
        setCurrentMessages(data);
      } catch (error) {
        console.error(`Error fetching locale data for ${clientLocale}:`, error);
      }
    }
    if (mounted) {
      loadMessages();
    }
  }, [clientLocale, mounted]);

  if (!mounted || !currentMessages) return <p>Loading...</p>;

  return (
    <NextIntlClientProvider
      locale={clientLocale}
      messages={currentMessages}
      timeZone="America/New_York"
    >
      <AuthProvider>{children}</AuthProvider>
    </NextIntlClientProvider>
  );
}
