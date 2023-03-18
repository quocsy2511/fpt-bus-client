import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDaprCM6ABU2cooC6zhWQjMYMnyxZkIAAo",
    authDomain: "f-bus-system.firebaseapp.com",
    databaseURL: "https://f-bus-system-default-rtdb.firebaseio.com",
    projectId: "f-bus-system",
    storageBucket: "f-bus-system.appspot.com",
    messagingSenderId: "645891378843",
    appId: "1:645891378843:web:2a8593d2a5fbfa7f06c03e",
    measurementId: "G-QM57NCT95V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app)