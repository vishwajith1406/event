import { useEffect, useState } from "react";
import axios from "axios";

function MyEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://127.0.0.1:8000/api/my-events/", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setEvents(res.data));
  }, []);

  return (
    <div className="container">
      <h2>🧑‍💼 My Events</h2>

      {events.map((e, i) => (
        <div key={i} className="card">
          <h3>{e.name}</h3>
          <p>{e.venue}</p>
          <p>{e.date}</p>
          <p>Seats: {e.seats}</p>
        </div>
      ))}
    </div>
  );
}

export default MyEvents;