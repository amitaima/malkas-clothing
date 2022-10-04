import { initializeApp } from "firebase/app";
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
  deleteDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZ2ZaJyDo4qyVp4l11H4dM_4MQgVx56fI",
  authDomain: "malkas-clothing-db.firebaseapp.com",
  projectId: "malkas-clothing-db",
  storageBucket: "malkas-clothing-db.appspot.com",
  messagingSenderId: "859765083071",
  appId: "1:859765083071:web:f9b3d9cc4bfa3e0f3c2f0a",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docref = doc(collectionRef, object.email.toLowerCase());
    batch.set(docref, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesandDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const addNewsletterEmail = async (objectToAdd) => {
  const newsletterRef = collection(db, "newsletter-emails");
  const newsletterDocRef = doc(db, "newsletter-emails", objectToAdd.email);
  const batch = writeBatch(db);

  const emailSnapshot = await getDoc(newsletterDocRef);

  // If email does not exist
  // Create new email
  if (!emailSnapshot.exists()) {
    try {
      const docref = doc(newsletterRef, objectToAdd.email.toLowerCase());
      batch.set(docref, objectToAdd);
      await batch.commit();
      // console.log("Added email to newsletter list");
    } catch (error) {
      console.log("error signing up to newsletter", error);
    }
  } else {
    throw "Already signed up to newsletter";
    return "Already signed up to newsletter";
  }
  return "Added email to newsletter list";
};
export const removeNewsletterEmail = async (objectToRemove) => {
  const newsletterRef = collection(db, "newsletter-emails");
  const newsletterDocRef = doc(db, "newsletter-emails", objectToRemove.email);
  const batch = writeBatch(db);

  const emailSnapshot = await getDoc(newsletterDocRef);

  // If email does not exist
  // Create new email
  if (emailSnapshot.exists()) {
    try {
      await deleteDoc(newsletterDocRef);
      // const docref = doc(newsletterRef, objectToRemove.email.toLowerCase());
      // batch.set(docref, objectToRemove);
      // await batch.commit();
      // console.log("Removed email");
    } catch (error) {
      console.log("error while removing email", error);
    }
  } else {
    throw "Email is not subscribed";
    return "Email is not subscribed";
  }
  return "Email has been removed";
};

export const createUserDocFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  // console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot.exists());

  // If user data does not exist
  // Create / set the document with the data from userAuth in my collection
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
    } catch (error) {
      console.log("error creating user", error);
    }

    return userDocRef;
  }
};

export const createAuthUserWithEmail = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmail = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callBack) =>
  onAuthStateChanged(auth, callBack);
