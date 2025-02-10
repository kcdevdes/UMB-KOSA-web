'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import Event from '@/lib/entity/Event';

interface UpcomingEventsProps {
  allEvents: Event[];
}

interface UserData {
  email: string; // "test4@umb.edu"
  username?: string; // "test4"
  introduction?: string;
  role?: string;
  createdAt?: string;
}

export default function UpcomingEvents({ allEvents }: UpcomingEventsProps) {
  const [emailToUsername, setEmailToUsername] = useState<
    Record<string, string>
  >({});

  // 오늘 이후의 이벤트만 필터링, start_date 오름차순 정렬
  const now = new Date();
  const upcoming = allEvents
    .filter((event) => event.start_date.toDate() >= now)
    .sort(
      (a, b) =>
        a.start_date.toDate().getTime() - b.start_date.toDate().getTime()
    );

  // 날짜 포맷 함수
  const formatDateTime = (timestamp: Event['start_date']) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // 긴 텍스트를 100자로 축약
  function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }

  // 모든 이벤트의 이메일에 대해 users 컬렉션에서 username 가져오기
  useEffect(() => {
    const fetchUsernames = async () => {
      // 1) upcoming 이벤트들이 사용하는 모든 이메일 수집
      const uniqueEmails = Array.from(
        new Set(upcoming.map((ev) => ev.author).filter(Boolean))
      );

      // 2) Firestore에서 email이 이 배열에 포함되는 문서들을 한 번에 조회
      //    (주의: where 'in' 은 최대 10개의 값을 처리 가능)
      if (uniqueEmails.length > 0 && uniqueEmails.length <= 10) {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('email', 'in', uniqueEmails));
        const snap = await getDocs(q);

        // 3) 이메일 -> username 맵 구성
        const map: Record<string, string> = {};
        snap.forEach((doc) => {
          const data = doc.data() as UserData;
          // 이메일이 있고 username이 있는 경우만 매핑
          if (data.email && data.username) {
            map[data.email] = data.username;
          }
        });

        // 상태에 저장
        setEmailToUsername(map);
      }
    };

    fetchUsernames();
  }, [upcoming]);

  // 이벤트가 없을 때
  if (upcoming.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-16">
        <p className="text-2xl font-bold text-gray-500 text-center">
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
      {upcoming.map((event) => {
        // emailToUsername 맵에서 username 가져오기 (없으면 원본 email 표시)
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
              {/* 이미지 영역 */}
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
              {/* 텍스트 영역 */}
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
                {/* email -> username 치환 후 표시 */}
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
