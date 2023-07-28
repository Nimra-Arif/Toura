// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  
  apiKey: "AIzaSyAkmAOW594Exn0ZiK78fdOUzfv3VCn_5xw",
  authDomain: "toura-470c7.firebaseapp.com",
  projectId: "toura-470c7",
  storageBucket: "toura-470c7.appspot.com",
  messagingSenderId: "897632893476",
  appId: "1:897632893476:web:7fbfd864337397c52d36b1",
  measurementId: "G-Z57FC2Z8NG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);