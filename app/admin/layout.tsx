import type { Metadata } from 'next';
import '../globals.css';
import AdminProvider from './provider';

export const metadata: Metadata = {
  title: 'Admin | KOSA',
  description: 'KOSA Admin Page',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminProvider />;
}
