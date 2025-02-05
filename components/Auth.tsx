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

  // Set redirect url for email link
  const redirectUrl: string =
    process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL || 'http://localhost/auth';

  // Authmatic login with email link
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      isSignInWithEmailLink(auth, window.location.href)
    ) {
      // Prvent multiple login
      if (auth.currentUser) {
        console.log('Already logged in');
        return;
      }

      let storedEmail = window.localStorage.getItem('emailForSignIn');

      // If there is no email in local storage, try to get it from current user
      if (!storedEmail) {
        storedEmail = auth.currentUser
          ? (auth.currentUser as { email: string }).email
          : '';
      }

      if (storedEmail) {
        signInWithEmailLink(auth, storedEmail, window.location.href)
          .then(async (result) => {
            window.localStorage.removeItem('emailForSignIn');

            // Save token to local storage
            const token = await result.user.getIdToken();
            await saveAuthToken(token);

            setMessage('Success! Redirecting...');
            router.push('/'); // Redirect to home page
          })
          .catch((err) => {
            console.error(err);

            // If the link is invalid or expired
            if (err.code === 'auth/invalid-action-code') {
              alert(
                'Invalid or expired action code. Please try again to login.'
              );
              window.localStorage.removeItem('emailForSignIn');
              router.push('/auth'); // Redirect to login page
            } else {
              setMessage('Error occurred while signing in.');
            }
          });
      } else {
        alert('Try again to login.');
        router.push('/auth');
      }
    }
  }, [router, saveAuthToken]);

  // Send email link to sign in
  const handleSendLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email.endsWith('@umb.edu')) {
      setMessage('Type email ending with @umb.edu domain');
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
      setMessage(
        'Please check your email for sign in link. If you cannot find it, please check your Junk Mail folder.'
      );
    } catch (error) {
      console.error(error);
      setMessage('Error occurred while sending email link.');
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
