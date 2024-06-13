import { useLoaderData } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Booking = () => {
  const booking = useLoaderData();
  const { user } = useAuth();
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

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingInfo),
    })
      .then((res) => res.json())
      .then(() => {
        form.reset();
      });

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
    <div className="p-10">
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="w-auto mx-auto">
            <form
              onSubmit={handleSUbmit}
              className="hero min-h-screen bg-base-200"
            >
              <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl font-bold">Book now!</h1>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
                    className="max-w-sm rounded-lg shadow-2xl"
                  />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
