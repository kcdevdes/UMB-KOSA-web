'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';

import SiteHeader from '@/components/layout/SiteHeader';
import PostCard from '@/components/ui/PostCard';

type ApiPost = { imageSrc: string; title: string; description: string; };

const StoryPage = () => {
  const t = useTranslations('story');
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/posts?limit=12');
        const { posts: responsePosts } = await response.json();
        setPosts(responsePosts);
      } catch (error) {
        console.error('Failed to load posts', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <SiteHeader />
      <div className="container mx-auto flex flex-col items-center pt-24 gap-6">
        {loading && <div className="text-sm opacity-70">{t('loading')}</div>}
        {!loading && posts.length === 0 && (
          <div className="text-sm opacity-70">{t('empty')}</div>
        )}
        {!loading &&
          posts.map((post, index) => (
            <PostCard
              key={`${post.title}-${index}`}
              imageSrc={post.imageSrc || '/images/no-image.jpg'}
              title={post.title}
              description={post.description}
            />
          ))}
      </div>
    </div>
  );
};

export default StoryPage;
