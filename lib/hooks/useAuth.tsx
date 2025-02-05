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

// Context Type Definition
interface AuthContextType {
  user: User | null;
  loading: boolean;
  saveAuthToken: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props Type Definition
interface AuthProviderProps {
  children: ReactNode;
}

// Get Auth State From Firebase
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

  // Save auth token to cookie
  const saveAuthToken = async (token: string) => {
    await fetch('/api/auth/set-cookie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
  };

  // Delete auth token from cookie
  const logout = async () => {
    await signOut(auth);
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };

  return { user, loading, saveAuthToken, logout };
}

// AuthProvider Component Definition
export function AuthProvider({ children }: AuthProviderProps) {
  const authState = useAuthProvider();
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}

// useAuth Hook Definition
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
