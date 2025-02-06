// lib/firebase-admin.ts
import * as admin from 'firebase-admin';

const isEmulator = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: isEmulator
      ? admin.credential.applicationDefault()
      : admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
  });
}

if (isEmulator) {
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
}

export { admin };
