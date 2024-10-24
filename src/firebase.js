// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGImmEIYTWQSOg5LMsdl1OzZN1fVuoRiU",
  authDomain: "christmas-card-creator.firebaseapp.com",
  projectId: "christmas-card-creator",
  storageBucket: "christmas-card-creator.appspot.com",
  messagingSenderId: "828214351511",
  appId: "1:828214351511:web:384c206e04771eca0a3bd2",
  measurementId: "G-3L2T9R4HK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export { app, analytics };
