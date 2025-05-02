import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database"; // Add this import
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtqUB3rxDRCATWeKa4JaFa--_kol7SIr0",
  authDomain: "go-36d25.firebaseapp.com",
  projectId: "go-36d25",
  storageBucket: "go-36d25.firebasestorage.app",
  messagingSenderId: "1068801430715",
  appId: "1:1068801430715:web:d9b0a00c0309747eaa059e",
  measurementId: "G-RVE44342JF",
  databaseURL: "https://go-36d25-default-rtdb.firebaseio.com/", // Add your Realtime Database URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Realtime Database
const realtimeDb = getDatabase(app);

// Export the services
export { db, storage, auth, realtimeDb };