import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectCartTotal } from "../../redux-store/cart/cart.selector";
import { selectCurrentUser } from "../../redux-store/user/user.selector";
import { setCart } from "../../redux-store/cart/cart.action";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import "./payment-form.styles.scss";
import FormInput from "../form-input/form-input.component";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
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

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: billingDetails,
      },
    });

    setIsProcessingPayment(false);

    /* Change here the alert to normal error message and success message */

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        // Should clear cart from here!
        dispatch(setCart([], currentUser));
        alert("payment successful");
      }
    }
  };

  return (
    <section className="section-payment">
      <form className="payment-form-container" onSubmit={PaymentHandler}>
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
