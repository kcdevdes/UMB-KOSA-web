'use client';

import {
  useEffect,
  useState,
  useContext,
  createContext,
  ReactNode,
} from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

// 🔹 AuthContext 타입 정의
interface AuthContextType {
  user: User | null;
  loading: boolean;
  saveAuthToken: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

// 🔹 컨텍스트 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🔹 AuthProvider의 Props 타입
interface AuthProviderProps {
  children: ReactNode;
}

// 🔹 Firebase 인증 로직
function useAuthProvider(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const token = await firebaseUser.getIdToken();
        await saveAuthToken(token);
      } else {
        setUser(null);
        await logout();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Firebase 토큰을 서버 API로 전송하여 쿠키 저장
  const saveAuthToken = async (token: string) => {
    await fetch('/api/auth/set-cookie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
  };

  // 🔹 로그아웃 시 쿠키 삭제
  const logout = async () => {
    await signOut(auth);
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };

  return { user, loading, saveAuthToken, logout };
}

// 🔹 AuthProvider 컴포넌트
export function AuthProvider({ children }: AuthProviderProps) {
  const authState = useAuthProvider();
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}

// 🔹 useAuth 훅
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
