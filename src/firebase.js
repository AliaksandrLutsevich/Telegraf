import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCzutwag7Fsqnz6uLFH2o4CaN4gS-CqMa4",
  authDomain: "telegraf-1582c.firebaseapp.com",
  projectId: "telegraf-1582c",
  storageBucket: "telegraf-1582c.appspot.com",
  messagingSenderId: "329574356527",
  appId: "1:329574356527:web:3e0ed84cceafa936e2d8da",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
