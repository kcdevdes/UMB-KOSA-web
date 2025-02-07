import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export async function POST(req: Request) {
  try {
    const { uid, email } = await req.json();

    if (!uid || !email) {
      return NextResponse.json({ error: 'Invalid user data' }, { status: 400 });
    }

    const userRef = doc(db, 'users', uid);

    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      return NextResponse.json({
        success: false,
        message: 'User already exists',
      });
    }

    await setDoc(userRef, {
      username: email.split('@')[0],
      email,
      introduction: 'Hello, KOSA!',
      role: 'member',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'User saved successfully',
    });
  } catch {
    return NextResponse.json({ error: 'Failed to save user' }, { status: 500 });
  }
}
