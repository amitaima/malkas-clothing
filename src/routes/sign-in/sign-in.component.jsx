import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up.component";
import Button from "../../components/button/button.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = createUserDocFromAuth(user);
  };

  return (
    <section className="sign-in-section">
      <h1>Sign In Page</h1>
      <Button buttonType="google" onClick={logGoogleUser}>
        Sign in with Google
      </Button>
      <SignUpForm></SignUpForm>
    </section>
  );
};

export default SignIn;
