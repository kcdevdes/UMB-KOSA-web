/**
 * Auth Page
 * Allow users to sign in with email link (ONLY @umb.edu domain can sign in)
 */

'use client';

import LoginForm from '@/components/LoginForm';
import MyNavbar from '@/components/ui/MyNavbar';
import { useAuth } from '@/lib/hook/useAuth';
import { useRouter } from 'next/navigation';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { Button } from 'flowbite-react';
import { useEffect, useCallback } from 'react';
import { auth } from '@/lib/firebase/firebase';

export default function AuthPage() {
  const { user, saveAuthToken, authLoading, logout } = useAuth();
  const router = useRouter();

  const handleEmailSignIn = useCallback(async () => {
    if (
      typeof window !== 'undefined' &&
      isSignInWithEmailLink(auth, window.location.href)
    ) {
      if (auth.currentUser) {
        return;
      }

      let storedEmail = window.localStorage.getItem('emailForSignIn') || '';

      if (!storedEmail && auth.currentUser && 'email' in auth.currentUser) {
        storedEmail = (auth.currentUser as { email: string }).email;
      }

      if (storedEmail) {
        try {
          const result = await signInWithEmailLink(
            auth,
            storedEmail,
            window.location.href
          );
          window.localStorage.removeItem('emailForSignIn');

          const token = await result.user.getIdToken();
          await saveAuthToken(token);
          return;
        } catch (err: unknown) {
          console.error(err);
          if ((err as { code: string }).code === 'auth/invalid-action-code') {
            alert('❌ The link has expired. Please try again.');
            window.localStorage.removeItem('emailForSignIn');
          } else {
            alert('❌ Error occurred while signing in.');
          }
          router.push('/auth');
        }
      } else {
        alert('❌ Error occurred while signing in.');
        router.push('/auth');
      }
    }
  }, [router, saveAuthToken]);

  useEffect(() => {
    handleEmailSignIn();
  }, [handleEmailSignIn]);

  return (
    <div className="w-screen bg-gray-100">
      <MyNavbar />
      <div className="flex justify-center items-center h-screen flex-col">
        {authLoading ? (
          <p>⏳ Loading...</p>
        ) : user ? (
          <div>
            <p>
              Welcome, <em>{user.email}!</em>
            </p>
            <Button onClick={logout} fullSized>
              Log Out
            </Button>
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
}
