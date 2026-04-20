// Firebase configuration
import { initializeApp } from 'firebase/app';
import {
  getFirestore, collection, getDocs, doc, getDoc, addDoc,
  query, where, orderBy, Timestamp
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'abuja-stays',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'abuja-stays.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '000000000000',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:000:web:abc',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// ── Listings ─────────────────────────────────────────────────────────────────
export async function getListings(): Promise<unknown[]> {
  const snap = await getDocs(collection(db, 'listings'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getListing(id: string): Promise<unknown | null> {
  const d = await getDoc(doc(db, 'listings', id));
  return d.exists() ? { id: d.id, ...d.data() } : null;
}

export async function getListingsByArea(area: string): Promise<unknown[]> {
  const q = query(collection(db, 'listings'), where('location.area', '==', area));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ── Bookings ─────────────────────────────────────────────────────────────────
export async function createBooking(data: Record<string, unknown>) {
  return addDoc(collection(db, 'bookings'), {
    ...data,
    createdAt: Timestamp.now(),
  });
}

export async function getBookingsByGuest(guestId: string) {
  const q = query(collection(db, 'bookings'), where('guestId', '==', guestId), orderBy('createdAt', 'desc'));
  return (await getDocs(q)).docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getBookingsByListing(listingId: string) {
  const q = query(collection(db, 'bookings'), where('listingId', '==', listingId));
  return (await getDocs(q)).docs.map(d => ({ id: d.id, ...d.data() }));
}

// ── Reviews ─────────────────────────────────────────────────────────────────
export async function getReviews(listingId: string) {
  const q = query(
    collection(db, 'listings', listingId, 'reviews'),
    orderBy('createdAt', 'desc')
  );
  return (await getDocs(q)).docs.map(d => ({ id: d.id, ...d.data() }));
}

// ── Utility ──────────────────────────────────────────────────────────────────
export function generateRef(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return 'ABJ-' + Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}