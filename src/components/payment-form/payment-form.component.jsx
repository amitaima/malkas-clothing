import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectCartTotal,
  selectCartItems,
} from "../../redux-store/cart/cart.selector";
import { selectCurrentUser } from "../../redux-store/user/user.selector";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import "./payment-form.styles.scss";
import FormInput from "../form-input/form-input.component";

const errorCodes = {
  incomplete_number: "The card number is incomplete.",
  incomplete_cvc: "The card's security code is incomplete.",
  incomplete_zip: "The card's zip code is incomplete.",
  incorrect_number: "The card number is incorrect.",
  invalid_number: "The card number is not a valid credit card number.",
  invalid_expiry_month: "The card's expiration month is invalid.",
  invalid_expiry_year: "The card's expiration year is invalid.",
  invalid_expiry_year_past: "The card's expiration year is invalid.",
  invalid_cvc: "The card's security code is invalid.",
  expired_card: "The card has expired.",
  incorrect_cvc: "The card's security code is incorrect.",
  incorrect_zip: "The card's zip code failed validation.",
  card_declined: "The card was declined.",
  missing: "There is no card on a customer that is being charged.",
  processing_error: "An error occurred while processing the card.",
  rate_limit:
    "An error occurred due to requests hitting the API too quickly. Please let us know if you're consistently running into this error.",
};

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const [errorMsg, setErrorMsg] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    name: currentUser ? currentUser.displayName : "",
    email: currentUser ? currentUser.email : "",
    phone: "",
  });

  const dispatch = useDispatch();

  const PaymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessingPayment(true);
    setErrorMsg("");
    /* RUN NETLIFY DEV AND NOT NPM START FOR STRIPE TO WORK */
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => {
      return res.json();
    });

    const {
      paymentIntent: { client_secret },
    } = response;
    // console.log(response.paymentIntent.client_secret);

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: billingDetails,
      },
    });
    console.log(paymentResult);

    setIsProcessingPayment(false);

    /* Change here the alert to normal error message and success message */

    if (paymentResult.error) {
      console.log(paymentResult.error);
      console.log(errorCodes[paymentResult.error.code]);
      setErrorMsg(
        errorCodes[paymentResult.error.code]
          ? errorCodes[paymentResult.error.code]
          : ""
      );
      // alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        // Should clear cart from here!

        navigate("confirmation", {
          state: { billingDetails, cartItems, cartTotal: amount },
        });
        // alert("payment successful");
      }
    }
  };

  return (
    <section className="section-payment">
      <form className="payment-form-container" onSubmit={PaymentHandler}>
        {errorMsg ? <span className="error-msg">&#9888; {errorMsg} </span> : ""}
        <h3>Credit Card Payment</h3>
        <div className="form-inputs">
          <FormInput
            label="Name"
            type="text"
            required
            name="name"
            value={billingDetails.name}
            onChange={(e) => {
              setBillingDetails({ ...billingDetails, name: e.target.value });
            }}
            autoComplete="name"
          ></FormInput>

          <FormInput
            label="Email"
            type="email"
            required
            name="email"
            value={billingDetails.email}
            onChange={(e) => {
              setBillingDetails({ ...billingDetails, email: e.target.value });
            }}
            autoComplete="email"
          ></FormInput>

          <FormInput
            label="Phone Number"
            type="tel"
            required
            name="phoneNumber"
            value={billingDetails.phone}
            onChange={(e) => {
              setBillingDetails({ ...billingDetails, phone: e.target.value });
            }}
            autoComplete="tel"
          ></FormInput>
        </div>

        <CardElement className="card-element" />
        <Button
          isLoading={isProcessingPayment}
          // buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          Pay Now
        </Button>
      </form>
    </section>
  );
};
export default PaymentForm;
