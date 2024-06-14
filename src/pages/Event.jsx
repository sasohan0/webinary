import { Link } from "react-router-dom";

const Event = ({ event }) => {
  const { _id, title, speaker, price, description, available } = event;

  return (
    <div className="card w-96 h-auto bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-slate-500">{title}</h2>
        <h3 className="text-xl font-semibold">{speaker}</h3>
        {price === "0" ? (
          <h3 className="text-xl font-semibold">Free</h3>
        ) : (
          <h3 className="text-xl font-semibold">${price}</h3>
        )}
        <p className="w-full h-20">
          {description?.length > 50
            ? description.slice(0, 50) + "..."
            : description}
        </p>
        <div className="card-actions justify-end">
          {available === 0 ? (
            <span className="text-warning"> Stock Out</span>
          ) : (
            <button className="btn bg-slate-700 text-white hover:text-black">
              <Link to={`/events/${_id}`}>See details</Link>
            </button>
          )}
          {available !== 0 && (
            <button className="btn bg-slate-700 text-white hover:text-black">
              <Link to={`/booking/${_id}`}>Book Now</Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Event;
