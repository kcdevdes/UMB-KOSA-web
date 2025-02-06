import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { admin } from '@/lib/firebase/firebase-admin';

export const POST = async (req: Request) => {
  try {
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json({ error: 'No Token' }, { status: 400 });
    }

    const isEmulator = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true';

    const decodedToken = isEmulator
      ? { uid: 'test-user', email: 'test@umb.edu' }
      : await admin.auth().verifyIdToken(token);

    (await cookies()).set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 Days
      path: '/',
    });

    return NextResponse.json(
      { message: 'Completed', user: decodedToken },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Firebase ID Failed to verify', error);
    return NextResponse.json({ error: 'failed' }, { status: 401 });
  }
};
