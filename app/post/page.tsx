'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import Footer from '@/components/ui/Footer';
import MyNavbar from '@/components/ui/MyNavbar';
import Link from 'next/link';
import Image from 'next/image';
import { Card, Spinner } from 'flowbite-react';
import Post from '@/lib/entity/Post';
import { useTranslations } from 'next-intl';

export default function PostPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [emailToUsername, setEmailToUsername] = useState<
    Record<string, string>
  >({});
  const t = useTranslations('post');

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      setPosts(fetchedPosts);
      setLoading(false);
    };

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

    fetchPosts();
    fetchUsernames();
  }, []);

  function truncateText(text: string, maxLength: number) {
    return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <MyNavbar />
      <div className="bg-gray-100 py-24 sm:py-32 ">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 ">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-black sm:text-4xl font-Shilla">
              {t('title')}
            </h2>
            <p className="mt-6 text-lg/8 text-black">{t('description')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/post/${post.id}`}
                className="cursor-pointer"
              >
                <Card className="w-full h-[600px] flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                  <div className="w-full h-[300px] flex items-center justify-center overflow-hidden bg-gray-200">
                    {post.thumbnails.length > 0 ? (
                      <Image
                        src={post.thumbnails[0]}
                        alt="thumbnail"
                        width={300}
                        height={300}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-gray-500 text-sm">No Image</span>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 px-4 py-2">
                    <h3 className="text-lg font-semibold truncate">
                      {truncateText(post.title, 50)}
                    </h3>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">
                      {truncateText(post.content, 500)}
                    </p>
                    <p className="text-xs text-gray-400 mt-auto">
                      Author: {emailToUsername[post.author] ?? post.author}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
/**
 * 
      <div className="pt-24 px-4 md:px-16">
        <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-black sm:text-4xl">
              Meet Our Social Media
            </h2>
            <p className="mt-6 text-lg/8 text-black">
              We love connecting with diverse people and will keep you updated
              with events and news through social media! Stay tuned! ➜
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.id}`}
              className="cursor-pointer"
            >
              <Card className="w-full h-[600px] flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                <div className="w-full h-[300px] flex items-center justify-center overflow-hidden bg-gray-200">
                  {post.thumbnails.length > 0 ? (
                    <Image
                      src={post.thumbnails[0]}
                      alt="thumbnail"
                      width={300}
                      height={300}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">No Image</span>
                  )}
                </div>

                <div className="flex flex-col flex-1 px-4 py-2">
                  <h3 className="text-lg font-semibold truncate">
                    {truncateText(post.title, 50)}
                  </h3>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">
                    {truncateText(post.content, 500)}
                  </p>
                  <p className="text-xs text-gray-400 mt-auto">
                    Author: {emailToUsername[post.author] ?? post.author}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
 */
