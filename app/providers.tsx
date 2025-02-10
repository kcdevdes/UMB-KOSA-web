/**
 * Providers containig the auth status of the current user
 * Essential for saving the auth token
 */

'use client';

import { AuthProvider } from '@/lib/hook/useAuth';

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
