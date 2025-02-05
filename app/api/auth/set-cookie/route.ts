import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import admin from '@/lib/firebase/firebase-admin';

export const POST = async (req: Request) => {
  try {
    const { token } = await req.json();
    if (!token)
      return NextResponse.json({ error: '토큰 없음' }, { status: 400 });

    // Firebase Admin SDK로 토큰 검증
    const decodedToken = await admin.auth().verifyIdToken(token);

    // httpOnly 쿠키 설정
    (
      await // httpOnly 쿠키 설정
      cookies()
    ).set({
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
    console.error(error);
    return NextResponse.json({ error: '토큰 검증 실패' }, { status: 401 });
  }
};
