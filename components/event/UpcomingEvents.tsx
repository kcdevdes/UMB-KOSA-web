'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import Event from '@/lib/entity/Event';
import User from '@/lib/entity/User';

interface UpcomingEventsProps {
  allEvents: Event[];
}

export default function UpcomingEvents({ allEvents }: UpcomingEventsProps) {
  const [emailToUsername, setEmailToUsername] = useState<
    Record<string, string>
  >({});

  // sort by start_date in ascending order
  const now = new Date();
  const ongoing = allEvents.filter(
    (event) =>
      event.start_date.toDate() <= now && event.end_date.toDate() >= now
  );
  const upcoming = allEvents
    .filter((event) => event.start_date.toDate() > now)
    .sort(
      (a, b) =>
        a.start_date.toDate().getTime() - b.start_date.toDate().getTime()
    );

  const eventsToShow = [...ongoing, ...upcoming];

  // format date and time
  const formatDateTime = (timestamp: Event['start_date']) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // truncate text
  function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }

  // fetch usernames
  useEffect(() => {
    const fetchUsernames = async () => {
      const uniqueEmails = Array.from(
        new Set(eventsToShow.map((ev) => ev.author).filter(Boolean))
      );

      if (uniqueEmails.length > 0 && uniqueEmails.length <= 10) {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', 'in', uniqueEmails));
        const snap = await getDocs(q);

        const map: Record<string, string> = {};
        snap.forEach((doc) => {
          const data = doc.data() as User;
          if (data.email && data.username) {
            map[data.email] = data.username;
          }
        });

        setEmailToUsername(map);
      }
    };

    fetchUsernames();
  }, [eventsToShow]);

  if (eventsToShow.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-16">
        <p className="text-2xl text-gray-500 text-center">
          There is no <span className="text-korean-red">upcoming</span> event
          yet! Follow{' '}
          <Link
            href={'https://www.instagram.com/umb_kosa/'}
            className="text-blue-700 underline hover:text-blue-900"
          >
            KOSA Instagram
          </Link>{' '}
          for up-to-date information
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-8 p-16">
      {eventsToShow.map((event) => {
        const displayedName = emailToUsername[event.author] || event.author;

        return (
          <Link key={event.id} href={`/event/${event.id}`}>
            <div
              className="
                flex
                flex-col
                md:flex-row
                md:items-start
                items-center
                rounded-3xl
                p-4
                shadow-lg
                space-y-4
                md:space-y-0
                md:space-x-6
                bg-korean-white
              "
            >
              <Image
                src={event.thumbnails?.[0] || '/images/no-image.jpg'}
                alt={event.title}
                width={400}
                height={200}
                className="
                  w-48
                  h-48
                  object-cover
                  rounded-2xl
                "
              />
              <div className="p-4">
                <h2 className="text-xl text-gray-700 font-bold">
                  {event.title}
                </h2>
                <p className="text-gray-700 text-sm font-bold">
                  📍 {event.location}
                </p>
                <p className="text-gray-700 text-sm">
                  🗓 {formatDateTime(event.start_date)} -{' '}
                  {formatDateTime(event.end_date)}
                </p>
                <p className="text-sm text-gray-700 mt-2">By {displayedName}</p>
                <div className="text-gray-700 mt-2">
                  {truncateText(event.description, 100)}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
