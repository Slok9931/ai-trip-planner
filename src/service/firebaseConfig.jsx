// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRC8gwGpMJQxfd99t9mhjK5IiokvfcQXU",
  authDomain: "ai-trip-planner-63ddc.firebaseapp.com",
  projectId: "ai-trip-planner-63ddc",
  storageBucket: "ai-trip-planner-63ddc.appspot.com",
  messagingSenderId: "959568166531",
  appId: "1:959568166531:web:7746a66365a8ae936d65b6",
  measurementId: "G-L1VD4DF473"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);