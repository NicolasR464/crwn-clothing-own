// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

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
initializeApp(firebaseConfig); // this instance allows us to do all the CRUD ops

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account", //So what this means is that every time somebody interacts with our provider, we want to always force them to select an account
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);
export const signInWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("batch commited 🚀");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  if (!q) await Promise.reject(new Error("new Firebase error oops"));
  const querySnapshot = await getDocs(q);
  console.log({ querySnapshot });
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const createDocFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  // console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  // console.log(userSnapshot.exists()); // to check if there is an istance that exists

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log("err creating the user: ", err.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback); //It returns you back whatever you get back from onAuthStateChanged
//
//It will call the callback whenever the authentication state of our auth singleton changes - like when a user signs in
