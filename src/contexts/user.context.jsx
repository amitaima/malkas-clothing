import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  signOutUser,
  createUserDocFromAuth,
} from "../utils/firebase/firebase.utils";

/* 
  The User Context is meant to store the logged in users information.
  Wrapping the app with it lets the information be accesible anywhere in the app
*/

// Actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) createUserDocFromAuth(user);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
