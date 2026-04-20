// AbujaStays — Firebase Configuration
// ─────────────────────────────────────────────────────────────
// SETUP REQUIRED — Create a free Firebase project:
// 1. Go to https://console.firebase.google.com
// 2. Create project → enable Anonymous auth + Firestore
// 3. Register web app → copy config below
//
// For development without Firebase, set VITE_USE_MOCK=true
// in .env (app will use localStorage instead)
//
// For the demo/host dashboard, set VITE_USE_MOCK=true for now.
// ─────────────────────────────────────────────────────────────

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

// ── Firebase Config ──────────────────────────────────────────
// Replace with your Firebase project config from:
// Firebase Console → Project Settings → Your Apps → Web App → Config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'abuja-stays-demo',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'abuja-stays-demo.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:000000000000:web:0000000000000000',
};

// ── Initialize Firebase ─────────────────────────────────────
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const auth = getAuth(app);

// ── Auth Helper ──────────────────────────────────────────────
export async function signInAnon(): Promise<string> {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    // Mock mode: return a fake UID
    return 'mock-user-' + Math.random().toString(36).slice(2, 9);
  }
  try {
    const result = await signInAnonymously(auth);
    return result.user.uid;
  } catch {
    // Fallback to mock if Firebase isn't configured
    return 'mock-user-fallback';
  }
}

// ── Mock Mode Flag ────────────────────────────────────────────
// Set VITE_USE_MOCK=true in .env to bypass Firebase and use localStorage
export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || !import.meta.env.VITE_FIREBASE_API_KEY;
