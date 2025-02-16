'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default function SimpleStat() {
  const [membersCount, setMembersCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const [animatedMembers, setAnimatedMembers] = useState(0);
  const [animatedEvents, setAnimatedEvents] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const eventsSnapshot = await getDocs(collection(db, 'events'));

        setMembersCount(usersSnapshot.size);
        setEventsCount(eventsSnapshot.size);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const animateCount = (target: number, setState: (value: number) => void) => {
    const duration = 2000;
    const startTime = performance.now();

    const updateCount = (timestamp: number) => {
      const progress = (timestamp - startTime) / duration;
      if (progress < 1) {
        const easeOutExpo = (p: number) =>
          p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        setState(Math.floor(target * easeOutExpo(progress)));
        requestAnimationFrame(updateCount);
      } else {
        setState(target);
      }
    };

    requestAnimationFrame(updateCount);
  };

  useEffect(() => {
    if (membersCount > 0) animateCount(membersCount, setAnimatedMembers);
    if (eventsCount > 0) animateCount(eventsCount, setAnimatedEvents);
  }, [membersCount, eventsCount]);

  return (
    <div className="p-10 h-[80vh] bg-korean-blue flex flex-col justify-center items-center w-full">
      <div className="flex flex-row items-center">
        <h1 className="text-[10em] text-white">{animatedMembers}</h1>
        <div className="flex flex-col text-gray-100">
          <h1 className="w-[15vh] text-[2em]">members in association</h1>
          <h1 className="font-thin text-gray-100">
            {new Intl.DateTimeFormat('en-US').format(new Date())}
          </h1>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex flex-col">
          <h1 className="w-[10vh] text-[2em] text-gray-100 mr-7">
            # of events
          </h1>
          <h1 className="font-thin text-gray-100">
            {new Intl.DateTimeFormat('en-US').format(new Date())}
          </h1>
        </div>
        <h1 className="text-[10em] text-white">{animatedEvents}</h1>
      </div>
    </div>
  );
}
