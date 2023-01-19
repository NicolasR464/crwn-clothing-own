//this is the combined place where all the Redux happens - where our state lives - where we receives actions and dispatch

import { compose, legacy_createStore, applyMiddleware } from "redux";

import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root", //I want you to persist the whole thing
  storage, // shorthand: we cast the variable as the key name
  blacklist: ["user"], // things we don't want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//the middlewares enhances our store, they catch actions before they hit our reducers and they log the state (w/ logger middleware)
const middleWares = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean
); // it filters out anything that is not true -- to hide the logger in production

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = legacy_createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);
//we created a persisted reducer that we want to use for our store

export const persistor = persistStore(store);
