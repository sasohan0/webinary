import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";
import Swal from "sweetalert2";

const PrivateRoutes = ({ children }) => {
  const { user, loading, logout } = useAuth();
  const location = useLocation();
  let token;
  setTimeout(() => {
    token = localStorage.getItem("token");
  }, 500);

  if (loading) {
    return <LoadingSpinner />;
  }

  setTimeout(() => {
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Session Expired",
        text: "Please login again",
      }).then(() => {
        setTimeout(() => {
          logout();
        }, 800);
      });
    }
  }, 600);

  if (user) {
    return children;
  }

  return <Navigate to={"/login"} state={{ from: location }} replace />;
};

export default PrivateRoutes;
