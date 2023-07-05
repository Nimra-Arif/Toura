// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJEX5jyb12RNVmsPlXGdH-ywswS7I0iT0",
  authDomain: "toura-1a6fb.firebaseapp.com",
  projectId: "toura-1a6fb",
  storageBucket: "toura-1a6fb.appspot.com",
  messagingSenderId: "943306999863",
  appId: "1:943306999863:web:54b76dd923a2fa912f97b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);