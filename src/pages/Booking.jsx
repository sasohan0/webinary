import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const Booking = () => {
  const booking = useLoaderData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { _id, title, brand, price, description, image_url, slots, available } =
    booking;

  const token = localStorage.getItem("token");

  const handleSUbmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = user?.email;
    const slot = form.slot.value;
    const quantity = form.quantity.value;
    const bookingInfo = {
      email,
      slot,
      quantity,
      bookingId: _id,
      bookingTitle: title,
      bookingBrand: brand,
      bookingPrice: price,
      bookingDescription: description,
      bookingImage: image_url,
      bookingEmail: user?.email,
    };

    Swal.fire({
      title: "Do you want book the event?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        fetch("https://webinary-server.onrender.com/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bookingInfo),
        })
          .then((res) => res.json())
          .then((d) => {
            fetch(`https://webinary-server.onrender.com/events/${_id}`, {
              method: "PATCH",
              headers: {
                "Content-type": "application/json",
                authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(data),
            })
              .then((res) => res.json())
              .then((a) => {
                if (d && a) {
                  Swal.fire("booked! Now Complete the Payment", "", "success");
                  navigate("/bookings");
                } else {
                  Swal.fire("Not Booked", "", "info");
                }
              });
          });
      } else if (result.isDenied) {
        Swal.fire("Not Booked", "", "info");
      }
    });

    const data = {
      available: available - quantity,
    };

    //  I previously implemented JWT authenctication while Login. But if the token is once deleted the user cannot log in anymore so I commented it
    // fetch(`https://waste-not-backend.onrender.com/user/${email}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-type": "application/json",
    //     authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => email === data.email && signIn(email, password));
  };

  return (
    <div className="md:p-10">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content p-0 md:1rem flex-col lg:flex-row">
          <div className="w-auto md:mx-auto">
            <form
              onSubmit={handleSUbmit}
              className="hero min-h-screen bg-base-200"
            >
              <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl font-bold">Book now!</h1>
                  <img
                    src={image_url}
                    className="w-full rounded-lg shadow-2xl"
                  />
                </div>
                <div className="card w-auto shadow-2xl bg-base-100">
                  <div className="card-body">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Name</span>
                      </label>
                      <input
                        type="name"
                        placeholder={title}
                        className="input input-bordered"
                        name="name"
                        disabled
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input
                        type="email"
                        placeholder={user?.email}
                        className="input input-bordered"
                        name="email"
                        disabled
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Slot</span>
                      </label>
                      <select
                        id="slot"
                        className="input input-bordered"
                        name="slot"
                        required
                      >
                        {slots.map((slot, index) => (
                          <option key={index} value={slot}>
                            {slot}
                          </option>
                        ))}

                        {/* <option value="2 PM">2 PM</option>
                        <option value="5 PM">5 PM</option>
                        <option value="10 PM">10 PM</option> */}
                      </select>
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">
                          Ticket Quantity Available : {available}
                        </span>
                      </label>
                      <input
                        type="number"
                        placeholder="1-10"
                        className="input input-bordered"
                        min={1}
                        max={available}
                        name="quantity"
                        required
                      />
                    </div>

                    <div className="form-control mt-6">
                      <input
                        className="btn bg-red-500 text-white"
                        type="submit"
                        value="Book Now"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
