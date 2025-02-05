'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { useAuth } from '@/lib/hooks/useAuth';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, loading, saveAuthToken, logout } = useAuth();

  // 환경 변수에서 Firebase 이메일 링크 리디렉트 URL 가져오기
  const redirectUrl: string =
    process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL || 'http://localhost/auth';

  // ✅ 자동 로그인 로직 개선 (Firebase 오류 해결)
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      isSignInWithEmailLink(auth, window.location.href)
    ) {
      // ✅ 이미 로그인된 경우, 중복 로그인 방지
      if (auth.currentUser) {
        console.log('이미 로그인된 상태입니다.');
        return;
      }

      let storedEmail = window.localStorage.getItem('emailForSignIn');

      // ✅ Firebase에서 `auth.currentUser?.email` 사용하여 보완
      if (!storedEmail) {
        storedEmail = auth.currentUser
          ? (auth.currentUser as { email: string }).email
          : '';
      }

      if (storedEmail) {
        signInWithEmailLink(auth, storedEmail, window.location.href)
          .then(async (result) => {
            window.localStorage.removeItem('emailForSignIn');

            // ✅ Firebase 토큰 가져오기 및 쿠키 저장
            const token = await result.user.getIdToken();
            await saveAuthToken(token);

            setMessage('로그인 성공!');
            router.push('/'); // 로그인 후 홈으로 이동
          })
          .catch((err) => {
            console.error(err);

            // ✅ auth/invalid-action-code 오류 처리 (새 로그인 시도)
            if (err.code === 'auth/invalid-action-code') {
              alert(
                '로그인 링크가 만료되었거나 이미 사용되었습니다. 다시 로그인해주세요.'
              );
              window.localStorage.removeItem('emailForSignIn');
              router.push('/auth'); // 로그인 페이지로 다시 이동
            } else {
              setMessage('로그인 중 오류가 발생했습니다.');
            }
          });
      } else {
        // ✅ 이메일을 찾을 수 없는 경우, 로그인 페이지로 이동
        alert('로그인을 다시 시도해주세요.');
        router.push('/auth');
      }
    }
  }, [router, saveAuthToken]);

  // ✅ 이메일 입력 후 "링크 전송" 버튼
  const handleSendLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email.endsWith('@umb.edu')) {
      setMessage('반드시 @umb.edu 도메인의 이메일을 사용해야 합니다!');
      setIsLoading(false);
      return;
    }

    const actionCodeSettings = {
      url: redirectUrl,
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      setMessage('이메일로 전송된 링크를 확인하세요!');
    } catch (error) {
      console.error(error);
      setMessage('링크 전송 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h2>협회 가입/로그인</h2>
      <p>
        협회 전용 이메일(@umb.edu) 입력 시, 비밀번호 없이 이메일 링크로
        가입/로그인합니다.
      </p>

      {loading ? (
        <p>로딩 중...</p>
      ) : user ? (
        <div>
          <p>환영합니다, {user.email}!</p>
          <button onClick={logout}>로그아웃</button>
        </div>
      ) : (
        <form onSubmit={handleSendLink}>
          <input
            type="email"
            placeholder="@umb.edu 이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? '전송 중...' : '링크 전송'}
          </button>
        </form>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}
