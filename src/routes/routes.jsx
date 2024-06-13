import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Sidebar from "../components/Sidebar";
import EventDetails from "../pages/EventDetails";
import Booking from "../pages/Booking";

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
            element: <Booking />,
            loader: ({ params }) =>
              fetch(`http://localhost:5000/events/${params.id}`),
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
