import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import { Button, Spinner } from "react-bootstrap";
import Footer from "./Footer";
import ChatSupport from "./ChatSupport";

const stripePromise = loadStripe(
  "pk_test_51PCP2dP5JEi1ikwJJM70jIB1ri1iqhAHUo9MfjoOpiuPn3orSCnvPCiLrdcIhk0DnL3KmGOubQK9F3usXSjRwqLG00F82Roi61"
);

const PaymentForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
      setLoading(false);
    } else {
      setTimeout(() => {
        navigate("/cart", { state: { paymentSuccess: true } });
        setLoading(false);
      }, 1000);
    }
  };
  return (
    <>
      <Header />
      <ChatSupport />
      <div className="payment-form-container">
        <form onSubmit={handleSubmit} className="payment-form">
          <h2>Dettagli di Pagamento</h2>

          <input
            type="text"
            placeholder="Titolare della carta"
            className="input-field"
            onInput={(event) => {
              event.target.value = event.target.value.replace(/[0-9]/g, "");
            }}
            required
          />

          <input
            type="text"
            placeholder="Paese"
            className="input-field"
            onInput={(event) => {
              event.target.value = event.target.value.replace(/[0-9]/g, "");
            }}
            required
          />

          <input
            type="text"
            placeholder="CAP"
            className="input-field"
            pattern="\d{5}"
            onInput={(event) => {
              event.target.value = event.target.value
                .replace(/[^\d]/g, "")
                .slice(0, 5);
            }}
            required
          />

          <CardElement className="card-element" />
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={loading || !stripe}
            className="pay-button"
          >
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              `Paga €${total.toFixed(2)}`
            )}
          </Button>
        </form>
      </div>
      <Footer />
    </>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const total = location.state?.total;

  return (
    <Elements stripe={stripePromise}>
      {total !== undefined ? (
        <PaymentForm total={total} />
      ) : (
        <div>Errore: Totale non definito.</div>
      )}
    </Elements>
  );
};

export { PaymentPage };
