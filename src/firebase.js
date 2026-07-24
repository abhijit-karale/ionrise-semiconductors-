import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBPzpRkFXAcLwUV52-DXUDZxy813d-IR8",
  authDomain: "ionrise-semiconductors.firebaseapp.com",
  projectId: "ionrise-semiconductors",
  storageBucket: "ionrise-semiconductors.firebasestorage.app",
  messagingSenderId: "788046134966",
  appId: "1:788046134966:web:9ef8286ff3cfb6961f3017",
  measurementId: "G-2CPYB9QX2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
