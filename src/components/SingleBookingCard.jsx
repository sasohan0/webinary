/* eslint-disable react/prop-types */

import { useState } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const SingleBookingCard = ({ booking }) => {
  const token = localStorage.getItem("token");
  const [more, setMore] = useState(false);
  console.log(booking);

  const {
    _id,
    bookingTitle,
    bookingBrand,
    bookingPrice,
    bookingDescription,
    bookingImage,
    email,
    paid,
  } = booking;

  //   const handleDelete = async () => {
  //     Swal.fire({
  //       title: "Do you want to delete the product?",
  //       showDenyButton: true,
  //       showCancelButton: true,
  //       confirmButtonText: "Yes",
  //       denyButtonText: `No`,
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         fetch(`https://waste-not-backend.onrender.com/products/${_id}`, {
  //           method: "DELETE",
  //           headers: {
  //             "Content-type": "application/json",
  //             authorization: `Bearer ${token}`,
  //           },
  //         })
  //           .then((res) => res.json())
  //           .then(() => {
  //             onDelete(_id);
  //           });
  //         Swal.fire("Deleted successfully", "", "success");
  //       } else if (result.isDenied) {
  //         Swal.fire("Not deleted");
  //       }
  //     });
  //   };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={bookingImage} alt="booking" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{bookingTitle}</h2>
        <h3 className="text-xl font-semibold">{bookingBrand}</h3>
        {bookingPrice === "0" ? (
          <h3 className="text-xl font-semibold">Free</h3>
        ) : (
          <h3 className="text-xl font-semibold">${bookingPrice}</h3>
        )}
        <p>
          {more ? bookingDescription : bookingDescription.slice(0, 100)}
          {
            <button onClick={() => setMore(!more)}>
              <p className="ms-1  text-blue-600">
                {" "}
                {more ? "see less" : "...see more"}
              </p>
            </button>
          }
        </p>
        <div className="card-actions justify-end">
          {!paid && bookingPrice !== "0" ? (
            <button className="btn bg-indigo-500 text-white">
              <Link to={`/booking/payment/${_id}`}>Pay</Link>
            </button>
          ) : (
            <span className="text-success">Paid</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBookingCard;
