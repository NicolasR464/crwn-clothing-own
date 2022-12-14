import { createContext, useState, useEffect } from "react";

import {
  onAuthStateChangedListener,
  signOutUser,
  createDocFromAuth,
} from "../utils/firebase/firebase.utils";

//as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// This returns an alias component that wraps around the app with our context
//It receives the 'value' that holds the actual contextual values
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  //signOutUser();

  useEffect(() => {
    //The function only runs once the components mount
    //onAuthStateChangedListener receives some callback function on second parameter
    //It returns back a function to stop listening
    //Whenever this component unmounts we don't need to listen anymore (otherwise it would cause a memory leak)

    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) createDocFromAuth(user);
      console.log({ user });
      setCurrentUser(user);
    });
    return unsubscribe; //whenever you unmount
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
