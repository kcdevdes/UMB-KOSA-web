'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth'); // 🔹 로그인하지 않은 사용자는 로그인 페이지로 이동
    }
  }, [loading, user, router]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <div>
      <h1>보호된 페이지</h1>
      {user ? <p>환영합니다, {user.email}님!</p> : null}
    </div>
  );
}
