import { Link, useLoaderData } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const EventDetails = () => {
  const event = useLoaderData();
  console.log(event);
  const { user } = useAuth();
  const currentUserEmail = user?.email;
  const { _id, title, brand, price, description, image_url, email } = event;
  return (
    <div className="flex justify-center items-center mt-8 mb-8">
      <div className="card w-96 h-auto bg-base-100 shadow-xl">
        <figure className="bg-base-200  ">
          <img className=" scale-150 " src={image_url} alt="products" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-slate-500">{title}</h2>
          <h3 className="text-xl font-semibold">{brand}</h3>
          <h3 className="text-xl font-semibold">${price}</h3>
          <p className="w-full ">{description}</p>
          <div className="card-actions justify-end">
            <button className="btn bg-slate-700 text-white hover:text-black">
              <Link to={`/booking/${_id}`}>Book Now</Link>
            </button>
            <button className="btn bg-slate-700 text-white hover:text-black">
              <Link to={`/`}>Back to Events</Link>
            </button>
            {email === currentUserEmail && (
              <button className="btn bg-slate-700 text-white hover:text-black">
                <Link to={`../../dashboard/my-products/edit/${_id}`}>Edit</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
