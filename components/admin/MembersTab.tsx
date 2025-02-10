/**
 * MembersTab component
 *
 * Render the list of members and provide the ability to promote/demote members
 */

'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from '@/lib/hook/useAuth';

interface UserInfo {
  id: string;
  email: string;
  role: string;
  username: string;
}

export default function MembersTab() {
  const [members, setMembers] = useState<UserInfo[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMembers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      setMembers(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as UserInfo[]
      );
    };
    fetchMembers();
  }, []);

  // Promote a member to admin
  const promoteToAdmin = async (id: string) => {
    await updateDoc(doc(db, 'users', id), { role: 'admin' });

    setMembers(members.map((m) => (m.id === id ? { ...m, role: 'admin' } : m)));
  };

  // Demote an admin to member
  // If you try to demote yourself, show an alert (You cannot demote yourself to Member)
  const demoteToUser = async (id: string) => {
    if (user && user.uid !== id) {
      await updateDoc(doc(db, 'users', id), { role: 'member' });
      setMembers(
        members.map((m) => (m.id === id ? { ...m, role: 'member' } : m))
      );
    } else alert('You cannot demote yourself to Member');
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Member Management</h2>
      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id} className="border-b">
              <td>{member.username}</td>
              <td>{member.email}</td>
              <td>{member.role}</td>
              <td>
                {member.role !== 'admin' && (
                  <button
                    onClick={() => promoteToAdmin(member.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Promote to Admin
                  </button>
                )}
                {member.role === 'admin' && (
                  <button
                    onClick={() => demoteToUser(member.id)}
                    className="ml-2 px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Demote to Member
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
