// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgSFGxQkSpZ1q_4FwYmFt3_NAtlgBTPAQ",
  authDomain: "qleverquencher.firebaseapp.com",
  databaseURL: "https://qleverquencher-default-rtdb.firebaseio.com",
  projectId: "qleverquencher",
  storageBucket: "qleverquencher.appspot.com",
  messagingSenderId: "1091355581688",
  appId: "1:1091355581688:web:64a2fe5cdc38e7c5edaf0d",
  measurementId: "G-QW3514J2RM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);