'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase/firebase';
import MyNavbar from '@/components/ui/MyNavbar';
import Event from '@/lib/entity/Event';
import User from '@/lib/entity/User';

export default function EventDetailPage() {
  const { eventId } = useParams(); // /events/[eventId] 로 넘어온 파라미터
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  // 이벤트 작성자의 username (또는 null)
  const [authorName, setAuthorName] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventDetail = async () => {
      try {
        if (!eventId) return; // URL 파라미터가 없으면 return
        const docRef = doc(db, 'events', eventId as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // 1) 이벤트 문서 불러오기
          const eventData = { id: docSnap.id, ...docSnap.data() } as Event;
          setEvent(eventData);

          // 2) 이벤트의 author(이메일)로 users 컬렉션에서 email == author 인 문서 조회
          if (eventData.author) {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', eventData.author));
            const querySnap = await getDocs(q);

            if (!querySnap.empty) {
              // 첫 번째 문서에 대한 정보만 사용
              const userDoc = querySnap.docs[0];
              const userData = userDoc.data() as User;

              // userData.username 필드가 있으면 authorName 설정
              setAuthorName(userData.username ?? null);
            } else {
              console.log('No user found with that email!');
            }
          }
        } else {
          console.log('No such event!');
        }
      } catch (error) {
        console.error('Error fetching event detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [eventId]);

  // 로딩 중일 때
  if (loading) {
    return (
      <div>
        <MyNavbar />
        <div className="mt-20 w-full flex justify-center items-center">
          <p className="text-xl text-gray-500 text-center">
            Hang tight! Our carrier pigeon is delivering the event details...
          </p>
        </div>
      </div>
    );
  }

  // 이벤트 데이터가 없는 경우
  if (!event) {
    return (
      <div>
        <MyNavbar />
        <div className="mt-20 w-full flex justify-center items-center">
          <p className="text-2xl font-bold text-gray-500 text-center">
            Sorry, this event does not exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  // 날짜 포맷 함수
  const formatDateTime = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div>
      <MyNavbar />
      <div className="mt-20 w-full max-w-4xl mx-auto p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          <Image
            src={event.thumbnails?.[0] || '/images/no-image.jpg'}
            alt={event.title}
            width={500}
            height={300}
            className="w-full h-auto object-cover rounded-xl mb-4"
          />
          <p className="text-gray-600 text-sm mb-2">📍 {event.location}</p>
          <p className="text-gray-600 text-sm mb-2">
            🗓 {formatDateTime(event.start_date)} -{' '}
            {formatDateTime(event.end_date)}
          </p>

          {/* 사용자 이름: userData.username이 존재하면 표시, 아니면 email 그대로 */}
          {authorName ? (
            <p className="text-sm text-gray-500 mb-2">By {authorName}</p>
          ) : (
            <p className="text-sm text-gray-500 mb-2">By {event.author}</p>
          )}

          {event.link && (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mb-4"
            >
              Instagram
            </a>
          )}

          <p className="text-gray-800 mt-4 whitespace-pre-wrap">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
}
