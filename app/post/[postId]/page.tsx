/**
 * Post Page
 * TODO: Show the list of posts
 */

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase/firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import Footer from '@/components/Footer';
import MyNavbar from '@/components/ui/MyNavbar';
import Image from 'next/image';
import { Spinner } from 'flowbite-react';
import Post from '@/lib/entity/Post';

export default function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [emailToUsername, setEmailToUsername] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;

      const docRef = doc(db, 'posts', postId as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() } as Post);
      }

      const fetchUsernames = async () => {
        const userSnapshot = await getDocs(collection(db, 'users'));
        const userMap: Record<string, string> = {};
        userSnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.email && data.username) {
            userMap[data.email] = data.username;
          }
        });
        setEmailToUsername(userMap);
      };

      fetchUsernames();
      setLoading(false);
    };

    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-xl text-red-500 font-semibold">
          Cannot find the post with ID: {postId}
        </p>
      </div>
    );
  }

  return (
    <div>
      <MyNavbar />
      <div className="mt-20 w-full flex flex-col items-center px-4 md:px-16">
        <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
        <p className="text-gray-500 mt-2">
          Author: {emailToUsername[post.author] ?? post.author}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {post.thumbnails.map((url, idx) => (
            <Image
              key={idx}
              src={url}
              alt={`Thumbnail ${idx + 1}`}
              width={300}
              height={200}
              className="rounded-lg"
            />
          ))}
        </div>
        <div className="mt-6 max-w-2xl text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </div>
      <Footer />
    </div>
  );
}
