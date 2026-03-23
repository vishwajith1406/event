import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/events/")
      .then(res => setEvents(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
  <div className="container">
    <h2 style={{ marginBottom: "20px" }}>🔥 Explore Events</h2>

    <div className="grid">
      {events.map(event => (
        <div key={event.id} className="card">

          <h3>{event.name}</h3>

          <p style={{ opacity: 0.8 }}>{event.description}</p>

          <p>📍 {event.venue}</p>
          <p>🗓 {event.date} ⏰ {event.time}</p>

          <p style={{ color: "#a5b4fc" }}>
            🎟 {event.available_seats} seats left
          </p>

          <Link to={`/booking/${event.id}`}>
            <button>Book Now</button>
          </Link>

        </div>
      ))}
    </div>
  </div>
);
}

export default Events;