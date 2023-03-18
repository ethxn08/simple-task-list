// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: REACT_APP_.API_KEY,
  authDomain: REACT_APP_.AUTH_DOMAIN,
  projectId: REACT_APP_.PROJECT_ID,
  storageBucket: REACT_APP_.STORAGE_BUCKET,
  messagingSenderId: REACT_APP_.MESSAGING_SENDER_ID,
  appId: REACT_APP_.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
