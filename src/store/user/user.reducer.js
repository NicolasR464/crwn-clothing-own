import { USER_ACTION_TYPES } from "./user.types";

const USER_INITIAL_STATE = {
  currentUser: null,
};

// const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
// since we don't have the useReducer hook anymore we don't to give to the state an Initial Value:

//Below, if nothing gets passed then use the initial state the only time the state is not getting passed is when is runs for the first time - When the reducer first initiate there is no state value.

export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
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
      return state;
  }
};
