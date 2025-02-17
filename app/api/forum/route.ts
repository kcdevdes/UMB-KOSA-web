/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase/firebase';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { cookies } from 'next/headers';
import { admin } from '@/lib/firebase/firebase-admin';
import Forum from '@/lib/entity/Forum';

export async function POST(req: Request) {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const userEmail = decodedToken.email || 'unknown';
    const userId = decodedToken.uid;

    const { title, content, category, language, thumbnails } = await req.json();
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and Content cannot be empty.' },
        { status: 400 }
      );
    }

    if (thumbnails.length > 3) {
      return NextResponse.json(
        { error: 'You can upload up to 3 images only.' },
        { status: 400 }
      );
    }

    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.exists() ? userSnap.data() : null;
    const userRole = userData?.role || 'member';

    if (category === 'Announcements' && userRole !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden: Only admins can post Announcements' },
        { status: 403 }
      );
    }

    // 문서 ID를 직접 생성하여 일치하도록 함
    const forumRef = collection(db, 'forums');
    const newForumRef = doc(forumRef); // 미리 생성된 문서 ID 사용

    const newPost: Forum = {
      id: newForumRef.id, // 여기에 Firestore의 문서 ID를 직접 설정
      title,
      content,
      category,
      language,
      thumbnails,
      author: userEmail,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      view: 0,
      comments: `forums/${newForumRef.id}/comments`,
    };

    // setDoc()을 사용하여 문서를 생성하면서 ID를 유지
    await setDoc(newForumRef, newPost);

    return NextResponse.json(
      { message: 'Post created successfully', id: newForumRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating forum post:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { postId, userId } = await req.json();
    if (!postId || !userId) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const postRef = doc(db, 'forums', postId);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const postData = postSnap.data();
    if (postData.author !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await deleteDoc(postRef);
    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { postId, userId, content, title } = await req.json();
    if (!postId || !userId || !content || !title) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const postRef = doc(db, 'forums', postId);
    const postSnap = await getDoc(postRef);

    if (!postSnap.exists()) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const postData = postSnap.data();
    if (postData.author !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await updateDoc(postRef, {
      title,
      content,
      updatedAt: Timestamp.now(), // Firestore Timestamp 사용
    });

    return NextResponse.json(
      { message: 'Post updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
}
