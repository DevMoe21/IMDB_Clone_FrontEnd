import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAtlNbxNzem0HNGev8h7iOOpbI41Z0iI9Q",
  authDomain: "imdbwebproject.firebaseapp.com",
  databaseURL: "https://imdbwebproject-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "imdbwebproject",
  storageBucket: "imdbwebproject.appspot.com",
  messagingSenderId: "392494541386",
  appId: "1:392494541386:web:6ce0b5ef2bca860801d4b3",
  measurementId: "G-N5BZLTLE3S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth and providers
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const database = getDatabase(app);
