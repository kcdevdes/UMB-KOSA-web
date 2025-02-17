'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { runTransaction, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase';
import {
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { useAuth } from '@/lib/hook/useAuth';
import Forum from '@/lib/entity/Forum';
import { Button, Textarea, Modal, TextInput } from 'flowbite-react';
import MyNavbar from '@/components/ui/MyNavbar';
import {
  CldUploadWidget,
  CldUploadWidgetProps,
  CloudinaryUploadWidgetInfo,
} from 'next-cloudinary';
import Image from 'next/image';

export default function ForumDetail() {
  const { forumId } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [thread, setThread] = useState<Forum | null>(null);
  const [comments, setComments] = useState<
    { id: string; text: string; author: string; createdAt: Timestamp }[]
  >([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  useEffect(() => {
    if (!forumId) return;

    const fetchThreadsAndComments = async () => {
      try {
        setLoading(true);

        const docRef = doc(db, 'forums', forumId as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const threadData = docSnap.data() as Forum;
          setThread(threadData);
          setEditedTitle(threadData.title);
          setEditedContent(threadData.content);
          setThumbnails(threadData.thumbnails || []);

          if (threadData.author) {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', threadData.author));
            const querySnap = await getDocs(q);
            if (!querySnap.empty) {
              setAuthorName(
                querySnap.docs[0].data().username || threadData.author
              );
            }
          }
        } else {
          setThread(null);
        }

        const commentsRef = collection(
          db,
          'forums',
          forumId as string,
          'comments'
        );
        const querySnap = await getDocs(commentsRef);
        const fetchedComments = querySnap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as {
            text: string;
            author: string;
            createdAt: Timestamp;
          }),
        }));

        setComments(fetchedComments);
      } catch (error) {
        console.error('Error fetching thread and comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchThreadsAndComments();
    handleViewCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forumId]);

  const handleViewCount = async () => {
    if (!forumId) return;

    const threadRef = doc(db, 'forums', forumId as string);

    await runTransaction(db, async (transaction) => {
      const threadDoc = await transaction.get(threadRef);
      if (!threadDoc.exists()) return;

      const newView = (threadDoc.data().view || 0) + 1;
      transaction.update(threadRef, { view: newView });

      setThread((prev) => (prev ? { ...prev, view: newView } : prev));
    });
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleUpdateThread = async () => {
    if (!editedTitle || !editedContent) return;
    await updateDoc(doc(db, 'forums', forumId as string), {
      title: editedTitle,
      content: editedContent,
      thumbnails,
      updatedAt: Timestamp.now(),
    });
    setThread({
      ...thread,
      title: editedTitle,
      content: editedContent,
      thumbnails,
    } as Forum);
    setEditModalOpen(false);
  };

  const handleDeleteThread = async () => {
    if (!confirm('Are you sure you want to delete this thread?')) return;
    await deleteDoc(doc(db, 'forums', forumId as string));
    router.push('/forum');
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === '') return;

    const newCommentObj = {
      text: newComment,
      author: user?.email || '',
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(
      collection(db, 'forums', forumId as string, 'comments'),
      newCommentObj
    );

    setComments((prev) => [...prev, { id: docRef.id, ...newCommentObj }]);
    setNewComment('');
  };

  const handleCommentDelete = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    await deleteDoc(
      doc(db, 'forums', forumId as string, 'comments', commentId)
    );

    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  };

  const handleUploadSuccess: CldUploadWidgetProps['onSuccess'] = (result) => {
    if (
      result.event === 'success' &&
      result.info &&
      typeof result.info !== 'string'
    ) {
      const info = result.info as CloudinaryUploadWidgetInfo;

      setThumbnails((prev) => {
        if (prev.length >= 3) {
          return prev;
        }
        return [...prev, info.secure_url];
      });
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500 text-lg font-semibold">
        Loading threads details...
      </p>
    );
  }

  if (!thread) {
    return (
      <p className="text-center mt-10 text-gray-500 text-lg font-semibold">
        Thread not found.
      </p>
    );
  }

  return (
    <>
      <MyNavbar />
      <div className="pt-24 max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-lg py-6">
          <h1 className="text-4xl font-extrabold text-gray-900 break-words border-b pb-3">
            {thread.title}
          </h1>
          <p className="mt-4 text-gray-700 text-lg leading-relaxed break-words whitespace-pre-line">
            {thread.content}
          </p>
          <p className="text-sm text-gray-500 mt-4 italic">
            By: {authorName || thread.author}
          </p>

          {/* 이미지 표시 */}
          {thumbnails.length > 0 && (
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
              {thumbnails.map((img, idx) => (
                <div key={idx} className="overflow-hidden rounded-lg">
                  <Image
                    src={img}
                    alt={`Uploaded Image ${idx + 1}`}
                    width={300}
                    height={200}
                    className="object-cover w-full h-40 rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          )}

          {user?.email === thread.author && (
            <div className="mt-6 flex gap-3">
              <Button color="blue" onClick={handleEdit}>
                Edit
              </Button>
              <Button color="red" onClick={handleDeleteThread}>
                Delete
              </Button>
            </div>
          )}
        </div>

        <Modal show={editModalOpen} onClose={() => setEditModalOpen(false)}>
          <Modal.Header>Edit Thread</Modal.Header>
          <Modal.Body>
            <TextInput
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Enter new title"
            />
            <Textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={4}
              placeholder="Enter new content"
              className="my-4"
            />
            <CldUploadWidget
              uploadPreset="umass-kosa-assets"
              onSuccess={handleUploadSuccess}
            >
              {({ open }) => (
                <Button onClick={() => open()}>Upload Images</Button>
              )}
            </CldUploadWidget>

            <div className="flex gap-2 mt-4">
              {thumbnails.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={`Uploaded Image ${idx + 1}`}
                  width={64}
                  height={64}
                  className="object-cover rounded"
                />
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleUpdateThread}>Save</Button>
            <Button color="gray" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Comments */}

        <div className="my-8 border-t pt-4">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          <div className="space-y-3">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded-md flex justify-between items-center"
              >
                <div>
                  <p className="text-sm text-gray-800">
                    <strong>{comment.author}</strong>: {comment.text}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.createdAt.toDate()).toLocaleString()}
                  </p>
                </div>
                {user?.email === comment.author && (
                  <Button
                    color="red"
                    size="xs"
                    onClick={() => handleCommentDelete(comment.id)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            ))}
          </div>

          {user && (
            <div className="my-4">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                rows={3}
                className="w-full border rounded-lg p-2"
              />
              <Button
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white"
                onClick={handleCommentSubmit}
              >
                Comment
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
