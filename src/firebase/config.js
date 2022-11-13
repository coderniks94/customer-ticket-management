// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyATqheM7FMwG-Yro1NGODxn9HhENnnqPt4",
    authDomain: "support-ticket-management.firebaseapp.com",
    projectId: "support-ticket-management",
    storageBucket: "support-ticket-management.appspot.com",
    messagingSenderId: "827910643141",
    appId: "1:827910643141:web:74d64add762852cebd3fac",
    measurementId: "G-WGPNS0SBB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);

export {app, analytics, auth, db};