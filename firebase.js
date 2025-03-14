// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyCtqUB3rxDRCATWeKa4JaFa--_kol7SIr0",
  authDomain: "go-36d25.firebaseapp.com",
  projectId: "go-36d25",
  storageBucket: "go-36d25.firebasestorage.app",
  messagingSenderId: "1068801430715",
  appId: "1:1068801430715:web:d9b0a00c0309747eaa059e",
  measurementId: "G-RVE44342JF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export const storage = getStorage(app);
export const auth = getAuth(app);
