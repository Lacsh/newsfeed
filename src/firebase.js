import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyATOzO5ueCWomLaxkdPt-qtt8HsCQCQwzQ",
  authDomain: "newsfeed-121.firebaseapp.com",
  databaseURL: "https://newsfeed-121-default-rtdb.firebaseio.com",
  projectId: "newsfeed-121",
  storageBucket: "newsfeed-121.firebasestorage.app",
  messagingSenderId: "57370175171",
  appId: "1:57370175171:web:ac06bffe5993edc2886476",
};


const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export { db, ref, get, set, onValue };
