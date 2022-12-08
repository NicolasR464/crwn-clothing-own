import { useEffect } from "react";

import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createDocFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  useEffect(() => {
    //useEffect when we have a Google Redirect and to get back user info
    async function response() {
      const response = await getRedirectResult(auth); // auth is the memory bank telling us about user info
      console.log(response);

      if (response) {
        await createDocFromAuth(response.user);
      }
    }
    response();
  }, []);
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createDocFromAuth(user);
  };

  return (
    <div>
      <h1>Sign in page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
