import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Gallery | KOSA',
  description: 'KOSA gallery page',
};

export default function GalleryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
