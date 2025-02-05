import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import admin from '@/lib/firebase/firebase-admin'; // Firebase Admin SDK 초기화

export const GET = async () => {
  try {
    // 클라이언트에서 전달된 쿠키에서 `token` 값 가져오기
    const token = cookies().get('token')?.value;
    if (!token)
      return NextResponse.json({ error: '인증 실패' }, { status: 401 });

    // Firebase Admin SDK를 사용하여 토큰 검증
    const decodedToken = await admin.auth().verifyIdToken(token);

    return NextResponse.json(
      { message: '인증 성공', user: decodedToken },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: '유효하지 않은 토큰' }, { status: 401 });
  }
};
