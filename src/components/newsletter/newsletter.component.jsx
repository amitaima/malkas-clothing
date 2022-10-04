import { useState, useContext, useEffect, Fragment } from "react";
import {
  createAuthUserWithEmail,
  createUserDocFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmail,
  addCollectionAndDocuments,
  addNewsletterEmail,
  removeNewsletterEmail,
} from "../../utils/firebase/firebase.utils";
import { UserContext } from "../../contexts/user.context";
import FormInput from "../form-input/form-input.component";
import "./newsletter.styles.scss";
import Button from "../button/button.component";
import GoogleButton from "react-google-button";

const defaultFormFields = {
  email: "",
  fullName: "",
};

/* 
hidden:
  0 - Regular subscribe
  1 - Unsubscribe
  2 - Success page

unsubscribe:
  false - subscribe
  true - unsubscribe
*/

const NewsLetter = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [hidden, setHidden] = useState("0");
  const [unsubscribe, setunsubscribe] = useState(false);
  const { email, fullName } = formFields;

  // useEffect(() => {
  //   addCollectionAndDocuments("newsletter-emails", [
  //     {
  //       name: "Amitai Malka",
  //       email: "amitai.malka@gmail.com",
  //     },
  //   ]);
  // }, []);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await addNewsletterEmail(formFields);
      console.log(response);
      // sign in user
      // const { user } = await signInAuthUserWithEmail(email, fullName);
      // setCurrentUser(user);
      resetFormFields();
      setunsubscribe(true);
      setHidden("1");
      // window.location.href = "/";
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
  const handleUnsubscribe = async (event) => {
    event.preventDefault();

    try {
      const response = await removeNewsletterEmail(formFields);
      console.log(response);
      // sign in user
      // const { user } = await signInAuthUserWithEmail(email, fullName);
      // setCurrentUser(user);
      resetFormFields();
      setunsubscribe(false);
      setHidden("1");
      // window.location.href = "/";
    } catch (error) {
      console.log(error);
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
    <section className="section-newsletter">
      <div className={`success-msg ${hidden !== "1" ? "hidden" : ""}`}>
        {!unsubscribe ? (
          <Fragment>
            <h2>
              You have <br /> unsubscribed successfully
            </h2>
            {/* <span>Thank you for joining our comunity!</span> */}
          </Fragment>
        ) : (
          <Fragment>
            <h2>Congragulations!</h2>
            <span>Thank you for joining our comunity!</span>
          </Fragment>
        )}
      </div>
      <div className={`newsletter-container ${hidden !== "0" ? "hidden" : ""}`}>
        <h2>Never miss on any deal!</h2>
        <span>Subscripe to our newsletter</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Full Name"
            type="text"
            required
            onChange={handleChange}
            name="fullName"
            value={fullName}
          ></FormInput>

          <FormInput
            label="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          ></FormInput>

          <div className="buttons-container">
            <Button className="newsletter-btn" type="submit">
              Sign Up
            </Button>
            {/* <GoogleButton
            className="google-button"
            type="dark"
            onClick={signInWithGoogle}
          /> */}
            {/* <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Sign in with Google
          </Button> */}
          </div>
        </form>
        <span onClick={() => setHidden("2")} className="unsubscribe">
          I want to unsubscribe
        </span>
      </div>
      <div className={`newsletter-container ${hidden !== "2" ? "hidden" : ""}`}>
        <h2>WANT TO UNSUBSCRIBE?</h2>
        <span>We'll make it simple</span>
        <form onSubmit={handleUnsubscribe}>
          <FormInput
            label="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          ></FormInput>

          <div className="buttons-container">
            <Button className="newsletter-btn" type="submit">
              unsubscribe
            </Button>
          </div>
        </form>
        <span onClick={() => setHidden("0")} className="unsubscribe">
          I want to subscribe
        </span>
      </div>
    </section>
  );
};

export default NewsLetter;
