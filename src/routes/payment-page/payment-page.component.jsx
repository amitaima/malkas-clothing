import { useEffect } from "react";
import OrderSummary from "../../components/order-summary/order-summary.component";

import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartCount,
  selectCartTotal,
} from "../../redux-store/cart/cart.selector";
import PaymentForm from "../../components/payment-form/payment-form.component";
import CartItem from "../../components/cart-item/cart-item.component";
import Checkout from "../checkout/checkout.component";
import GooglePayButton from "@google-pay/button-react";

import "./payment-page.style.scss";

const PaymentPage = () => {
  const cartItems = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const cartTotal = useSelector(selectCartTotal);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="payment-container">
      <div className="form-container">
        <h2>Payment</h2>
        <PaymentForm />
        <span className="devider" />
        <GooglePayButton
          className="google-pay-btn"
          environment="TEST"
          paymentRequest={{
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
              {
                type: "CARD",
                parameters: {
                  allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                  allowedCardNetworks: ["MASTERCARD", "VISA"],
                },
                tokenizationSpecification: {
                  type: "PAYMENT_GATEWAY",
                  parameters: {
                    gateway: "example",
                    gatewayMerchantId: "exampleGatewayMerchantId",
                  },
                },
              },
            ],
            merchantInfo: {
              merchantId: "12345678901234567890",
              merchantName: "Demo Merchant",
            },
            transactionInfo: {
              totalPriceStatus: "FINAL",
              totalPriceLabel: "Total",
              totalPrice: `${cartTotal}`,
              currencyCode: "USD",
              countryCode: "US",
            },
          }}
          onLoadPaymentData={(paymentRequest) => {
            console.log("load payment data", paymentRequest);
          }}
        />
      </div>
      <div className="order-summary-container">
        <h2>Order Summary</h2>
        <OrderSummary cartItems={cartItems} cartTotal={cartTotal} />
        {/* <div
          className={`cart-items scrollable opacity-animation ${
            !cartItems.length ? "empty" : "not"
          }`}
        >
          {cartItems.length ? (
            cartItems.map((item) => {
              return <CartItem key={item.id} cartItem={item} />;
            })
          ) : (
            <span className="empty-message">Your cart is empty</span>
          )}
        </div> */}
      </div>
    </section>
  );
};

export default PaymentPage;
