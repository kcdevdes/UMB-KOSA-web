'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import MyNavbar from '@/components/ui/MyNavbar';

interface Event {
  id: string;
  title: string;
  location: string;
  start_date: Timestamp;
  end_date: Timestamp;
  description: string;
  author: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  thumbnails: string[]; // Allow up to 3 images
}

export default function EventPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const eventsData = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Event)
        );

        // Sort events by start_date, passed events will be at the end
        const sortedEvents = eventsData.sort((a, b) => {
          const now = new Date();
          const aIsPast = a.end_date.toDate() < now;
          const bIsPast = b.end_date.toDate() < now;

          if (aIsPast && !bIsPast) return 1;
          if (!aIsPast && bIsPast) return -1;

          // 미래 이벤트는 시작 날짜가 가까운 순서대로 정렬
          if (!aIsPast && !bIsPast) {
            return (
              a.start_date.toDate().getTime() - b.start_date.toDate().getTime()
            );
          }

          // 지난 이벤트는 최근 종료된 순서대로 정렬
          return b.end_date.toDate().getTime() - a.end_date.toDate().getTime();
        });

        setEvents(sortedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const isPastEvent = (end_date: Timestamp) => {
    console.log(end_date.toDate());
    return end_date.toDate() < new Date();
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const formatDateTime = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div>
      <MyNavbar />
      <div className="mt-20 w-full flex flex-col justify-center items-center">
        <div className="flex flex-col space-y-8 p-16">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center space-x-6 rounded-xl p-4 shadow-lg "
            >
              <Image
                src={event.thumbnails?.[0] || '/images/hanji-bg.webp'}
                alt={event.title}
                width={400}
                height={200}
                className={`w-48 h-48 object-cover rounded-xl ${
                  isPastEvent(event.end_date) ? 'opacity-50' : ''
                }`}
              />
              <p>{formatDateTime(event.end_date)}</p>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{event.title}</h2>
                <p className="text-gray-600 text-sm">📍 {event.location}</p>
                <p className="text-gray-600 text-sm">
                  🗓 {formatDateTime(event.start_date)} -{' '}
                  {formatDateTime(event.end_date)}
                </p>
                <p className="mt-2 text-gray-700">
                  {truncateText(event.description, 200)}
                </p>
                <p className="text-sm text-gray-500 mt-2">By {event.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
