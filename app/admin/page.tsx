'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

export default function AdminPage() {
  const { user, authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth'); // Redirect to login page if not logged in
    }
  }, [authLoading, user, router]);

  if (authLoading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div>
      <h1>보호된 페이지</h1>
      {user ? <p>환영합니다, {user.email}님!</p> : null}
    </div>
  );
}
