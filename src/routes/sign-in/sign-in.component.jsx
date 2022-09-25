import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = createUserDocFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
      <SignUpForm></SignUpForm>
    </div>
  );
};

export default SignIn;
