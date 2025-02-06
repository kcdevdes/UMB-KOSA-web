import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { admin } from '@/lib/firebase/firebase-admin';

export const GET = async () => {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token)
      return NextResponse.json({ error: '토큰 없음' }, { status: 401 });

    const decodedToken = await admin.auth().verifyIdToken(token);
    return NextResponse.json(
      { message: '인증 성공', user: decodedToken },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: '유효하지 않은 토큰' }, { status: 401 });
  }
};
