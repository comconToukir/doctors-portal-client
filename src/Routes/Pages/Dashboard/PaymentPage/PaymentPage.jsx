import { useLoaderData, useNavigation } from "react-router-dom";
import { Typography } from "@mui/material";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import Loading from "../../../../Components/Loading/Loading";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

const importantText = {
  color: "purple",
  fontWeight: "600",
  fontSize: "1.1rem",
};

const PaymentPage = () => {
  const booking = useLoaderData();
  const navigation = useNavigation();

  const {
    treatmentName,
    treatmentId,
    _id,
    email,
    price,
    appointmentDate,
    timeSlot,
  } = booking;

  const options = {
    theme: "stripe",
  };

  if (navigation.state === 'loading') return <Loading />;

  return (
    <div>
      <Typography component="h1" variant="h4">
        Payment for {treatmentName}
      </Typography>
      <Typography component="p" mt={2}>
        Please pay{" "}
        <Typography component="span" style={importantText}>
          ${price}
        </Typography>{" "}
        for your appointment on{" "}
        <Typography component="span" style={importantText}>
          {" "}
          {appointmentDate}
        </Typography>{" "}
        at{" "}
        <Typography component="span" style={importantText}>
          {timeSlot}
        </Typography>
      </Typography>
      <Elements stripe={stripePromise}>
        <CheckoutForm booking={booking} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
