// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtdGRepeAYkaV1sQFYOsTDm9flmgx4kvI",
  authDomain: "baby-steps-e1321.firebaseapp.com",
  projectId: "baby-steps-e1321",
  storageBucket: "baby-steps-e1321.firebasestorage.app",
  messagingSenderId: "151774276619",
  appId: "1:151774276619:web:506b436f82be484a05ab0e",
  measurementId: "G-NNLNS6DPHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);