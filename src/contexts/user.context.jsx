import { createContext, useState, useEffect, useReducer } from "react";

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

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  // console.log("dispatched 🚀");
  // console.log({ action });
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);

  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);

  // console.log({ currentUser });

  const setCurrentUser = (user) => {
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    //The function only runs once the components mount
    //onAuthStateChangedListener receives some callback function on second parameter
    //It returns back a function to stop listening
    //Whenever this component unmounts we don't need to listen anymore (otherwise it would cause a memory leak)

    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) createDocFromAuth(user);
      // console.log({ user });
      setCurrentUser(user);
    });
    return unsubscribe; //whenever you unmount
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
