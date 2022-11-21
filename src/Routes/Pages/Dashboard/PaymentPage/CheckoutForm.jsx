import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ booking }) => {
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  // console.log(booking);

  const { price, email, patient, _id } = booking;

  useEffect(() => {
    // create payment intent when component loads
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => console.error(error));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      setProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    setProcessing(false);
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setSuccess("");

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: patient,
            email: email,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // console.log('card Info', card )
      const payment = {
        transactionId: paymentIntent.id,
        transactionTime: new Date(),
        bookingId: _id,
        email,
        price,
      }

      // store payment info in the database
      fetch('http://localhost:5000/payments', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify(payment)
      })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          setSuccess("Congrats! your payment completed");
          setTransactionId(paymentIntent.id);
        }
      })
    }

    setProcessing(false);
    console.log("paymentIntent", paymentIntent);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          maxWidth: "400px",
          marginY: "48px",
          padding: "20px",
        }}
        onSubmit={handleSubmit}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <Button
          variant="outlined"
          color="primary"
          sx={{ marginTop: 3 }}
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </Button>
      </Box>
      <Typography sx={{ color: "red" }}>{cardError}</Typography>
      {success && (
        <div>
          <Typography sx={{ color: "green" }}>{success}</Typography>
          <Typography sx={{}}>Your transaction id: {transactionId}</Typography>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
