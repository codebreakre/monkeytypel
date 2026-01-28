// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmLtCReIuEC9wZ-qBGfeH_Lo7vdPsf0HY",
  authDomain: "monkeytypel.firebaseapp.com",
  projectId: "monkeytypel",
  storageBucket: "monkeytypel.firebasestorage.app",
  messagingSenderId: "336328680693",
  appId: "1:336328680693:web:f083b9556dc00a6155d1bc",
  measurementId: "G-5S3MB8H6V3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);