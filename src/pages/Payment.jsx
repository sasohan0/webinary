import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import CheckoutForm from "../components/CheckoutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51L2VoOB8aLgAG5B05GlyAHhMSChwwquIJuxdO2hRMwK7TAH1gjMeeTFuF4wSOtFmAJEUYJmTGODvxLfWH8cqRauh00Mxhy0MGV"
);
const Payment = () => {
  const [booking, setBooking] = useState();
  console.log("booking from payment ", booking);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/booking/payment/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBooking(data));
  }, []);

  return (
    <div>
      <div className="card w-50 max-w-md bg-base-100 shadow-xl my-12">
        <div className="card-body">
          <h2 className="card-title">Please Pay for {booking?.bookingTitle}</h2>
          <p>
            <span className="text-orange-700">
              {booking?.quantity}Tickets for the event
            </span>{" "}
            at {booking?.slot}
          </p>
          <p>Please pay: ${booking?.bookingPrice * booking?.quantity}</p>
        </div>
      </div>

      {booking && (
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
