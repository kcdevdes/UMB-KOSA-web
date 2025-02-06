import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { admin } from '@/lib/firebase/firebase-admin';

export const POST = async (req: Request) => {
  try {
    const { token } = await req.json();
    if (!token) {
      return NextResponse.json({ error: '토큰 없음' }, { status: 400 });
    }

    // Firebase Emulator 환경 확인
    const isEmulator = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true';

    // ✅ Firebase Emulator에서는 ID 토큰 검증을 건너뛰고 가짜 사용자 정보 반환
    const decodedToken = isEmulator
      ? { uid: 'test-user', email: 'test@umb.edu' }
      : await admin.auth().verifyIdToken(token);

    (await cookies()).set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7일 유지
      path: '/',
    });

    return NextResponse.json(
      { message: '쿠키 설정 완료', user: decodedToken },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Firebase ID 토큰 검증 실패:', error);
    return NextResponse.json({ error: '토큰 검증 실패' }, { status: 401 });
  }
};
