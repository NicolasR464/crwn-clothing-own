import FormInput from "../form-input/form-input.component";
import { useState, useEffect } from "react";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createDocFromAuth,
  signInWithEmail,
} from "../../utils/firebase/firebase.utils";

import { getRedirectResult } from "firebase/auth";

import { SignUpCont, ButtonsCont } from "./sign-in-form.styles.jsx";

const defaultForm = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultForm);

  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInWithEmail(email, password);

      setFormFields(defaultForm);
    } catch (error) {
      console.log(error);
      // if (error.code === "auth/user-not-found") alert("user not found");
      // if (error.code === "auth/wrong-password") alert("incorrect password");
      switch (error.code) {
        case "auth/user-not-found":
          alert("user not found");
          break;
        case "auth/wrong-password":
          alert("incorrect password");
          break;
        default:
          console.log(error);
      }
    }
  };

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
    await signInWithGooglePopup();
  };

  return (
    <SignUpCont>
      <FormInput
        label="Email"
        inputOptions={{
          type: "email",
          required: true,
          onChange: handleChange,
          name: "email",
          value: email,
        }}
      />
      <FormInput
        label="Password"
        inputOptions={{
          type: "password",
          required: true,
          onChange: handleChange,
          name: "password",
          value: password,
        }}
      />
      <ButtonsCont>
        <Button buttonType="inverted" type="submit" onClick={handleSubmit}>
          log in
        </Button>
        <Button
          type="button"
          buttonType={BUTTON_TYPE_CLASSES.google}
          onClick={logGoogleUser}
        >
          Google Popup
        </Button>
        <Button
          type="button"
          buttonType={BUTTON_TYPE_CLASSES.google}
          onClick={signInWithGoogleRedirect}
        >
          Sign in with Google Redirect
        </Button>
      </ButtonsCont>
    </SignUpCont>
  );
};

export default SignInForm;
