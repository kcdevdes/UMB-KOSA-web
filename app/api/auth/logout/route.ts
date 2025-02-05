import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const POST = async () => {
  (await cookies()).set({
    name: 'token',
    value: '',
    expires: new Date(0), // 쿠키 삭제
    path: '/',
  });

  return NextResponse.json({ message: '로그아웃 완료' }, { status: 200 });
};
