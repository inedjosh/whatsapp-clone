import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfI3VDA5vVVcQsCW8kDycuVATS8GQn7Kg",
  authDomain: "whatsapp-build-528f2.firebaseapp.com",
  projectId: "whatsapp-build-528f2",
  storageBucket: "whatsapp-build-528f2.appspot.com",
  messagingSenderId: "981802116427",
  appId: "1:981802116427:web:8d93e9983e298a5242f4ce",
  measurementId: "G-WDMLLB2EPV",
};

initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

export const registerUser = async (email, password) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred;
};

export const loginUser = async (email, password) => {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred;
};

export const logout = () => {
  signOut(auth).catch((err) => {
    return err;
  });
};

// doc fetches

export const colRef = collection(db, "users");
