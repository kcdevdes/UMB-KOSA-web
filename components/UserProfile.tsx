'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth'; // user, logout, authLoading 등을 제공
import { db } from '@/lib/firebase/firebase'; // Firestore 인스턴스
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Button, Label, TextInput, Spinner } from 'flowbite-react';
import MyNavbar from '@/components/ui/MyNavbar';
import { useRouter } from 'next/navigation';

export default function UserProfile() {
  const { user, logout, authLoading } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // 사용자 데이터 불러오기
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

  // 마운트 시 또는 user.uid 바뀔 때 불러오기
  useEffect(() => {
    if (user?.uid) {
      fetchUserData();
    } else if (!authLoading && !user) {
      // 로그인 안 되어 있으면 접근 제한
      router.push('/auth');
    }
  }, [user, authLoading, router]);

  // 사용자 이름 업데이트
  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.uid) return;

    setLoading(true);
    setMessage('');

    try {
      const userRef = doc(db, 'users', user.uid);
      // name 필드만 업데이트할 경우에는 setDoc의 merge 옵션을 true로
      await setDoc(userRef, { username: username.trim() }, { merge: true });

      setMessage('✅ Profile updated!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('❌ Error updating profile.');
    } finally {
      setLoading(false);
    }
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    await logout();
    router.push('/'); // 홈으로 이동
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

            {/* 로그아웃 버튼 */}
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
