/**
 * Admin Dashboard Page
 * Allow users who have admin role in the database, managing members, events, posts, and contact messages
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MembersTab from '@/components/admin/MembersTab';
import EventsTab from '@/components/admin/EventsTab';
import PostsTab from '@/components/admin/PostsTab';
import ContactTab from '@/components/admin/ContactTab';
import { useAuth } from '@/lib/hook/useAuth';
import Link from 'next/link';

const TABS = ['Members', 'Events', 'Posts', 'Contact'];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('Members');
  const { userInfo, authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return; // prevent loading until auth process is done
    if (userInfo?.role !== 'admin') {
      router.replace('/'); // prevent accessing to admin page
    }
  }, [authLoading, userInfo, router]);

  if (authLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-10">
      <div className="flex flex-row">
        <h1 className="text-2xl font-bold justify-center items-center">
          Admin Dashboard
        </h1>
        <Link
          href={'/'}
          className="ml-10 bg-korean-red text-white rounded-full px-3 py-2"
        >
          Home
        </Link>
      </div>

      {/* Tabs Navigation */}
      <div className="flex space-x-4 border-b pb-2 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 ${
              activeTab === tab
                ? 'border-b-2 border-blue-500 font-semibold'
                : ''
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'Members' && <MembersTab />}
        {activeTab === 'Events' && <EventsTab />}
        {activeTab === 'Posts' && <PostsTab />}
        {activeTab === 'Contact' && <ContactTab />}
      </div>
    </div>
  );
}
