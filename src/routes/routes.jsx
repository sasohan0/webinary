import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Sidebar from "../components/Sidebar";
import EventDetails from "../pages/EventDetails";
import Booking from "../pages/Booking";
import Payment from "../pages/Payment";
import UserBookings from "../pages/UserBookings";
import PrivateRoutes from "./privateRoutes/PrivateRoutes";
import Dashboard from "../pages/Dashboard";
import EditProfile from "../pages/EditProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Sidebar></Sidebar>,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/events/:id",
            element: <EventDetails />,
            loader: ({ params }) =>
              fetch(`http://localhost:5000/events/${params.id}`),
          },
          {
            path: "/booking/:id",
            element: (
              <PrivateRoutes>
                {" "}
                <Booking />
              </PrivateRoutes>
            ),
            loader: ({ params }) =>
              fetch(`http://localhost:5000/booking/${params.id}`),
          },
          {
            path: "/bookings",
            element: (
              <PrivateRoutes>
                <UserBookings />
              </PrivateRoutes>
            ),
          },
          {
            path: "/booking/payment/:id",
            element: (
              <PrivateRoutes>
                {" "}
                <Payment />{" "}
              </PrivateRoutes>
            ),
          },
          {
            path: "/dashboard",
            element: (
              <PrivateRoutes>
                {" "}
                <Dashboard></Dashboard>
              </PrivateRoutes>
            ),
          },
          {
            path: "dashboard/profile/edit/:id",
            element: (
              <PrivateRoutes>
                <EditProfile />
              </PrivateRoutes>
            ),
            // loader: ({ params }) =>
            //   fetch(`https://waste-not-backend.onrender.com/user/get/${params.id}`),
          },
        ],
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
