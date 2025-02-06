import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { admin } from '@/lib/firebase/firebase-admin';

export const GET = async () => {
  try {
    const token = (await cookies()).get('token')?.value;
    if (!token)
      return NextResponse.json({ error: 'No Token' }, { status: 401 });

    const decodedToken = await admin.auth().verifyIdToken(token);
    return NextResponse.json(
      { message: 'Succeed to verify', user: decodedToken },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
  }
};
