import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Posts | KOSA',
  description: 'Take a look at our posts',
};

export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
