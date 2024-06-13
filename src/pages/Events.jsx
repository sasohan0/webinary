import { useState } from "react";
import Event from "./Event";

// eslint-disable-next-line react/prop-types
const Events = ({ events }) => {
  const APIData = events;
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  console.log("in Events:", APIData);

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
    <div className="bg-base-100" id="events">
      <h1 className="my-8 text-5xl text-primary font-bold text-center">
        Upcoming Events To Book !
      </h1>

      <div className="text-center p-6 flex justify-center ">
        <label className="input input-bordered cursor-text w-96  border-4 border-purple-800 flex items-center gap-2">
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
      <div className="flex flex-wrap gap-7 px-6 justify-center items-center ">
        {searchInput.length > 1
          ? filteredResults?.map((event) => (
              <Event key={event._id} event={event} />
            ))
          : APIData?.map((event) => <Event key={event._id} event={event} />)}
      </div>
    </div>
  );
};

export default Events;
