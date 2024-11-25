// utils/dbfirebase.tsx
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsm3PIRygiZiPAKW4UaQ5Me9blJgLRDQA",
  authDomain: "db-inlaze.firebaseapp.com",
  projectId: "db-inlaze",
  storageBucket: "db-inlaze.firebasestorage.app",
  messagingSenderId: "912546429536",
  appId: "1:912546429536:web:393b35cf36a26eff1fe105",
};

/* const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_FIREBASE_APP_BUCKET,
  messagingSenderId: process.env.NEXT_FIREBASE_APP_SENDER,
  appId: process.env.NEXT_FIREBASE_APP_ID,
}; */

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
