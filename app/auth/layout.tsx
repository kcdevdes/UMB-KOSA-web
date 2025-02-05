import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Auth | KOSA',
  description: "KOSA's authentication page",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
