'use client';

import { useAuth } from '@/lib/hooks/useAuth';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Profile</h1>
      {user ? <h2>{user.email}</h2> : <h2>Loading...</h2>}
      <button onClick={logout}>Log Out</button>
    </div>
  );
}
