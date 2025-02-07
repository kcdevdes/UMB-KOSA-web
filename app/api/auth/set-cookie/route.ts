import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { admin } from '@/lib/firebase/firebase-admin';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { token } = body;

    if (!token) {
      console.error('❌ No token received');
      return NextResponse.json({ error: 'No Token' }, { status: 400 });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);

    (await cookies()).set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 Days
      path: '/',
    });

    return NextResponse.json(
      { uid: decodedToken.uid, email: decodedToken.email },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Token verification failed' },
      { status: 401 }
    );
  }
};
