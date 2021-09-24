import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, } from "firebase/auth";
import {
  getFirestore,
  Timestamp,
  collection,
  doc,
  setDoc,
  query,
  orderBy,
  getDocs,
  addDoc,
  onSnapshot,
  getDoc,
  collectionGroup,
} from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyCzutwag7Fsqnz6uLFH2o4CaN4gS-CqMa4",
  authDomain: "telegraf-1582c.firebaseapp.com",
  projectId: "telegraf-1582c",
  storageBucket: "telegraf-1582c.appspot.com",
  messagingSenderId: "329574356527",
  appId: "1:329574356527:web:3e0ed84cceafa936e2d8da",
});

const auth = getAuth();
const db = getFirestore(firebaseApp);
const provider = new GoogleAuthProvider();

const signIn = (e) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token);
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    });
};
export {
  auth,
  provider,
  signIn,
  db,
  Timestamp,
  collection,
  doc,
  setDoc,
  query,
  orderBy,
  getDocs,
  onSnapshot,
  addDoc,
  collectionGroup,
  getDoc,
 
};
