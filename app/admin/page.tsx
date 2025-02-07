'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MembersTab from '@/components/admin/MembersTab';
import EventsTab from '@/components/admin/EventsTab';
import PostsTab from '@/components/admin/PostsTab';
import ContactTab from '@/components/admin/ContactTab';
import { useAuth } from '@/lib/hooks/useAuth';

const TABS = ['Members', 'Events', 'Posts', 'Contact'];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('Members');
  const { userInfo, authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return; // authLoading이 끝날 때까지 실행 방지
    if (userInfo?.role !== 'admin') {
      router.replace('/'); // push 대신 replace 사용 (뒤로 가기 방지)
    }
  }, [authLoading, userInfo, router]);

  if (authLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

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
