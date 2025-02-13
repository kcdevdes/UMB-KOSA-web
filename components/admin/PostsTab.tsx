'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase/firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  Timestamp,
} from 'firebase/firestore';
import {
  Modal,
  Button,
  TextInput,
  Textarea,
  Card,
  Alert,
} from 'flowbite-react';
import Image from 'next/image';
import { CldUploadWidget, CldUploadWidgetProps } from 'next-cloudinary';
import Post from '@/lib/entity/Post';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function PostsTab() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [imageError, setImageError] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Firebase Auth 상태 감지
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // newPost state
  const [newPost, setNewPost] = useState<Omit<Post, 'id' | 'createdAt'>>({
    title: '',
    content: '',
    thumbnails: [],
    author: '',
  });

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

  const handleUploadSuccess: CldUploadWidgetProps['onSuccess'] = (result) => {
    if (result.event === 'success' && result.info) {
      const info = result.info;
      if (newPost.thumbnails.length >= 10) {
        setImageError(true);
        return;
      }
      setImageError(false);
      setNewPost((prev) => {
        if (prev.thumbnails.length >= 10) {
          setImageError(true);
          return prev;
        }
        if (typeof info !== 'string' && info.secure_url) {
          return { ...prev, thumbnails: [...prev.thumbnails, info.secure_url] };
        }
        return prev;
      });
    }
  };

  // save or edit posts
  const handleSavePost = async () => {
    if (!newPost.title || !newPost.content || !userEmail) return;

    const newPostData = {
      ...newPost,
      author: userEmail, // 현재 로그인한 사용자의 이메일 저장
      createdAt: Timestamp.fromDate(new Date()),
    };

    if (editPost) {
      await updateDoc(doc(db, 'posts', editPost.id), newPostData);
      setPosts(
        posts.map((p) => (p.id === editPost.id ? { ...p, ...newPostData } : p))
      );
    } else {
      const docRef = await addDoc(collection(db, 'posts'), newPostData);
      setPosts([...posts, { id: docRef.id, ...newPostData }]);
    }

    setNewPost({ title: '', content: '', thumbnails: [], author: '' });
    setEditPost(null);
    setIsOpen(false);
  };

  // delete post
  const handleDeletePost = async (id: string) => {
    await deleteDoc(doc(db, 'posts', id));
    setPosts(posts.filter((p) => p.id !== id));
  };

  function truncateText(text: string, maxLength: number) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Post Management</h2>
      <Button onClick={() => setIsOpen(true)}>Create New Post</Button>

      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>
          {editPost ? 'Edit Post' : 'Create New Post'}
        </Modal.Header>
        <Modal.Body>
          <TextInput
            value={newPost.title}
            onChange={(e) =>
              setNewPost((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Title"
            className="mb-2"
          />
          <Textarea
            value={newPost.content}
            onChange={(e) =>
              setNewPost((prev) => ({ ...prev, content: e.target.value }))
            }
            placeholder="Content"
            rows={4}
            className="mb-2"
          />

          <CldUploadWidget
            uploadPreset="umass-kosa-assets"
            options={{ multiple: true, maxFiles: 5 }}
            onSuccess={handleUploadSuccess}
          >
            {({ open }) => (
              <Button onClick={() => open()} color="gray" className="mb-2">
                Upload Image
              </Button>
            )}
          </CldUploadWidget>

          {imageError && <Alert color="red">{imageError}</Alert>}

          <div className="flex flex-wrap gap-2 mt-2">
            {newPost.thumbnails.map((url, idx) => (
              <Image
                key={idx}
                src={url}
                alt="Uploaded"
                width={80}
                height={80}
                className="object-cover rounded"
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSavePost}>{editPost ? 'Edit' : 'Add'}</Button>
          <Button color="gray" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            {post.thumbnails.length > 0 && (
              <Image
                src={post.thumbnails[0]}
                alt="Thumbnail"
                width={100}
                height={100}
                className="object-cover rounded"
              />
            )}
            <h3 className="text-lg font-semibold">
              {truncateText(post.title, 50)}
            </h3>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">
              {truncateText(post.content, 300)}
            </p>
            <p className="text-xs text-gray-500">Author: {post.author}</p>
            <div className="flex justify-between mt-2">
              <Button
                size="sm"
                onClick={() => {
                  setEditPost(post);
                  setNewPost({
                    title: post.title,
                    content: post.content,
                    thumbnails: post.thumbnails,
                    author: post.author,
                  });
                  setIsOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                size="sm"
                color="red"
                onClick={() => handleDeletePost(post.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
