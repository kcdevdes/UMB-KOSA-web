import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { admin } from '@/lib/firebase/firebase-admin';

export const GET = async () => {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Failed to authenticate' },
        { status: 401 }
      );
    }

    // Fire Emualtor
    const isEmulator = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true';

    const decodedToken = isEmulator
      ? { uid: 'test-user', email: 'test@umb.edu' }
      : await admin.auth().verifyIdToken(token);

    return NextResponse.json(
      { message: 'Succeed to authenticate', user: decodedToken },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Firebase ID Token Verification Failed:', error);
    return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
  }
};
