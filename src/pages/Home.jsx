import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Events from "./Events";

const Home = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);
  return (
    <div>
      <Banner></Banner>
      <Events events={events}></Events>
    </div>
  );
};

export default Home;
