import { resolveTo } from "@remix-run/router";
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
  console.log("addCollectionAndDocuments");
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
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};

export const addNewsletterEmail = async (objectToAdd) => {
  console.log("addNewsletterEmail");
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
      console.log("error: ", error);
      throw { code: "2", message: "Error signing up to newsletter" };
    }
  } else {
    throw { code: "1", message: "Already signed up to newsletter" };
    // return "Already signed up to newsletter";
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
      console.log("error: ", error);
      throw { code: "4", message: "Error while removing email" };
    }
  } else {
    throw { code: "3", message: "Email is not subscribed" };
    // return "Email is not subscribed";
  }
  return "Email has been removed";
};

export const updateCartDB = async (currentUser, currentCart) => {
  console.log("updateCartDB", currentUser);
  if (!currentUser) {
    console.log("error: user not loaded yet");
    throw { code: "654", message: "no user signed in" };
  }
  const usersRef = collection(db, "users");
  const userDocRef = doc(db, "users", currentUser.id);
  const batch = writeBatch(db);

  const user = await getDoc(userDocRef);

  if (!user.exists()) {
    console.log("error: no user signed in");
    throw { code: "654", message: "no user signed in" };
  }
  // batch.set(userDocRef, { ...currentUser, cart: currentCart });
  batch.update(userDocRef, {
    cart: currentCart,
  });
  await batch.commit();
  return "Updated Cart";
};

export const getCartDB = async (currentUser) => {
  const userDocRef = doc(db, "users", currentUser.id, "cart");
  const q = query(userDocRef);

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
  console.log(data);
};

export const addOrderDB = async (currentUser, newOrder) => {
  // console.log(newOrder);
  console.log("addOrderDB", currentUser);
  if (!currentUser) {
    console.log("error: user not loaded yet");
    throw { code: "654", message: "no user signed in" };
  }
  const userDocRef = doc(db, "users", currentUser.id);
  const batch = writeBatch(db);
  const user = await getDoc(userDocRef);
  if (!user.exists()) {
    console.log("error: no user signed in");
    throw { code: "654", message: "no user signed in" };
  }
  // console.log("test");
  // const userOrdersRef = doc(db, "users", currentUser.id, "orders");
  // console.log(userOrdersRef);
  // const orders = await getDoc(userOrdersRef);
  // console.log(orders);
  // const userNewOrderRef = doc(
  //   db,
  //   "users",
  //   currentUser.id,
  //   "orders",
  //   "order 1"
  //   // orders.length + 1
  // );
  // const allOrders = user._document.data.value.mapValue.fields.orders;
  const myOrders = user.data().orders;
  // console.log(user._document.data.value.mapValue.fields.orders);
  // const update = {};
  // update[`orders.${allOrders.length + 1}`] = newOrder;
  // console.log(allOrders.mapValue.fields);
  console.log(myOrders);
  // console.log(Object.keys(allOrders).length + 1);

  batch.update(userDocRef, {
    // ...user,
    // orders: { order3: newOrder },
    // update,
    // `orders.${orders.length + 1}`: newOrder,
    // "orders.order2": newOrder,
    // [orders[allOrders.length + 1]]: newOrder,
    [`orders.order${Object.keys(myOrders).length + 1}`]: newOrder,
  });
  // batch.set(userDocRef, {
  //   ...currentUser,
  //   orders: { order1: newOrder, order2: newOrder,order3: newOrder },
  // });
  await batch.commit();
  return "Added Order";
};

export const getOrdersDB = async (currentUser) => {
  const userOrdersRef = doc(db, "users", currentUser.id);
  const q = query(userOrdersRef);

  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
  console.log(data);
  return data;
};

export const createUserDocFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  console.log("createUserDocFromAuth");
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
      console.log("createUserDocFromAuth 2");
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        cart: [],
        orders: {},
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating user", error);
    }
  }

  const updatedUserSnapshot = await getDoc(userDocRef);

  return updatedUserSnapshot;
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

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
