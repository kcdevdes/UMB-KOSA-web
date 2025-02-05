// lib/firebase-admin.ts
import admin from 'firebase-admin';

// Firebase Admin SDK가 여러 번 초기화되지 않도록 방지
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

// Firebase Admin SDK 인스턴스 내보내기
export default admin;
