'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import MyNavbar from '@/components/ui/MyNavbar';
import Event from '@/lib/entity/Event';

import UpcomingEvents from '@/components/event/UpcomingEvents';
import PastEvents from '@/components/event/PastEvents';
import Footer from '@/components/ui/Footer';

export default function EventPage() {
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const eventsData = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Event)
        );
        setAllEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <MyNavbar />
      <div className="bg-gray-100 pt-24 sm:pt-32">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-black sm:text-4xl font-Shilla">
              See What&apos;s Coming Next
            </h2>
            <p className="text-lg/8 text-black">
              The best way to support KOSA is by joining our events! Check out
              what&apos;s coming next!
            </p>
          </div>
        </div>
      </div>
      <div className=" w-full h-auto flex flex-col items-center bg-gray-100">
        <div className="flex">
          <button
            className={`w-40 py-2 rounded-l-lg ${
              tab === 'upcoming' ? 'bg-korean-blue text-white' : 'bg-gray-200'
            }`}
            onClick={() => setTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`w-40 py-2 rounded-r-lg ${
              tab === 'past' ? 'bg-korean-blue text-white' : 'bg-gray-200'
            }`}
            onClick={() => setTab('past')}
          >
            Past
          </button>
        </div>

        {/* 로딩 상태 혹은 탭 선택에 따라 이벤트 컴포넌트 렌더링 */}
        {loading ? (
          <p className="font-bold text-gray-500 text-center">
            Hang tight! Our carrier pigeon is delivering your events...🕊️🕊️
          </p>
        ) : tab === 'upcoming' ? (
          <UpcomingEvents allEvents={allEvents} />
        ) : (
          <PastEvents allEvents={allEvents} />
        )}
      </div>
      <Footer />
    </div>
  );
}
