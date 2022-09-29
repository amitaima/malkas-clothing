import { createContext, useState } from "react";

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
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
