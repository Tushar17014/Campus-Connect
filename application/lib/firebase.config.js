// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBmAVlqDLzCWTZXgYqPTCm_isVNk_vuDlw",
    authDomain: "campus-connect-16f8c.firebaseapp.com",
    projectId: "campus-connect-16f8c",
    storageBucket: "campus-connect-16f8c.firebasestorage.app",
    messagingSenderId: "584412493487",
    appId: "1:584412493487:web:eceeb327dd0e5c10d3865a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);