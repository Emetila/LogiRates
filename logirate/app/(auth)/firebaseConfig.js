import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDD2QNOdSKMZXb4skZkziI3PEeC77ay76g",
  authDomain: "logirate-cdcb5.firebaseapp.com",
  projectId: "logirate-cdcb5",
  storageBucket: "logirate-cdcb5.firebasestorage.app",
  messagingSenderId: "500313097785",
  appId: "1:500313097785:web:ad47787cd7a354fc432fe8",
  measurementId: "G-80Z9MYZY0S"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;