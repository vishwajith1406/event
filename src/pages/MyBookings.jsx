import { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://127.0.0.1:8000/api/my-bookings/", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setBookings(res.data));
  }, []);

  return (
    <div className="container">
      <h2>📊 My Bookings</h2>

      <div className="grid">
  {bookings.map((b, i) => (
    <div key={i} className="card">
      <h3>{b.event}</h3>
      <p>Seats: {b.seats}</p>
      <p>{b.time}</p>
    </div>
  ))}
</div>
    </div>
  );
}

export default MyBookings;