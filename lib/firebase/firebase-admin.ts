import * as admin from 'firebase-admin';

const isEmulator = process.env.NEXT_PUBLIC_USE_FIREBASE_EMULATOR === 'true';

const projectId = process.env.FIREBASE_PROJECT_ID;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: isEmulator
      ? admin.credential.applicationDefault()
      : admin.credential.cert({
          projectId,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
    projectId,
  });
}

if (isEmulator) {
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
}

export { admin };
