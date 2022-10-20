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
  incomplete_expiry: "The card's expiry date is incomplete.",
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
  const [errorMsgShipping, setErrorMsgShipping] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    name: currentUser ? currentUser.displayName : "",
    email: currentUser ? currentUser.email : "",
    phone: "",
  });
  const [shippingDetails, setShippingDetails] = useState({
    name: currentUser ? currentUser.displayName : "",
    country: "",
    city: "",
    line1: "",
    postal_code: "",
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
      shipping: {
        address: {
          country: shippingDetails.country,
          city: shippingDetails.city,
          line1: shippingDetails.line1,
          postal_code: shippingDetails.postal_code,
        },
        name: shippingDetails.name,
        phone: billingDetails.phone,
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
      setErrorMsgShipping("");
      // alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        // Should clear cart from here!

        navigate("confirmation", {
          state: {
            shippingDetails,
            billingDetails,
            cartItems,
            cartTotal: amount,
          },
        });
        // alert("payment successful");
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    switch (true) {
      case shippingDetails.name:
        setErrorMsgShipping("Name is missing");
        setErrorMsg("");
        break;
      case !shippingDetails.country:
        setErrorMsgShipping("Country is missing");
        setErrorMsg("");
        break;
      case !shippingDetails.city:
        setErrorMsgShipping("City is missing");
        setErrorMsg("");
        break;
      case !shippingDetails.line1:
        setErrorMsgShipping("Address is missing");
        setErrorMsg("");
        break;
      case !shippingDetails.postal_code:
        setErrorMsgShipping("Postalcode is missing");
        setErrorMsg("");
        break;
      case !billingDetails.name:
        setErrorMsg("Name is missing");
        setErrorMsgShipping("");
        break;
      case !billingDetails.email:
        setErrorMsg("Email is missing");
        setErrorMsgShipping("");
        break;
      case !billingDetails.phone:
        setErrorMsg("Phone is missing");
        setErrorMsgShipping("");
        break;
      default:
        PaymentHandler(e);
    }
  };

  return (
    <section className="section-payment">
      <div className="forms-container">
        <form className="payment-form-container">
          {errorMsgShipping ? (
            <span className="error-msg">&#9888; {errorMsgShipping} </span>
          ) : (
            ""
          )}
          <h3>Shipping Information</h3>
          <div className="form-inputs">
            <FormInput
              label="Name"
              type="text"
              required
              name="name"
              value={shippingDetails.name}
              onChange={(e) => {
                setShippingDetails({
                  ...shippingDetails,
                  name: e.target.value,
                });
                setBillingDetails({ ...billingDetails, name: e.target.value });
              }}
              autoComplete="name"
            ></FormInput>

            <FormInput
              label="Country"
              type="text"
              required
              name="country"
              value={shippingDetails.country}
              onChange={(e) => {
                setShippingDetails({
                  ...shippingDetails,
                  country: e.target.value,
                });
              }}
              autoComplete="country-name"
            ></FormInput>
            <FormInput
              label="City"
              type="text"
              required
              name="city"
              value={shippingDetails.city}
              onChange={(e) => {
                setShippingDetails({
                  ...shippingDetails,
                  city: e.target.value,
                });
              }}
              autoComplete="address-level2"
            ></FormInput>
            <FormInput
              label="Adress Line 1"
              type="text"
              required
              name="line 1"
              value={shippingDetails.line1}
              onChange={(e) => {
                setShippingDetails({
                  ...shippingDetails,
                  line1: e.target.value,
                });
              }}
              autoComplete="address-line1"
            ></FormInput>
            <FormInput
              label="Postal Code"
              type="text"
              required
              name="postal code"
              value={shippingDetails.postal_code}
              onChange={(e) => {
                setShippingDetails({
                  ...shippingDetails,
                  postal_code: e.target.value,
                });
              }}
              autoComplete="postal-code"
            ></FormInput>
          </div>
        </form>
        <form className="payment-form-container" onSubmit={submitHandler}>
          {errorMsg ? (
            <span className="error-msg">&#9888; {errorMsg} </span>
          ) : (
            ""
          )}
          <h3>Credit Card Payment</h3>
          <div className="form-inputs">
            {/* <FormInput
              label="Name"
              type="text"
              required
              name="name"
              value={billingDetails.name}
              onChange={(e) => {
                setBillingDetails({ ...billingDetails, name: e.target.value });
              }}
              autoComplete="name"
            ></FormInput> */}

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
        </form>
      </div>
      <Button
        isLoading={isProcessingPayment}
        onClick={submitHandler}
        // buttonType={BUTTON_TYPE_CLASSES.inverted}
      >
        Pay Now
      </Button>
    </section>
  );
};
export default PaymentForm;
