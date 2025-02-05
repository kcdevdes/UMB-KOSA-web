import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'About | KOSA',
  description: 'About KOSA',
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
