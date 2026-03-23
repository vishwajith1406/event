import { useState } from "react";
import axios from "axios";

function CreateEvent() {
  const [data, setData] = useState({});

  const handleSubmit = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Login first");
      window.location.href = "/login";
      return;
    }

    axios.post("http://127.0.0.1:8000/api/create-event/", data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => alert("Event Created"))
    .catch(() => alert("Error"));
  };

  return (
  <div className="container">
    <h2>✨ Create Event</h2>

    <div className="card">
      <input placeholder="Event Name" onChange={e => setData({...data, name: e.target.value})} />
      <input placeholder="Description" onChange={e => setData({...data, description: e.target.value})} />
      <input placeholder="Venue" onChange={e => setData({...data, venue: e.target.value})} />

      <input type="date" onChange={e => setData({...data, date: e.target.value})} />
      <input type="time" onChange={e => setData({...data, time: e.target.value})} />

      <input placeholder="Total Seats" onChange={e => setData({...data, total_seats: e.target.value})} />
      <input placeholder="Price" onChange={e => setData({...data, price: e.target.value})} />

      <button onClick={handleSubmit}>Create Event</button>
    </div>
  </div>
);
}

export default CreateEvent;