//this is the combined place where all the Redux happens - where our state lives - where we receives actions and dispatch

import { compose, legacy_createStore, applyMiddleware } from "redux";

import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

//the middlewares enhances our store, they catch actions before they hit our reducers and they log the state (w/ logger middleware)
const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = legacy_createStore(
  rootReducer,
  undefined,
  composedEnhancers
);
