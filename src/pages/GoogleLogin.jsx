import { FcGoogle } from "react-icons/fc";

import { useState } from "react";
import useAuth from "../hooks/useAuth";

const GoogleLogin = () => {
  const { googleLogin } = useAuth();
  const [error, setError] = useState(null);

  const handleGoogleSignIn = () => {
    googleLogin()
      .then((data) => {
        if (data?.user?.email) {
          const userInfo = {
            email: data?.user?.email,
            name: data?.user?.displayName,
          };
          fetch("https://webinary-server.onrender.com/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo),
          })
            .then((res) => res.json())
            .then((data) => {
              localStorage.setItem("token", data?.token);
            });
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <button onClick={handleGoogleSignIn} className="btn w-full">
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex items-center gap-2">
        <FcGoogle size={24} />
        <p>Google</p>
      </div>
    </button>
  );
};

export default GoogleLogin;
