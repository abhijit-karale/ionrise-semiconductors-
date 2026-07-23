import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Mock configuration. Replace with actual Firebase config from console.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase only if we have a real config, otherwise return nulls to prevent app crash
let app;
let db;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase config is incomplete or missing. Using mock backend for now.");
}

export { db };
