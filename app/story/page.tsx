'use client';

import { useEffect, useState } from 'react';
import SiteHeader from '@/components/layout/SiteHeader';
import PostCard from '@/components/ui/PostCard';

type ApiPost = { imageSrc: string; title: string; description: string };

const StoryPage = () => {
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/posts?limit=12');
        const { posts } = await r.json();
        setPosts(posts);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <SiteHeader />
      <div className="container mx-auto flex flex-col items-center pt-24 gap-6">
        {loading && <div className="text-sm opacity-70">불러오는 중…</div>}
        {!loading && !posts && (
          <div className="text-sm opacity-70">표시할 게시물이 없어요.</div>
        )}
        {!loading &&
          posts.map((p, i) => (
            <PostCard
              key={i}
              imageSrc={p.imageSrc || '/images/no-image.jpg'}
              title={p.title}
              description={p.description}
            />
          ))}
      </div>
    </div>
  );
};

export default StoryPage;
