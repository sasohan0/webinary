import { useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import SingleBookingCard from "../components/SingleBookingCard";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");
  const { user } = useAuth();
  console.log("bookings here", bookings);
  //   console.log("object", products);
  const currentUserEmail = user?.email;
  console.log("object", currentUserEmail);
  const APIData = bookings;
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    fetch("http://localhost:5000/bookings", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) =>
        setBookings(
          data.filter((booking) => booking.email === currentUserEmail)
        )
      );
  }, [user, currentUserEmail, token]);

  const handleDeleteProduct = (id) => {
    setBookings(bookings.filter((booking) => booking._id !== id));
  };
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);
    }
  };

  return (
    <div>
      <h1 className="text-5xl font-bold text-center">All Your Booked Events</h1>
      <div className="text-center p-6 flex justify-center ">
        <label className="input input-bordered cursor-text w-96 border-4 border-purple-800 flex items-center gap-2">
          <input
            icon="search"
            placeholder="Search by name or brand"
            onChange={(e) => searchItems(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="my-12 mx-auto flex flex-wrap gap-4">
        {searchInput.length > 1
          ? filteredResults?.map((booking) => (
              <SingleBookingCard key={booking.id} booking={booking} />
            ))
          : APIData?.map((booking) => (
              <SingleBookingCard
                key={booking._id}
                booking={booking}
                onDelete={handleDeleteProduct}
              />
            ))}

        {bookings.length === 0 && (
          <div className="text-center flex justify-center items-center flex-col mx-auto">
            <h1 className="text-3xl font-bold text-center m-12">
              No Booking Found
            </h1>
            <Link className="btn btn-primary" to={"../#events"}>
              {" "}
              See Events
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookings;
