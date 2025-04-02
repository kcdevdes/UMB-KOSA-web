import type { Metadata, Viewport } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Analytics } from '@vercel/analytics/react';
import fs from 'fs';
import path from 'path';

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

function getMessages(locale: string) {
  const filePath = path.join(
    process.cwd(),
    'public',
    'locales',
    `${locale}.json`
  );
  try {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error loading locale file for ${locale}:`, error);
    return {};
  }
}

export function generateStaticParams(): { locale: string }[] {
  return [{ locale: 'en' }, { locale: 'ko' }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const safeLocale = resolvedParams.locale || 'en';
  const messages = getMessages(safeLocale);

  return (
    <html lang={safeLocale} className={notoSansKR.className}>
      <body>
        <Providers locale={safeLocale} messages={messages}>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
