


import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBCI6WI7U3Ba9CKiwJREqXY2qgh6ToPGN4",
  authDomain: "uj-task-hub-294b2.firebaseapp.com",
  projectId: "uj-task-hub-294b2",
  storageBucket: "uj-task-hub-294b2.firebasestorage.app",
  messagingSenderId: "792806944990",
  appId: "1:792806944990:web:e55485f02a2a91a168924f"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});