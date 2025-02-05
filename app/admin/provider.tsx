'use client';

import { AuthProvider } from '@/lib/hooks/useAuth';
import AdminPage from './page';

export default function AdminProvider() {
  return (
    <AuthProvider>
      <AdminPage />
    </AuthProvider>
  );
}
