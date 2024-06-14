import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  console.log("from dashboard", user?.email);
  const [userInfo, setUserInfo] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`https://webinary-server.onrender.com/user/${user?.email}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserInfo(data));
  }, [user, token]);

  console.log("in dashboard userinfo", userInfo);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content p-0 md:p-4 flex-col lg:flex-row">
        <div className="avatar">
          <div className="w-44 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              alt=" NO IMG NO IMG NO IMG NO IMG NO IMG "
              src={user?.photoURL || "/public/placeholder.jpg"}
            />
          </div>
        </div>
        <div className="flex justify-center items-center flex-col gap-0">
          <h1 className="text-5xl font-bold text-center">
            {userInfo?.name}
            {user?.emailVerified ? (
              <div className="py-2">
                {" "}
                ✅<small className="text-base italic">(verified)</small>
              </div>
            ) : (
              <div>
                {" "}
                ❌<small className="text-base italic">(unverified)</small>
              </div>
            )}
          </h1>

          <p className="py-2 text-2xl text-slate-800">
            Email : {userInfo?.email}
          </p>
          <p className="py-2 text-2xl text-slate-800">
            Age : {userInfo?.age || "18+"}
          </p>
          <p className="py-2 text-2xl text-slate-800">
            Phone : +88{userInfo?.mobileNumber || "+880.........."}
          </p>
          <p className="text-blue-700 font-bold pb-2">
            Unique ID : {userInfo?._id || "ID not found"}
          </p>
          <Link
            to={`/dashboard/profile/edit/${userInfo?._id}`}
            className="btn btn-neutral btn-md"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
