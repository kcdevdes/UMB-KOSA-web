/**
 * LoginForm component
 */

'use client';

import { useState } from 'react';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { useAuth } from '@/lib/hook/useAuth';
import { TextInput, Label, Button, Alert } from 'flowbite-react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const redirectUrl: string =
    process.env.NEXT_PUBLIC_AUTH_REDIRECT_URL || 'http://localhost:3000/auth';

  const { user, authLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!email.endsWith('@umb.edu')) {
      setMessage('❌ Must end with @umb.edu domain');
      setLoading(false);
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
        "✅ Sent an email to sign in. Please check your inbox. If there isn't an email, please check your spam folder."
      );
    } catch (error) {
      console.error(error);
      setMessage('❌ Error occurred while sending an email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-[50vh] lg:w-[60vh] bg-gray-100">
      <div className="w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Sign In
        </h2>

        {message && (
          <Alert
            color={message.startsWith('✅') ? 'success' : 'failure'}
            className="mt-4"
          >
            {message}
          </Alert>
        )}

        {authLoading ? (
          <p className="text-center mt-4">⏳ Sending...</p>
        ) : user ? (
          <div className="mt-4 text-center">
            <p>
              Welcome, <b>{user.email}</b>!
            </p>
            <Button onClick={() => router.push('/')} fullSized>
              Move to Home
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <p className="text-sm text-red-600">
              Caution: Use your primary browser and avoid social media browsers.
              Open the login link on the same browser.
            </p>
            <p className="text-sm text-red-600">
              주의: SNS브라우저 말고, 휴대폰 주 브라우저로 로그인을
              시도해주시고, 링크는 같은 브라우저로 열어주세요.
            </p>
            <div>
              <Label htmlFor="email" value="Your UMB email" />
              <TextInput
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@umb.edu"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              isProcessing={loading}
              fullSized
            >
              {loading ? '⏳ Sending...' : 'Submit'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
