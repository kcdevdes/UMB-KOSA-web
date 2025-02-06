import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const POST = async () => {
  (await cookies()).set({
    name: 'token',
    value: '',
    expires: new Date(0), // Delete Cookie
    path: '/',
  });

  return NextResponse.json({ message: 'Log Out Completed' }, { status: 200 });
};
