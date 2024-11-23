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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
