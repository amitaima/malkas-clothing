import { useState, useContext } from "react";
import {
  createAuthUserWithEmail,
  createUserDocFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmail,
} from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import FormInput from "../form-input/form-input.component";
import "./sign-in.styles.scss";
import Button from "../button/button.component";
import GoogleButton from "react-google-button";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // const { setCurrentUser } = useContext(UserContext);

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    // setCurrentUser(user);
    window.location.href = "/";
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // sign in user
      const { user } = await signInAuthUserWithEmail(email, password);
      // setCurrentUser(user);
      resetFormFields();
      window.location.href = "/";
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password! Please try again");
          break;
        case "auth/user-not-found":
          alert("Email no found! Please try again");
          break;
        default:
          console.log(error.code);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        ></FormInput>

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        ></FormInput>

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <GoogleButton
            className="google-button"
            type="dark"
            onClick={signInWithGoogle}
          />
          {/* <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Sign in with Google
          </Button> */}
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
