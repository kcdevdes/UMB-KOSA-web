'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth'; // user, logout, authLoading 등을 제공
import { db } from '@/lib/firebase/firebase'; // Firestore 인스턴스
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Button, Label, TextInput, Spinner } from 'flowbite-react';
import MyNavbar from '@/components/ui/MyNavbar';
import { useRouter } from 'next/navigation';

export default function UserProfile() {
  const { user, userInfo, logout, authLoading } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // when user is not logged in, redirect to login page
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.uid) return;
      setLoading(true);

      try {
        const userRef = doc(db, 'users', user.uid);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
          const userData = snapshot.data();
          setUsername(userData.username || '');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setMessage('❌ Error fetching user data.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.uid) {
      fetchUserData();
    } else if (!authLoading && !user) {
      // prevent an unauthorized user from accessing this page
      router.push('/auth');
    }
  }, [user, authLoading, router]);

  // update user profile handler
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.uid) return;

    setLoading(true);
    setMessage('');

    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { username: username.trim() }, { merge: true });

      setMessage('✅ Profile updated!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('❌ Error updating profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleAdmin = async () => {
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <MyNavbar />

      <div className="flex flex-col items-center justify-center p-4">
        {authLoading ? (
          <div className="flex items-center space-x-2 mt-10">
            <Spinner aria-label="Loading spinner" />
            <span>Loading...</span>
          </div>
        ) : (
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mt-10">
            <h2 className="text-xl font-bold mb-4">Profile</h2>

            {message && (
              <div
                className={`p-2 mb-4 rounded ${
                  message.startsWith('✅')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <Label htmlFor="username" value="Your Username" />
                <TextInput
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                isProcessing={loading}
                fullSized
              >
                {loading ? '⏳ Saving...' : 'Save'}
              </Button>
            </form>

            {userInfo?.role === 'admin' ? (
              <Button
                color="warning"
                className="mt-6"
                onClick={handleAdmin}
                disabled={loading}
                fullSized
              >
                Admin
              </Button>
            ) : null}

            <Button
              color="failure"
              className="mt-6"
              onClick={handleLogout}
              disabled={loading}
              fullSized
            >
              Log Out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
