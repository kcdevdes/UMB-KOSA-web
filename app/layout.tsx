import type { Metadata, Viewport } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';

import { defaultLocale } from '@/i18n';

export const metadata: Metadata = {
  title: 'UMB | KOSA',
  description:
    'UMass Boston Korean Student Association | UMass Boston 한국학생회 공식 홈페이지입니다.',
  openGraph: {
    title: 'UMB | KOSA',
    description:
      'UMass Boston Korean Student Association | UMass Boston 한국학생회 공식 홈페이지입니다.',
    url: 'https://umbkosa.org',
    siteName: 'UMB | KOSA',
    images: [
      {
        url: 'https://www.umbkosa.org/images/kosa-logo.jpg',
        width: 800,
        height: 800,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'UMB | KOSA',
    description:
      'UMass Boston Korean Student Association | UMass Boston 한국학생회 공식 홈페이지입니다.',
    images: ['https://www.umbkosa.org/images/kosa-logo.jpg'],
  },
  icons: '/favicon.ico',
};

export const viewport: Viewport = {
  themeColor: '#FAF6F5',
};

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
});

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale ?? defaultLocale;

  return (
    <html lang={locale} className={notoSansKR.className}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  );
}
