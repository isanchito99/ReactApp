// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4K_2HF1_WkG-3SlQQh04HZS9AXujhpfM",
  authDomain: "react-web-ea4a7.firebaseapp.com",
  projectId: "react-web-ea4a7",
  storageBucket: "react-web-ea4a7.appspot.com",
  messagingSenderId: "426280500422",
  appId: "1:426280500422:web:ce0b3faad2030eb17aebc7",
  measurementId: "G-EEJZV38N95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
