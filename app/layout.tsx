import type { Metadata, Viewport } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Link from 'next/link';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'UMB | KOSA',
  description: 'Hello, KOSA!',
};

export const viewport: Viewport = {
  themeColor: '#FAF6F5',
};

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={notoSansKR.className}>
      <head>
        {/* ✅ Google Analytics 스크립트 추가 */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BXM65EDZD2"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', 'G-BXM65EDZD2');
          `}
        </Script>
      </head>
      <body>
        <Link
          href="https://foremost-blender-ac2.notion.site/UMB-KOSA-web-19b0f2283b8f807f9415e6e3a7c08cc3?pvs=4"
          className="fixed z-50 w-full text-center text-korean-red bg-korean-yellow text-sm shadow-md"
        >
          Instruction (Beta)
        </Link>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
