// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps  } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2EsWYfmdVn25Usy0BKMLNhw6jiTc-_5g",
  authDomain: "twitter-390d2.firebaseapp.com",
  projectId: "twitter-390d2",
  storageBucket: "twitter-390d2.appspot.com",
  messagingSenderId: "653358443725",
  appId: "1:653358443725:web:a02f10e65db721e5614d84"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };