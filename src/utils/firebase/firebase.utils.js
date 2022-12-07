// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  googleAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiM2w4Z6BNHkTgpq07WQZ3XovzaAFaE1Y",
  authDomain: "crwn-clothing-db-9cfd5.firebaseapp.com",
  projectId: "crwn-clothing-db-9cfd5",
  storageBucket: "crwn-clothing-db-9cfd5.appspot.com",
  messagingSenderId: "21918882005",
  appId: "1:21918882005:web:6ec0b843f9af45e57f6a5c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig); // this instance allows us to do all the CRUD ops

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account", //So what this means is that every time somebody interacts with our provider, we want to always force them to select an account
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createDocFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists()); // to check if there is an istance that exists

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (err) {
      console.log("err creating the user: ", err.message);
    }
  }

  return userDocRef;
};