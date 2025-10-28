// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, onValue } from "firebase/database";

// 🔥 Replace with your actual Firebase project credentials
const firebaseConfig = {
    apiKey: "AIzaSyATOzO5ueCWomLaxkdPt-qtt8HsCQCQwzQ",
  authDomain: "newsfeed-121.firebaseapp.com",
  databaseURL: "https://newsfeed-121-default-rtdb.firebaseio.com",
  projectId: "newsfeed-121",
  storageBucket: "newsfeed-121.firebasestorage.app",
  messagingSenderId: "57370175171",
  appId: "1:57370175171:web:ac06bffe5993edc2886476",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const db = getDatabase(app);

// ✅ Correctly export everything
export { db, ref, get, set, onValue };
