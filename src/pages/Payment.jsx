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
    fetch(`https://webinary-server.onrender.com/booking/payment/${id}`, {
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
          <h2 className="">
            Please Pay for <br />
            <p className="card-title italic">{booking?.bookingTitle}</p>
          </h2>
          <p>
            <p className="text-orange-700">
              <p className="ms-1">{booking?.quantity}</p>Tickets
            </p>{" "}
            at {booking?.slot}
          </p>
          <p>
            Please pay: ${booking?.bookingPrice * booking?.quantity}{" "}
            <small className="italic text-xs text-primary">
              {" "}
              ({booking?.quantity} * ${booking?.bookingPrice})
            </small>
          </p>
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
