// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8qcghB0eKompxFWuBmZzH5s3d5IyF9ZU",
  authDomain: "tourguide-93718.firebaseapp.com",
  projectId: "tourguide-93718",
  storageBucket: "tourguide-93718.appspot.com",
  messagingSenderId: "946493797982",
  appId: "1:946493797982:web:b5e142cc765a194f6766cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);