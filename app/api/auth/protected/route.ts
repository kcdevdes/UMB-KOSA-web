import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { admin } from '@/lib/firebase/firebase-admin';

export const GET = async () => {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: '인증 실패' }, { status: 401 });
    }

    // Firebase Emulator 환경 확인
    const isEmulator = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true';

    const decodedToken = isEmulator
      ? { uid: 'test-user', email: 'test@umb.edu' }
      : await admin.auth().verifyIdToken(token);

    return NextResponse.json(
      { message: '인증 성공', user: decodedToken },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Firebase ID 토큰 검증 실패:', error);
    return NextResponse.json({ error: '유효하지 않은 토큰' }, { status: 401 });
  }
};
