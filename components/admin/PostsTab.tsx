'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase/firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

interface Post {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function PostsTab() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      setPosts(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[]
      );
    };
    fetchPosts();
  }, []);

  const addPost = async () => {
    if (!newPostTitle || !newPostContent) return;
    const docRef = await addDoc(collection(db, 'posts'), {
      title: newPostTitle,
      content: newPostContent,
      date: new Date().toISOString(),
    });

    setPosts([
      ...posts,
      {
        id: docRef.id,
        title: newPostTitle,
        content: newPostContent,
        date: new Date().toISOString(),
      },
    ]);
    setNewPostTitle('');
    setNewPostContent('');
  };

  const deletePost = async (id: string) => {
    await deleteDoc(doc(db, 'posts', id));
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Post Management</h2>
      <input
        value={newPostTitle}
        onChange={(e) => setNewPostTitle(e.target.value)}
        placeholder="게시글 제목"
        className="border p-2 w-full mb-2"
      />
      <textarea
        value={newPostContent}
        onChange={(e) => setNewPostContent(e.target.value)}
        placeholder="게시글 내용"
        className="border p-2 w-full mb-2"
        rows={4}
      />
      <button onClick={addPost} className="px-4 py-2 bg-blue-500 text-white">
        추가
      </button>
      <ul className="mt-4">
        {posts.map((post) => (
          <li key={post.id} className="flex justify-between border-b py-2">
            <div>
              <strong>{post.title}</strong> - {post.content}
            </div>
            <button
              onClick={() => deletePost(post.id)}
              className="text-red-500"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
