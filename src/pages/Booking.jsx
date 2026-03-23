import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Booking() {
  const { id } = useParams();
  const [seats, setSeats] = useState(1);

  const handleBooking = () => {
  const token = localStorage.getItem("token");

  // ✅ Check login
  if (!token) {
    alert("Please login first");
    window.location.href = "/login";
    return;
  }

  // ✅ Send request with token
  axios.post(
    "http://127.0.0.1:8000/api/book/",
    {
      event_id: id,
      seats: seats
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  .then(() => alert("✅ Booking Successful"))
  .catch(() => alert("❌ Error"));
};

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <h2>🎟 Book Event</h2>

      <input
        type="number"
        value={seats}
        onChange={(e) => setSeats(e.target.value)}
        min="1"
      />

      <br /><br />

      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
}

export default Booking;