import {
  useEffect,
  useState,
  useContext,
  createContext,
  ReactNode,
} from 'react';
import { auth, db } from '../firebase/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// Firestore User Info Type Definition
interface UserInfo {
  uid: string;
  email: string;
  role: string;
  introduction: string;
  username: string;
}

// Context Type Definition
interface AuthContextType {
  user: User | null;
  userInfo: UserInfo | null;
  authLoading: boolean;
  saveUserToFirestore: (uid: string, email: string) => Promise<void>;
  saveAuthToken: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Fetch user info from Firestore
async function fetchUserInfo(uid: string): Promise<UserInfo | null> {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as UserInfo;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
}

// ✅ Save new user info to Firestore (executed after email link login)
async function saveUserToFirestore(uid: string, email: string) {
  try {
    const res = await fetch('/api/auth/save-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, email }),
    });
    const data = await res.json();
    console.log('✅ Firestore save response:', data);
  } catch (error) {
    console.error('❌ Firestore save failed:', error);
  }
}

// ✅ Save Firebase Auth token and then store user info in Firestore
async function saveAuthToken(token: string) {
  try {
    const res = await fetch('/api/auth/set-cookie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    const { uid, email } = await res.json();
    console.log('✅ Firebase token saved successfully');

    // 🔥 Save user info to Firestore (executed after successful login)
    await saveUserToFirestore(uid, email);
  } catch (error) {
    console.error('Error saving auth token:', error);
  }
}

// Detect authentication state changes
function useAuthProvider(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userData = await fetchUserInfo(firebaseUser.uid);
        setUserInfo(userData);
      } else {
        setUser(null);
        setUserInfo(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Logout
  const logout = async () => {
    await signOut(auth);
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setUserInfo(null);
  };

  return {
    user,
    userInfo,
    authLoading,
    saveUserToFirestore,
    saveAuthToken,
    logout,
  };
}

// AuthProvider Component
export function AuthProvider({ children }: AuthProviderProps) {
  const authState = useAuthProvider();
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}

// useAuth Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
